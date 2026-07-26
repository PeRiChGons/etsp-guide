(function () {
  'use strict';

  var raiz = document.documentElement;
  var intro = document.getElementById('guide-intro');
  var saltar = document.getElementById('intro-skip');
  var noVolver = document.getElementById('intro-never');

  if (!intro || !raiz.classList.contains('intro-pending')) {
    return;
  }

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
  window.setTimeout(cerrarIntro, 4700);
}());
