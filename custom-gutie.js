// document.addEventListener( 'DOMContentLoaded', () => {
//     wp.editor.initialize( 'memberlite_banner_bottom', {
//         'textarea_name': 'memberlite_banner_bottom',
//         'tinymce': {
//             'init_instance_callback': ( editor ) => {
//                 editor.on( 'change', function() {
//                     const editor = tinymce.get( this.id );
//                     document.getElementById( 'memberlite_banner_bottom' ).value = editor.getContent();
//                 } );
//             },
//         },
//     } );
// } );
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