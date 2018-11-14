var reload_check = false; var publish_button_click = false;
jQuery(document).ready(function($) {
	add_publish_button_click = setInterval(function() {
		$publish_button = jQuery('.edit-post-header__settings .editor-post-publish-button');
		if ($publish_button && !publish_button_click) {
			publish_button_click = true;
			$publish_button.on('click', function() {
				var reloader = setInterval(function() {
					if (reload_check) {return;} else {reload_check = true;}
					postsaving = wp.data.select('core/editor').isSavingPost();
					autosaving = wp.data.select('core/editor').isAutosavingPost();
					success = wp.data.select('core/editor').didPostSaveRequestSucceed();
					console.log('Saving: '+postsaving+' - Autosaving: '+autosaving+' - Success: '+success);
					if ( postsaving || autosaving || ! success ) {
						classic_reload_check = false;
						return;
					}
					clearInterval(reloader);

					value = document.getElementById('test_tinymce').value;
					if (value == 'trigger_value') {
						if (confirm('Page reload required. Refresh the page now?')) {
							window.location.href = window.location.href+'&refreshed=1';
						}
					}
				}, 1000);
			});
		}
	}, 500);
});