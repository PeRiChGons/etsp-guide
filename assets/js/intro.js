(function () {
  'use strict';

  var raiz = document.documentElement;
  var intro = document.getElementById('guide-intro');
  var saltar = document.getElementById('intro-skip');
  var noVolver = document.getElementById('intro-never');
  var etiquetaNoVolver = document.getElementById('intro-never-label');

  if (!intro || !raiz.classList.contains('intro-pending')) {
    return;
  }

  var idioma = (navigator.language || 'es').slice(0, 2).toLowerCase();
  var textos = {
    es: { siguiente: 'Siguiente', noVolver: 'No volver a mostrar' },
    en: { siguiente: 'Next', noVolver: "Don't show again" },
    de: { siguiente: 'Weiter', noVolver: 'Nicht mehr anzeigen' },
    pl: { siguiente: 'Dalej', noVolver: 'Nie pokazuj ponownie' }
  };
  var traduccion = textos[idioma] || textos.en;
  saltar.textContent = traduccion.siguiente;
  etiquetaNoVolver.textContent = traduccion.noVolver;

  function cerrarIntro() {
    if (!raiz.classList.contains('intro-pending')) {
      return;
    }

    intro.classList.add('intro-finished');
    try {
      sessionStorage.setItem('etsp-intro-v1', 'vista');
      if (noVolver && noVolver.checked) {
        localStorage.setItem('etsp-intro-disabled', 'true');
      }
    } catch (error) {}

    window.setTimeout(function () {
      raiz.classList.remove('intro-pending');
      intro.setAttribute('aria-hidden', 'true');
    }, 460);
  }

  saltar.addEventListener('click', cerrarIntro);
  noVolver.addEventListener('change', function () {
    if (noVolver.checked) {
      cerrarIntro();
    }
  });
  window.setTimeout(cerrarIntro, 5500);
}());
