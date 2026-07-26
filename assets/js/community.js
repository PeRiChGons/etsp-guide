/*
 * Perfiles comunitarios y comentarios.
 * La clave incluida es pública; las políticas RLS de Supabase protegen la escritura.
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://wgoezxhrcoffpbvetrhe.supabase.co';
  var SUPABASE_PUBLIC_KEY = 'sb_publishable_JoGiTcqS7AKUJtWqZUv1tg_Bd1ue1cc';
  var GISCUS_REPO_ID = 'R_kgDOTXNnyg';
  var GISCUS_CATEGORY_ID = 'DIC_kwDOTXNnys4DCBws';
  var client = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY) : null;

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
  }

  function currentLanguage() {
    var locale = window.I18n && window.I18n.getLocale ? window.I18n.getLocale() : 'es';
    return ['es', 'en', 'de', 'pl'].indexOf(locale) !== -1 ? locale : 'es';
  }

  function communityMarkup() {
    return '<section class="community-hall" id="comunidad">' +
      '<div class="community-heading"><div><p class="page-kicker">Comunidad</p><h2>Salón de jugadores</h2>' +
      '<p>La lectura es pública. Inicia sesión con GitHub para registrar personajes o participar.</p></div>' +
      '<a class="community-discussions-link" href="https://github.com/PeRiChGons/etsp-guide/discussions" target="_blank" rel="noopener">Abrir foro completo</a></div>' +
      '<div class="player-profile-panel" id="player-profile-panel"><p>Cargando perfil…</p></div>' +
      '<div class="giscus-shell"><div class="giscus"></div></div>' +
      '</section>';
  }

  function mountGiscus(route) {
    var container = document.querySelector('.giscus');
    if (!container) { return; }
    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'PeRiChGons/etsp-guide');
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', 'Guía: ' + route);
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', currentLanguage());
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    container.appendChild(script);
  }

  function loginMarkup() {
    return '<div class="profile-login"><div class="profile-orb">✦</div><div><h3>Tu perfil de jugador</h3>' +
      '<p>Guarda uno o varios personajes con nombre, clase, Reino, servidor e idioma.</p>' +
      '<button class="game-action" id="profile-login" type="button">Iniciar sesión con GitHub</button></div></div>';
  }

  function characterForm(user) {
    var login = (user.user_metadata && (user.user_metadata.user_name || user.user_metadata.preferred_username)) || 'GitHub';
    return '<div class="profile-dashboard"><div class="profile-user"><span class="profile-avatar">' +
      (user.user_metadata && user.user_metadata.avatar_url ? '<img src="' + escapeHtml(user.user_metadata.avatar_url) + '" alt="">' : '♙') +
      '</span><span><small>Cuenta de GitHub</small><strong>' + escapeHtml(login) +
      '</strong></span><button class="text-action" id="profile-logout" type="button">Cerrar sesión</button></div>' +
      '<form class="character-form" id="character-form"><h3>Añadir personaje</h3>' +
      '<label>Nombre del personaje<input name="character_name" maxlength="80" required></label>' +
      '<label>Clase<select name="class_key" required><option value="dragon-lancer">Dragon Lancer</option>' +
      '<option value="lunarborn">Lunarborn</option><option value="spiritfox">Spiritfox</option>' +
      '<option value="swordsage">Swordsage</option></select></label>' +
      '<label>Reino o etapa de evolución<input name="realm" maxlength="80" required placeholder="Soul, Reincarnate, Void…"></label>' +
      '<label>Servidor<input name="server_name" maxlength="80" required></label>' +
      '<label>Idioma<select name="language_code"><option value="es">Español</option><option value="en">English</option>' +
      '<option value="de">Deutsch</option><option value="pl">Polski</option></select></label>' +
      '<button class="game-action" type="submit">Guardar personaje</button><p class="form-message" id="profile-message" role="status"></p></form>' +
      '<div class="character-roster"><h3>Tus personajes</h3><div id="character-list"><p>Cargando…</p></div></div></div>';
  }

  function renderCharacters(rows) {
    var list = document.getElementById('character-list');
    if (!list) { return; }
    if (!rows || !rows.length) {
      list.innerHTML = '<p class="empty-roster">Todavía no has registrado personajes.</p>';
      return;
    }
    var classNames = {
      'dragon-lancer': 'Dragon Lancer',
      lunarborn: 'Lunarborn',
      spiritfox: 'Spiritfox',
      swordsage: 'Swordsage'
    };
    list.innerHTML = rows.map(function (row) {
      return '<article class="character-chip"><span class="character-class-mark">✦</span><div><strong>' +
        escapeHtml(row.character_name) + '</strong><small>' + escapeHtml(classNames[row.class_key] || row.class_key) +
        ' · ' + escapeHtml(row.realm) + ' · ' + escapeHtml(row.server_name) +
        '</small></div><button type="button" class="character-delete" data-character-delete="' +
        escapeHtml(row.id) + '" aria-label="Eliminar ' + escapeHtml(row.character_name) + '">×</button></article>';
    }).join('');
  }

  function setMessage(message, error) {
    var node = document.getElementById('profile-message');
    if (!node) { return; }
    node.textContent = message;
    node.classList.toggle('error', Boolean(error));
  }

  async function loadCharacters(user) {
    var result = await client.from('player_characters').select('*').eq('user_id', user.id).order('created_at');
    if (result.error) { setMessage('No se pudieron cargar los personajes.', true); return; }
    renderCharacters(result.data);
  }

  async function renderProfile() {
    var panel = document.getElementById('player-profile-panel');
    if (!panel) { return; }
    if (!client) {
      panel.innerHTML = '<p>El perfil no está disponible en este momento. Los comentarios siguen funcionando.</p>';
      return;
    }
    var sessionResult = await client.auth.getSession();
    var session = sessionResult.data && sessionResult.data.session;
    if (!session) {
      panel.innerHTML = loginMarkup();
      return;
    }
    panel.innerHTML = characterForm(session.user);
    var language = document.querySelector('#character-form [name="language_code"]');
    if (language) { language.value = currentLanguage(); }
    await loadCharacters(session.user);
  }

  async function saveCharacter(form) {
    var sessionResult = await client.auth.getSession();
    var session = sessionResult.data && sessionResult.data.session;
    if (!session) { return; }
    var data = new FormData(form);
    var login = (session.user.user_metadata && (session.user.user_metadata.user_name || session.user.user_metadata.preferred_username)) || 'github-user';
    var languageCode = String(data.get('language_code') || 'es');
    var profileResult = await client.from('player_profiles').upsert({
      user_id: session.user.id,
      github_login: login,
      language_code: languageCode,
      updated_at: new Date().toISOString()
    });
    if (profileResult.error) { setMessage('No se pudo actualizar el perfil.', true); return; }
    var characterResult = await client.from('player_characters').insert({
      user_id: session.user.id,
      character_name: String(data.get('character_name') || '').trim(),
      class_key: String(data.get('class_key') || ''),
      realm: String(data.get('realm') || '').trim(),
      server_name: String(data.get('server_name') || '').trim()
    });
    if (characterResult.error) {
      setMessage(characterResult.error.code === '23505' ? 'Ese personaje ya está registrado en el servidor.' : 'No se pudo guardar el personaje.', true);
      return;
    }
    form.reset();
    setMessage('Personaje guardado.', false);
    await loadCharacters(session.user);
  }

  async function deleteCharacter(id) {
    var result = await client.from('player_characters').delete().eq('id', id);
    if (result.error) { setMessage('No se pudo eliminar el personaje.', true); return; }
    await renderProfile();
  }

  function mountCommunity(event) {
    var main = document.getElementById('contenido');
    if (!main) { return; }
    main.insertAdjacentHTML('beforeend', communityMarkup());
    var route = event && event.detail ? event.detail.route : (location.hash.replace(/^#/, '').split('?')[0] || '/inicio');
    renderProfile();
    mountGiscus(route);
  }

  document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'profile-login' && client) {
      client.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: location.origin + location.pathname }
      });
    }
    if (event.target && event.target.id === 'profile-logout' && client) {
      client.auth.signOut().then(renderProfile);
    }
    var deleteButton = event.target.closest ? event.target.closest('[data-character-delete]') : null;
    if (deleteButton) { deleteCharacter(deleteButton.getAttribute('data-character-delete')); }
  });

  document.addEventListener('submit', function (event) {
    if (event.target && event.target.id === 'character-form') {
      event.preventDefault();
      saveCharacter(event.target);
    }
  });

  document.addEventListener('route:changed', mountCommunity);
  if (client) {
    client.auth.onAuthStateChange(function () {
      window.setTimeout(renderProfile, 0);
    });
  }
}());
