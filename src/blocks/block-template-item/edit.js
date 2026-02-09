import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, BlockControls, useInnerBlocksProps, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { media as mediaIcon, trash as trashIcon } from '@wordpress/icons';

const TRANSLATIONS = {
	chooseImage: __( 'Choose image', 'hoyry-block-template' ),
	removeImage: __( 'Remove image', 'hoyry-block-template' ),
};

export default function Edit({ attributes, setAttributes }) {

	const { mediaId, mediaUrl } = attributes;

	const blockProps = useBlockProps({
		className: 'hoyry-block-template-item'
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'hoyry-block-template-item-content' },
		{
			template: [
				['core/heading', { level: 2 }],
				['core/paragraph', {}],
			]
		}
	);

	return (
		<>
			<BlockControls group="block">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => {
							setAttributes({
								mediaId: media.id,
								mediaUrl: media.url,
							});
						}}
						allowedTypes={['image']}
						render={({ open }) => (
							<ToolbarButton
								onClick={open}
								icon={mediaIcon}
								label={TRANSLATIONS.chooseImage}
								isActive={!!mediaId}
							/>
						)}
					/>
					{mediaId > 0 && (
						<ToolbarButton
							onClick={() => {
								setAttributes({
									mediaId: 0,
									mediaUrl: '',
								});
							}}
							icon={trashIcon}
							label={TRANSLATIONS.removeImage}
						/>
					)}
				</MediaUploadCheck>
			</BlockControls>

			<div {...blockProps}>
				{mediaUrl && (
					<figure className="hoyry-block-template-item-media">
						<img src={mediaUrl} alt="" className="hoyry-block-template-item-media-image" />
					</figure>
				)}
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
