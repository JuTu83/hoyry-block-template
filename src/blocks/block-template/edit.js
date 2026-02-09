import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';

const TRANSLATIONS = {
	settings: __( 'Settings', 'hoyry-block-template' ),
	showBorder: __( 'Show border', 'hoyry-block-template' ),
};

export default function Edit({ clientId, attributes, setAttributes }) {

	const { showBorder } = attributes;

	const { childBlocks } = useSelect(select => ({
		childBlocks: select('core/block-editor').getBlocks(clientId),
	}), [clientId]);

	useEffect(() => {
		setAttributes({ itemCount: childBlocks.length });
	}, [childBlocks.length, setAttributes]);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'hoyry-block-template-container' },
		{
			allowedBlocks: ['hoyry/block-template-item'],
			template: [['hoyry/block-template-item', {}]],
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={TRANSLATIONS.settings}>
					<ToggleControl
						label={TRANSLATIONS.showBorder}
						checked={showBorder}
						onChange={(value) => setAttributes({ showBorder: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="hoyry-block-template-wrapper" data-show-border={showBorder}>
					<div {...innerBlocksProps} />
				</div>
			</div>
		</>
	);
}
