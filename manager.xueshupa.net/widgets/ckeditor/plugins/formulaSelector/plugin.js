(function() {  
    CKEDITOR.plugins.add("formulaSelector", {  
        requires: ["dialog"],  
        init: function(a) {  
            a.addCommand("formulaSelector", new CKEDITOR.dialogCommand("formulaSelector"));  
            a.ui.addButton("formulaSelector", {  
                label: "formulaSelector",//调用dialog时显示的名称  
                command: "formulaSelector",  
                icon: this.path + "anchor.png"//在toolbar中的图标  
   
            });  
            CKEDITOR.dialog.add("formulaSelector", this.path + "formulaSelector.js")  
        }  
    })  
})();  