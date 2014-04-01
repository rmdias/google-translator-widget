var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.GetSelection = {
  _tela: null,
  setUp: function() {
    var that = this,
    htmlDocument = document.querySelector('body');
    
    htmlDocument.addEventListener('keyup', function (event) {

      if (
          $(event.target).hasClass('google-translator-global-app translating-google-translator-app') ||
          $(event.target).hasClass('header-google-translator-app') ||
          $(event.target).hasClass('original-words-box-google-translator-app') ||
          $(event.target).hasClass('language-google-translator-app') ||
          $(event.target).hasClass('words-google-translator-app') ||
          $(event.target).hasClass('translated-words-box-google-translator-app') ||
          $(event.target).hasClass('language-google-translator-app') ||
          $(event.target).hasClass('words-google-translator-app') ||
          $(event.target).hasClass('close-google-translator-app')
      ){
        console.log('não vai!');
        return false;
      }else{
        that.doSomethingWithSelectedText();
      }
    });

    htmlDocument.addEventListener('mouseup', function (event) {

      if (
          $(event.target).hasClass('google-translator-global-app translating-google-translator-app') ||
          $(event.target).hasClass('header-google-translator-app') ||
          $(event.target).hasClass('original-words-box-google-translator-app') ||
          $(event.target).hasClass('language-google-translator-app') ||
          $(event.target).hasClass('words-google-translator-app') ||
          $(event.target).hasClass('translated-words-box-google-translator-app') ||
          $(event.target).hasClass('language-google-translator-app') ||
          $(event.target).hasClass('words-google-translator-app') ||
          $(event.target).hasClass('close-google-translator-app')
      ){
        console.log('não vai!');
        
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
// 201438256023