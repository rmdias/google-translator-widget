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
    
    // APP.Widget.Configuration.createContextMenu();
    APP.Widget.Configuration.clearContextMenu();


  },
  createContextMenu : function (title, checked, type, setState ) {

    function GoogleChromeWidgetSetState () {
      
      chrome.storage.sync.set({ 'GoogleChromeWidgetState' : setState });

      chrome.storage.sync.get('GoogleChromeWidgetState', function(key) {
        console.log(key);
       });
      APP.Widget.Configuration.clearContextMenu();
      APP.Widget.Configuration.loadConfInChrome();

      // setState
      console.log(setState);
    }
    
   
    chrome.contextMenus.create({
      "title": title,
      "checked": checked,
      "type": type,
      "contexts":["all"], 
      "onclick": GoogleChromeWidgetSetState,
    });

    console.log(chrome.contextMenus);
  },
  clearContextMenu : function() {
    chrome.contextMenus.removeAll();
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
      if (key.GoogleChromeWidgetState === undefined) {
        chrome.storage.sync.set({ 'GoogleChromeWidgetState' : 'On' });
        turnButton
          .classList
          .remove('is-off');
        turnButton
          .classList
          .add('is-on');
        componentLabel.innerText = 'On';

        // APP.Widget.Configuration.createContextMenu("On", true, "checkbox", "On");
        // APP.Widget.Configuration.createContextMenu("Off", false, "checkbox", "Off");
      }else{
        if(key.GoogleChromeWidgetState === 'On' || key.GoogleChromeWidgetState === 'on'){ 
          turnButton
            .classList
            .remove('is-off');
          turnButton
            .classList
            .add('is-on');
          componentLabel.innerText = 'On';

          // APP.Widget.Configuration.createContextMenu("On", true, "checkbox", "On");
          // APP.Widget.Configuration.createContextMenu("Off", false, "checkbox", "Off");
        }else{
          turnButton
            .classList
            .remove('is-on');
          turnButton
            .classList
            .add('is-off');
          componentLabel.innerText = 'Off';

          // APP.Widget.Configuration.createContextMenu("On", false, "checkbox", "On");
          // APP.Widget.Configuration.createContextMenu("Off", true, "checkbox", "Off");
        }
      }
    });
  },
  loadDestinationLanguage : function() {
    var select = document.querySelector('select'),
        options = document.querySelectorAll('option');

    chrome.storage.sync.get('GoogleChromeWidgetDestinationLanguage', function(key) {

      if (key.GoogleChromeWidgetDestinationLanguage === undefined) {

        var navigatorLanguage = navigator.language;
        
        chrome.storage.sync.set({ 'GoogleChromeWidgetDestinationLanguage' : navigatorLanguage.split('-')[0] });

        for (var i = 0; i < options.length; i++) {
          if (options[i].value.indexOf(navigatorLanguage.split('-')[0]) === 0){
            options[i].selected = true;
            break;
          }
        };
      }else{
        for (var i = 0; i < options.length; i++) {
          if (options[i].value.indexOf(key.GoogleChromeWidgetDestinationLanguage) === 0){
            options[i].selected = true;
            break;
          }
        };
      }

      select.addEventListener('change', function (e) {
        chrome.storage.sync.set({ 'GoogleChromeWidgetDestinationLanguage' : select.options[select.selectedIndex].value });
      }, false);
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


      chrome.storage.sync.set({ 'GoogleChromeWidgetState' : 'On' });

    }else if(turnButton.classList.contains('is-on')){
      turnButton
        .classList
        .remove('is-on');
      turnButton
        .classList
        .add('is-off');
      componentLabel.innerText = 'Off';  

      chrome.storage.sync.set({ 'GoogleChromeWidgetState' : 'Off' });
    }
  }
}