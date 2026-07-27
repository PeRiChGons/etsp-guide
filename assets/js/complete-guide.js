/* Capa editorial traducible: añade contexto útil sin sustituir catálogos, chat ni herramientas. */
(function () {
  'use strict';

  var renderAnterior = window.renderGuidePage;

  function routeActual() {
    return window.location.hash.replace(/^#/, '').split('?')[0].replace(/\/$/, '') || '/inicio';
  }

  function claveDeRuta(route) {
    if (route === '/inicio') { return 'home'; }
    if (route === '/guia-general') { return 'general'; }
    if (route === '/sistemas-del-personaje') { return 'systems'; }
    if (route === '/sistemas-del-personaje/stats') { return 'stats'; }
    if (route === '/sistemas-del-personaje/skill') { return 'skill'; }
    if (route === '/sistemas-del-personaje/spirit-root') { return 'spirit-root'; }
    if (route === '/sistemas-del-personaje/technique') { return 'technique'; }
    if (route === '/sistemas-del-personaje/swordflight') { return 'swordflight'; }
    if (route === '/sistemas-del-personaje/zodiac') { return 'zodiac'; }
    if (route === '/sistemas-del-personaje/spirit') { return 'spirit'; }
    if (route === '/sistemas-del-personaje/wisp') { return 'wisp'; }
    if (route === '/equipamiento-y-mejoras' || /^\/equipamiento-y-mejoras\//.test(route)) { return 'equipment'; }
    if (route === '/objetos' || route === '/objetos/outfits') { return 'objects'; }
    if (route === '/actividades-y-mazmorras') { return 'activities'; }
    if (route === '/clases') { return 'classes'; }
    if (/^\/clases\//.test(route)) { return 'class'; }
    if (route === '/comunidad') { return 'community'; }
    if (route === '/proyecto') { return 'project'; }
    return null;
  }

  function escapar(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function bloqueEditorial(data, page, route) {
    if (!data) { return ''; }
    var titulo = data.title;
    if (/^\/clases\//.test(route) && page && page.title) {
      titulo = page.title + ' · ' + data.title;
    }
    var cards = (data.sections || []).map(function (section) {
      return '<article class="guide-overview-card"><h2>' + escapar(section[0]) + '</h2><p>' +
        escapar(section[1]) + '</p></article>';
    }).join('');

    var notas = {
      es: 'Fuentes: cliente extraído, relaciones semánticas conservadas y observaciones documentadas. Los datos exactos no disponibles se muestran como ?.',
      en: 'Sources: extracted client, preserved semantic relationships and documented observations. Unavailable exact data is shown as ?.',
      de: 'Quellen: extrahierter Client, erhaltene semantische Beziehungen und dokumentierte Beobachtungen. Nicht verfügbare exakte Daten erscheinen als ?.',
      pl: 'Źródła: wyodrębniony klient, zachowane relacje semantyczne i udokumentowane obserwacje. Niedostępne dokładne dane są oznaczone ?.'
    };
    var locale = window.I18n && window.I18n.getLocale ? window.I18n.getLocale() : 'es';

    return '<section class="guide-complete-overview" aria-labelledby="guide-overview-title">' +
      '<p class="page-kicker">Eternal Sword Pact</p>' +
      '<h1 id="guide-overview-title">' + escapar(titulo) + '</h1>' +
      '<p class="lead">' + escapar(data.lead) + '</p>' +
      '<div class="guide-overview-grid">' + cards + '</div>' +
      '<p class="guide-source-note">' + escapar(notas[locale] || notas.en) + '</p>' +
      '</section>';
  }

  window.renderGuidePage = function (page) {
    var route = routeActual();
    var key = claveDeRuta(route);
    var data = window.I18n && window.I18n.getGuidePage ? window.I18n.getGuidePage(key) : null;
    var contenidoExistente = renderAnterior ? renderAnterior(page) : '';
    return bloqueEditorial(data, page, route) + contenidoExistente;
  };

  var uiTranslations = {
    en: {
      'Buscar por nombre, sinónimo, categoría o procedencia': 'Search by name, synonym, category or source',
      'Categoría': 'Category', 'Todas': 'All', 'No hay objetos que coincidan.': 'No matching items.',
      'Qué muestra cada ficha': 'What each card shows', 'Nombre': 'Name', 'Descripción': 'Description',
      'Obtención': 'Acquisition', 'Imagen': 'Image', 'Fuentes y notas': 'Sources and notes',
      'Comunidad': 'Community', 'Chat en directo': 'Live chat',
      'Conversación de este apartado': 'Conversation for this section',
      'Elegir conversación': 'Choose conversation', 'Actualizar': 'Refresh',
      'Cargando perfil…': 'Loading profile…', 'Cargando mensajes…': 'Loading messages…',
      'Escribir como': 'Write as', 'Cuenta': 'Account',
      'Inicia sesión para participar.': 'Sign in to participate.', 'Enviar': 'Send',
      'Tu perfil de jugador': 'Your player profile', 'Correo electrónico': 'Email address',
      'Recibir enlace de acceso': 'Receive sign-in link', 'Añadir personaje': 'Add character',
      'Guardar personaje': 'Save character', 'Tus personajes': 'Your characters',
      'Cerrar sesión': 'Sign out', 'Cargando…': 'Loading…',
      'Datos pendientes': 'Missing data', 'Funcionamiento general': 'How it works',
      'Materiales': 'Materials', 'Mejoras': 'Upgrades', 'Vista general': 'Overview',
      'Campo': 'Field', 'Nombre publicado': 'Published name',
      'Descripción del cliente': 'Client description', 'Fórmula': 'Formula',
      'Efecto exacto': 'Exact effect', 'Monstruos registrados': 'Registered monsters'
    },
    de: {
      'Buscar por nombre, sinónimo, categoría o procedencia': 'Nach Name, Synonym, Kategorie oder Quelle suchen',
      'Categoría': 'Kategorie', 'Todas': 'Alle', 'No hay objetos que coincidan.': 'Keine passenden Gegenstände.',
      'Qué muestra cada ficha': 'Inhalt jeder Karte', 'Nombre': 'Name', 'Descripción': 'Beschreibung',
      'Obtención': 'Beschaffung', 'Imagen': 'Bild', 'Fuentes y notas': 'Quellen und Hinweise',
      'Comunidad': 'Community', 'Chat en directo': 'Live-Chat',
      'Conversación de este apartado': 'Gespräch für diesen Bereich',
      'Elegir conversación': 'Gespräch wählen', 'Actualizar': 'Aktualisieren',
      'Cargando perfil…': 'Profil wird geladen…', 'Cargando mensajes…': 'Nachrichten werden geladen…',
      'Escribir como': 'Schreiben als', 'Cuenta': 'Konto',
      'Inicia sesión para participar.': 'Zum Teilnehmen anmelden.', 'Enviar': 'Senden',
      'Tu perfil de jugador': 'Dein Spielerprofil', 'Correo electrónico': 'E-Mail-Adresse',
      'Recibir enlace de acceso': 'Anmeldelink erhalten', 'Añadir personaje': 'Charakter hinzufügen',
      'Guardar personaje': 'Charakter speichern', 'Tus personajes': 'Deine Charaktere',
      'Cerrar sesión': 'Abmelden', 'Cargando…': 'Wird geladen…',
      'Datos pendientes': 'Fehlende Daten', 'Funcionamiento general': 'Funktionsweise',
      'Materiales': 'Materialien', 'Mejoras': 'Verbesserungen', 'Vista general': 'Übersicht',
      'Campo': 'Feld', 'Nombre publicado': 'Veröffentlichter Name',
      'Descripción del cliente': 'Client-Beschreibung', 'Fórmula': 'Formel',
      'Efecto exacto': 'Exakter Effekt', 'Monstruos registrados': 'Registrierte Monster'
    },
    pl: {
      'Buscar por nombre, sinónimo, categoría o procedencia': 'Szukaj według nazwy, synonimu, kategorii lub źródła',
      'Categoría': 'Kategoria', 'Todas': 'Wszystkie', 'No hay objetos que coincidan.': 'Brak pasujących przedmiotów.',
      'Qué muestra cada ficha': 'Co zawiera każda karta', 'Nombre': 'Nazwa', 'Descripción': 'Opis',
      'Obtención': 'Zdobywanie', 'Imagen': 'Obraz', 'Fuentes y notas': 'Źródła i uwagi',
      'Comunidad': 'Społeczność', 'Chat en directo': 'Czat na żywo',
      'Conversación de este apartado': 'Rozmowa dla tej sekcji',
      'Elegir conversación': 'Wybierz rozmowę', 'Actualizar': 'Odśwież',
      'Cargando perfil…': 'Ładowanie profilu…', 'Cargando mensajes…': 'Ładowanie wiadomości…',
      'Escribir como': 'Pisz jako', 'Cuenta': 'Konto',
      'Inicia sesión para participar.': 'Zaloguj się, aby uczestniczyć.', 'Enviar': 'Wyślij',
      'Tu perfil de jugador': 'Twój profil gracza', 'Correo electrónico': 'Adres e-mail',
      'Recibir enlace de acceso': 'Odbierz link logowania', 'Añadir personaje': 'Dodaj postać',
      'Guardar personaje': 'Zapisz postać', 'Tus personajes': 'Twoje postacie',
      'Cerrar sesión': 'Wyloguj', 'Cargando…': 'Ładowanie…',
      'Datos pendientes': 'Brakujące dane', 'Funcionamiento general': 'Działanie',
      'Materiales': 'Materiały', 'Mejoras': 'Ulepszenia', 'Vista general': 'Przegląd',
      'Campo': 'Pole', 'Nombre publicado': 'Opublikowana nazwa',
      'Descripción del cliente': 'Opis klienta', 'Fórmula': 'Wzór',
      'Efecto exacto': 'Dokładny efekt', 'Monstruos registrados': 'Zarejestrowane potwory'
    }
  };

  function traducirHerramientas() {
    var locale = window.I18n && window.I18n.getLocale ? window.I18n.getLocale() : 'es';
    var translations = uiTranslations[locale];
    var root = document.getElementById('contenido');
    if (!translations || !root) { return; }

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var original = node.nodeValue.trim();
      if (translations[original]) {
        node.nodeValue = node.nodeValue.replace(original, translations[original]);
      }
    }
  }

  document.addEventListener('route:changed', function () {
    window.setTimeout(traducirHerramientas, 120);
  });
  document.addEventListener('language:changed', function () {
    window.setTimeout(traducirHerramientas, 120);
  });
}());
