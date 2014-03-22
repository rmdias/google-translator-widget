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
      if (key.GoogleChromeWidgetState === "undefined") {
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
        if(key.GoogleChromeWidgetState === 'On'){
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

      if(select.options[select.selectedIndex].value === 'none'){
        
        alert('You need choose some language!');



      }else{
        if (key.GoogleChromeWidgetDestinationLanguage === "undefined") {
          APP.Widget.Configuration.saveInChromeStorage('GoogleChromeWidgetDestinationLanguage', select.options[select.selectedIndex].value);

          for (var i = 0; i < options.length; i++) {
            if (options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage))
              this.selected = true;
          };
        }else{
          for (var i = 0; i < options.length; i++) {
            if (options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage))
            console.log(options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage));
              this.selected = true;
          };
        }
      }
    });
  },
  saveInChromeStorage : function(keyName,state) {
    chrome.storage.sync.set({ keyName : state }, function() {
      console.log('Settings saved');
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