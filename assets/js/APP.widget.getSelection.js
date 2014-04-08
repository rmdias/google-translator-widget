var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.GetSelection = {
  _tela: null,
  setUp: function() {
    var that = this,
    htmlDocument = document.querySelector('body'),
    target;
    
    htmlDocument.addEventListener('keyup', function (event) {
      target = event.target;
      if (
          target.classList.contains('google-translator-global-app') ||
          target.classList.contains('header-google-translator-app') ||
          target.classList.contains('original-words-box-google-translator-app') ||
          target.classList.contains('language-google-translator-app') ||
          target.classList.contains('words-google-translator-app') ||
          target.classList.contains('translated-words-box-google-translator-app') ||
          target.classList.contains('language-google-translator-app') ||
          target.classList.contains('words-google-translator-app') ||
          target.classList.contains('close-google-translator-app')
      ){
        return false;
      }else{
        that.doSomethingWithSelectedText();
      }
    });

    htmlDocument.addEventListener('mouseup', function (event) {
      target = event.target;
      if (
          target.classList.contains('google-translator-global-app') ||
          target.classList.contains('header-google-translator-app') ||
          target.classList.contains('original-words-box-google-translator-app') ||
          target.classList.contains('language-google-translator-app') ||
          target.classList.contains('words-google-translator-app') ||
          target.classList.contains('translated-words-box-google-translator-app') ||
          target.classList.contains('language-google-translator-app') ||
          target.classList.contains('words-google-translator-app') ||
          target.classList.contains('close-google-translator-app')
      ){
        
        return false;
      }else{
        that.doSomethingWithSelectedText();
      }
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
    chrome.storage.sync.get('GoogleChromeWidgetState', function(obj) {
      if(obj.GoogleChromeWidgetState == 'On') {
        chrome.storage.sync.get('GoogleChromeWidgetDestinationLanguage', function(obj) { 
          var selectedText = APP.Widget.GetSelection.getSelectedText(),
              destinationLanguage = obj.GoogleChromeWidgetDestinationLanguage;
          
          if (
            selectedText
            && selectedText != " "
            && selectedText != undefined
            && selectedText != 'undefined'
            ){

            var originalText = document.querySelector('.original-words-box-google-translator-app .words-google-translator-app');
            var translatedLang = document.querySelector('.translated-words-box-google-translator-app .language-google-translator-app');

            originalText.innerText = selectedText;
            translatedLang.innerText = APP.Widget.setLanguageName(destinationLanguage);

            APP.Widget.Request.translateRequest(destinationLanguage, selectedText);
          }
        });
      }else{
        // alert('desligado')
      }
    });
  }
}