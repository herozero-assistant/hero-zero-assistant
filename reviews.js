(() => {
  'use strict';
  const REVIEW_API = 'https://script.google.com/macros/s/AKfycbwMpL8V_pOIsrP1BnEhPX7HkYhUQf04gm7WVGTMTGaTWYQUxdriC7m5RvHgQyGjdgqz/exec';
  const root = document.querySelector('#review-list');
  if (!root) return;
  let items = [];
  let state = "loading";
  let selectedRating = 0;
  const form = document.querySelector('#review-form');
  const formCopy = {
    pt:{title:'Conte sua experiência',lead:'Seu nome, comentário e nota serão publicados para a comunidade.',name:'Seu nome',namePlaceholder:'Como você quer aparecer?',rating:'Sua nota',comment:'Sua avaliação',commentPlaceholder:'Escreva sua experiência com o BoltMind...',submit:'Publicar avaliação',sending:'Enviando sua avaliação...',sent:'Obrigado! Sua avaliação foi enviada para a comunidade.',error:'Preencha seu nome, a avaliação e escolha uma nota de 1 a 5.'},
    en:{title:'Share your experience',lead:'Your name, comment and rating will be published for the community.',name:'Your name',namePlaceholder:'How should we show you?',rating:'Your rating',comment:'Your review',commentPlaceholder:'Write about your experience with BoltMind...',submit:'Publish review',sending:'Sending your review...',sent:'Thank you! Your review was sent to the community.',error:'Enter your name, your review, and choose a rating from 1 to 5.'},
    pl:{title:'Podziel się swoją opinią',lead:'Twoje imię, opinia i ocena zostaną opublikowane dla społeczności.',name:'Twoje imię',namePlaceholder:'Jak mamy Cię wyświetlić?',rating:'Twoja ocena',comment:'Twoja opinia',commentPlaceholder:'Opisz swoje doświadczenie z BoltMind...',submit:'Opublikuj opinię',sending:'Wysyłanie opinii...',sent:'Dziękujemy! Twoja opinia została wysłana do społeczności.',error:'Podaj imię, opinię i wybierz ocenę od 1 do 5.'},
    el:{title:'Μοιραστείτε την εμπειρία σας',lead:'Το όνομα, το σχόλιο και η βαθμολογία σας θα δημοσιευτούν στην κοινότητα.',name:'Το όνομά σας',namePlaceholder:'Πώς θέλετε να εμφανίζεστε;',rating:'Η βαθμολογία σας',comment:'Η αξιολόγησή σας',commentPlaceholder:'Γράψτε την εμπειρία σας με το BoltMind...',submit:'Δημοσίευση αξιολόγησης',sending:'Αποστολή αξιολόγησης...',sent:'Ευχαριστούμε! Η αξιολόγησή σας στάλθηκε στην κοινότητα.',error:'Συμπληρώστε το όνομα, την αξιολόγηση και επιλέξτε βαθμολογία από 1 έως 5.'},
    de:{title:'Teile deine Erfahrung',lead:'Dein Name, Kommentar und deine Bewertung werden für die Community veröffentlicht.',name:'Dein Name',namePlaceholder:'Wie sollen wir dich anzeigen?',rating:'Deine Bewertung',comment:'Deine Rezension',commentPlaceholder:'Schreibe über deine Erfahrung mit BoltMind...',submit:'Bewertung veröffentlichen',sending:'Deine Bewertung wird gesendet...',sent:'Danke! Deine Bewertung wurde an die Community gesendet.',error:'Gib deinen Namen und deine Bewertung ein und wähle 1 bis 5 Sterne.'},
    fr:{title:'Partagez votre expérience',lead:'Votre nom, votre avis et votre note seront publiés pour la communauté.',name:'Votre nom',namePlaceholder:'Comment souhaitez-vous apparaître ?',rating:'Votre note',comment:'Votre avis',commentPlaceholder:'Écrivez votre expérience avec BoltMind...',submit:'Publier l’avis',sending:'Envoi de votre avis...',sent:'Merci ! Votre avis a été envoyé à la communauté.',error:'Indiquez votre nom, votre avis et choisissez une note de 1 à 5.'}
  };

  function copy() {
    const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : document.documentElement.lang.slice(0, 2);
    return (window.BOLTMIND_I18N && window.BOLTMIND_I18N[lang]) || window.BOLTMIND_I18N.pt;
  }
  function formText() {
    const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : document.documentElement.lang.slice(0, 2);
    return formCopy[lang] || formCopy.pt;
  }
  function formStatus(message, kind = '') {
    const output = document.querySelector('#review-form-status');
    if (!output) return;
    output.textContent = message;
    output.className = `review-form-status ${kind}`;
  }
  function refreshStars() {
    document.querySelectorAll('.review-stars button').forEach(button => {
      const value = Number(button.dataset.rating);
      button.classList.toggle('active', value <= selectedRating);
      button.setAttribute('aria-checked', String(value === selectedRating));
    });
  }
  function renderForm() {
    if (!form) return;
    const t = formText();
    document.querySelector('#review-form-title').textContent = t.title;
    document.querySelector('#review-form-lead').textContent = t.lead;
    document.querySelector('#review-name-label').textContent = t.name;
    document.querySelector('#review-name').placeholder = t.namePlaceholder;
    document.querySelector('#review-rating-label').textContent = t.rating;
    document.querySelector('#review-comment-label').textContent = t.comment;
    document.querySelector('#review-comment').placeholder = t.commentPlaceholder;
    document.querySelector('#review-submit').textContent = t.submit;
    document.querySelectorAll('.review-stars button').forEach(button => {
      const value = button.dataset.rating;
      button.setAttribute('aria-label', `${value} ${value === '1' ? 'star' : 'stars'}`);
    });
    refreshStars();
  }
  function card(review) {
    const article = document.createElement('article');
    article.className = 'review-card';
    const header = document.createElement('div');
    header.className = 'review-card-head';
    const name = document.createElement('strong');
    name.textContent = String(review.name || 'Membro da comunidade').slice(0, 80);
    const stars = document.createElement('span');
    stars.className = 'review-stars-display';
    const rating = Math.max(1, Math.min(5, Number(review.stars) || 0));
    stars.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    stars.setAttribute('aria-label', `${rating}/5`);
    const comment = document.createElement('p');
    comment.textContent = String(review.comment || '').slice(0, 1500);
    header.append(name, stars);
    article.append(header, comment);
    return article;
  }
  function loadStateKey() {
    return state === "loading" ? "reviewsLoading" : state === "error" ? "reviewsEmpty" : "reviewsNone";
  }
  function render() {
    const t = copy();
    root.replaceChildren();
    if (!items.length) {
      const state = document.createElement('p');
      state.className = 'review-state';
      state.textContent = t[loadStateKey()];
      root.append(state);
      return;
    }
    items.forEach(review => root.append(card(review)));
  }
  function load() {
    const callback = `boltmindReviews_${Date.now()}`;
    const script = document.createElement('script');
    let settled = false;
    let timer;
    const finish = data => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      state = data && data.ok === true && Array.isArray(data.reviews) ? 'loaded' : 'error';
      items = state === 'loaded' ? data.reviews : [];
      render();
      // Keep a no-op callback for a response arriving after the timeout.
      window[callback] = () => {};
      script.remove();
    };
    window[callback] = finish;
    script.onerror = () => finish(null);
    timer = setTimeout(() => finish(null), 15000);
    script.src = `${REVIEW_API}?callback=${encodeURIComponent(callback)}`;
    document.body.append(script);
  }
  document.addEventListener('boltmind:language', () => { render(); renderForm(); });
  if (form) {
    form.addEventListener('click', event => {
      const button = event.target.closest('[data-rating]');
      if (!button) return;
      selectedRating = Number(button.dataset.rating);
      refreshStars();
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const t = formText();
      const name = document.querySelector('#review-name').value.trim();
      const comment = document.querySelector('#review-comment').value.trim();
      if (!name || !comment || !selectedRating) {
        formStatus(t.error, 'error');
        return;
      }
      const submit = document.querySelector('#review-submit');
      submit.disabled = true;
      formStatus(t.sending);
      try {
        await fetch(REVIEW_API, {method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify({name, comment, stars:selectedRating})});
        form.reset();
        selectedRating = 0;
        refreshStars();
        formStatus(t.sent, 'success');
        setTimeout(load, 900);
      } catch {
        formStatus(t.error, 'error');
      } finally {
        submit.disabled = false;
      }
    });
    renderForm();
  }
  load();
})();
