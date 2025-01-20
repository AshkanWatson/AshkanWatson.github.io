// Internationalization (i18n) Cache Module
const I18nCache = {
    cache: {
        Date: {
            toLocaleString: {},
            toLocaleDateString: {}
        },
        DateTimeFormat: {
            format: {},
            formatRange: {},
            formatToParts: {},
            formatRangeToParts: {}
        },
        Number: {
            toLocaleString: {}
        },
        NumberFormat: {
            format: {},
            formatRange: {},
            formatToParts: {},
            formatRangeToParts: {}
        }
    },

    // Utility functions
    utils: {
        serialize(value, key) {
            if (typeof value === "bigint") return `${value}n`;
            if (value instanceof Date) return value.getTime();
            return value;
        },

        generateHash(...args) {
            const str = JSON.stringify(args, this.serialize);
            return this.hashString(str);
        },

        hashString(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash >>> 0;
        },

        getCachedOrCompute(cache, key, computeFn) {
            return key in cache ? cache[key] : (cache[key] = computeFn());
        },

        cloneObject: (obj) => ({ ...obj }),

        getDateTimeFormatOptions(instance) {
            const options = instance.resolvedOptions();
            return {
                locale: options.locale,
                calendar: options.calendar,
                numberingSystem: options.numberingSystem,
                timeZone: options.timeZone,
                hour12: options.hour12,
                weekday: options.weekday,
                era: options.era,
                year: options.year,
                month: options.month,
                day: options.day,
                hour: options.hour,
                minute: options.minute,
                second: options.second,
                timeZoneName: options.timeZoneName
            };
        }
    },

    // Patch methods
    patchDateMethods() {
        const originalMethods = {
            toLocaleString: Date.prototype.toLocaleString,
            toLocaleDateString: Date.prototype.toLocaleDateString
        };

        Object.entries(originalMethods).forEach(([methodName, originalMethod]) => {
            if (originalMethod) {
                Date.prototype[methodName] = function(locales, options) {
                    const hashKey = I18nCache.utils.generateHash(this, locales, options);
                    return I18nCache.utils.getCachedOrCompute(
                        I18nCache.cache.Date[methodName],
                        hashKey,
                        () => originalMethod.call(this, locales, options)
                    );
                };
            }
        });
    },

    patchDateTimeFormat() {
        const proto = Intl.DateTimeFormat.prototype;
        const descriptors = Object.getOwnPropertyDescriptors(proto);

        // Patch format method
        if (descriptors.format) {
            Object.defineProperty(proto, 'format', {
                get() {
                    return (date) => {
                        const options = I18nCache.utils.getDateTimeFormatOptions(this);
                        const hashKey = I18nCache.utils.generateHash(date, options);
                        return I18nCache.utils.getCachedOrCompute(
                            I18nCache.cache.DateTimeFormat.format,
                            hashKey,
                            () => descriptors.format.get.call(this)(date)
                        );
                    };
                }
            });
        }

        // Patch other DateTimeFormat methods
        const methods = {
            formatRange: (startDate, endDate) => [startDate, endDate],
            formatToParts: (date) => [date],
            formatRangeToParts: (startDate, endDate) => [startDate, endDate]
        };

        Object.entries(methods).forEach(([methodName, getArgs]) => {
            if (descriptors[methodName]) {
                proto[methodName] = function(...args) {
                    const options = I18nCache.utils.getDateTimeFormatOptions(this);
                    const hashKey = I18nCache.utils.generateHash(...getArgs(...args), options);
                    return I18nCache.utils.getCachedOrCompute(
                        I18nCache.cache.DateTimeFormat[methodName],
                        hashKey,
                        () => {
                            const result = descriptors[methodName].value.apply(this, args);
                            return methodName.includes('Parts') ? result.map(I18nCache.utils.cloneObject) : result;
                        }
                    );
                };
            }
        });
    },

    patchNumberMethods() {
        const original = Number.prototype.toLocaleString;
        if (original) {
            Number.prototype.toLocaleString = function(locales, options) {
                const hashKey = I18nCache.utils.generateHash(this, locales, options);
                return I18nCache.utils.getCachedOrCompute(
                    I18nCache.cache.Number.toLocaleString,
                    hashKey,
                    () => original.call(this, locales, options)
                );
            };
        }
    },

    init() {
        this.patchDateMethods();
        this.patchDateTimeFormat();
        this.patchNumberMethods();
    }
};

// Animation Module
const AnimationManager = {
    restoreOriginalSizes() {
        document.querySelectorAll("[data-framer-original-sizes]").forEach(element => {
            const originalSizes = element.getAttribute("data-framer-original-sizes");
            element.setAttribute("sizes", originalSizes || "");
            element.removeAttribute("data-framer-original-sizes");
        });
    },

    init() {
        window.__framer_onRewriteBreakpoints = this.restoreOriginalSizes;
    }
};

// Initialize modules
document.addEventListener('DOMContentLoaded', () => {
    I18nCache.init();
    AnimationManager.init();
});

// Export modules for potential external use
export { I18nCache, AnimationManager };
    