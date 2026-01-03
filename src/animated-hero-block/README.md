# Animated Hero Block Setup Guide

## Project Structure

Create this folder structure in your theme:

```
your-theme/
├── blocks/
│   └── animated-hero/
│       ├── block.json
│       ├── index.js
│       ├── view.js
│       ├── style.css
│       └── editor.css
└── functions.php
```

## Installation Steps

### 1. Add to functions.php

```php
<?php
// Register the block
function mytheme_register_blocks() {
    register_block_type( __DIR__ . '/blocks/animated-hero' );
}
add_action( 'init', 'mytheme_register_blocks' );

// Enqueue GSAP for the frontend
function mytheme_enqueue_gsap() {
    // Only load on frontend, not in editor
    if ( ! is_admin() ) {
        wp_enqueue_script(
            'gsap',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
            array(),
            '3.12.5',
            true
        );
        
        wp_enqueue_script(
            'gsap-scrolltrigger',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
            array('gsap'),
            '3.12.5',
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_gsap' );
```

### 2. Build the Block

Install dependencies and build:

```bash
# Navigate to your theme directory
cd your-theme

# Initialize npm (if not already done)
npm init -y

# Install WordPress scripts
npm install @wordpress/scripts @wordpress/block-editor @wordpress/blocks @wordpress/components @wordpress/i18n --save-dev

# Install GSAP
npm install gsap --save

# Add build script to package.json
"scripts": {
  "build": "wp-scripts build blocks/animated-hero/index.js blocks/animated-hero/view.js --output-path=blocks/animated-hero",
  "start": "wp-scripts start blocks/animated-hero/index.js blocks/animated-hero/view.js --output-path=blocks/animated-hero"
}

# Build the block
npm run build
```

### 3. Using the Block

1. In the WordPress editor, click the **+** button to add a block
2. Search for "Animated Hero"
3. Insert the block
4. Customize content and settings in the sidebar:
   - Choose animation style (Fade Up, Slide In, Scale In, Stagger)
   - Adjust colors
   - Set button URL

## Animation Styles Explained

- **Fade Up**: Elements fade in while moving upward
- **Slide In**: Elements slide in from the left
- **Scale In**: Elements scale up with a bounce effect
- **Stagger**: Heading letters animate individually in sequence

## Customization Tips

### Add More Animation Styles

Edit `view.js` and add a new case in the switch statement:

```javascript
case 'your-animation':
  tl.from(heading, {
    // Your custom GSAP animation properties
  });
  break;
```

Then add it to the options in `index.js` and `block.json`.

### Modify Colors

Use the color pickers in the block sidebar, or add your own color presets in `theme.json`.

### Adjust Timing

In `view.js`, modify the `duration` and `ease` values to change animation speed and feel.

## Troubleshooting

**Animations not working?**
- Check browser console for errors
- Verify GSAP is loading (check Network tab)
- Ensure `npm run build` completed successfully
- Clear your browser cache

**Block not appearing in editor?**
- Run `npm run build` again
- Check that `block.json` is in the correct location
- Verify `register_block_type` path in functions.php

## Performance Notes

- Animations are loaded only on the frontend (not in editor)
- ScrollTrigger ensures animations trigger at the right time
- GSAP is loaded from CDN for optimal caching
- All animations use GPU-accelerated properties for smooth performance