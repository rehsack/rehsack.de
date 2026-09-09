// Email obfuscation — assembles mailto links from data attributes at runtime.
// Bots see only "[JavaScript required]" in the static HTML.
//
// Required attributes:
//   data-user, data-domain — the address parts
//
// Optional attributes:
//   data-subject — pre-filled mail subject (URL-encoded)
//   data-body    — pre-filled mail body (URL-encoded; use &#10; for newlines)
//   data-text    — visible link label (default: the address itself)
(function () {
  'use strict';

  function deobfuscate() {
    var spans = document.querySelectorAll('.email-protect');
    for (var i = 0; i < spans.length; i++) {
      var el = spans[i];
      var user = el.getAttribute('data-user');
      var domain = el.getAttribute('data-domain');
      if (!user || !domain) continue;
      var addr = user + '@' + domain;
      var url = 'mailto:' + addr;
      var subject = el.getAttribute('data-subject');
      var body = el.getAttribute('data-body');
      var params = [];
      if (subject) params.push('subject=' + encodeURIComponent(subject));
      if (body) params.push('body=' + encodeURIComponent(body));
      if (params.length) url += '?' + params.join('&');
      var link = document.createElement('a');
      link.href = url;
      link.textContent = el.getAttribute('data-text') || addr;
      el.parentNode.replaceChild(link, el);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deobfuscate);
  } else {
    deobfuscate();
  }
})();
