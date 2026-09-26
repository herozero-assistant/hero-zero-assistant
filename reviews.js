(() => {
  'use strict';
  const REVIEW_API = 'https://script.google.com/macros/s/AKfycbwMpL8V_pOIsrP1BnEhPX7HkYhUQf04gm7WVGTMTGaTWYQUxdriC7m5RvHgQyGjdgqz/exec';
  const root = document.querySelector('#review-list');
  if (!root) return;
  let items = [];
  let state = "loading";

  function copy() {
    const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : document.documentElement.lang.slice(0, 2);
    return (window.BOLTMIND_I18N && window.BOLTMIND_I18N[lang]) || window.BOLTMIND_I18N.pt;
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
  document.addEventListener('boltmind:language', render);
  load();
})();