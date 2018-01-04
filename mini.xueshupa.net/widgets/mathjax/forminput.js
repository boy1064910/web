MathJax.Callback.Queue(
	MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var VERSION = "1.0";

  var TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions,
      MML = MathJax.ElementJax.mml,
      HTML = MathJax.HTML;

  TEXDEF.macros.FormInput = "FormInput";

  TEX.Parse.Augment({
    //
    //  Implements \FormInput[size][class]{name}
    //
    FormInput: function (name) {
      var size = this.GetBrackets(name),
          cls = this.GetBrackets(name),
          val = this.GetBrackets(name),
          id = this.GetArgument(name);
      if (size == null || size === "") {size = "2"}
      if (val == null) {val = ""}
      cls = ("MathJax_Input "+(cls||"")).replace(/ +$/,"");
      var input = HTML.Element("input",{type:"text", name:id, id:id, size:size, className:cls, value:val});
      input.setAttribute("xmlns","http://www.w3.org/1999/xhtml");
      var mml = MML["annotation-xml"](MML.xml(input)).With({encoding:"application/xhtml+xml",isToken:true});
      this.Push(MML.semantics(mml));
    }
  });
  
}));

MathJax.Ajax.loadComplete("/widgets/mathjax/forminput.js");