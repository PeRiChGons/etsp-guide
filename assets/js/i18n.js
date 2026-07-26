/* Gestiona ES/EN/DE/PL desde JSON y deriva los demás a Google Translate. */
(function () {
  'use strict';

  var locale = window.localStorage.getItem('etsp-language') || 'es';
  var localLanguages = ['es', 'en', 'de', 'pl'];
  var dictionary = {};

  function readPath(source, path) {
    return path.split('.').reduce(function (value, key) {
      return value && Object.prototype.hasOwnProperty.call(value, key) ? value[key] : null;
    }, source);
  }

  function translate(key, fallback) {
    return readPath(dictionary, key) || fallback || key;
  }

  function applyStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      element.textContent = translate(key, element.textContent);
    });
    var selector = document.getElementById('language-selector');
    if (selector) { selector.value = locale; }
  }

  function refreshPage() {
    document.documentElement.lang = locale;
    applyStaticTranslations();
    if (window.GuideRouter && window.GuideRouter.render) {
      window.GuideRouter.render();
    }
    document.dispatchEvent(new CustomEvent('language:changed', { detail: { locale: locale } }));
  }

  function loadLanguage(nextLocale) {
    if (nextLocale.indexOf('google:') === 0) {
      openGoogleTranslate(nextLocale.slice(7));
      return Promise.resolve();
    }
    if (localLanguages.indexOf(nextLocale) === -1) { return Promise.resolve(); }
    return fetch('assets/lang/' + encodeURIComponent(nextLocale) + '.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) { throw new Error('Idioma no disponible'); }
        return response.json();
      })
      .then(function (data) {
        locale = nextLocale;
        dictionary = data;
        window.localStorage.setItem('etsp-language', locale);
        refreshPage();
      })
      .catch(function () {
        locale = 'es';
        dictionary = {};
        window.localStorage.setItem('etsp-language', locale);
        refreshPage();
      });
  }

  function openGoogleTranslate(language) {
    var target = language === 'more' ? 'en' : language;
    var localPreview = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    var publicPage = 'https://perichgons.github.io/etsp-guide/' + window.location.hash;
    var currentPage = localPreview ? publicPage : window.location.href;
    var translateUrl = 'https://translate.google.com/translate?sl=' +
      encodeURIComponent(locale || 'es') + '&tl=' + encodeURIComponent(target) +
      '&u=' + encodeURIComponent(currentPage);
    window.open(translateUrl, '_blank', 'noopener,noreferrer');
    var selector = document.getElementById('language-selector');
    if (selector) { selector.value = locale; }
  }

  window.I18n = {
    getLocale: function () { return locale; },
    t: translate,
    setLanguage: loadLanguage,
    apply: applyStaticTranslations,
    isLocal: function (language) { return localLanguages.indexOf(language) !== -1; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var selector = document.getElementById('language-selector');
    if (selector) {
      selector.addEventListener('change', function () {
        if (this.value) { loadLanguage(this.value); }
      });
    }
    loadLanguage(locale);
  });
}());
