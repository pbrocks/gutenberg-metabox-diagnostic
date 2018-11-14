tinyMCE.init({
    theme : "advanced",
    selector : "#chat-msg"
    setup: function (editor) {
       editor.on('change', function () {
           var content = tinyMCE.activeEditor.getContent().trim();
           var tinyMceElement = tinyMCE.get(editor.editorId).getElement();
            $(tinyMceElement).html(content);
       });
});
