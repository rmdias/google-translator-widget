var APP = APP || {};

APP.Widget = {
  _tela: null,
  setUp: function() {
    var that = this;
    var button = document.querySelector('.open-bar');
    var closeButton = document.querySelector('.close-application');

    button.addEventListener('click', function (event) {
     that.openCloseDatailsBar();
    });
     
    closeButton.addEventListener('click', function () {
      that.exiteForApplication();
    });
  },
  openCloseDatailsBar : function(event) {
    var translationsContent = event.target.parentNode;

    if (translationsContent.classList.contains('off-bar')) {
      translationsContent.classList.remove('off-bar');
      translationsContent.classList.add('on-bar');
    }else{
      translationsContent.classList.add('off-bar');
      translationsContent.classList.remove('on-bar');
    }
  },
  exiteForApplication : function() {
    var application = document.querySelector('.global');
   
    application.classList.remove('translating');
  }
}