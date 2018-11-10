# Gutenberg MetaBox Diagnostic

Exploration of how to save metabox info with Gutenberg active. Seems that most issues have been covered excepty WYSIWG editor.
------
The Issue
======

[gutenberg/issues/7176](https://github.com/WordPress/gutenberg/issues/7176)
------
Daniel Bachhuber
------

[danielbachhuber commented on Aug 10](https://github.com/WordPress/gutenberg/issues/7176#issuecomment-412134455)

> I put together a code snippet:
>
```
add_action( 'add_meta_boxes', function(){
	add_meta_box( 'test_tinymce', 'Test TinyMCE', function( $post ){
		 $field_value = get_post_meta( $post->ID, 'test_tinymce', true );
		 wp_editor( $field_value, 'test_tinymce_id', array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => 'test_tinymce',
			'textarea_rows' => 10,
			'teeny'         => true
		) );
	}, null, 'advanced', 'high' );
});
add_action( 'save_post', function( $post_id ){
	if ( ! isset( $_POST['test_tinymce'] ) ) {
		return;
	}
	update_post_meta( $post_id, 'test_tinymce', $_POST['test_tinymce'] );
});
```

======
Kris Gale

[krisgale commented on Aug 8](https://github.com/WordPress/gutenberg/issues/7176#issuecomment-411482402)

> workaround:
> 

```
document.addEventListener( 'DOMContentLoaded', () => {
  wp.editor.initialize( 'field_name', {
    'textarea_name': 'field_name',
    'tinymce': {
      'init_instance_callback': ( editor ) => {
        editor.on( 'change', function() {
          const editor = tinymce.get( this.id );
          document.getElementById( 'field_name' ).value = editor.getContent();
        } );
      },
    },
  } );
} );
```
> where field_name is the id= and name= of the textarea being 'enhanced.'

Davis Shaver
------
[davisshaver commented on Apr 19](https://github.com/WordPress/gutenberg/pull/3840#issuecomment-382856965)

> so we need to update TinyMCE field before we send the action. We can do this with:
```js
if ( window.tinyMCE ) {
    window.tinyMCE.triggerSave();
}
```
I am looking for an appropriate spot to place this

Riad Benguella
------
[youknowriad commented on Mar 28](https://github.com/WordPress/gutenberg/issues/5718#issuecomment-376923025)

> We made a decision about not refreshing the meta boxes on save, because this was creating way too many issues as it goes against Single Page Application aspect of Gutenberg.
>
> For example, if you refresh the meta-boxes using Ajax all javascript events registered on document.load won’t trigger, so you end up with broken metaboxes.
>
> An alternative if you want to trigger some side effects when the meta boxes save is to do:
```js
var editPost = wp.data.select( 'core/edit-post' ),
    lastIsSaving = false;

wp.data.subscribe( function() {
    var isSaving = editPost.isSavingMetaBoxes();
    if ( isSaving !== lastIsSaving && !isSaving ) {
       lastIsSaving = isSaving;
        // Assume saving has finished
    }

    lastIsSaving = isSaving;
} );
```