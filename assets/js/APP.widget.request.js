var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.Request = {
  _tela: null,
  setUp: function() {
  },
  translateRequest : function(destinationLanguage, queryWords) {
    $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/language/translate/v2",
      data: { key: "AIzaSyAWPJ8UimSTLnl9rBQKDRmx0_p_BCaPi04", target: destinationLanguage, q: queryWords },
      dataType: 'json',
      success: function (data) {
        APP.Widget.Request.successRequest(data.data.translations[0]);
      },
      error: function (data) {
        APP.Widget.Request.failRequest();
      }
    });
  },
  successRequest : function(data) {
    var application = document.querySelector('.google-translator-global-app'),
        translatedText = document.querySelector('.translated-words-box-google-translator-app .words-google-translator-app'),
        translatedLang = document.querySelector('.original-words-box-google-translator-app .language-google-translator-app');

    translatedLang.innerText = APP.Widget.setLanguageName(data.detectedSourceLanguage);
    translatedText.innerText = data.translatedText;
    
    APP.Widget.setAgradableLengthOnText();

    application.classList.add('translating-google-translator-app');
  },
  failRequest : function() {
    console.log("We were unable to translate this word :(");
  }
}