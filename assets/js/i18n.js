/* Gestiona los idiomas locales sin depender de un servicio externo. */
(function () {
  'use strict';

  var locale = window.localStorage.getItem('etsp-language') || 'es';
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
    if (selector) { selector.value = locale === 'es' ? '' : locale; }
  }

  function refreshPage() {
    applyStaticTranslations();
    if (window.GuideRouter && window.GuideRouter.render) {
      window.GuideRouter.render();
    }
  }

  function loadLanguage(nextLocale) {
    if (nextLocale === 'es') {
      locale = 'es';
      dictionary = {};
      window.localStorage.setItem('etsp-language', locale);
      refreshPage();
      return Promise.resolve();
    }
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
        refreshPage();
      });
  }

  window.I18n = {
    getLocale: function () { return locale; },
    t: translate,
    setLanguage: loadLanguage,
    apply: applyStaticTranslations
  };

  document.addEventListener('DOMContentLoaded', function () {
    var selector = document.getElementById('language-selector');
    if (selector) {
      selector.addEventListener('change', function () {
        if (this.value) { loadLanguage(this.value); }
      });
    }
    if (locale !== 'es') { loadLanguage(locale); }
  });
}());
