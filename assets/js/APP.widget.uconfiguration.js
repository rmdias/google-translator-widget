var APP = APP || {};
    APP.Widget = APP.Widget || {};

APP.Widget.Configuration = {
  _tela: null,
  setUp: function() {
    var turnButton = document.querySelector('.switch-component');

    console.log(chrome.storage);

    APP.Widget.Configuration.loadConfInChrome();

    turnButton.addEventListener('click', function (e) {
      APP.Widget.Configuration.turnStateForAutoTranslate();
    });
  },
  loadConfInChrome : function(){
    var that = this,
        turnButton = document.querySelector('.switch-component'),
        componentLabel = document.querySelector('.switch-component .component-label');

    that.loadCurrentState(turnButton, componentLabel);
    that.loadDestinationLanguage();
  },
  loadCurrentState : function(turnButton, componentLabel) {
    chrome.storage.sync.get('GoogleChromeWidgetState', function(key) {
      console.log(key);
      if (key.GoogleChromeWidgetState === undefined) {
        APP.Widget.Configuration.saveInChromeStorage('GoogleChromeWidgetState','On');
        turnButton
          .classList
          .remove('is-off');
        turnButton
          .classList
          .add('is-on');
        componentLabel.innerText = 'On';
        console.log('não tinha e salvou');
      }else{
        if(key.GoogleChromeWidgetState === 'On' || key.GoogleChromeWidgetState === 'on'){ 
          turnButton
            .classList
            .remove('is-off');
          turnButton
            .classList
            .add('is-on');
          componentLabel.innerText = 'On';

        console.log('tinha e estava ligado');

        }else{
          turnButton
            .classList
            .remove('is-on');
          turnButton
            .classList
            .add('is-off');
          componentLabel.innerText = 'Off';  
        
          console.log('tinha e estava desligado');
        }
      }
    });
  },
  loadDestinationLanguage : function() {
    var select = document.querySelector('select'),
        options = document.querySelectorAll('option');

    chrome.storage.sync.get('GoogleChromeWidgetDestinationLanguage', function(key) {

      console.log(key.GoogleChromeWidgetDestinationLanguage);

      if (key.GoogleChromeWidgetDestinationLanguage === undefined) {

        alert('You need choose some language!');

        for (var i = 0; i < options.length; i++) {
          if (options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage) === 0){
            options[i].selected = true;
            break;
          }
        };
      }else{
        for (var i = 0; i < options.length; i++) {
          console.log(options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage));
          if (options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage) === 0){
            options[i].selected = true;

            console.log(this);
            break;
          }
        };
      }

      select.addEventListener('change', function (e) {
        APP.Widget.Configuration.saveInChromeStorage('GoogleChromeWidgetDestinationLanguage', select.options[select.selectedIndex].value);
        console.log(select.options[select.selectedIndex].value);
      }, false);
    });
  },
  saveInChromeStorage : function(keyName,state) {
    chrome.storage.sync.set({ keyName : state }, function() {
      console.log('saved key - ', keyName, ' in:', state, ' State');
    });
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

      APP.Widget.Configuration.saveInChromeStorage('GoogleChromeWidgetState','On');
    }else if(turnButton.classList.contains('is-on')){
      turnButton
        .classList
        .remove('is-on');
      turnButton
        .classList
        .add('is-off');
      componentLabel.innerText = 'Off';  
      APP.Widget.Configuration.saveInChromeStorage('GoogleChromeWidgetState','Off');
    }
  }
}