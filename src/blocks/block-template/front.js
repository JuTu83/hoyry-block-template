/**
 * Frontend script (viewScript) for the block template.
 * This runs on the front-end only, not in the editor.
 */
window.addEventListener('load', function() {
	const blocks = document.querySelectorAll('.wp-block-hoyry-block-template');

	blocks.forEach(block => {
		block.classList.add('is-initialized');
	});
});
