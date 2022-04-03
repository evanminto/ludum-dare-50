Promise.all([
  import('./components/GameWindow.js'),
  import('./components/NavBar.js'),
  import('./components/AppIcon.js'),
  import('./components/NotificationBubble.js'),
  import('./components/WinScreen.js'),
  import('./components/ShutdownScreen.js'),
  import('./components/TwitterApp.js'),
  import('./components/MapApp.js'),
  import('./components/MessagesApp.js'),
  import('./components/EmailApp.js'),
  import('./components/BrowserApp.js'),
])
  .then(results => results.map(result => result.default))
  .then(components =>
    components.forEach(component =>
      customElements.define(component.tagName, component)
    )
  );
