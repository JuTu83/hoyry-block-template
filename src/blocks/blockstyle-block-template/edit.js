import { __ } from '@wordpress/i18n';
import { useMemo } from 'react';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalToolsPanel as ToolsPanel,
	TabPanel,
	TextControl,
	ToggleControl,
	ColorPalette
} from '@wordpress/components';

/**
 * STUB: In production, these would be imported from hoyry-block-styles-manager.
 * import { getCssVar } from '../../../../hoyry-block-styles-manager/src/helpers';
 * import { CssOutput, Settings, ColorGroup, Size, ... } from '../../../../hoyry-block-styles-manager/src/components';
 */

// Stub getCssVar helper
function getCssVar( varName, value ) {
	if ( value === undefined || value === null || value === '' ) return '';
	return `${varName}: ${value};`;
}

// Stub Settings component
function StubSettings({ attributes, setAttributes }) {
	const { name, isDefault } = attributes;
	return (
		<ToolsPanel label={ __( 'Block style settings', 'hoyry-block-template' ) }>
			<TextControl
				label={ __( 'Style name', 'hoyry-block-template' ) }
				value={ name }
				onChange={ (value) => setAttributes({ name: value }) }
			/>
			<ToggleControl
				label={ __( 'Set as default', 'hoyry-block-template' ) }
				checked={ isDefault }
				onChange={ (value) => setAttributes({ isDefault: value }) }
			/>
		</ToolsPanel>
	);
}

// Stub CssOutput component
function StubCssOutput({ css }) {
	const cssString = css.filter(Boolean).join('\n');
	if ( !cssString ) return null;
	return <style>{ cssString }</style>;
}

export default function Edit( props ) {

	const { attributes, setAttributes, clientId } = props;
	const { slug, name, styleSettings } = attributes;

	let settings = JSON.parse(JSON.stringify(styleSettings || {}));

	useMemo(() => {
		if( settings === undefined ) settings = {};
		if( settings['desktop'] === undefined ) settings['desktop'] = {};
		if( settings['mobile'] === undefined ) settings['mobile'] = {};
	});

	function setStyleSettings( tab, key, value ) {
		settings[tab][key] = value;
		setAttributes({ styleSettings: settings });
	}

	const inspectorControls = (
		<InspectorControls>

			<StubSettings { ...props } />

			<TabPanel
				tabs={[
					{ name: 'desktop', title: __( 'Desktop', 'hoyry-block-template' ) },
					{ name: 'mobile', title: __( 'Mobile', 'hoyry-block-template' ) },
				]}
			>
				{ ( tab ) =>
					<>

						<ToolsPanel label={ __( 'Container', 'hoyry-block-template' ) }>
							<div style={{ padding: '0 16px' }}>
								<p>{ __( 'Background color', 'hoyry-block-template' ) }</p>
								<ColorPalette
									value={ settings[tab.name]?.backgroundColor }
									onChange={ ( value ) => setStyleSettings( tab.name, 'backgroundColor', value ) }
								/>
							</div>
						</ToolsPanel>

						<ToolsPanel label={ __( 'Content', 'hoyry-block-template' ) }>
							<div style={{ padding: '0 16px' }}>
								<p>{ __( 'Text color', 'hoyry-block-template' ) }</p>
								<ColorPalette
									value={ settings[tab.name]?.textColor }
									onChange={ ( value ) => setStyleSettings( tab.name, 'textColor', value ) }
								/>
							</div>
						</ToolsPanel>

					</>
				}
			</TabPanel>
		</InspectorControls>
	);

	const selector = `.wp-block-${ slug }.is-style-${ slug }-${ clientId }`;

	const cssOutput = (
		<StubCssOutput
			css={[
				`${ selector } {`,
				getCssVar( '--hoyry-block-template-background', settings['desktop']?.backgroundColor ),
				getCssVar( '--hoyry-block-template-text-color', settings['desktop']?.textColor ),
				`}`,
				`@media (max-width: 1023px) {`,
				`${ selector } {`,
				getCssVar( '--hoyry-block-template-background', settings['mobile']?.backgroundColor ),
				getCssVar( '--hoyry-block-template-text-color', settings['mobile']?.textColor ),
				`}`,
				`}`,
			]}
		/>
	);

	return (
		<>
			{ inspectorControls }
			{ cssOutput }
			<div { ...useBlockProps() }>
				<h2>{ __('Höyry: Block template', 'hoyry-block-template') }{ name && name.length > 0 ? ` — ${ name }` : '' }</h2>
				<div className={ `wp-block-${ slug } is-style-${ slug }-${ clientId }` }>
					<div className="hoyry-block-template-wrapper">
						<div className="hoyry-block-template-container">
							<div className="hoyry-block-template-item">
								<div className="hoyry-block-template-item-content">
									<h2 className="wp-block-heading">{ __( 'Template heading preview', 'hoyry-block-template' ) }</h2>
									<p>{ __( 'Template content preview.', 'hoyry-block-template' ) }</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
