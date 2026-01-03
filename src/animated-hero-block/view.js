// Use the globally loaded GSAP from the theme/WordPress
const gsap = window.gsap;
const { ScrollTrigger } = window;

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimatedHeroBlocks();
});

function initAnimatedHeroBlocks() {
  const heroBlocks = document.querySelectorAll('[data-animation]');

  heroBlocks.forEach((block) => {
    const animationStyle = block.getAttribute('data-animation');
    const heading = block.querySelector('[data-animate="heading"]');
    const subheading = block.querySelector('[data-animate="subheading"]');
    const button = block.querySelector('[data-animate="button"]');

    // Set initial states
    gsap.set([heading, subheading, button], {
      autoAlpha: 0
    });

    // Create animation timeline - keep animations visible once played
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => {
          // Add a class when animation starts for additional styling if needed
          block.classList.add('is-animated');
        }
      }
    });

    // Apply animation based on selected style
    switch (animationStyle) {
      case 'fade-up':
        tl.from(heading, {
          y: 50,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, 0)
        .from(subheading, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, 0.2)
        .from(button, {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, 0.4)
        .to(heading, {
          textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0);
        break;

      case 'slide-in':
        // Heading slides in from left with blur
        tl.from(heading, {
          x: -150,
          autoAlpha: 0,
          filter: 'blur(10px)',
          duration: 1,
          ease: 'power4.out'
        }, 0)
        // Subheading slides in from left
        .from(subheading, {
          x: -100,
          autoAlpha: 0,
          filter: 'blur(5px)',
          duration: 1,
          ease: 'power4.out'
        }, 0.15)
        // Button slides in and scales
        .from(button, {
          x: -80,
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'power4.out'
        }, 0.3)
        // Add a subtle grow animation to heading after entrance
        .to(heading, {
          textShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0);
        break;

      case 'scale-in':
        // Elements scale in with rotation
        tl.from(heading, {
          scale: 0.6,
          autoAlpha: 0,
          rotation: -5,
          duration: 1.2,
          ease: 'back.out(1.4)'
        }, 0)
        .from(subheading, {
          scale: 0.7,
          autoAlpha: 0,
          rotation: -3,
          duration: 1,
          ease: 'back.out(1.2)'
        }, 0.2)
        .from(button, {
          scale: 0.5,
          autoAlpha: 0,
          rotation: 10,
          duration: 0.9,
          ease: 'back.out(1.4)'
        }, 0.35)
        // Add bounce effect
        .to(heading, {
          y: -5,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut'
        }, 1.2);
        break;

      case 'stagger':
        // Split text into characters for stagger effect
        const headingText = heading.textContent;
        heading.innerHTML = headingText
          .split('')
          .map(char => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        const chars = heading.querySelectorAll('.char');

        // Staggered character animation
        tl.from(chars, {
          autoAlpha: 0,
          y: 40,
          rotationX: -90,
          stagger: 0.05,
          duration: 0.6,
          ease: 'back.out(1.4)'
        }, 0)
        // Subheading with wave effect
        .from(subheading, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        }, 0.2)
        // Button with pop effect
        .from(button, {
          autoAlpha: 0,
          scale: 0.3,
          duration: 0.6,
          ease: 'back.out(2)'
        }, 0.4)
        // Add an underline animation to heading
        .to(heading, {
          textShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
          duration: 1,
          ease: 'power2.inOut'
        }, 0);
        break;
    }

    // Add hover and click animations to button
    if (button) {
      let buttonHoverTimeline = null;

      button.addEventListener('mouseenter', () => {
        if (buttonHoverTimeline) buttonHoverTimeline.kill();

        buttonHoverTimeline = gsap.timeline();
        buttonHoverTimeline.to(button, {
          scale: 1.08,
          duration: 0.3,
          ease: 'power2.out'
        }, 0)
        .to(button, {
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        }, 0);
      });

      button.addEventListener('mouseleave', () => {
        if (buttonHoverTimeline) buttonHoverTimeline.kill();

        buttonHoverTimeline = gsap.timeline();
        buttonHoverTimeline.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        }, 0)
        .to(button, {
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        }, 0);
      });

      button.addEventListener('mousedown', () => {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: 'back.in'
        });
      });

      button.addEventListener('mouseup', () => {
        gsap.to(button, {
          scale: 1.08,
          duration: 0.2,
          ease: 'back.out'
        });
      });
    }
  });
}

// Re-initialize on window resize for responsive updates
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }, 250);
});
