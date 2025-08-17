import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { GlobeIcon } from '../icons';
import Edit from './edit';

registerBlockType( metadata.name, {
	icon: GlobeIcon,
	edit: Edit
} );
