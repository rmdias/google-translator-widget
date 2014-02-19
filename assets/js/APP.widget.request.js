var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.Request = {
  _tela: null,
  setUp: function() {
  },
  translateRequest : function(destinationLanguage, queryWords) {

    $.ajax({
      url: 'http://rmdias.com/google-translator/translate.php?d='+ destinationLanguage +'&q=' + queryWords,
      type: 'GET',
      dataType: 'json'
    })
    .success(function(data) {
      APP.Widget.Request.successRequest(data);
    })
    .fail(function() {
      APP.Widget.Request.failRequest(data);
    })
    .always(function() {
      APP.Widget.Request.afterRequest(data);
    });
  },
  successRequest : function(data) {
    var application = document.querySelector('.global-app'),
        translatedText = document.querySelector('.translated-words-box .words'),
        translatedLang = document.querySelector('.original-words-box .language');
        
    console.log("success", data.responseData);

    translatedLang.innerText = APP.Widget.setLanguageName(data.responseData.detectedSourceLanguage);
    translatedText.innerText = data.responseData.translatedText;

    application.classList.add('translating');
  },
  failRequest : function(data) {
    console.log("We were unable to translate this word :(");
  },
  afterRequest : function(data) {
    console.log("complete");
  }
}