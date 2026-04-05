// Email obfuscation — assembles mailto links from data attributes at runtime.
// Bots see only "[JavaScript required]" in the static HTML.
(function () {
  'use strict';

  function deobfuscate() {
    var spans = document.querySelectorAll('.email-protect');
    for (var i = 0; i < spans.length; i++) {
      var el = spans[i];
      var user = el.getAttribute('data-user');
      var domain = el.getAttribute('data-domain');
      if (user && domain) {
        var addr = user + '@' + domain;
        var link = document.createElement('a');
        link.href = 'mailto:' + addr;
        link.textContent = addr;
        el.parentNode.replaceChild(link, el);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deobfuscate);
  } else {
    deobfuscate();
  }
})();
