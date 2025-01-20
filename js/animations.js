// Animation configurations
export const animations = {
    spring: {
        damping: 25,
        mass: 1,
        stiffness: 170,
        type: "spring"
    },

    transition: {
        duration: 0.3,
        ease: [0.44, 0, 0.56, 1]
    },

    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2
        }
    }
};

// Animation related functions
export const fadeIn = (element) => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => element.style.opacity = 1, 10);
};

export const slideIn = (element) => {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = 0;
    element.style.transition = 'all 0.5s ease-out';
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = 1;
    }, 10);
}; 