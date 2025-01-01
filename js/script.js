// SECTION 1: Intl Format Patch
const applyIntlFormatPatch = function(formatCache) {
      // Helper functions
      const stringifyValue = (value) => {
          if (typeof value === "bigint") return `${value}n`;
          if (value instanceof Date) return value.getTime();
          return value;
      };
  
      const generateHash = (...args) => {
          let str = JSON.stringify(args, stringifyValue);
          let hash = 0;
          
          for (let i = 0; i < str.length; i++) {
              hash += str.charCodeAt(i);
              hash += hash << 10;
              hash ^= hash >> 6;
          }
          
          hash += hash << 3;
          hash ^= hash >> 11;
          hash += hash << 15;
          
          return hash >>> 0;
      };
  
      // ... rest of patch implementation ...
  };
  
  // SECTION 2: Breakpoints Handler
  (() => {
      const handleBreakpoints = () => {
          const elements = document.querySelectorAll("[data-framer-original-sizes]");
          
          for (const element of elements) {
              const originalSizes = element.getAttribute("data-framer-original-sizes");
              if (originalSizes === "") {
                  element.removeAttribute("sizes");
              } else {
                  element.setAttribute("sizes", originalSizes);
              }
              element.removeAttribute("data-framer-original-sizes");
          }
      };
  
      window.__framer_onRewriteBreakpoints = handleBreakpoints;
  })();
  
  // SECTION 3: Animation System
  const animator = (() => {
      // Animation configuration and utilities
      const TRANSFORM_PROPERTIES = [
          "transformPerspective", "x", "y", "z", 
          "translateX", "translateY", "translateZ",
          "scale", "scaleX", "scaleY",
          "rotate", "rotateX", "rotateY", "rotateZ",
          "skew", "skewX", "skewY"
      ];
  
      // ... animation implementation ...
  
      return {
          animateAppearEffects,
          getActiveVariantHash,
          spring,
          startOptimizedAppearAnimation
      };
  })();
  
  // SECTION 4: Initialize Animations
  (() => {
      const initializeAnimations = (appearId, transformTemplate, reduceMotion) => {
          if (window.__framer_disable_appear_effects_optimization__) return;
          if (!animator) return;
  
          requestAnimationFrame(() => {
              performance.mark("framer-appear-start");
              
              const appearAnimations = JSON.parse(window.__framer__appearAnimationsContent.text);
              const breakpoints = JSON.parse(window.__framer__breakpoints.text);
              const activeHash = animator.getActiveVariantHash(breakpoints);
              
              animator.animateAppearEffects(
                  appearAnimations,
                  (selector, animations, options) => {
                      const element = document.querySelector(selector);
                      if (!element) return;
                      
                      for (const [prop, values] of Object.entries(animations)) {
                          animator.startOptimizedAppearAnimation(element, prop, values, options[prop]);
                      }
                  },
                  appearId,
                  transformTemplate,
                  reduceMotion && window.matchMedia("(prefers-reduced-motion:reduce)").matches,
                  activeHash
              );
  
              performance.mark("framer-appear-end");
              performance.measure("framer-appear", "framer-appear-start", "framer-appear-end");
          });
      };
  
      return initializeAnimations;
  })()("data-framer-appear-id", "__Appear_Animation_Transform__", true);