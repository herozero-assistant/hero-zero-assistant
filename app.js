(() => {
'use strict';
const VISIT_API='https://script.google.com/macros/s/AKfycbwMpL8V_pOIsrP1BnEhPX7HkYhUQf04gm7WVGTMTGaTWYQUxdriC7m5RvHgQyGjdgqz/exec';
const translations=window.BOLTMIND_I18N;
const locales={pt:'pt-BR',en:'en-US',pl:'pl-PL',el:'el-GR',de:'de-DE',fr:'fr-FR'};
const currencies={pt:'BRL',en:'USD',pl:'PLN',el:'EUR',de:'EUR',fr:'EUR'};
let stored;try{stored=localStorage.getItem('boltmind-language');}catch{}
let lang=translations[stored]?stored:'pt',tab=0;
let pricing={amount:147,date:'2026-09-25',rates:{BRL:1,USD:0.19297,EUR:0.16923,PLN:0.73984}};
const q=s=>document.querySelector(s);
function element(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
function showPrice(){const t=translations[lang],currency=currencies[lang];const price=new Intl.NumberFormat(locales[lang],{style:'currency',currency}).format(pricing.amount*pricing.rates[currency]);q('#price-value').textContent=(currency==='BRL'?'':'\u2248 ')+price;document.querySelectorAll('.price-inline').forEach(el=>el.textContent=(currency==='BRL'?'':'\u2248 ')+price);document.querySelectorAll('.conversion-note').forEach(el=>el.textContent=currency==='BRL'?t.baseNote:t.estimated+' ('+new Intl.DateTimeFormat(locales[lang],{timeZone:'UTC'}).format(new Date(pricing.date+'T12:00:00Z'))+')');}
function shotPath(i){return (['pt','en','pl','el'].includes(lang)?lang:'en')+'/aba_'+(i+1)+'.jpg?v=20260925-privacy1';}
function changeTab(i){tab=i;const img=q('#gallery-image');img.src=shotPath(i);img.alt=window.BOLTMIND_TABS[lang][i];document.querySelectorAll('#screenshot-tabs button').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});}
function render(){const t=translations[lang];document.documentElement.lang=locales[lang];document.title='BoltMind \u2014 Hero Zero | '+t.lifetime;q('meta[name="description"]').content=t.lead;document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]||el.dataset.t);q('#language').value=lang;showPrice();
 for(const selector of ['#feature-grid','#feature-details']){const root=q(selector);root.replaceChildren();window.BOLTMIND_FEATURES[lang].forEach(([title,body],i)=>{const article=element('article',undefined,'feature');article.append(element('span',String(i+1).padStart(2,'0'),'feature-number'),element('h3',title),element('p',body));root.append(article);});}
 const tabs=q('#screenshot-tabs');tabs.replaceChildren();window.BOLTMIND_TABS[lang].forEach((label,i)=>{const button=element('button',label);button.type='button';button.id='screen-tab-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls','gallery-image');button.addEventListener('click',()=>changeTab(i));button.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?8:(i+(e.key==='ArrowRight'?1:8))%9;changeTab(next);tabs.children[next].focus();});tabs.append(button);});changeTab(tab);q('#hero-shot').src=shotPath(0);q('#hero-shot').alt=t.real+' \u2014 '+window.BOLTMIND_TABS[lang][0];q('#hero-shot').parentElement.setAttribute('aria-label',t.preview);q('#gallery-image').parentElement.setAttribute('aria-label',t.preview);
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
render();
trackVisit();
fetch('pricing.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{if(data.amount===147&&data.date&&['BRL','USD','EUR','PLN'].every(c=>Number.isFinite(data.rates[c])&&data.rates[c]>0)){pricing=data;showPrice();}}).catch(()=>{});
})();
