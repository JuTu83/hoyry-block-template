import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { showBorder } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="hoyry-block-template-wrapper" data-show-border={showBorder}>
				<div className="hoyry-block-template-container">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
