/*
 * Comunidad propia de Eternal Sword Pact.
 * Supabase gestiona cuentas, perfiles, personajes y chat en tiempo real.
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://wgoezxhrcoffpbvetrhe.supabase.co';
  var SUPABASE_PUBLIC_KEY = 'sb_publishable_JoGiTcqS7AKUJtWqZUv1tg_Bd1ue1cc';
  var client = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY) : null;
  var activeChannel = null;
  var realtimeSubscription = null;
  var session = null;
  var emotes = [];

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
      '<div class="community-heading"><div><p class="page-kicker">Comunidad</p>' +
      '<h2>Salón de jugadores</h2><p>Lee el chat libremente. Regístrate para escribir y guardar tus personajes.</p></div>' +
      '<span class="community-live"><i></i> Chat en directo</span></div>' +
      '<div class="player-profile-panel" id="player-profile-panel"><p>Cargando perfil…</p></div>' +
      '<section class="game-chat" aria-label="Chat de Eternal Sword Pact">' +
      '<div class="chat-room"><header class="chat-room-title"><div><small>Conversación de este apartado</small><strong id="chat-channel-title">General</strong></div>' +
      '<button class="text-action" id="chat-refresh" type="button">Actualizar</button></header>' +
      '<div class="chat-messages" id="chat-messages" role="log" aria-live="polite"><p>Cargando mensajes…</p></div>' +
      '<form class="chat-composer" id="chat-form"><div class="chat-character-row">' +
      '<label>Escribir como <select id="chat-character" name="character_id"><option value="">Cuenta</option></select></label>' +
      '<span id="chat-login-hint">Inicia sesión para participar.</span></div>' +
      '<div class="chat-emote-picker" id="chat-emotes" hidden></div>' +
      '<div class="chat-compose-row"><button class="chat-emote-toggle" id="chat-emote-toggle" type="button" aria-label="Abrir emoticonos del juego">☺</button>' +
      '<textarea name="content" maxlength="1000" rows="2" placeholder="Escribe un mensaje…" disabled></textarea>' +
      '<button class="game-action" type="submit" disabled>Enviar</button></div>' +
      '<p class="form-message" id="chat-message" role="status"></p></form></div></section></section>';
  }

  function loginMarkup() {
    return '<div class="profile-login"><div class="profile-orb">✦</div><div><h3>Tu perfil de jugador</h3>' +
      '<p>Accede mediante un enlace seguro enviado a tu correo, sin contraseñas.</p>' +
      '<form class="email-login-form" id="email-login-form"><label>Correo electrónico' +
      '<input type="email" name="email" autocomplete="email" required placeholder="tu@correo.com"></label>' +
      '<button class="game-action" type="submit">Recibir enlace de acceso</button>' +
      '<p class="form-message" id="login-message" role="status"></p></form></div></div>';
  }

  function characterForm(user) {
    var display = (user.user_metadata && (user.user_metadata.display_name || user.user_metadata.user_name)) ||
      (user.email ? user.email.split('@')[0] : 'Jugador');
    return '<div class="profile-dashboard"><div class="profile-user"><span class="profile-avatar">♙</span>' +
      '<span><small>Cuenta de la guía</small><strong>' + escapeHtml(display) +
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
      '<button class="game-action" type="submit">Guardar personaje</button>' +
      '<p class="form-message" id="profile-message" role="status"></p></form>' +
      '<div class="character-roster"><h3>Tus personajes</h3><div id="character-list"><p>Cargando…</p></div></div></div>';
  }

  function setMessage(id, message, error) {
    var node = document.getElementById(id);
    if (!node) { return; }
    node.textContent = message;
    node.classList.toggle('error', Boolean(error));
  }

  function renderCharacters(rows) {
    var list = document.getElementById('character-list');
    var selector = document.getElementById('chat-character');
    if (selector) {
      selector.innerHTML = '<option value="">Cuenta</option>' + (rows || []).map(function (row) {
        return '<option value="' + escapeHtml(row.id) + '">' + escapeHtml(row.character_name) + '</option>';
      }).join('');
    }
    if (!list) { return; }
    if (!rows || !rows.length) {
      list.innerHTML = '<p class="empty-roster">Todavía no has registrado personajes.</p>';
      return;
    }
    var classNames = {
      'dragon-lancer': 'Dragon Lancer', lunarborn: 'Lunarborn',
      spiritfox: 'Spiritfox', swordsage: 'Swordsage'
    };
    list.innerHTML = rows.map(function (row) {
      return '<article class="character-chip"><span class="character-class-mark">✦</span><div><strong>' +
        escapeHtml(row.character_name) + '</strong><small>' + escapeHtml(classNames[row.class_key] || row.class_key) +
        ' · ' + escapeHtml(row.realm) + ' · ' + escapeHtml(row.server_name) +
        '</small></div><button type="button" class="character-delete" data-character-delete="' +
        escapeHtml(row.id) + '" aria-label="Eliminar ' + escapeHtml(row.character_name) + '">×</button></article>';
    }).join('');
  }

  async function loadCharacters(user) {
    var result = await client.from('player_characters').select('*').eq('user_id', user.id).order('created_at');
    if (result.error) { setMessage('profile-message', 'No se pudieron cargar los personajes.', true); return; }
    renderCharacters(result.data);
  }

  function updateComposer() {
    var form = document.getElementById('chat-form');
    if (!form) { return; }
    var textarea = form.querySelector('textarea');
    var submit = form.querySelector('[type="submit"]');
    var hint = document.getElementById('chat-login-hint');
    textarea.disabled = !session;
    submit.disabled = !session;
    if (hint) { hint.textContent = session ? 'Conectado al chat.' : 'Inicia sesión para participar.'; }
  }

  async function renderProfile() {
    var panel = document.getElementById('player-profile-panel');
    if (!panel || !client) { return; }
    var result = await client.auth.getSession();
    session = result.data && result.data.session;
    panel.innerHTML = session ? characterForm(session.user) : loginMarkup();
    if (session) {
      var language = document.querySelector('#character-form [name="language_code"]');
      if (language) { language.value = currentLanguage(); }
      await loadCharacters(session.user);
    } else {
      renderCharacters([]);
    }
    updateComposer();
  }

  function renderMessageContent(value) {
    var html = escapeHtml(value).replace(/\n/g, '<br>');
    emotes.forEach(function (emote) {
      var token = ':' + emote.code + ':';
      html = html.split(token).join('<img class="chat-inline-emote" src="' + escapeHtml(emote.file) +
        '" alt="' + escapeHtml(token) + '" title="' + escapeHtml(token) + '">');
    });
    return html;
  }

  function renderMessages(rows) {
    var container = document.getElementById('chat-messages');
    if (!container) { return; }
    if (!rows || !rows.length) {
      container.innerHTML = '<p class="chat-empty">Todavía no hay mensajes. Puedes iniciar la conversación.</p>';
      return;
    }
    container.innerHTML = rows.map(function (row) {
      var own = session && session.user.id === row.user_id;
      return '<article class="chat-line' + (own ? ' own' : '') + '" data-message-id="' + escapeHtml(row.id) + '">' +
        '<span class="chat-line-avatar">✦</span><div><header><strong>' + escapeHtml(row.author_name || 'Jugador') +
        '</strong><time datetime="' + escapeHtml(row.created_at) + '">' +
        new Date(row.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) + '</time></header>' +
        '<p>' + renderMessageContent(row.content) + '</p></div>' +
        (own ? '<button class="chat-delete" type="button" data-chat-delete="' + escapeHtml(row.id) +
          '" aria-label="Eliminar mensaje">×</button>' : '<button class="chat-report" type="button" data-chat-report="' +
          escapeHtml(row.id) + '" aria-label="Reportar mensaje">!</button>') + '</article>';
    }).join('');
    container.scrollTop = container.scrollHeight;
  }

  async function loadMessages() {
    if (!client || !activeChannel) { return; }
    var result = await client.from('chat_messages').select('*').eq('channel_id', activeChannel.id)
      .order('created_at', { ascending: true }).limit(150);
    if (result.error) {
      document.getElementById('chat-messages').innerHTML = '<p>No se pudo cargar el chat.</p>';
      return;
    }
    renderMessages(result.data);
  }

  function subscribeToMessages() {
    if (realtimeSubscription) { client.removeChannel(realtimeSubscription); }
    if (!activeChannel) { return; }
    realtimeSubscription = client.channel('chat-' + activeChannel.id)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'chat_messages',
        filter: 'channel_id=eq.' + activeChannel.id
      }, loadMessages).subscribe();
  }

  async function selectChannel(channel) {
    activeChannel = channel;
    document.getElementById('chat-channel-title').textContent = channel.title;
    document.querySelectorAll('[data-chat-channel]').forEach(function (button) {
      button.classList.toggle('active', button.getAttribute('data-chat-channel') === channel.id);
    });
    await loadMessages();
    subscribeToMessages();
  }

  async function loadChannels() {
    if (!client) { return; }
    var result = await client.from('chat_channels').select('*').order('sort_order');
    if (result.error || !result.data.length) {
      document.getElementById('chat-messages').innerHTML = '<p>La conversación no está disponible.</p>';
      return;
    }
    var wantedSlug = channelSlugForCurrentRoute();
    var selected = result.data.find(function (channel) {
      return channel.slug === wantedSlug;
    }) || result.data[0];
    await selectChannel(selected);
  }

  function channelSlugForCurrentRoute() {
    var locationValue = location.hash.replace(/^#\/?/, '').toLowerCase();
    var path = locationValue.split('?')[0];
    var query = locationValue.split('?')[1] || '';
    if (path.indexOf('clases/dragon-lancer') === 0) { return 'dragon-lancer'; }
    if (path.indexOf('clases/spiritfox') === 0) { return 'spiritfox'; }
    if (path.indexOf('clases/lunarborn') === 0) { return 'lunarborn'; }
    if (path.indexOf('clases/swordsage') === 0) { return 'swordsage'; }
    if (path.indexOf('objetos') === 0 || path.indexOf('equipamiento-y-mejoras') === 0) {
      return 'objetos';
    }
    if (query.indexOf('pvp') !== -1 || path.indexOf('/pvp') !== -1) { return 'pvp'; }
    if (path.indexOf('actividades-y-mazmorras') === 0) { return 'pve'; }
    if (path.indexOf('guia-general') === 0 || path.indexOf('sistemas-del-personaje') === 0) {
      return 'ayuda';
    }
    return 'general';
  }

  async function loadEmotes() {
    try {
      var response = await fetch('assets/images/chat-emotes/manifest.json');
      emotes = response.ok ? await response.json() : [];
    } catch (error) { emotes = []; }
    var picker = document.getElementById('chat-emotes');
    if (!picker) { return; }
    picker.innerHTML = emotes.map(function (emote) {
      return '<button type="button" data-chat-emote="' + escapeHtml(emote.code) + '" title=":' +
        escapeHtml(emote.code) + ':"><img src="' + escapeHtml(emote.file) + '" alt=""></button>';
    }).join('');
  }

  async function saveCharacter(form) {
    if (!session) { return; }
    var data = new FormData(form);
    var display = (session.user.user_metadata && session.user.user_metadata.display_name) ||
      (session.user.email ? session.user.email.split('@')[0] : 'jugador');
    var profileResult = await client.from('player_profiles').upsert({
      user_id: session.user.id, github_login: display,
      language_code: String(data.get('language_code') || 'es'), updated_at: new Date().toISOString()
    });
    if (profileResult.error) { setMessage('profile-message', 'No se pudo actualizar el perfil.', true); return; }
    var result = await client.from('player_characters').insert({
      user_id: session.user.id,
      character_name: String(data.get('character_name') || '').trim(),
      class_key: String(data.get('class_key') || ''),
      realm: String(data.get('realm') || '').trim(),
      server_name: String(data.get('server_name') || '').trim()
    });
    if (result.error) { setMessage('profile-message', 'No se pudo guardar el personaje.', true); return; }
    form.reset();
    setMessage('profile-message', 'Personaje guardado.', false);
    await loadCharacters(session.user);
  }

  async function sendMessage(form) {
    if (!session || !activeChannel) { return; }
    var textarea = form.querySelector('textarea');
    var content = textarea.value.trim();
    if (!content) { return; }
    var character = document.getElementById('chat-character');
    var result = await client.from('chat_messages').insert({
      channel_id: activeChannel.id,
      user_id: session.user.id,
      character_id: character && character.value ? character.value : null,
      content: content
    });
    if (result.error) { setMessage('chat-message', 'No se pudo enviar el mensaje.', true); return; }
    textarea.value = '';
    setMessage('chat-message', '', false);
    await loadMessages();
  }

  async function mountCommunity() {
    var main = document.getElementById('contenido');
    if (!main || main.querySelector('#comunidad')) { return; }
    main.insertAdjacentHTML('beforeend', communityMarkup());
    await Promise.all([renderProfile(), loadEmotes(), loadChannels()]);
  }

  document.addEventListener('click', function (event) {
    var channelButton = event.target.closest && event.target.closest('[data-chat-channel]');
    if (channelButton) {
      var id = channelButton.getAttribute('data-chat-channel');
      client.from('chat_channels').select('*').eq('id', id).single().then(function (result) {
        if (result.data) { selectChannel(result.data); }
      });
    }
    if (event.target && event.target.id === 'profile-logout') {
      client.auth.signOut().then(renderProfile);
    }
    if (event.target && event.target.id === 'chat-refresh') { loadMessages(); }
    if (event.target && event.target.id === 'chat-emote-toggle') {
      var picker = document.getElementById('chat-emotes');
      picker.hidden = !picker.hidden;
    }
    var emoteButton = event.target.closest && event.target.closest('[data-chat-emote]');
    if (emoteButton) {
      var textarea = document.querySelector('#chat-form textarea');
      if (textarea && !textarea.disabled) {
        textarea.value += (textarea.value ? ' ' : '') + ':' + emoteButton.getAttribute('data-chat-emote') + ':';
        textarea.focus();
      }
    }
    var deleteCharacterButton = event.target.closest && event.target.closest('[data-character-delete]');
    if (deleteCharacterButton) {
      client.from('player_characters').delete().eq('id', deleteCharacterButton.getAttribute('data-character-delete'))
        .then(function () { renderProfile(); });
    }
    var deleteMessageButton = event.target.closest && event.target.closest('[data-chat-delete]');
    if (deleteMessageButton) {
      client.from('chat_messages').delete().eq('id', deleteMessageButton.getAttribute('data-chat-delete')).then(loadMessages);
    }
    var reportButton = event.target.closest && event.target.closest('[data-chat-report]');
    if (reportButton && session) {
      var reason = window.prompt('Motivo del reporte:');
      if (reason && reason.trim().length >= 3) {
        client.from('chat_reports').insert({
          message_id: reportButton.getAttribute('data-chat-report'),
          reporter_id: session.user.id, reason: reason.trim()
        }).then(function () { setMessage('chat-message', 'Reporte enviado.', false); });
      }
    }
  });

  document.addEventListener('submit', function (event) {
    if (event.target.id === 'email-login-form') {
      event.preventDefault();
      var email = new FormData(event.target).get('email');
      client.auth.signInWithOtp({
        email: String(email || '').trim(),
        options: { emailRedirectTo: location.origin + location.pathname + '#/comunidad' }
      }).then(function (result) {
        setMessage('login-message', result.error ? 'No se pudo enviar el enlace.' : 'Revisa tu correo para entrar.', Boolean(result.error));
      });
    }
    if (event.target.id === 'character-form') {
      event.preventDefault(); saveCharacter(event.target);
    }
    if (event.target.id === 'chat-form') {
      event.preventDefault(); sendMessage(event.target);
    }
  });

  document.addEventListener('route:changed', mountCommunity);
  if (client) {
    client.auth.onAuthStateChange(function (event, newSession) {
      session = newSession;
      window.setTimeout(function () { renderProfile(); loadMessages(); }, 0);
    });
  }
}());
