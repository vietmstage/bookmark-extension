chrome.history.onVisited.addListener(function(result) {
  chrome.storage.sync.get('currentTab', function(last){
    chrome.storage.sync.set({'last': last.value}, function() {
      console.log('last saved');
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        console.log(tabs)
        if (tabs) {
          chrome.storage.sync.set({'currentTab': tabs[0].url}, function() {
            console.log('Settings saved');
          });
        }
      })
    });
  });
})
