var APP = APP || {};

APP.Widget = {
  _tela: null,
  setUp: function() {
    var that = this;
    var button = document.querySelector('.open-bar-google-translator-app');
    var closeButton = document.querySelector('.close-google-translator-app');

    button.addEventListener('click', function (event) {
     that.openCloseDatailsBar();
    });
     
    closeButton.addEventListener('click', function () {
      that.exiteForApplication();
    });
  },
  openCloseDatailsBar : function(event) {
    var translationsContent = event.target.parentNode;

    if (translationsContent.classList.contains('off-bar-google-translator-app')) {
      translationsContent.classList.remove('off-bar-google-translator-app');
      translationsContent.classList.add('on-bar-google-translator-app');
    }else{
      translationsContent.classList.add('off-bar-google-translator-app');
      translationsContent.classList.remove('on-bar-google-translator-app');
    }
  },
  exiteForApplication : function() {
    var application = document.querySelector('.google-translator-global-app');
   
    application.classList.remove('translating-google-translator-app');
  },
  setLanguageName : function(language) {
    switch(language){
      case "af":
        language = "Afrikaans";
        break;
      case "sq":
        language = "Albanian";
        break;
      case "ar":
        language = "Arabic";
        break;
      case "az":
        language = "Azerbaijani";
        break;
      case "eu":
        language = "Basque";
        break;
      case "bn":
        language = "Bengali";
        break;
      case "be":
        language = "Belarusian";
        break;
      case "bg":
        language = "Bulgarian";
        break;
      case "ca":
        language = "Catalan";
        break;
      case "zh-CN":
        language = "Chinese Simplified";
        break;
      case "zh-TW":
        language = "Chinese Traditional";
        break;
      case "hr":
        language = "Croatian";
        break;
      case "cs":
        language = "Czech";
        break;
      case "da":
        language = "Danish";
        break;
      case "nl":
        language = "Dutch";
        break;
      case "en":
        language = "English";
        break;
      case "eo":
        language = "Esperanto";
        break;
      case "et":
        language = "Estonian";
        break;
      case "tl":
        language = "Filipino";
        break;
      case "fi":
        language = "Finnish";
        break;
      case "fr":
        language = "French";
        break;
      case "gl":
        language = "Galician";
        break;
      case "ka":
        language = "Georgian";
        break;
      case "de":
        language = "German";
        break;
      case "el":
        language = "Greek";
        break;
      case "gu":
        language = "Gujarati";
        break;
      case "ht":
        language = "Haitian Creole";
        break;
      case "iw":
        language = "Hebrew";
        break;
      case "hi":
        language = "Hindi";
        break;
      case "hu":
        language = "Hungarian";
        break;
      case "is":
        language = "Icelandic";
        break;
      case "id":
        language = "Indonesian";
        break;
      case "ga":
        language = "Irish";
        break;
      case "it":
        language = "Italian";
        break;
      case "js":
        language = "Japanese";
        break;      
      case "kn":
        language = "Kannada";
        break;
      case "ko":
        language = "Korean";
        break;
      case "la":
        language = "Latin";
        break;
      case "lv":
        language = "Latvian";
        break;
      case "lt":
        language = "Lithuanian";
        break;
      case "mk":
        language = "Macedonian";
        break;
      case "ms":
        language = "Malay";
        break;
      case "mt":
        language = "Maltese";
        break;
      case "no":
        language = "Norwegian";
        break;
      case "fa":
        language = "Persian";
        break;
      case "pl":
        language = "Polish";
        break;
      case "pt":
        language = "Portuguese";
        break;
      case "ro":
        language = "Romanian";
        break;
      case "ru":
        language = "Russian";
        break;
      case "sr":
        language = "Serbian";
        break;
      case "sk":
        language = "Slovak";
        break;
      case "sl":
        language = "Slovenian";
        break;
      case "es":
        language = "Spanish";
        break;
      case "sw":
        language = "Swahili";
        break;
      case "sv":
        language = "Swedish";
        break;
      case "ta":
        language = "Tamil";
        break;
      case "te":
        language = "Telugu";
        break;
      case "th":
        language = "Thai";
        break;
      case "tr":
        language = "Turkish";
        break;
      case "uk":
        language = "Ukrainian";
        break;
      case "ur":
        language = "Urdu";
        break;
      case "vi":
        language = "Vietnamese";
        break;
      case "cy":
        language = "Welsh";
        break;
      case "yi":
        language = "Yiddish";
        break;        
    }
    return language 
  }
}