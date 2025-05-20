// TODO: what and why do we need this?

// import type { RefObject } from 'react';

// import { useGSAP } from '@gsap/react';
// import { gsap } from 'gsap';
// import { CustomEase } from 'gsap/dist/CustomEase';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { SplitText } from 'gsap/dist/SplitText';

// import { heading } from '../animations/heading';
// import { hero } from '../animations/hero';
// import { quote } from '../animations/quote';
// import { stats } from '../animations/stats';
// import { subheading } from '../animations/subheading';

// type AnimationType = 'heading' | 'subheading' | 'quote' | 'hero' | 'stats';

// const animations: Record<AnimationType, (el: HTMLElement, delay?: number) => void> = {
//     heading,
//     subheading,
//     quote,
//     hero,
//     stats
// };

// export const useScrollAnimation = (
//     ref: RefObject<HTMLElement | null>,
//     type?: AnimationType,
//     delay?: number,
//     isClient?: boolean // for client-only renered components we want to rerun this to get the ref, which would've been null on first render
// ) => {
//     useGSAP(
//         () => {
//             gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
//             CustomEase.create('custom', '.5, 0, .2, 1');

//             if (!type) return;

//             const animate = animations[`${type}`];

//             if (!ref?.current || !animate) return;

//             // Fix for scrolltrigger being misaligned under sticky accordeon - better way should be available
//             setTimeout(() => {
//                 animate(ref.current!, delay);
//             }, 0);
//             // animate(ref.current!, delay);
//         },
//         {
//             revertOnUpdate: true,
//             dependencies: [type, ref, isClient]
//         }
//     );
// };
