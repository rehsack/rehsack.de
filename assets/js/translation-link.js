(function () {
  var meta = document.querySelector('meta[name="translation-url"]');
  if (!meta) return;

  var url = meta.content;
  var lang = document.documentElement.lang || 'en';
  var flag, label;

  if (lang.startsWith('en')) {
    flag = '\uD83C\uDDE9\uD83C\uDDEA'; // DE flag
    label = 'Auf Deutsch lesen';
  } else {
    flag = '\uD83C\uDDEC\uD83C\uDDE7'; // GB flag
    label = 'Read in English';
  }

  var title = document.querySelector('.page__title');
  if (!title) return;

  var link = document.createElement('a');
  link.href = url;
  link.className = 'translation-link';
  link.title = label;
  link.setAttribute('aria-label', label);
  link.textContent = flag;

  title.appendChild(document.createTextNode(' '));
  title.appendChild(link);
})();
