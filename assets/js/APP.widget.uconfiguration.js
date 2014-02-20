var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.Configuration = {
  _tela: null,
  setUp: function() {
    var turnButton = document.querySelector('.switch-component');

    APP.Widget.Configuration.loadConfInChrome();

    turnButton.addEventListener('click', function (e) {
      APP.Widget.Configuration.turnStateForAutoTranslate();
    });
  },
  saveConfInChrome : function(state) {
    chrome.storage.sync.set({'Google-Chome-Widget-State': state}, function() {
      message('Settings saved');
    });
  },
  loadConfInChrome : function(){
    if (chrome.storage.get('Google-Chome-Widget-State')){
      APP.Widget.Configuration.saveConfInChrome(chrome.storage.get('Google-Chome-Widget-State'));

      if(chrome.storage.get('Google-Chome-Widget-State') === 'On'){
        turnButton
          .classList
          .remove('is-off');
        turnButton
          .classList
          .add('is-on');
        componentLabel.innerText = 'On';
      }else{
        turnButton
          .classList
          .remove('is-on');
        turnButton
          .classList
          .add('is-off');
        componentLabel.innerText = 'Off';  
      }
    }else{
      turnButton
          .classList
          .remove('is-off');
        turnButton
          .classList
          .add('is-on');
        componentLabel.innerText = 'On';

      APP.Widget.Configuration.saveConfInChrome('on');
    }
  },
  turnStateForAutoTranslate : function() {
    var turnButton = document.querySelector('.switch-component'),
        componentLabel = document.querySelector('.switch-component .component-label');

    if (turnButton.classList.contains('is-off')) {
      turnButton
        .classList
        .remove('is-off');
      turnButton
        .classList
        .add('is-on');
      componentLabel.innerText = 'On';

      APP.Widget.Configuration.saveConfInChrome('On');
    }else if(turnButton.classList.contains('is-on')){
      turnButton
        .classList
        .remove('is-on');
      turnButton
        .classList
        .add('is-off');
      componentLabel.innerText = 'Off';  
      APP.Widget.Configuration.saveConfInChrome('Off');
    }
  }
}