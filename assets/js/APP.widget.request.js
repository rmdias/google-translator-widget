var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.Request = {
  _tela: null,
  setUp: function() {
    var that = this;
  },
  translateRequest : function(destinationLanguage, queryWords) {
    var application = document.querySelector('.global-app');

    $.ajax({
      url: 'http://rmdias.com/google-translator/translate.php?d='+ destinationLanguage +'&q=' + queryWords,
      type: 'GET',
      dataType: 'json'
    })
    .success(function(data) {
      console.log("success", data.responseData);

      var translatedText = document.querySelector('.translated-words-box .words');
      var translatedLang = document.querySelector('.original-words-box .language');

      translatedLang.innerText = APP.Widget.setLanguageName(data.responseData.detectedSourceLanguage);
      translatedText.innerText = data.responseData.translatedText;

      application.classList.add('translating');
    })
    .fail(function() {
      console.log("We were unable to translate this word :(");
    })
    .always(function() {
      console.log("complete");
    });
  }
}