var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.GetSelection = {
  _tela: null,
  setUp: function() {
    var that = this;
    document.addEventListener('keyup', function () {
      that.doSomethingWithSelectedText();
    });

    document.addEventListener('mouseup', function () {
      that.doSomethingWithSelectedText();
    });
  },
  getSelectedText : function() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
    }
    return text.trim();
  },
  doSomethingWithSelectedText : function() {
    var selectedText = APP.Widget.GetSelection.getSelectedText(),
        destinationLanguage = 'pt';
    
    if (selectedText && selectedText != " " && selectedText != undefined && selectedText != 'undefined') {
      var originalText = document.querySelector('.original-words-box .words');
      var translatedLang = document.querySelector('.translated-words-box .language');

      originalText.innerText = selectedText;
      translatedLang.innerText = APP.Widget.setLanguageName(destinationLanguage);

      APP.Widget.Request.translateRequest(destinationLanguage ,selectedText);
    }
  }
}