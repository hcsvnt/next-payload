import type { HTMLMotionProps } from 'framer-motion';

export const easings = {
    'ease-in': [0.895, 0.03, 0.685, 0.22],
    'ease-out': [0.165, 0.84, 0.44, 1],
    'ease-in-out': [0.77, 0, 0.175, 1],
    'ease-out-back': [0.175, 0.885, 0.32, 1.275],
    custom: [0.5, 0, 0.1, 1]
};

export const transition = {
    duration: 0.6,
    ease: easings.custom
};

export const transitionSlider = {
    duration: 1,
    ease: easings['ease-out']
};

export const left = {
    initial: {
        opacity: 0,
        x: -25
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: -25
    },
    transition
};

export const right = {
    initial: {
        opacity: 0,
        x: 25
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: 25
    },
    transition
};

export const bottom = {
    initial: {
        opacity: 0,
        y: 25
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: 25
    },
    transition
};

export const top = {
    initial: {
        opacity: 0,
        y: -25
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -25
    },
    transition
};

export const slideInHorizontal = (x = '100%') => ({
    initial: { x },
    animate: { x: 0 },
    exit: { x },
    transition
});
export const slideInVertical = (y = '100%') => ({
    initial: { y },
    animate: { y: 0 },
    exit: { y },
    transition
});

export const slideInLeft = {
    initial: {
        x: -300,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: -300,
        opacity: 0
    },
    transition: transitionSlider
};

export const slideInRight = {
    initial: {
        x: 300,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: 300,
        opacity: 0
    },
    transition: transitionSlider
};

export const opacity = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: easings.custom
        }
    },
    transition
};

export const popup = {
    initial: {
        x: 45,
        opacity: 0
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        transition: {
            ease: easings.custom,
            duration: 0.45
        }
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: easings.custom
        }
    },
    transition
};

export const scale = {
    initial: {
        opacity: 0,
        scale: 0.97
    },
    animate: {
        scale: 1,
        opacity: 1
    },
    exit: {
        scale: 0.97,
        opacity: 0
    },
    transition
};

export const curtain: HTMLMotionProps<'div'> = {
    initial: {
        x: '-100%'
    },
    animate: {
        x: '0%'
    },
    exit: {
        x: '100%'
    },
    transition: {
        ease: easings.custom,
        duration: 0.5
    }
};

const animations = {
    left,
    right,
    bottom,
    top,
    slideInHorizontal,
    slideInVertical,
    slideInLeft,
    slideInRight,
    opacity,
    popup,
    scale,
    curtain
};

export type AnimationType = keyof typeof animations;
export const getAnimationType = (type: AnimationType) => animations[type];
