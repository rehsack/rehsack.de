(function () {
  var meta = document.querySelector('meta[name="license"]');
  if (!meta) return;

  var content = document.querySelector('.page__content');
  if (!content) return;

  var license = meta.content;
  var lang = document.documentElement.lang || 'de';
  var isDE = lang.startsWith('de');

  var ccUrls = {
    'CC BY-NC-SA 4.0': 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    'CC BY-NC-ND 4.0': 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
  };

  var year = document.querySelector('time')
    ? new Date(document.querySelector('time').getAttribute('datetime')).getFullYear()
    : new Date().getFullYear();

  var el = document.createElement('p');
  el.className = 'post-license';

  if (ccUrls[license]) {
    var link = document.createElement('a');
    link.href = ccUrls[license];
    link.rel = 'license';
    link.textContent = license;
    el.innerHTML = '\u00A9 ' + year + ' Jens Rehsack \u00B7 ';
    el.appendChild(link);
  } else {
    var notice = isDE
      ? 'Alle Rechte vorbehalten \u2014 Weiterverwendung nur mit ausdr\u00FCcklicher Genehmigung.'
      : 'All rights reserved \u2014 reuse only with express permission.';
    el.textContent = '\u00A9 ' + year + ' Jens Rehsack \u00B7 ' + notice;
  }

  content.appendChild(el);
})();
