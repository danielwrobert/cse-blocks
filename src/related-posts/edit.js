import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { PanelBody, RangeControl } from '@wordpress/components';

import './style.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { postsToShow, headingText } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Query Settings">
					<RangeControl
						label="Number of posts"
						value={ postsToShow }
						min={ 1 }
						max={ 10 }
						onChange={ value => setAttributes( { postsToShow: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{/* Editable heading */}
				<RichText
					tagName="h2"
					value={ headingText }
					onChange={ value => setAttributes( { headingText: value } ) }
					placeholder="Enter heading text..."
				/>

				{/* Related posts grid preview */}
				<ServerSideRender
					block="cse-blocks/related-posts"
					attributes={ {
						postsToShow,
						headingText
					} }
				/>
			</div>
		</>
	);
}
