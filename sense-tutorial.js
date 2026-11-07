// Heroic Sense installation guide, shown as a dialog inside the site.
// Opens from the "How to install" button or from #heroic-sense-instalacao.
(() => {
'use strict';
const ZIP = 'downloads/boltmind-heroic-sense-extension-v1.0.0.zip';
const ZIP_NAME = 'BoltMind Heroic Sense Extension v1.0.0.zip';
const HASH = '#heroic-sense-instalacao';
const TRACK = 'https://script.google.com/macros/s/AKfycbwMpL8V_pOIsrP1BnEhPX7HkYhUQf04gm7WVGTMTGaTWYQUxdriC7m5RvHgQyGjdgqz/exec?download=heroic-sense';
const T = {
 pt: {
  pageTitle:'Como instalar o Heroic Sense', eyebrow:'Extensão gratuita · Heroic Sense v1.0.0',
  title:'Instale o Heroic Sense no seu navegador em 2 minutos.',
  lead:'A extensão mostra, na própria página do Hero Zero, quais missões rendem mais XP ou mais moedas por energia. Siga os passos abaixo.',
  chip1:'Grátis, sem licença', chip2:'Chrome, Edge, Brave e Opera', chip3:'Somente leitura', chip4:'5 idiomas no painel',
  download:'Baixar extensão', downloadLong:'Baixar extensão grátis (ZIP)', seeSteps:'Ver o passo a passo',
  s1t:'Baixe a extensão', s1p:'Baixe o arquivo ZIP da extensão. Ele é pequeno (cerca de 40 KB).',
  s2t:'Extraia para uma pasta fixa', s2p:'Clique com o botão direito no ZIP e escolha "Extrair tudo". Guarde a pasta em um lugar fixo, como Documentos. Não apague essa pasta depois: o navegador carrega a extensão a partir dela.',
  s3t:'Abra a página de extensões', s3p:'Copie o endereço do seu navegador e cole na barra de endereços (o navegador não permite abrir esse endereço por link).',
  s4t:'Ative o Modo do desenvolvedor', s4p:'No Chrome, a chave fica no canto superior direito. No Edge, fica no menu à esquerda.',
  s5t:'Clique em "Carregar sem compactação"', s5p:'Escolha a pasta extraída no passo 2: a que contém o arquivo manifest.json. Depois, fixe o ícone do BoltMind no botão de quebra-cabeça da barra.',
  s6t:'Abra o Hero Zero e entre na conta', s6p:'O painel Heroic Sense aparece no canto inferior direito da página do jogo. Escolha XP/Energia ou Moeda/Energia. Arraste o painel pelo topo ou minimize no botão "–".',
  shotCaption:'Heroic Sense funcionando na página do Hero Zero.',
  copy:'Copiar', copied:'Endereço copiado. Cole na barra de endereços.',
  mockTitle:'Extensões', devMode:'Modo do desenvolvedor', loadUnpacked:'Carregar sem compactação', pack:'Compactar extensão', update:'Atualizar',
  helpEyebrow:'Dúvidas comuns', helpTitle:'Se algo não sair como esperado',
  h1t:'O painel ficou aguardando', h1p:'Clique em "Ler missões agora". O navegador mostra por um instante o aviso de que a extensão está depurando a aba: é assim que ela lê as missões, e depois se desconecta.',
  h2t:'Apareceu um aviso ao clicar no botão', h2p:'Se o DevTools (F12) estiver aberto na aba do jogo, feche-o e clique de novo.',
  h3t:'O navegador pede para desativar a extensão', h3p:'Alguns navegadores avisam sobre extensões do modo do desenvolvedor ao abrir. Mantenha a extensão ativada.',
  h4t:'Como atualizar', h4p:'Baixe a versão nova, substitua os arquivos da pasta e clique no botão de recarregar da extensão na página de extensões.',
  safeT:'Somente leitura.', safeP:' A extensão não clica, não inicia missões, não gasta energia e não envia ações ao jogo.',
  riskT:'Use com moderação.', riskP:' Toda ferramenta para jogos online envolve risco. O BoltMind não tem vínculo com o Hero Zero e não pode garantir que sua conta fique livre de restrições.',
  footer:'Ferramenta independente para Hero Zero. Sem afiliação ou endosso oficial do jogo.', back:'Voltar ao site BoltMind'
 },
 en: {
  pageTitle:'How to install Heroic Sense', eyebrow:'Free extension · Heroic Sense v1.0.0',
  title:'Install Heroic Sense in your browser in 2 minutes.',
  lead:'The extension shows, right on the Hero Zero page, which missions give the most XP or coins per energy. Follow the steps below.',
  chip1:'Free, no license', chip2:'Chrome, Edge, Brave and Opera', chip3:'Read-only', chip4:'5 panel languages',
  download:'Download extension', downloadLong:'Download free extension (ZIP)', seeSteps:'See the steps',
  s1t:'Download the extension', s1p:'Download the extension ZIP file. It is small (about 40 KB).',
  s2t:'Extract it to a permanent folder', s2p:'Right-click the ZIP and choose "Extract all". Keep the folder somewhere permanent, such as Documents. Do not delete it later: the browser loads the extension from it.',
  s3t:'Open the extensions page', s3p:'Copy your browser’s address and paste it into the address bar (browsers do not allow opening it from a link).',
  s4t:'Turn on Developer mode', s4p:'In Chrome the switch is at the top right. In Edge it is in the left menu.',
  s5t:'Click "Load unpacked"', s5p:'Select the folder extracted in step 2: the one containing manifest.json. Then pin the BoltMind icon from the puzzle button on the toolbar.',
  s6t:'Open Hero Zero and sign in', s6p:'The Heroic Sense panel appears in the bottom-right corner of the game page. Choose XP/Energy or Coins/Energy. Drag the panel by its header or minimize it with "–".',
  shotCaption:'Heroic Sense running on the Hero Zero page.',
  copy:'Copy', copied:'Address copied. Paste it into the address bar.',
  mockTitle:'Extensions', devMode:'Developer mode', loadUnpacked:'Load unpacked', pack:'Pack extension', update:'Update',
  helpEyebrow:'Common questions', helpTitle:'If something does not go as expected',
  h1t:'The panel keeps waiting', h1p:'Click "Read missions now". The browser briefly shows that the extension is debugging the tab: that is how it reads the missions, and then it disconnects.',
  h2t:'A warning appeared when clicking the button', h2p:'If DevTools (F12) is open on the game tab, close it and click again.',
  h3t:'The browser asks to disable the extension', h3p:'Some browsers warn about developer-mode extensions at startup. Keep the extension enabled.',
  h4t:'How to update', h4p:'Download the new version, replace the files in the folder and click the extension’s reload button on the extensions page.',
  safeT:'Read-only.', safeP:' The extension never clicks, starts missions, spends energy or sends actions to the game.',
  riskT:'Use it in moderation.', riskP:' Any tool for online games carries risk. BoltMind is not affiliated with Hero Zero and cannot guarantee your account stays free of restrictions.',
  footer:'Independent tool for Hero Zero. Not affiliated with or endorsed by the game.', back:'Back to the BoltMind site'
 },
 pl: {
  pageTitle:'Jak zainstalować Heroic Sense', eyebrow:'Darmowe rozszerzenie · Heroic Sense v1.0.0',
  title:'Zainstaluj Heroic Sense w przeglądarce w 2 minuty.',
  lead:'Rozszerzenie pokazuje bezpośrednio na stronie Hero Zero, które misje dają najwięcej XP lub monet na energię. Wykonaj poniższe kroki.',
  chip1:'Za darmo, bez licencji', chip2:'Chrome, Edge, Brave i Opera', chip3:'Tylko odczyt', chip4:'5 języków panelu',
  download:'Pobierz rozszerzenie', downloadLong:'Pobierz darmowe rozszerzenie (ZIP)', seeSteps:'Zobacz kroki',
  s1t:'Pobierz rozszerzenie', s1p:'Pobierz plik ZIP rozszerzenia. Jest mały (około 40 KB).',
  s2t:'Rozpakuj do stałego folderu', s2p:'Kliknij ZIP prawym przyciskiem i wybierz „Wyodrębnij wszystkie”. Trzymaj folder w stałym miejscu, np. w Dokumentach. Nie usuwaj go później: przeglądarka wczytuje z niego rozszerzenie.',
  s3t:'Otwórz stronę rozszerzeń', s3p:'Skopiuj adres swojej przeglądarki i wklej go w pasek adresu (przeglądarki nie pozwalają otworzyć go z linku).',
  s4t:'Włącz tryb dewelopera', s4p:'W Chrome przełącznik jest w prawym górnym rogu. W Edge — w menu po lewej.',
  s5t:'Kliknij „Załaduj rozpakowane”', s5p:'Wybierz folder rozpakowany w kroku 2: ten z plikiem manifest.json. Następnie przypnij ikonę BoltMind z przycisku puzzla na pasku.',
  s6t:'Otwórz Hero Zero i zaloguj się', s6p:'Panel Heroic Sense pojawi się w prawym dolnym rogu strony gry. Wybierz PD/Energia lub Monety/Energia. Przeciągnij panel za nagłówek lub zminimalizuj przyciskiem „–”.',
  shotCaption:'Heroic Sense działający na stronie Hero Zero.',
  copy:'Kopiuj', copied:'Adres skopiowany. Wklej go w pasek adresu.',
  mockTitle:'Rozszerzenia', devMode:'Tryb dewelopera', loadUnpacked:'Załaduj rozpakowane', pack:'Spakuj rozszerzenie', update:'Aktualizuj',
  helpEyebrow:'Częste pytania', helpTitle:'Jeśli coś nie działa zgodnie z oczekiwaniami',
  h1t:'Panel ciągle czeka', h1p:'Kliknij „Odczytaj misje teraz”. Przeglądarka na chwilę pokaże, że rozszerzenie debuguje kartę: tak odczytuje misje, a potem się rozłącza.',
  h2t:'Po kliknięciu pojawił się komunikat', h2p:'Jeśli DevTools (F12) jest otwarte na karcie gry, zamknij je i kliknij ponownie.',
  h3t:'Przeglądarka prosi o wyłączenie rozszerzenia', h3p:'Niektóre przeglądarki ostrzegają przy starcie o rozszerzeniach w trybie dewelopera. Pozostaw rozszerzenie włączone.',
  h4t:'Jak zaktualizować', h4p:'Pobierz nową wersję, zastąp pliki w folderze i kliknij przycisk przeładowania rozszerzenia na stronie rozszerzeń.',
  safeT:'Tylko odczyt.', safeP:' Rozszerzenie nie klika, nie rozpoczyna misji, nie zużywa energii i nie wysyła akcji do gry.',
  riskT:'Używaj z umiarem.', riskP:' Każde narzędzie do gier online wiąże się z ryzykiem. BoltMind nie jest powiązany z Hero Zero i nie może zagwarantować, że konto nie zostanie ograniczone.',
  footer:'Niezależne narzędzie dla Hero Zero. Bez powiązań ani oficjalnego poparcia gry.', back:'Wróć na stronę BoltMind'
 },
 el: {
  pageTitle:'Πώς να εγκαταστήσετε το Heroic Sense', eyebrow:'Δωρεάν επέκταση · Heroic Sense v1.0.0',
  title:'Εγκαταστήστε το Heroic Sense στο πρόγραμμα περιήγησης σε 2 λεπτά.',
  lead:'Η επέκταση δείχνει, μέσα στη σελίδα του Hero Zero, ποιες αποστολές δίνουν την περισσότερη εμπειρία ή τα περισσότερα νομίσματα ανά ενέργεια. Ακολουθήστε τα βήματα.',
  chip1:'Δωρεάν, χωρίς άδεια', chip2:'Chrome, Edge, Brave και Opera', chip3:'Μόνο ανάγνωση', chip4:'5 γλώσσες πίνακα',
  download:'Λήψη επέκτασης', downloadLong:'Δωρεάν λήψη επέκτασης (ZIP)', seeSteps:'Δείτε τα βήματα',
  s1t:'Κατεβάστε την επέκταση', s1p:'Κατεβάστε το αρχείο ZIP της επέκτασης. Είναι μικρό (περίπου 40 KB).',
  s2t:'Αποσυμπιέστε σε μόνιμο φάκελο', s2p:'Κάντε δεξί κλικ στο ZIP και επιλέξτε «Εξαγωγή όλων». Κρατήστε τον φάκελο σε μόνιμη θέση, π.χ. στα Έγγραφα. Μην τον διαγράψετε: το πρόγραμμα περιήγησης φορτώνει την επέκταση από εκεί.',
  s3t:'Ανοίξτε τη σελίδα επεκτάσεων', s3p:'Αντιγράψτε τη διεύθυνση του προγράμματος περιήγησής σας και επικολλήστε τη στη γραμμή διευθύνσεων (δεν ανοίγει από σύνδεσμο).',
  s4t:'Ενεργοποιήστε τη λειτουργία προγραμματιστή', s4p:'Στο Chrome ο διακόπτης είναι πάνω δεξιά. Στο Edge βρίσκεται στο αριστερό μενού.',
  s5t:'Πατήστε «Φόρτωση μη πακεταρισμένης»', s5p:'Επιλέξτε τον φάκελο του βήματος 2: αυτόν που περιέχει το manifest.json. Μετά καρφιτσώστε το εικονίδιο BoltMind από το κουμπί του παζλ.',
  s6t:'Ανοίξτε το Hero Zero και συνδεθείτε', s6p:'Ο πίνακας Heroic Sense εμφανίζεται κάτω δεξιά στη σελίδα του παιχνιδιού. Επιλέξτε Εμπ./Ενέργεια ή Νομίσματα/Ενέργεια. Σύρετε τον πίνακα από την κεφαλίδα ή ελαχιστοποιήστε τον με «–».',
  shotCaption:'Το Heroic Sense σε λειτουργία στη σελίδα του Hero Zero.',
  copy:'Αντιγραφή', copied:'Η διεύθυνση αντιγράφηκε. Επικολλήστε τη στη γραμμή διευθύνσεων.',
  mockTitle:'Επεκτάσεις', devMode:'Λειτουργία προγραμματιστή', loadUnpacked:'Φόρτωση μη πακεταρισμένης', pack:'Πακετάρισμα', update:'Ενημέρωση',
  helpEyebrow:'Συχνές ερωτήσεις', helpTitle:'Αν κάτι δεν πάει όπως αναμενόταν',
  h1t:'Ο πίνακας περιμένει συνεχώς', h1p:'Πατήστε «Ανάγνωση αποστολών τώρα». Το πρόγραμμα περιήγησης δείχνει για λίγο ότι η επέκταση εντοπίζει σφάλματα στην καρτέλα: έτσι διαβάζει τις αποστολές και μετά αποσυνδέεται.',
  h2t:'Εμφανίστηκε προειδοποίηση στο κουμπί', h2p:'Αν τα DevTools (F12) είναι ανοιχτά στην καρτέλα του παιχνιδιού, κλείστε τα και πατήστε ξανά.',
  h3t:'Ζητείται απενεργοποίηση της επέκτασης', h3p:'Ορισμένα προγράμματα περιήγησης προειδοποιούν για επεκτάσεις προγραμματιστή στην εκκίνηση. Κρατήστε την επέκταση ενεργή.',
  h4t:'Πώς να ενημερώσετε', h4p:'Κατεβάστε τη νέα έκδοση, αντικαταστήστε τα αρχεία του φακέλου και πατήστε επαναφόρτωση στη σελίδα επεκτάσεων.',
  safeT:'Μόνο ανάγνωση.', safeP:' Η επέκταση δεν κάνει κλικ, δεν ξεκινά αποστολές, δεν ξοδεύει ενέργεια και δεν στέλνει ενέργειες στο παιχνίδι.',
  riskT:'Χρησιμοποιήστε τη με μέτρο.', riskP:' Κάθε εργαλείο για online παιχνίδια ενέχει κίνδυνο. Το BoltMind δεν συνδέεται με το Hero Zero και δεν εγγυάται ότι ο λογαριασμός δεν θα δεχθεί περιορισμούς.',
  footer:'Ανεξάρτητο εργαλείο για το Hero Zero. Χωρίς σχέση ή επίσημη υποστήριξη από το παιχνίδι.', back:'Επιστροφή στον ιστότοπο BoltMind'
 },
 de: {
  pageTitle:'Heroic Sense installieren', eyebrow:'Kostenlose Erweiterung · Heroic Sense v1.0.0',
  title:'Installiere Heroic Sense in 2 Minuten in deinem Browser.',
  lead:'Die Erweiterung zeigt direkt auf der Hero-Zero-Seite, welche Missionen die meisten XP oder Münzen pro Energie bringen. Folge den Schritten unten.',
  chip1:'Kostenlos, ohne Lizenz', chip2:'Chrome, Edge, Brave und Opera', chip3:'Nur lesen', chip4:'5 Sprachen im Panel',
  download:'Erweiterung herunterladen', downloadLong:'Kostenlose Erweiterung herunterladen (ZIP)', seeSteps:'Schritte ansehen',
  s1t:'Erweiterung herunterladen', s1p:'Lade die ZIP-Datei der Erweiterung herunter. Sie ist klein (etwa 40 KB).',
  s2t:'In einen festen Ordner entpacken', s2p:'Rechtsklick auf die ZIP-Datei und „Alle extrahieren“ wählen. Bewahre den Ordner an einem festen Ort auf, z. B. in Dokumente. Später nicht löschen: Der Browser lädt die Erweiterung daraus.',
  s3t:'Erweiterungsseite öffnen', s3p:'Kopiere die Adresse deines Browsers und füge sie in die Adressleiste ein (Browser erlauben das Öffnen per Link nicht).',
  s4t:'Entwicklermodus einschalten', s4p:'In Chrome ist der Schalter oben rechts. In Edge im Menü links.',
  s5t:'„Entpackte Erweiterung laden“ klicken', s5p:'Wähle den in Schritt 2 entpackten Ordner: den mit manifest.json. Hefte dann das BoltMind-Symbol über das Puzzle-Symbol an.',
  s6t:'Hero Zero öffnen und einloggen', s6p:'Das Heroic-Sense-Panel erscheint unten rechts auf der Spielseite. Wähle XP/Energie oder Münzen/Energie. Ziehe das Panel am Kopf oder minimiere es mit „–“.',
  shotCaption:'Heroic Sense auf der Hero-Zero-Seite.',
  copy:'Kopieren', copied:'Adresse kopiert. In die Adressleiste einfügen.',
  mockTitle:'Erweiterungen', devMode:'Entwicklermodus', loadUnpacked:'Entpackte Erweiterung laden', pack:'Erweiterung packen', update:'Aktualisieren',
  helpEyebrow:'Häufige Fragen', helpTitle:'Wenn etwas nicht wie erwartet läuft',
  h1t:'Das Panel wartet weiter', h1p:'Klicke auf „Missionen jetzt lesen“. Der Browser zeigt kurz an, dass die Erweiterung den Tab debuggt: So liest sie die Missionen und trennt sich danach.',
  h2t:'Beim Klick erschien ein Hinweis', h2p:'Wenn DevTools (F12) im Spiel-Tab offen ist, schließe sie und klicke erneut.',
  h3t:'Der Browser will die Erweiterung deaktivieren', h3p:'Manche Browser warnen beim Start vor Erweiterungen im Entwicklermodus. Lass die Erweiterung aktiviert.',
  h4t:'Aktualisieren', h4p:'Lade die neue Version, ersetze die Dateien im Ordner und klicke auf der Erweiterungsseite auf Neu laden.',
  safeT:'Nur lesen.', safeP:' Die Erweiterung klickt nicht, startet keine Missionen, verbraucht keine Energie und sendet keine Aktionen an das Spiel.',
  riskT:'Mit Maß verwenden.', riskP:' Jedes Tool für Onlinespiele birgt ein Risiko. BoltMind ist nicht mit Hero Zero verbunden und kann nicht garantieren, dass dein Account frei von Einschränkungen bleibt.',
  footer:'Unabhängiges Tool für Hero Zero. Keine Verbindung zum Spiel und keine offizielle Unterstützung.', back:'Zurück zur BoltMind-Seite'
 },
 fr: {
  pageTitle:'Installer Heroic Sense', eyebrow:'Extension gratuite · Heroic Sense v1.0.0',
  title:'Installez Heroic Sense dans votre navigateur en 2 minutes.',
  lead:'L’extension affiche, directement sur la page de Hero Zero, les missions qui rapportent le plus d’XP ou de pièces par énergie. Suivez les étapes ci-dessous.',
  chip1:'Gratuit, sans licence', chip2:'Chrome, Edge, Brave et Opera', chip3:'Lecture seule', chip4:'Panneau en 5 langues',
  download:'Télécharger l’extension', downloadLong:'Télécharger l’extension gratuite (ZIP)', seeSteps:'Voir les étapes',
  s1t:'Téléchargez l’extension', s1p:'Téléchargez le fichier ZIP de l’extension. Il est léger (environ 40 Ko).',
  s2t:'Extrayez-le dans un dossier permanent', s2p:'Clic droit sur le ZIP, puis « Extraire tout ». Gardez le dossier à un endroit fixe, comme Documents. Ne le supprimez pas : le navigateur charge l’extension depuis ce dossier.',
  s3t:'Ouvrez la page des extensions', s3p:'Copiez l’adresse de votre navigateur et collez-la dans la barre d’adresse (les navigateurs n’autorisent pas l’ouverture par un lien).',
  s4t:'Activez le mode développeur', s4p:'Dans Chrome, l’interrupteur est en haut à droite. Dans Edge, dans le menu de gauche.',
  s5t:'Cliquez sur « Charger l’extension non empaquetée »', s5p:'Choisissez le dossier extrait à l’étape 2 : celui qui contient manifest.json. Épinglez ensuite l’icône BoltMind via le bouton puzzle.',
  s6t:'Ouvrez Hero Zero et connectez-vous', s6p:'Le panneau Heroic Sense apparaît en bas à droite de la page du jeu. Choisissez XP/Énergie ou Pièces/Énergie. Déplacez le panneau par son en-tête ou réduisez-le avec « – ».',
  shotCaption:'Heroic Sense en action sur la page de Hero Zero.',
  copy:'Copier', copied:'Adresse copiée. Collez-la dans la barre d’adresse.',
  mockTitle:'Extensions', devMode:'Mode développeur', loadUnpacked:'Charger l’extension non empaquetée', pack:'Empaqueter', update:'Mettre à jour',
  helpEyebrow:'Questions fréquentes', helpTitle:'Si quelque chose ne se passe pas comme prévu',
  h1t:'Le panneau reste en attente', h1p:'Cliquez sur « Read missions now ». Le navigateur indique brièvement que l’extension débogue l’onglet : c’est ainsi qu’elle lit les missions, puis elle se déconnecte.',
  h2t:'Un avertissement est apparu', h2p:'Si les DevTools (F12) sont ouverts sur l’onglet du jeu, fermez-les et cliquez à nouveau.',
  h3t:'Le navigateur propose de désactiver l’extension', h3p:'Certains navigateurs avertissent au démarrage à propos des extensions du mode développeur. Gardez l’extension activée.',
  h4t:'Mettre à jour', h4p:'Téléchargez la nouvelle version, remplacez les fichiers du dossier et cliquez sur le bouton de rechargement de l’extension.',
  safeT:'Lecture seule.', safeP:' L’extension ne clique pas, ne lance pas de missions, ne dépense pas d’énergie et n’envoie aucune action au jeu.',
  riskT:'Utilisez-la avec modération.', riskP:' Tout outil pour jeux en ligne comporte un risque. BoltMind n’est pas affilié à Hero Zero et ne peut garantir que votre compte restera sans restriction.',
  footer:'Outil indépendant pour Hero Zero. Sans affiliation ni approbation officielle du jeu.', back:'Retour au site BoltMind'
 }
};
let lang = 'en';
try { const stored = localStorage.getItem('boltmind-language'); if (T[stored]) lang = stored; } catch {}

const dl = cls => `<a class="button ${cls} tutorial-download" href="${ZIP}" download="${ZIP_NAME}"><span aria-hidden="true">&#8595;</span><span data-tt="download"></span></a>`;
const mockBar = ring => `<div class="mock-bar"><b data-tt="mockTitle"></b><span class="toggle"><span data-tt="devMode"></span><span class="switch${ring ? ' ring' : ''}"></span></span></div>`;
const MARKUP = `
<button class="close-dialog" type="button" aria-label="Close" data-tutorial-close>&times;</button>
<div class="tutorial-head">
  <p class="eyebrow" data-tt="eyebrow"></p>
  <h2 data-tt="title"></h2>
  <p class="lead" data-tt="lead"></p>
  <ul class="chips"><li data-tt="chip1"></li><li data-tt="chip2"></li><li data-tt="chip3"></li><li data-tt="chip4"></li></ul>
</div>
<ol class="steps">
  <li class="step"><div><h3 data-tt="s1t"></h3><p data-tt="s1p"></p>${dl('button-primary')}</div></li>
  <li class="step"><div><h3 data-tt="s2t"></h3><p data-tt="s2p"></p>
    <div class="mock" aria-hidden="true"><div class="folder"><i></i><b>BoltMind Heroic Sense Extension v1.0.0</b><em>manifest.json · hook.js · panel.js …</em></div></div></div></li>
  <li class="step"><div><h3 data-tt="s3t"></h3><p data-tt="s3p"></p>
    <div class="copy-row">
      <button class="copy" type="button" data-copy="chrome://extensions">chrome://extensions <span data-tt="copy"></span></button>
      <button class="copy" type="button" data-copy="edge://extensions">edge://extensions <span data-tt="copy"></span></button>
    </div><p class="copied" role="status" aria-live="polite"></p></div></li>
  <li class="step"><div><h3 data-tt="s4t"></h3><p data-tt="s4p"></p><div class="mock" aria-hidden="true">${mockBar(true)}</div></div></li>
  <li class="step"><div><h3 data-tt="s5t"></h3><p data-tt="s5p"></p>
    <div class="mock" aria-hidden="true">${mockBar(false)}<div class="mock-row"><span class="mock-btn hl" data-tt="loadUnpacked"></span><span class="mock-btn" data-tt="pack"></span><span class="mock-btn" data-tt="update"></span></div></div></div></li>
  <li class="step"><div><h3 data-tt="s6t"></h3><p data-tt="s6p"></p>
    <figure class="shot"><button class="tutorial-zoom" type="button"><img src="assets/heroic-sense-extension.webp?v=20261107" alt="BoltMind Heroic Sense" width="1454" height="775" loading="lazy"></button><figcaption data-tt="shotCaption"></figcaption></figure></div></li>
</ol>
<p class="eyebrow help-eyebrow" data-tt="helpEyebrow"></p>
<h3 class="help-title" data-tt="helpTitle"></h3>
<div class="help">
  <article><h4 data-tt="h1t"></h4><p data-tt="h1p"></p></article>
  <article><h4 data-tt="h2t"></h4><p data-tt="h2p"></p></article>
  <article><h4 data-tt="h3t"></h4><p data-tt="h3p"></p></article>
  <article><h4 data-tt="h4t"></h4><p data-tt="h4p"></p></article>
</div>
<div class="safe"><span aria-hidden="true">&#10003;</span><div><strong data-tt="safeT"></strong><span data-tt="safeP"></span></div></div>
<div class="risk"><span aria-hidden="true">!</span><div><strong data-tt="riskT"></strong><span data-tt="riskP"></span></div></div>
<div class="tutorial-foot">${dl('button-primary')}</div>`;

const dialog = document.createElement('dialog');
dialog.id = 'sense-tutorial';
dialog.setAttribute('aria-labelledby', 'sense-tutorial-title');
dialog.innerHTML = MARKUP;
dialog.querySelector('h2').id = 'sense-tutorial-title';
document.body.append(dialog);

function render() {
  const t = T[lang] || T.en;
  dialog.querySelectorAll('[data-tt]').forEach(el => { el.textContent = t[el.dataset.tt] || ''; });
}
function open() {
  render();
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
function close() {
  if (dialog.open) dialog.close();
}
dialog.addEventListener('close', () => {
  if (location.hash === HASH) history.replaceState(null, '', location.pathname + location.search + '#heroic-sense');
});
dialog.querySelector('[data-tutorial-close]').addEventListener('click', close);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
});
dialog.querySelectorAll('.tutorial-download').forEach(link => link.addEventListener('click', () => {
  fetch(TRACK, { method: 'GET', mode: 'no-cors', cache: 'no-store', keepalive: true }).catch(() => {});
}));
dialog.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => {
  const status = button.closest('div').parentElement.querySelector('.copied');
  const done = () => { status.textContent = (T[lang] || T.en).copied; };
  if (navigator.clipboard) navigator.clipboard.writeText(button.dataset.copy).then(done, done); else done();
}));
dialog.querySelector('.tutorial-zoom').addEventListener('click', () => {
  const zoom = document.getElementById('image-dialog');
  const image = document.getElementById('zoom-image');
  if (!zoom || !image) return;
  image.src = 'assets/heroic-sense-extension.webp?v=20261107';
  image.alt = 'BoltMind Heroic Sense';
  zoom.showModal();
});
document.addEventListener('click', event => {
  const trigger = event.target.closest && event.target.closest('[data-open-tutorial]');
  if (!trigger) return;
  event.preventDefault();
  history.replaceState(null, '', HASH);
  open();
});
document.addEventListener('boltmind:language', event => {
  if (event.detail && T[event.detail.lang]) { lang = event.detail.lang; render(); }
});
window.addEventListener('hashchange', () => { if (location.hash === HASH) open(); });
if (location.hash === HASH) {
  if (document.readyState === 'complete') open(); else window.addEventListener('load', open, { once: true });
}
})();
