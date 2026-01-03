import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  InspectorControls,
  RichText
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  ColorPicker
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.css';

registerBlockType('cse-blocks/animated-hero', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      subheading,
      buttonText,
      buttonUrl,
      animationStyle,
      backgroundColor,
      textColor
    } = attributes;

    const blockProps = useBlockProps({
      style: {
        backgroundColor,
        color: textColor,
      }
    });

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Animation Settings', 'mytheme')}>
            <SelectControl
              label={__('Animation Style', 'mytheme')}
              value={animationStyle}
              options={[
                { label: 'Fade Up', value: 'fade-up' },
                { label: 'Slide In', value: 'slide-in' },
                { label: 'Scale In', value: 'scale-in' },
                { label: 'Stagger', value: 'stagger' }
              ]}
              onChange={(value) => setAttributes({ animationStyle: value })}
            />
          </PanelBody>

          <PanelBody title={__('Colors', 'mytheme')}>
            <p><strong>{__('Background Color', 'mytheme')}</strong></p>
            <ColorPicker
              color={backgroundColor}
              onChangeComplete={(value) =>
                setAttributes({ backgroundColor: value.hex })
              }
            />

            <p style={{ marginTop: '20px' }}>
              <strong>{__('Text Color', 'mytheme')}</strong>
            </p>
            <ColorPicker
              color={textColor}
              onChangeComplete={(value) =>
                setAttributes({ textColor: value.hex })
              }
            />
          </PanelBody>

          <PanelBody title={__('Button Settings', 'mytheme')}>
            <TextControl
              label={__('Button URL', 'mytheme')}
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="animated-hero__content">
            <RichText
              tagName="h1"
              className="animated-hero__heading"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder={__('Enter heading...', 'mytheme')}
            />

            <RichText
              tagName="p"
              className="animated-hero__subheading"
              value={subheading}
              onChange={(value) => setAttributes({ subheading: value })}
              placeholder={__('Enter subheading...', 'mytheme')}
            />

            <RichText
              tagName="span"
              className="animated-hero__button"
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
              placeholder={__('Button text...', 'mytheme')}
            />

            <p className="editor-note">
              {__('Animation preview:', 'mytheme')} <strong>{animationStyle}</strong>
            </p>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const {
      heading,
      subheading,
      buttonText,
      buttonUrl,
      animationStyle,
      backgroundColor,
      textColor
    } = attributes;

    const blockProps = useBlockProps.save({
      style: {
        backgroundColor,
        color: textColor,
      },
      'data-animation': animationStyle
    });

    return (
      <div {...blockProps}>
        <div className="animated-hero__content">
          <h1
            className="animated-hero__heading"
            data-animate="heading"
          >
            {heading}
          </h1>

          <p
            className="animated-hero__subheading"
            data-animate="subheading"
          >
            {subheading}
          </p>

          <a
            href={buttonUrl}
            className="animated-hero__button"
            data-animate="button"
          >
            {buttonText}
          </a>
        </div>
      </div>
    );
  }
});
