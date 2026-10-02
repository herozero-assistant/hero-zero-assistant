(() => {
'use strict';
const VISIT_API='https://script.google.com/macros/s/AKfycbwMpL8V_pOIsrP1BnEhPX7HkYhUQf04gm7WVGTMTGaTWYQUxdriC7m5RvHgQyGjdgqz/exec';
const translations=window.BOLTMIND_I18N;
const locales={pt:'pt-BR',en:'en-US',pl:'pl-PL',el:'el-GR',de:'de-DE',fr:'fr-FR'};
let stored;try{stored=localStorage.getItem('boltmind-language');}catch{}
let lang=translations[stored]?stored:'pt',tab=0,platform='desktop';
let pricing={BRL:279,USD:54.99};
const desktopShots=['geral','ranking','missoes','missoes-especiais','treinos','duelos','esconderijo','eventos','diagnostico'];
const androidShots=['overview','ranking','missions','special','training','duels','hideout','events','inventory','automation','history'];
const q=s=>document.querySelector(s);
function element(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
function showPrice(){
 const t=window.BOLTMIND_PLATFORM_COPY[lang];
 const currency=lang==='pt'?'BRL':'USD';
 const amount=new Intl.NumberFormat(locales[lang],{style:'currency',currency}).format(pricing[currency]);
 q('#price-value').textContent=amount;
 document.querySelectorAll('.price-inline').forEach(el=>el.textContent=amount);
 document.querySelectorAll('.conversion-note').forEach(el=>el.textContent=t.priceNote);
 document.querySelectorAll('.checkout-hotmart .checkout-price').forEach(el=>el.textContent=t.hotmartPrice);
 document.querySelectorAll('.checkout-payhip .checkout-price').forEach(el=>el.textContent=t.payhipPrice);
}
function galleryTabs(){return platform==='desktop'?window.BOLTMIND_TABS[lang]:window.BOLTMIND_PLATFORM_COPY[lang].mobileTabs;}
function shotPath(i){const names=platform==='desktop'?desktopShots:androidShots;const ext=platform==='desktop'?'png':'jpg';return 'assets/screenshots/'+platform+'/'+names[i]+'.'+ext+'?v=20260929';}
function changeTab(i){
 tab=i;
 const img=q('#gallery-image');img.src=shotPath(i);img.alt=(platform==='desktop'?window.BOLTMIND_PLATFORM_COPY[lang].pc:window.BOLTMIND_PLATFORM_COPY[lang].android)+' - '+galleryTabs()[i];
 img.width=platform==='desktop'?1296:1600;img.height=platform==='desktop'?966:738;
 q('#gallery-caption').textContent=platform==='android'?window.BOLTMIND_PLATFORM_COPY[lang].mobileCaption:window.BOLTMIND_PLATFORM_COPY[lang].desktopCaption;
 document.querySelectorAll('#screenshot-tabs button').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});
}
function renderGallery(){
 const copy=window.BOLTMIND_PLATFORM_COPY[lang];
 const chooser=q('#platform-tabs');chooser.replaceChildren();
 chooser.setAttribute('aria-label',translations[lang].preview);
 for(const [key,label] of [['desktop',copy.pc],['android',copy.android]]){
  const button=element('button',label);button.type='button';button.setAttribute('aria-pressed',String(key===platform));
  if(key==='android')button.append(element('span',copy.new,'new-badge'));
  button.addEventListener('click',()=>{platform=key;tab=0;renderGallery();});chooser.append(button);
 }
 const tabs=q('#screenshot-tabs');tabs.replaceChildren();const labels=galleryTabs();
 labels.forEach((label,i)=>{
  const button=element('button',label);button.type='button';button.id='screen-tab-'+i;
  button.setAttribute('role','tab');button.setAttribute('aria-controls','gallery-image');
  button.addEventListener('click',()=>changeTab(i));
  button.addEventListener('keydown',e=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
   e.preventDefault();
   const next=e.key==='Home'?0:e.key==='End'?labels.length-1:(i+(e.key==='ArrowRight'?1:labels.length-1))%labels.length;
   changeTab(next);tabs.children[next].focus();
  });
  tabs.append(button);
 });
 changeTab(Math.min(tab,labels.length-1));
 q('#gallery-image').parentElement.setAttribute('aria-label',translations[lang].preview);
}
function render(){
 const t=translations[lang],copy=window.BOLTMIND_PLATFORM_COPY[lang];
 document.documentElement.lang=locales[lang];
 document.title='BoltMind - Hero Zero | '+t.lifetime;
 q('meta[name="description"]').content=t.lead+' '+copy.platformLifetime;
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]||el.dataset.t);
 document.querySelectorAll('[data-platform]').forEach(el=>el.textContent=copy[el.dataset.platform]||'');
 q('#language').value=lang;
 showPrice();
 for(const selector of ['#feature-grid','#feature-details']){
  const root=q(selector);root.replaceChildren();
  window.BOLTMIND_FEATURES[lang].forEach(([title,body],i)=>{
   const article=element('article',undefined,'feature');
   article.append(element('span',String(i+1).padStart(2,'0'),'feature-number'),element('h3',title),element('p',body));
   root.append(article);
  });
 }
 renderGallery();
 const faq=q('#faq-list');faq.replaceChildren();window.BOLTMIND_FAQ[lang].forEach(([question,answer])=>{const detail=element('details');detail.append(element('summary',question),element('p',answer));faq.append(detail);});document.dispatchEvent(new CustomEvent('boltmind:language',{detail:{lang}}));
}
function trackVisit(){
 try{if(sessionStorage.getItem('hza-visit-counted'))return;sessionStorage.setItem('hza-visit-counted','1');}catch{}
 const send=geo=>{const query=new URLSearchParams({track:'1'});if(geo&&geo.country)query.set('country',String(geo.country).slice(0,80));if(geo&&geo.city)query.set('city',String(geo.city).slice(0,120));fetch(VISIT_API+'?'+query.toString(),{method:'GET',mode:'no-cors',cache:'no-store'}).catch(()=>{try{sessionStorage.removeItem('hza-visit-counted');}catch{}});};
 fetch('https://ipwho.is/',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(data=>send(data&&data.success!==false?data:null)).catch(()=>send(null));
}
q('#language').addEventListener('change',e=>{lang=e.target.value;try{localStorage.setItem('boltmind-language',lang);}catch{}render();});
q('#open-features').addEventListener('click',()=>q('#features-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});});
document.querySelectorAll('.zoom-shot').forEach(b=>b.addEventListener('click',()=>{const image=b.querySelector('img');q('#zoom-image').src=image.src;q('#zoom-image').alt=image.alt;q('#image-dialog').showModal();}));
const checkoutLinks={
  hotmart:'https://pay.hotmart.com/J107735600B?bid=1790177595394',
  payhip:'https://payhip.com/b/C5Js0'
};
const checkoutText={
  pt:{hotmart:'Comprar pela Hotmart',payhip:'Comprar pela Payhip',choose:'Escolha onde deseja concluir a compra',note:'Você será direcionado ao checkout seguro da plataforma escolhida.',details:'Ver opções de compra',coupon:'Hotmart: use o cupom BOLTMIND10 para obter 10% de desconto por tempo limitado.'},
  en:{hotmart:'Buy through Hotmart',payhip:'Buy through Payhip',choose:'Choose where you would like to complete your purchase',note:'You will be taken to the secure checkout of your chosen platform.',details:'See purchase options',coupon:'Hotmart: use code BOLTMIND10 for 10% off for a limited time.'},
  pl:{hotmart:'Kup przez Hotmart',payhip:'Kup przez Payhip',choose:'Wybierz, gdzie chcesz sfinalizować zakup',note:'Zostaniesz przekierowany do bezpiecznej płatności wybranej platformy.',details:'Zobacz opcje zakupu',coupon:'Hotmart: użyj kodu BOLTMIND10, aby otrzymać 10% zniżki przez ograniczony czas.'},
  el:{hotmart:'Αγορά μέσω Hotmart',payhip:'Αγορά μέσω Payhip',choose:'Επιλέξτε πού θέλετε να ολοκληρώσετε την αγορά',note:'Θα μεταφερθείτε στην ασφαλή πληρωμή της πλατφόρμας που επιλέξατε.',details:'Δείτε επιλογές αγοράς',coupon:'Hotmart: χρησιμοποιήστε τον κωδικό BOLTMIND10 για έκπτωση 10% για περιορισμένο χρονικό διάστημα.'},
  de:{hotmart:'Über Hotmart kaufen',payhip:'Über Payhip kaufen',choose:'Wähle, wo du den Kauf abschließen möchtest',note:'Du wirst zum sicheren Checkout der gewählten Plattform weitergeleitet.',details:'Kaufoptionen ansehen',coupon:'Hotmart: Mit dem Code BOLTMIND10 erhältst du für begrenzte Zeit 10 % Rabatt.'},
  fr:{hotmart:'Acheter via Hotmart',payhip:'Acheter via Payhip',choose:'Choisissez où finaliser votre achat',note:'Vous serez redirigé vers le paiement sécurisé de la plateforme choisie.',details:'Voir les options d’achat',coupon:'Hotmart : utilisez le code BOLTMIND10 pour bénéficier de 10 % de réduction pendant une durée limitée.'}
};
function makeCheckoutLink(provider,label){
 const link=document.createElement('a');
 link.className='button checkout-link checkout-'+provider;
 link.href=checkoutLinks[provider];link.target='_blank';link.rel='noopener';
 const logo=document.createElement('img');logo.src='assets/'+provider+'-logo.svg';logo.alt=provider==='hotmart'?'Hotmart':'Payhip';
 const text=element('span',label,'checkout-link-text');
 const price=element('small',window.BOLTMIND_PLATFORM_COPY[lang][provider+'Price'],'checkout-price');
 const arrow=element('span','↗','checkout-arrow');arrow.setAttribute('aria-hidden','true');
 const copy=element('span',undefined,'checkout-link-copy');copy.append(text,price);
 link.append(logo,copy,arrow);return link;
}
function setCheckoutLink(link,provider,label){
 const replacement=makeCheckoutLink(provider,label);
 replacement.classList.add('purchase');
 link.replaceWith(replacement);
 return replacement;
}
function renderCheckoutOptions(){
 const copy=checkoutText[lang]||checkoutText.pt;
 const hero=q('.hero-actions');
 let hotmart=hero.querySelector('.purchase');
 if(hotmart) hotmart=setCheckoutLink(hotmart,'hotmart',copy.hotmart);
 let payhip=hero.querySelector('.checkout-payhip');
 if(!payhip){payhip=makeCheckoutLink('payhip',copy.payhip);hero.insertBefore(payhip,hero.querySelector('.button-discord'));}
 else {const fresh=makeCheckoutLink('payhip',copy.payhip);payhip.replaceWith(fresh);payhip=fresh;}
 if(lang==='pt')hero.insertBefore(hotmart,payhip);else hero.insertBefore(payhip,hotmart);
 let heroCoupon=q('.hero-coupon');
 if(!heroCoupon){heroCoupon=element('p',undefined,'hotmart-coupon hero-coupon');hero.after(heroCoupon);}
 heroCoupon.textContent=copy.coupon;
 const priceCard=q('.price-card');
 let choice=priceCard.querySelector('.checkout-choice');
 if(!choice){
   const old=priceCard.querySelector('.purchase');
   choice=element('div',undefined,'checkout-choice');
   old.replaceWith(choice);
   choice.append(element('p',copy.choose,'checkout-heading'),makeCheckoutLink('hotmart',copy.hotmart),makeCheckoutLink('payhip',copy.payhip));
 }else{
   choice.querySelector('.checkout-heading').textContent=copy.choose;
   const oldHotmart=choice.querySelector('.checkout-hotmart');const oldPayhip=choice.querySelector('.checkout-payhip');
   oldHotmart.replaceWith(makeCheckoutLink('hotmart',copy.hotmart));
   oldPayhip.replaceWith(makeCheckoutLink('payhip',copy.payhip));
 }
 const choiceHotmart=choice.querySelector('.checkout-hotmart');
 const choicePayhip=choice.querySelector('.checkout-payhip');
 if(lang==='pt')choice.insertBefore(choiceHotmart,choicePayhip);else choice.insertBefore(choicePayhip,choiceHotmart);
 let priceCoupon=priceCard.querySelector('.hotmart-coupon');
 if(!priceCoupon){priceCoupon=element('p',undefined,'hotmart-coupon');choice.after(priceCoupon);}
 priceCoupon.textContent=copy.coupon;
 const paymentNote=priceCard.querySelector('.payment-note');if(paymentNote)paymentNote.textContent=copy.note;
 const dialog=q('#features-dialog');const dialogPurchase=dialog.querySelector('.purchase');
 if(dialogPurchase){
   dialogPurchase.className='button button-secondary checkout-details';dialogPurchase.href='#preco';dialogPurchase.removeAttribute('target');dialogPurchase.removeAttribute('rel');dialogPurchase.removeAttribute('data-t');dialogPurchase.textContent=copy.details;
 }
}
document.addEventListener('boltmind:language',renderCheckoutOptions);
render();
trackVisit();
fetch('pricing.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{if(data.BRL===279&&data.USD===54.99){pricing=data;showPrice();}}).catch(()=>{});
})();
