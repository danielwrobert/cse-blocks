import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { pagesToShow } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Query Settings">
					<RangeControl
						label="Number of posts"
						value={ pagesToShow }
						min={ 1 }
						max={ 10 }
						onChange={ value => setAttributes( { pagesToShow: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ServerSideRender
					block="cse-blocks/related-posts"
					attributes={ {
						pagesToShow
					} }
				/>
			</div>
		</>
	);
}
