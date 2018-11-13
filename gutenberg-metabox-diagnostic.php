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

add_action( 'wp', 'add_meta_box_to_head' );
// function add_meta_box_to_head( $post_id ) {
function add_meta_box_to_head() {
	global $post;

	$meta = get_post_meta( $post->ID, 'test_tinymce' );
	echo '<h4 style="text-align:center;">Post ID = ' . $post->ID;
	// echo '<pre>';
	// print_r( $post->ID );
	echo '<br>string = ' . $meta[0];
	// echo '</pre>';
	echo '</h4>';
}
