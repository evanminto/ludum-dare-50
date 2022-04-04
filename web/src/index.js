Promise.all([
  import('./components/GameWindow.js'),
  import('./components/NavBar.js'),
  import('./components/AppIcon.js'),
  import('./components/NotificationBubble.js'),
  import('./components/WinScreen.js'),
  import('./components/ShutdownScreen.js'),
  import('./components/BasicButton.js'),
  import('./components/IconButton.js'),
  import('./components/AudioPlayer.js'),
  import('./components/TwitterApp.js'),
  import('./components/TiktokApp.js'),
  import('./components/MapApp.js'),
  import('./components/MessagesApp.js'),
  import('./components/EmailApp.js'),
  import('./components/BrowserApp.js'),
  import('./components/InstagramApp.js'),
  import('./components/WordleApp.js'),
  import('./components/PhoneApp.js'),
  import('./components/ToDoApp.js'),
])
  .then(results => results.map(result => result.default))
  .then(components =>
    components.forEach(component =>
      customElements.define(component.tagName, component)
    )
  );
