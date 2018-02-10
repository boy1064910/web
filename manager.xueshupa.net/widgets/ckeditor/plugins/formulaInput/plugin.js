(function() {  
    CKEDITOR.plugins.add("formulaInput", {  
        init: function(editor) {  
            editor.addCommand("formulaInput", {
                exec: function( editor ) {
                    var code = Ding.randomId();
                    while(!Ding.isEmpty(answerCodeMap[code])){
                        code = Ding.randomId();
                    }
                    editor.insertHtml( '<input answer-type="normalInput" type="text" class="weui-input" size="5" code="'+code+'" />' );
                }
            });  
            editor.ui.addButton("formulaInput", {  
                label: "文本框",//调用dialog时显示的名称  
                command: "formulaInput",  
                icon: this.path + "anchor.png"//在toolbar中的图标  
            }); 
        }  
    })  
})();  