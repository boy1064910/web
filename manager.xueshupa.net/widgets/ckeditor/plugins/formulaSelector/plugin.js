(function() {  
    CKEDITOR.plugins.add("formulaSelector", {    
        init: function(editor) {  
            editor.addCommand("formulaSelector", {
                exec: function( editor ) {
                    var code = Ding.randomId();
                    while(!Ding.isEmpty(answerCodeMap[code])){
                        code = Ding.randomId();
                    }
                    editor.insertHtml( '<span answer-type="formulaSelector" code="'+code+'">\\FormulaSelector[knowledgePointContentId]{code}</span>' );
                }
            });  
            editor.ui.addButton("formulaSelector", {  
                label: "公式文本框",//调用dialog时显示的名称  
                command: "formulaSelector",  
                icon: this.path + "anchor.png"//在toolbar中的图标  
            }); 
        }  
    })  
})();  