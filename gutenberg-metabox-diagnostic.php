<?php
/**
 * Plugin Name: Gutenberg MetaBox Diagnostic
 * Author: pbrocks
 */
/**
 * [description]
 *
 * @param  {Function} ){    add_meta_box( 'test_tinymce', 'Test         TinyMCE', function( $post ){         $field_value [description]
 * @param  {[type]}   null              [description]
 * @param  {[type]}   'advanced'        [description]
 * @param  {[type]}   'high'            );}
 * [description]
 * @return {[type]}                     [description]
 */
add_action( 'add_meta_boxes', 'gutenberg_test_tinymce' );
function gutenberg_test_tinymce() {
	add_meta_box(
		'test_tinymce',
		'Test TinyMCE',
		function( $post ) {
			$field_value = get_post_meta( $post->ID, 'test_tinymce', true );
			wp_editor(
				$field_value,
				'test_tinymce_id',
				array(
					'wpautop'       => true,
					'media_buttons' => false,
					'textarea_name' => 'test_tinymce',
					'textarea_rows' => 10,
					'teeny'         => true,
				)
			);
		},
		null,
		'advanced',
		'high'
	);
}
add_action(
	'save_post',
	function( $post_id ) {
		if ( ! isset( $_POST['test_tinymce'] ) ) {
			return;
		}
		update_post_meta( $post_id, 'test_tinymce', $_POST['test_tinymce'] );
	}
);
