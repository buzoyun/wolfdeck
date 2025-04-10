function preload() {
  emptyImg = loadImage("assets/images/empty.png");
  comboImg = loadImage("assets/images/moves/combo.png");
  threeTImg = loadImage("assets/images/moves/3T.png");
  questionImg = loadImage("assets/images/question.png");
  wcBlueImg = loadImage("assets/images/packs/wc_blue.png");
  wcRedImg = loadImage("assets/images/packs/wc_red.png");
  seaGif = loadImage("assets/images/gifs/sea.gif");
  // Ability resimleri
  abilityImages = {};
  const abilities = [
    "Morale",
    "Money",
    "Sneak",
    "Rage",
    "Bloodlust",
    "Fear",
    "Cunning",
    "Perception",
    "Composure",
    "Badass",
    "3T Bonus",
  ];
  abilities.forEach((ability) => {
    const imgName = ability === "3T Bonus" ? "3T" : ability.toLowerCase();
    abilityImages[ability] = loadImage(`assets/images/moves/${imgName}.png`);
    clashSound = loadSound("assets/sounds/clash.mp3");
    selectSound = loadSound("assets/sounds/select.MP3");
    removeSound = loadSound("assets/sounds/remove.MP3");
    drumSound = loadSound("assets/sounds/drum.MP3");
  });
}

const abilityColors = {
  "3T Bonus": { text: "#000000", border: "#ced4d9" },
  Badass: { text: "#f67700", border: "#1b1b1b" },
  Composure: { text: "#fcb5db", border: "#622461" },
  Cunning: { text: "#a2efe7", border: "#083c3c" },
  Fear: { text: "#c42430", border: "#000000" },
  Money: { text: "#1e6f50", border: "#0c2e44" },
  Morale: { text: "#99e65f", border: "#1e6f50" },
  Perception: { text: "#99e65f", border: "#1b1b1b" },
  Rage: { text: "#ffeb57", border: "#ea323c" },
  Bloodlust: { text: "#ea323c", border: "#0f0f0f" },
  Sneak: { text: "#c7cfdd", border: "#2a2f4e" },
};
const blockRules = {
  Morale: "Fear",
  Fear: "Money",
  Money: "Cunning",
  Cunning: "Sneak",
  Sneak: "Perception",
  Perception: "Rage",
  Rage: "Composure",
  Composure: "Bloodlust",
  Bloodlust: "Badass",
  Badass: "Morale"
};
const headers = [
  "id",
  "Total Points",
  "Morale",
  "Money",
  "Sneak",
  "Rage",
  "Bloodlust",
  "Fear",
  "Cunning",
  "Perception",
  "Composure",
  "Badass",
  "3T Bonus",
];

// Global değişkenler
let userSelectedIDs = [];
let opponentSelectedIDs = [];
let loadedImages = {};
let emptyImg;
let inputActive = false;
let inputText = "";
let inputX = null;
let inputY = null;
let inputTeam = null;
let opponentTeamInitialized = false;
let sortColumn = "Total Points"; // Başlangıçta Total Points'e göre
let sortAscending = false; // Büyükten küçüğe
let currentPage = 0;
let itemsPerPage = 7;
let nextPageButton, prevPageButton, firstPageButton, lastPageButton;
let opponentTeamName = "Custom Pack";
let yourPackTitle = "Your Pack";
let editingYourPack = false;
let rivalPackTitle = "Rival Pack";
let editingRivalPack = false;
let tableBuffer;
let searchFilter = "";
let nftIds = [];
let searchInput, walletInput, columnSelect;
let selectedColumn = "Total Points"; // Varsayılan 4. sütun
let tableCacheDirty = true; // Tabloyu yeniden çizmemiz gerekip gerekmediğini kontrol eder
let wolfPointsCache = {}; // Wolf puanlarını önbelleğe alır
let resizedImages = {}; // 32x32 resimleri saklar
let debounceTimeout; // Debounce için
let battleStarted = false;
let battleText = [];
let battleTextIndex = 0;
let textDisplayTime = 0;
let animatedWolfSection = null; // Hangi takım animasyon yapacak (Your Pack veya Rival Pack)
let player1Input, player2Input;
let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Team = []; // Player 1’in seçili kurtları
let player2Team = []; // Player 2’in seçili kurtları
let showPopup = false; // Popup görünüyor mu?
let selectedWolfId = null; // Popup’ta seçilen kurt ID’si
let addToPlayer1Button, addToPlayer2Button; // Popup butonları
let showTeamPopup = false; // Takım detay popup'ı için
let selectedTeamIDs = null; // Popup'ta hangi takımın gösterileceği
let battleStep = 0; // Savaşın hangi aşamasında olduğumuzu takip eder
let attackIndex = 0, blockIndex = 0; // Hangi atak ve blok sırasındayız
let netAttacks = []; // Net atak puanları
let battleResultPopup = false; // Savaş sonucu popup'ı
let attackAbilities = ["Morale", "Money", "Sneak", "Rage", "Bloodlust"];
let defenseAbilities = ["Fear", "Cunning", "Perception", "Composure", "Badass"];
let player1Attacks = [];
let player2Attacks = [];
let player1Blocks = [];
let player2Blocks = [];
let player1Cards = [];
let player2Cards = [];
let player1Abilities = {};
let player2Abilities = {};
let player1ComboBonuses = {};
let player2ComboBonuses = {};
let player1ThreeTBonus = 0;
let player2ThreeTBonus = 0;
let leftSectionWidth = 400; // Savaş alanı ve takım bölümü genişliği
let netAttackValues = []; // Player 1 ve Player 2 için net atak puanları
let battleMessages = []; // Her satırdaki mesajları tutacak dizi
let netAttackP1 = 0; // P1'in net atak puanı
let netAttackP2 = 0; // P2'in net atak puanı
let currentAttackIndex = 0; // Şu anki atak sırası
let battleState = "attack"; // Başlangıç durumu
let stateStartTime = 0; // Durumun başlangıç zamanı
let winningTeam = ""; // Kazanan takım
let speedMultiplier = 1; // Hız katsayısı: 1 = normal, 2 = hızlı, 0.5 = yavaş
let isPaused = false; // Duraklatma durumu
let abilityImages = {}; // Ability resimleri için obje
let battleAnimationState = "p1_attacks"; // Animasyon durumu
let animationTimer = 0; // Animasyon zamanlayıcısı
let roundState = 0; // 0: Başlamadı, 1: 1. tur başladı, 2: 2. tur başladı
let player1AssignedBlocks = []; // Player 1'in Player 2 ataklarına karşı atanmış blokları
let player2AssignedBlocks = []; // Player 2'nin Player 1 ataklarına karşı atanmış blokları
let playButton;
let particles = [];
let shakeTimer = 0;
let flashAlpha = 0;
let clashSound;
let endTurnButtonActive = true; // End Turn butonunun aktif/pasif durumu
let endTurnButtonY = 200; // End Turn butonunun Y pozisyonu
let showNoDefendersMessage = false; // Mesaj kontrolü
let noDefendersMessageTimer = 0; // Mesaj zamanlayıcısı
let rivalTeams = [
  { name: "Player 2", imgId: "empty", ids: [], eliminatedBy: null },
  { name: "McWolves", imgId: "mc1", ids: ["mc1", "mc2", "mc3"], eliminatedBy: null },
  { name: "Street Wolves", imgId: "street1", ids: ["street1", "street2", "street3"], eliminatedBy: null },   
  { name: "Sea Wolves", imgId: "sea1", ids: ["sea1", "sea2", "sea3"], eliminatedBy: null },
  { name: "Mountain Wolves", imgId: "mountain1", ids: ["mountain1", "mountain2", "mountain3"], eliminatedBy: null },
  { name: "Fire Wolves", imgId: "fire1", ids: ["fire1", "fire2", "fire3"], eliminatedBy: null },
  { name: "Cyber Wolves", imgId: "cyber1", ids: ["cyber1", "cyber2", "cyber3"], eliminatedBy: null }, 
  { name: "Royal Wolves", imgId: "royal1", ids: ["royal1", "royal2", "royal3"], eliminatedBy: null },
  { name: "Ice Wolves", imgId: "ice1", ids: ["ice1", "ice2", "ice3"], eliminatedBy: null },
];
let selectedRivalTeam = "Player 2"; // Varsayılan olarak Player 2 seçili
const middleHeight = 247.5;
const CARD_SIZE = 75;
const CARD_SPACING = 3;
const animationSettings = {
  maxOffset: 60, // Uzaklaşma mesafesini azalt (orijinal: 40)
  moveOutDuration: 0.5, // Uzaklaşma süresini uzat (0-0.4 arası)
  holdDuration: 0.2, // Bekleme süresini kısalt (0.4-0.6)
  collisionDuration: 0.4 // Çarpışma süresini uzat (0.6-1.0)
};
const collisionSettings = {
  shakeIntensity: 5, // Titreşim şiddetini azalt (orijinal: 5)
  shakeDuration: 300, // Titreşim süresini kısalt (orijinal: 200)
  bounceDistance: 10 // Geri sekme mesafesi (offset hesaplamada kullanılacak)
};
let originalCardPositions = { p1: [], p2: [] }; // Orijinal konumları saklayacağız
let rivalCurrentPage = 0;
let rivalItemsPerPage = 9; // Bir sayfada 9 satır
let rivalFirstPageButton, rivalPrevPageButton, rivalNextPageButton, rivalLastPageButton;
let removeWolfButton; // Button for removing the wolf
let p1WolfPositions = []; // P1 takımındaki kurtların pozisyonları
let p2WolfPositions = []; // P2 takımındaki kurtların pozisyonları
let showTeamWolfPopup = false;
let selectedTeamWolfId = null;
let selectedTeamType = null;
let wcBlueImg;
let wcRedImg;
let showEmptyPopup = false; // Yeni popup durumu
let hoverScale = 1; // Hover büyüklük efekti
let hoverAlpha = 0; // Hover parlaklık efekti
let seaGif;
let showSeaGif = false;
let gifStartTime = 0;
const gifDuration = 3000; // 3 saniye
let battleHistory = []; // Savaş geçmişini tutacak
let currentBattle = null; // Aktif savaş bilgisi
let showInfoBox = false; // Bilgi kutucuğunun görünüp görünmeyeceğini kontrol eder
let infoBoxText = "";    // Bilgi kutucuğunda gösterilecek metin
let infoBoxX = 0;        // Bilgi kutucuğunun X pozisyonu
let infoBoxY = 0;        // Bilgi kutucuğunun Y pozisyonu


// Puanları önceden hesapla
function precomputeWolfPoints() {
  wolfdata.forEach((wolf) => {
    wolfPointsCache[wolf.id] = calculateWolfPoints(wolf);
  });
}

// setup fonksiyonu
function setup() {  
  // LocalStorage'dan verileri yükle
  loadRivalTeamsFromStorage();
  // Sayfa kapatılırken verileri kaydetmek için event listener ekle
  window.addEventListener('beforeunload', saveRivalTeamsToStorage);
  
  textFont("sans-serif"); // Varsayılan olarak sans-serif kullanıyoruz
  
  let canvasWidth = 840;
  let canvasHeight = 870;
  createCanvas(canvasWidth, canvasHeight);
  tableBuffer = createGraphics(200, 625);

  precomputeWolfPoints();

  // Varsayılan olarak Player 2 seçili olsun
  opponentSelectedIDs = [];
  rivalPackTitle = "Player 2";

  // Rival Teams resimleri yükle
  let rivalImgIds = rivalTeams
    .filter((team) => team.imgId && team.imgId !== "empty") // "empty" hariç tüm imgId'ler
    .map((team) => team.imgId);
  loadOpponentImages(rivalImgIds);
  
  // Mevcut butonlar ve ayarlar
  firstPageButton = createButton("<<");
  firstPageButton.style("border-radius", "5px");
  firstPageButton.style("font-size", "10px");
  firstPageButton.style("font-weight", "bold");
  firstPageButton.style("text-align", "center");
  firstPageButton.style("cursor", "pointer");
  
  prevPageButton = createButton("<");
  prevPageButton.style("border-radius", "5px");
  prevPageButton.style("font-size", "10px");
  prevPageButton.style("font-weight", "bold");
  prevPageButton.style("text-align", "center");
  prevPageButton.style("cursor", "pointer");
  
  nextPageButton = createButton(">");
  nextPageButton.style("border-radius", "5px");
  nextPageButton.style("font-size", "10px");
  nextPageButton.style("font-weight", "bold");
  nextPageButton.style("text-align", "center");
  nextPageButton.style("cursor", "pointer");
  
  lastPageButton = createButton(">>");
  lastPageButton.style("border-radius", "5px");
  lastPageButton.style("font-size", "10px");
  lastPageButton.style("font-weight", "bold");
  lastPageButton.style("text-align", "center");
  lastPageButton.style("cursor", "pointer");

  firstPageButton.mousePressed(firstPage);
  prevPageButton.mousePressed(prevPage);
  nextPageButton.mousePressed(nextPage);
  lastPageButton.mousePressed(lastPage);

  // Rival Selection için sayfa geçme butonları
  rivalFirstPageButton = createButton("<<");
  rivalFirstPageButton.style("border-radius", "5px");
  rivalFirstPageButton.style("font-size", "10px");
  rivalFirstPageButton.style("font-weight", "bold");
  rivalFirstPageButton.style("text-align", "center");
  rivalFirstPageButton.style("cursor", "pointer");
  
  rivalPrevPageButton = createButton("<");
  rivalPrevPageButton.style("border-radius", "5px");
  rivalPrevPageButton.style("font-size", "10px");
  rivalPrevPageButton.style("font-weight", "bold");
  rivalPrevPageButton.style("text-align", "center");
  rivalPrevPageButton.style("cursor", "pointer");
  
  rivalNextPageButton = createButton(">");
  rivalNextPageButton.style("border-radius", "5px");
  rivalNextPageButton.style("font-size", "10px");
  rivalNextPageButton.style("font-weight", "bold");
  rivalNextPageButton.style("text-align", "center");
  rivalNextPageButton.style("cursor", "pointer");
  
  rivalLastPageButton = createButton(">>");
  rivalLastPageButton.style("border-radius", "5px");
  rivalLastPageButton.style("font-size", "10px");
  rivalLastPageButton.style("font-weight", "bold");
  rivalLastPageButton.style("text-align", "center");
  rivalLastPageButton.style("cursor", "pointer");

  rivalFirstPageButton.mousePressed(rivalFirstPage);
  rivalPrevPageButton.mousePressed(rivalPrevPage);
  rivalNextPageButton.mousePressed(rivalNextPage);
  rivalLastPageButton.mousePressed(rivalLastPage); 
  


  // End Turn Butonu
playButton = createButton("Play");
playButton.size(75, 30);
playButton.position(386, 790);
playButton.style("border-radius", "30px");
playButton.style("font-size", "16px");
playButton.style("font-weight", "bold");
playButton.style("text-align", "center");
playButton.style("cursor", "pointer");
playButton.style("border", "2px solid #91eee6");
playButton.style("background-color", "transparent"); // Şeffaf arka plan
playButton.style("color", "#91eee6"); // Turkuaz yazı

// Hover efektleri: Add/Remove butonlarından alınmış
playButton.mouseOver(() => {
  playButton.style("background-color", "#91eee6"); // Turkuaz arka plan
  playButton.style("color", "#221f3e"); // Koyu mor yazı
});

playButton.mouseOut(() => {
  playButton.style("background-color", "transparent"); // Şeffaf arka plan
  playButton.style("color", "#91eee6"); // Turkuaz yazı
});

// Basma efekti
playButton.mousePressed(() => {
  if (userSelectedIDs.length > 0 && opponentSelectedIDs.length > 0) {
    startBattleRound1();
    updateEndTurnButtonStyle();
    if (drumSound) drumSound.play();
    console.log("Tur Bitti tıklandı!");
  } else {
    updateEndTurnButtonStyle();
    console.log("Hata: Turu bitirmek için her iki takımda kurtlar seçili olmalı!");
  }
});
  
  // İlk stil güncellemesi
  updateEndTurnButtonStyle();

  playButton.mouseReleased(() => {});
  
  // setup() fonksiyonu içindeki buton oluşturma kısmı
  addToPlayer1Button = createButton(`PLAYER 1`);
  if (addToPlayer1Button) {
  addToPlayer1Button.size(65, 25); // Daha büyük boyut
  addToPlayer1Button.style("background-color", "#0093ff"); // P1 mavi
  addToPlayer1Button.style("color", "#ffffff");
  addToPlayer1Button.style("border", "2px solid #0077cc");
  addToPlayer1Button.style("border-radius", "20px");
  addToPlayer1Button.style("font-size", "14px");
  addToPlayer1Button.style("font-weight", "bold");
  addToPlayer1Button.style("cursor", "pointer");
  addToPlayer1Button.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  addToPlayer1Button.hide();
  addToPlayer1Button.mousePressed(() => {
      if (
        selectedWolfId &&
        userSelectedIDs.length < 3 &&
        !userSelectedIDs.includes(selectedWolfId)
      ) {
        if (selectSound) selectSound.play();
        userSelectedIDs.push(selectedWolfId);
        player1Team = userSelectedIDs.slice();
        loadOpponentImages([selectedWolfId]);
        updateEndTurnButtonStyle();
        console.log(`Wolf ${selectedWolfId} added to Player 1`);
      }
      closePopup();
    });
  }
  
  addToPlayer2Button = createButton(`PLAYER 2`);
  if (addToPlayer2Button) {
  addToPlayer2Button.size(65, 25); // Daha büyük boyut
  addToPlayer2Button.style("background-color", "#ff4c40"); // P2 kırmızı
  addToPlayer2Button.style("color", "#ffffff");
  addToPlayer2Button.style("border", "2px solid #cc3a35");
  addToPlayer2Button.style("border-radius", "20px");
  addToPlayer2Button.style("font-size", "14px");
  addToPlayer2Button.style("font-weight", "bold");
  addToPlayer2Button.style("cursor", "pointer");
  addToPlayer2Button.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  addToPlayer2Button.hide();
  addToPlayer2Button.mousePressed(() => {
      if (
        selectedWolfId &&
        opponentSelectedIDs.length < 3 &&
        !opponentSelectedIDs.includes(selectedWolfId)
      ) {
        if (selectSound) selectSound.play();
        opponentSelectedIDs.push(selectedWolfId);
        player2Team = opponentSelectedIDs.slice();
        loadOpponentImages([selectedWolfId]);
        updateEndTurnButtonStyle();
        console.log(`Wolf ${selectedWolfId} added to Player 2`);
      }
      closePopup();
    });
  }

removeWolfButton = createButton("Remove wolf");
if (removeWolfButton) {
  styleButton(removeWolfButton);
  removeWolfButton.style("cursor", "pointer");
  removeWolfButton.hide();
  removeWolfButton.mousePressed(() => {
    if (selectedTeamWolfId && selectedTeamType) {
      const targetArray = selectedTeamType === "user" ? userSelectedIDs : opponentSelectedIDs;
      const index = targetArray.indexOf(selectedTeamWolfId);
      if (index !== -1) {
        targetArray.splice(index, 1);
        if (removeSound) removeSound.play();
        console.log(`Wolf ${selectedTeamWolfId} removed from ${selectedTeamType === "user" ? "Player 1" : "Player 2"}`);
        if (selectedTeamType === "user") {
          player1Team = userSelectedIDs.slice();
        } else {
          player2Team = opponentSelectedIDs.slice();
        }
        // Reset battle-related states if team changes
        battleStarted = false;
        updateEndTurnButtonStyle();
      }
      closeTeamWolfPopup();
    }
  });
}  
  
  
  searchInput = createInput("");
  if (searchInput) {
    searchInput.attribute("placeholder", "Enter NFT ID (1-7500)");
    searchInput.input(() => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        searchFilter = searchInput.value();
        nftIds = [];
        currentPage = 0;
        tableCacheDirty = true;
        drawWolfDataTableToBuffer();
      }, 300);
    });
  }

  walletInput = createInput("");
  if (walletInput) {
    walletInput.attribute("placeholder", "Filter by wallet address");
    walletInput.input(() => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        fetchNFTs();
      }, 300);
    });
  }

  columnSelect = createSelect();
  if (columnSelect) {
    columnSelect.option("Total Points");
    columnSelect.option("3T Bonus");
    headers.forEach((header) => {
      if (
        !["id", "Total Points", "3T Bonus"].includes(header)
      ) {
        columnSelect.option(header);
      }
    });
// Varsayılan olarak "Total Points" seçili olsun
    columnSelect.selected("Total Points");
    selectedColumn = "Total Points"; // Varsayılan sütun
    sortColumn = "Total Points";     // Varsayılan sıralama sütunu
    sortAscending = false;           // Büyükten küçüğe sıralama
    columnSelect.changed(() => {
      selectedColumn = columnSelect.value();
      sortColumn = selectedColumn;
      sortAscending = false;
      tableCacheDirty = true;
      drawWolfDataTableToBuffer();
    });
    columnSelect.hide();
    styleSelect(columnSelect);
  }
}



function updateEndTurnButtonStyle() {
  if (userSelectedIDs.length > 0 && opponentSelectedIDs.length > 0) {
    // Aktif stil
    playButton.style("border", "2px solid #91eee6");
    playButton.style("background-color", "transparent");
    playButton.style("color", "#91eee6");
    playButton.style("cursor", "pointer");
    
    playButton.mouseOver(() => {
      playButton.style("background-color", "#91eee6");
      playButton.style("color", "#221f3e");
    });
    playButton.mouseOut(() => {
      playButton.style("background-color", "transparent");
      playButton.style("color", "#91eee6");
    });
  } else {
    // Pasif stil
    playButton.style("background", "#1a1a2e");
    playButton.style("border", "2px solid #64636d");
    playButton.style("color", "#64636d");
    playButton.style("cursor", "not-allowed");
    
    playButton.mouseOver(() => {
      playButton.style("background", "#1a1a2e"); // Pasifken hover değişimi yok
    });
    playButton.mouseOut(() => {
      playButton.style("background", "#1a1a2e");
    });
  }
}



function closePopup() {
  showPopup = false;
  selectedWolfId = null;
  addToPlayer1Button.hide();
  addToPlayer2Button.hide();
}

function closeTeamWolfPopup() {
  showTeamWolfPopup = false;
  selectedTeamWolfId = null;
  selectedTeamType = null;
  removeWolfButton.hide();
}

// Dropdown için stil fonksiyonu
function styleSelect(sel) {
  sel.style("background-color", "#221f3e");
  sel.style("color", "#91eee6");
  sel.style("border", "1px solid #91eee6");
  sel.style("border-radius", "5px");
  sel.style("font-size", "12px");
  sel.style("font-weight", "bold");
  sel.style("padding", "5px");
}

// draw fonksiyonu
function draw() {
  background("#181530");
  //document.body.style.backgroundColor = "#181530";
  //background("#000000"); // Canvas içi siyah
  document.body.style.backgroundColor = "#000000"; // Sayfa arka planı siyah

  // Çerçeveyi çiz
  noFill();
  stroke("#3f3973");
  strokeWeight(4);
  rect(0, 0, width, height);
  noStroke();

  textSize(16);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("WolfDeck", 400, 40);


  // Wolf Capital yazısı (tıklanabilir)
  textSize(12);
  fill("#91eee6"); // Turkuaz renk
  textStyle(BOLD);
  text("by Wolf Capital", 485, 40);

  // Wolf Capital yazısının üzerine gelince el işareti çıkması ve tıklama kontrolü
  if (mouseX >= 450 && mouseX <= 540 && mouseY >= 25 && mouseY <= 40) {
  cursor(HAND);
  } else if (!showPopup && !showTeamPopup) {
  cursor(ARROW);
  }

  // Wolf Selection Bölümü
  const tableSectionWidth = 200;
  const tableSectionX = 10;
  const tableSectionY = 60;
  push();
  translate(tableSectionX, tableSectionY);
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  rect(0, 0, tableSectionWidth, 800, 10);
  textSize(14);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(LEFT);
  text("Wolf Selection", 10, 20);
  drawWolfDataTableToBuffer(tableSectionX);
  image(tableBuffer, 0, 150);

  const rowHeight = 80;
  const startIndex = currentPage * itemsPerPage;
  let sortedWolfdata = wolfdata
    .filter((w) => parseInt(w.id) <= 7500)
    .filter((w) => searchFilter === "" || w.id === searchFilter)
    .filter((w) => nftIds.length === 0 || nftIds.includes(w.id));
  if (sortColumn !== null) {
    sortedWolfdata.sort((a, b) => {
      let valA, valB;
      if (sortColumn === "id") {
        valA = parseInt(a.id) || 0;
        valB = parseInt(b.id) || 0;
      } else if (sortColumn === "Total Points") {
        valA = wolfPointsCache[a.id].totalPoints;
        valB = wolfPointsCache[b.id].totalPoints;
      } else if (sortColumn === "3T Bonus") {
        valA = has3TBonus(a) ? 9 : 0;
        valB = has3TBonus(b) ? 9 : 0;
      } else {
        valA = getAbilityScore(a, sortColumn) || 0;
        valB = getAbilityScore(b, sortColumn) || 0;
      }
      return sortAscending ? valA - valB : valB - valA;
    });
  }
  const pageData = sortedWolfdata.slice(startIndex, min(startIndex + itemsPerPage, sortedWolfdata.length));
  let yOffset = 150 + 45;
  pageData.forEach((wolf, index) => {
    noFill();
    stroke("#3f3973");
    strokeWeight(1);
    rect(0, yOffset, tableSectionWidth, rowHeight);
    yOffset += rowHeight;
  });
  pop();

// Takım Bölümleri
  const leftMargin = tableSectionX + tableSectionWidth + 10;
  p2WolfPositions = drawTeamSection(opponentSelectedIDs, leftMargin, 60, rivalPackTitle, "#ffe0e0", leftSectionWidth);
  p1WolfPositions = drawTeamSection(userSelectedIDs, leftMargin, 305 + 240 + 120, "Player 1", "#e0f0ff", leftSectionWidth);
  
// Savaş Alanı
  push();
  fill("#2e2a54");
  stroke("#3f3973");
  strokeWeight(1);
  const offset = 10;
  beginShape();
  vertex(leftMargin + offset, 170);
  vertex(leftMargin + leftSectionWidth - offset, 170);
  vertex(leftMargin + leftSectionWidth, 170 + middleHeight);
  vertex(leftMargin + leftSectionWidth - offset, 170 + 495); // 375 + 120 = 495
  vertex(leftMargin + offset, 170 + 495);
  vertex(leftMargin, 170 + middleHeight);
  endShape(CLOSE);
  stroke("#3f3973");
  strokeWeight(2);
  line(leftMargin + 10, 170 + middleHeight, leftMargin + leftSectionWidth - 10, 170 + middleHeight);
  pop();

  // Renkler
  const defaultColor = "#808080";
  const activeColor = "#91eee6";


  // End Turn arka planı (aşağı kaydı)
  if (playButton && playButton.elt.style.display !== "none") {
    push();
    translate(playButton.x, playButton.y + 125); // 125 aşağı kaydır
    fill(userSelectedIDs.length > 0 && opponentSelectedIDs.length > 0 ? activeColor : defaultColor);
    noStroke();
    rect(0, 0, 100, 30, 5);
    pop();
  }

// Kartların çizimi (önceki gibi ama middleHeight güncellendi)
  if (!battleStarted && (userSelectedIDs.length > 0 || opponentSelectedIDs.length > 0))  {
    const cardSize = 75;
    const cardSpacing = 3;
    const textOffset = 15;
    const maxCardsPerRow = 5;
    const middleLineY = 170 + middleHeight; // Yeni orta çizgi: 417.5
    const p1Cards = calculateCards(userSelectedIDs).filter(card => card.ability !== "3T Bonus");
    const p2Cards = calculateCards(opponentSelectedIDs).filter(card => card.ability !== "3T Bonus");

// Player 1 kartları
if (userSelectedIDs.length > 0) {
  player1Cards = calculateCards(userSelectedIDs);
  let p1FirstRow = p1Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
  let p1SecondRow = p1Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);
  
  let p1StartX = leftMargin + (leftSectionWidth - p1FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
  drawCards(p1FirstRow, p1StartX, middleLineY + 30, "#0093ff", cardSize, cardSpacing, textOffset);
  
  if (p1SecondRow.length > 0) {
    let p1SecondStartX = leftMargin + (leftSectionWidth - p1SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
    drawCards(p1SecondRow, p1SecondStartX, middleLineY + 60 + cardSize + cardSpacing, "#0093ff", cardSize, cardSpacing, textOffset);
  }
}

// Player 2 kartları (takımında kurt varsa çiz)
if (opponentSelectedIDs.length > 0) {
  player2Cards = calculateCards(opponentSelectedIDs);
  let p2FirstRow = p2Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
  let p2SecondRow = p2Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);
  
  let p2StartX = leftMargin + (leftSectionWidth - p2FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
  drawCards(p2FirstRow, p2StartX, middleLineY - cardSize - 30, "#ff4c40", cardSize, cardSpacing, textOffset);
  
  if (p2SecondRow.length > 0) {
    let p2SecondStartX = leftMargin + (leftSectionWidth - p2SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
    drawCards(p2SecondRow, p2SecondStartX, middleLineY - 2 * (cardSize + cardSpacing) - 60, "#ff4c40", cardSize, cardSpacing, textOffset);
  }
  }
  }
  
   if (showEmptyPopup) {
    drawEmptyPopup();
  } 
  
  // Savaş mantığı
  if (battleStarted) {
    handleBattle();
  }

  // Savaş sonucu gösterimi (ortaya kaydı)
  if (battleAnimationState === "end_round_2") {
    textSize(24);
    textAlign(CENTER);
    fill("#ffffff");
    text(`Winner: ${winningTeam}`, 475, 170 + 250 / 2); // Orta yükseklik: 170 + 250/2
  }

  // Input ve buton pozisyonları
  const inputWidth = min(tableSectionWidth - 30, 180);
  const inputHeight = 25;
  const padding = 15;
  searchInput.size(inputWidth, inputHeight);
  searchInput.position(tableSectionX + 5, tableSectionY + 30);
  walletInput.size(inputWidth, inputHeight);
  walletInput.position(tableSectionX + 5, tableSectionY + 30 + inputHeight + padding);
  textSize(12);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(LEFT);
  text("Sorted by", tableSectionX + 10, tableSectionY + 30 + 2 * (inputHeight + padding) + 10);
  columnSelect.size(inputWidth, inputHeight);
  columnSelect.position(tableSectionX + 10, tableSectionY + 30 + 2 * (inputHeight + padding) + 15);


  
  // Wolves Shown Metni
  let filteredWolvesCount;
  const searchValue = searchInput.value().trim();
  const walletValue = walletInput.value().trim();
  if (searchValue === "" && walletValue === "") {
    filteredWolvesCount = wolfdata.filter((w) => parseInt(w.id) <= 7500).length;
  } else if (searchValue !== "") {
    filteredWolvesCount = wolfdata.some((w) => w.id === searchValue) ? 1 : 0;
  } else if (walletValue !== "") {
    filteredWolvesCount = nftIds.length;
  } else {
    filteredWolvesCount = wolfdata.filter((w) => parseInt(w.id) <= 7500).length;
  }
textSize(12);
textStyle(NORMAL);
fill("#e1e2e6");
textAlign(CENTER);
fill("#e1e2e6"); // Yazıyı açık renkte tutalım ki görünsün
text(
  `${filteredWolvesCount} ${filteredWolvesCount === 1 ? "wolf" : "wolves"} shown`,
  tableSectionX + 100,
  tableSectionY + 43 + 2 * (inputHeight + padding) + 15 + inputHeight + 5
);
  
// Search Input için ✖ simgesi - Hover efekti (Merkez: 200, 110)
if (searchInput.value().length > 0) {
push();
textSize(14);
textStyle(NORMAL);
// Sabitler (draw() ile uyumlu olmalı)
const inputxButtonSize = 10; // Tıklanabilir alan boyutu (piksel cinsinden)
// Search ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,110)
const searchXButtonX = 200;
const searchXButtonY = 110;
// Wallet ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,150)
const walletXButtonX = 200;
const walletXButtonY = 150;

// Hover kontrolü (20x20 piksel alan)
if (mouseX >= searchXButtonX - inputxButtonSize / 2 &&
    mouseX <= searchXButtonX + inputxButtonSize / 2 &&
    mouseY >= searchXButtonY - inputxButtonSize - 2  &&
    mouseY <= searchXButtonY ) {
  fill("#ff0000"); // Hover durumunda kırmızı
  cursor(HAND);
} else {
  fill("#e1e2e6"); // Normal durumda açık gri
}

textAlign(CENTER);
text("✖", 200, 110); // Sabit koordinat
pop();
}
  
// Wallet Input için ✖ simgesi - Hover efekti (Merkez: 200, 150)
if (walletInput.value().length > 0) {  
push();
textSize(14);
textStyle(NORMAL);
// Sabitler (draw() ile uyumlu olmalı)
const inputxButtonSize = 10; // Tıklanabilir alan boyutu (piksel cinsinden)
// Search ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,110)
const searchXButtonX = 200;
const searchXButtonY = 110;
// Wallet ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,150)
const walletXButtonX = 200;
const walletXButtonY = 150;  

// Hover kontrolü (20x20 piksel alan)
if (mouseX >= walletXButtonX - inputxButtonSize / 2 &&
    mouseX <= walletXButtonX + inputxButtonSize / 2 &&
    mouseY >= walletXButtonY - inputxButtonSize - 2  &&
    mouseY <= walletXButtonY ) {
  fill("#ff0000"); // Hover durumunda kırmızı
  cursor(HAND);
} else {
  fill("#e1e2e6"); // Normal durumda açık gri
}

textAlign(CENTER);
text("✖", 200, 150); // Sabit koordinat
pop();
}  
  
  
  // Navigasyon Butonları
  const tableBottomY = tableSectionY + 150 + 7 * 75;
  const buttonWidth = 25;
  const buttonHeight = 20;
  const buttonSpacing = 2;
  firstPageButton.size(buttonWidth, buttonHeight);
  firstPageButton.position(tableSectionX + 10, tableBottomY + 85);
  firstPageButton.show();
  prevPageButton.size(buttonWidth, buttonHeight);
  prevPageButton.position(tableSectionX + 10 + buttonWidth + buttonSpacing, tableBottomY + 85);
  prevPageButton.show();
  nextPageButton.size(buttonWidth, buttonHeight);
  nextPageButton.position(tableSectionX + 7 + 2 * (buttonWidth + buttonSpacing) + 80, tableBottomY + 85);
  nextPageButton.show();
  lastPageButton.size(buttonWidth, buttonHeight);
  lastPageButton.position(tableSectionX + 7 + 3 * (buttonWidth + buttonSpacing) + 80, tableBottomY + 85);
  lastPageButton.show();

  const totalItems = sortedWolfdata.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPageDisplay = currentPage + 1;
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text(
    `${currentPageDisplay} of ${totalPages}`,
    tableSectionX + 20 + 2 * buttonWidth + 2 * buttonSpacing + 25,
    tableBottomY + 85 + buttonHeight / 2 + 5
  );

  // Popup
  if (showPopup && selectedWolfId) {
    push();
      const popupCenterX = width/2;
        const popupX = width / 2 - 175;
    const popupY = height / 2 - 105;
  addToPlayer1Button.position(popupCenterX - 0, popupY + 160); // Ortalanmış pozisyon
  addToPlayer2Button.position(popupCenterX + 10, popupY + 160);  // Ortalanmış pozisyon
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
    fill("#221f3e");
    stroke("#3f3973");
    strokeWeight(1);

    rect(popupX, popupY, 350, 210, 10);
    textSize(14);
    textStyle(BOLD);
    fill("#e1e2e6");
    textAlign(LEFT);
    text(`Wolf #${selectedWolfId}`, popupX + 10, popupY + 20);

    if (resizedImages[selectedWolfId]) {
      image(resizedImages[selectedWolfId], popupX + 10, popupY + 30, 75, 75);
    } else if (loadedImages[selectedWolfId]) {
      let img = loadedImages[selectedWolfId];
      let resized = createGraphics(75, 75);
      resized.image(img, 0, 0, 75, 75);
      resizedImages[selectedWolfId] = resized;
      image(resized, popupX + 10, popupY + 30, 75, 75);
    }

    const wolf = wolfdata.find((w) => w.id === selectedWolfId);
    if (wolf) {
      const { abilityScores } = getWolfAbilities(wolf);
      const has3T = has3TBonus(wolf);
      if (has3T) abilityScores["3T Bonus"] = 9;

      const attackColX = popupX + 100;
      const defenseColX = popupX + 210;
      let attackYOffset = popupY + 20;
      let defenseYOffset = popupY + 20;


      textSize(14);
      textStyle(NORMAL);
      fill("#e1e2e6");
      noStroke();
      text("Skills", attackColX + 80, attackYOffset);
      text("Add wolf to...", 255, 453);
      attackYOffset += 20;
      defenseYOffset += 20;

      

      const attackAbilities = ["Morale", "Money", "Sneak", "Rage", "Bloodlust", "3T Bonus"];
      attackAbilities.forEach((ability) => {
        const score = abilityScores[ability] || 0;
        drawHealthBar(attackColX, attackYOffset, score, "#176fc3"); 

        textSize(12);
        textStyle(NORMAL);
        fill("#ffffff"); 
        noStroke();
        text(`${ability}: ${score}`, attackColX + 5, attackYOffset + 5);
        attackYOffset += 20;
      });

      const defenseAbilities = ["Fear", "Cunning", "Perception", "Composure", "Badass"];
      defenseAbilities.forEach((ability) => {
        const score = abilityScores[ability] || 0;
        drawHealthBar(defenseColX, defenseYOffset, score, "#176fc3");
        fill("#ffffff");
        text(`${ability}: ${score}`, defenseColX + 5, defenseYOffset + 5);
        defenseYOffset += 20;
      });
    }

    const xButtonX = popupX + 330;
    const xButtonY = popupY + 15;
    pop();
    push();
    textFont("Arial");
    fill(0);
    noStroke();
    ellipse(xButtonX, xButtonY, 20, 20);
    fill("#F5F5F5");
    textAlign(CENTER);
    text("✖", xButtonX, xButtonY + 5);
    if (mouseX >= xButtonX - 10 && mouseX <= xButtonX + 10 && mouseY >= xButtonY - 10 && mouseY <= xButtonY + 10) {
      fill(255, 0, 0);
      ellipse(xButtonX, xButtonY, 20, 20);
      fill("#FFFFFF");
      text("✖", xButtonX, xButtonY + 5);
    }
    pop();

    // add wolf butonlarının konumu
    addToPlayer1Button.position(popupX + 7, popupY + 165);
    addToPlayer2Button.position(popupX + 7, popupY + 130);
    [searchInput,
    walletInput,
    columnSelect,
    player1Input,
    player2Input,
    firstPageButton,
    prevPageButton,
    nextPageButton,
    lastPageButton,
    rivalFirstPageButton,
    rivalPrevPageButton,
    rivalNextPageButton,
    rivalLastPageButton,
    playButton].forEach((element) => {
      if (element) element.style("opacity", "0.5");
    });
  } else {
    [searchInput,
    walletInput,
    columnSelect,
    player1Input,
    player2Input,
    firstPageButton,
    prevPageButton,
    nextPageButton,
    lastPageButton,
    rivalFirstPageButton,
    rivalPrevPageButton,
    rivalNextPageButton,
    rivalLastPageButton,
    playButton].forEach((element) => {
      if (element) element.style("opacity", "1");
    });
  }

// Team Wolf Popup
if (showTeamWolfPopup && selectedTeamWolfId) {
  push();
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  const popupX = width / 2 - 175;
  const popupY = height / 2 - 105;
  rect(popupX, popupY, 350, 210, 10);
  textSize(14);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(LEFT);
  text(`Wolf #${selectedTeamWolfId}`, popupX + 10, popupY + 20);

  if (resizedImages[selectedTeamWolfId]) {
    image(resizedImages[selectedTeamWolfId], popupX + 10, popupY + 30, 75, 75);
  } else if (loadedImages[selectedTeamWolfId]) {
    let img = loadedImages[selectedTeamWolfId];
    let resized = createGraphics(75, 75);
    resized.image(img, 0, 0, 75, 75);
    resizedImages[selectedTeamWolfId] = resized;
    image(resized, popupX + 10, popupY + 30, 75, 75);
  }

  const wolf = wolfdata.find((w) => w.id === selectedTeamWolfId);
  if (wolf) {
    const { abilityScores } = getWolfAbilities(wolf);
    const has3T = has3TBonus(wolf);
    if (has3T) abilityScores["3T Bonus"] = 9;

    const attackColX = popupX + 100;
    const defenseColX = popupX + 210;
    let attackYOffset = popupY + 20;
    let defenseYOffset = popupY + 20;

    textSize(14);
    textStyle(BOLD);
    fill("#e1e2e6");
    text("Skills", attackColX + 80, attackYOffset);
    attackYOffset += 20;
    defenseYOffset += 20;

    textSize(12);
    textStyle(NORMAL);
    const attackAbilities = ["Morale", "Money", "Sneak", "Rage", "Bloodlust", "3T Bonus"];
    attackAbilities.forEach((ability) => {
      const score = abilityScores[ability] || 0;
      drawHealthBar(attackColX, attackYOffset, score, "#03A9F4");
      fill("#e1e2e6");
      text(`${ability}: ${score}`, attackColX + 5, attackYOffset + 5);
      attackYOffset += 20;
    });

    const defenseAbilities = ["Fear", "Cunning", "Perception", "Composure", "Badass"];
    defenseAbilities.forEach((ability) => {
      const score = abilityScores[ability] || 0;
      drawHealthBar(defenseColX, defenseYOffset, score, "#03A9F4");
      fill("#e1e2e6");
      text(`${ability}: ${score}`, defenseColX + 5, defenseYOffset + 5);
      defenseYOffset += 20;
    });
  }

  const xButtonX = popupX + 330;
  const xButtonY = popupY + 15;
  pop();
  push();
  textFont("Arial");
  fill(0);
  noStroke();
  ellipse(xButtonX, xButtonY, 20, 20);
  fill("#F5F5F5");
  textAlign(CENTER);
  text("✖", xButtonX, xButtonY + 5);
  if (mouseX >= xButtonX - 10 && mouseX <= xButtonX + 10 && mouseY >= xButtonY - 10 && mouseY <= xButtonY + 10) {
    fill(255, 0, 0);
    ellipse(xButtonX, xButtonY, 20, 20);
    fill("#FFFFFF");
    text("✖", xButtonX, xButtonY + 5);
  }
  pop();

  // "Remove Wolf" butonunu yalnızca rivalPackTitle "Player 2" ise göster
  removeWolfButton.position(popupX + 126, popupY + 170);
  if (selectedTeamType === "opponent" && rivalPackTitle !== "Player 2") {
    removeWolfButton.hide();
  } else {
    removeWolfButton.show();
  }
}
  
  
// Takım Detay Popup'ı
if (showTeamPopup && selectedTeamIDs) {
  push();
  fill(0, 0, 0, 150); // Yarı şeffaf arka plan
  rect(0, 0, width, height);
  fill("#221f3e"); // Popup arka plan rengi
  stroke("#3f3973"); // Çerçeve rengi
  strokeWeight(1);
  const popupX = width / 2 - 180; // 360 genişlik için ortalanmış X
  const popupY = height / 2 - 250; // 500 yükseklik için ortalanmış Y
  rect(popupX, popupY, 360, 500, 10);

// Başlık

  textSize(14);
  textStyle(NORMAL); // Fontun kendi bold hali kullanılacak
  fill("#e1e2e6");
  textAlign(CENTER);
  // Player 1 için player1Name, Player 2 için rivalPackTitle kullan
  const teamTitle = selectedTeamIDs === userSelectedIDs ? player1Name : rivalPackTitle;
  text(`${teamTitle}'s Team Info`, popupX + 180, popupY + 20);

  // Seçili takımın skill puanlarını hesapla
  const selectedWolves = selectedTeamIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  const abilityScores = getTeamAbilities(selectedWolves); // Takımın skill puanları
  const numberOf3TWolves = selectedWolves.filter(wolf => has3TBonus(wolf)).length;
  abilityScores["3T Bonus"] = numberOf3TWolves === 1 ? 9 : numberOf3TWolves === 2 ? 18 : numberOf3TWolves >= 3 ? 27 : 0;

  // Skill Çemberi
  let centerX = popupX + 180; // Çemberin merkezi X
  let centerY = popupY + 230; // Çemberin merkezi Y
  let radius = 150; // Çemberin yarıçapı
  const skillOrder = ["Morale", "Badass", "Bloodlust", "Composure", "Rage", "Perception", "Sneak", "Cunning", "Money", "Fear"];
  const cardSize = 75; // Kart boyutu (daire çapı)

  // Skill kartlarını ve okları çiz
  for (let i = 0; i < skillOrder.length; i++) {
    let angle = (i * TWO_PI) / skillOrder.length - HALF_PI; // Her skill için açı (üstten başlar)
    let x = centerX + radius * cos(angle); // Skill kartı X koordinatı
    let y = centerY + radius * sin(angle); // Skill kartı Y koordinatı

    // Skill kartını çiz (daire şeklinde croplanmış)
    let skill = skillOrder[i];
    let score = abilityScores[skill] || 0; // Takımın bu skill'deki puanı
    let colors = abilityColors[skill] || { text: "#FFFFFF", border: "#000000" };

    // Kart arka planı (daire şeklinde)
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(x, y, cardSize / 3, 0, TWO_PI); // Daire maskesi
    drawingContext.clip();

    // Skill resmi (croplanmış)
    if (abilityImages[skill]) {
      image(abilityImages[skill], x - cardSize / 2, y - cardSize / 2, cardSize, cardSize);
    } else {
      // Resim yoksa placeholder
      fill(50);
      ellipse(x, y, cardSize, cardSize);
    }

    drawingContext.restore();
    pop();

    // Ok çizimi
    nextSkill = skillOrder[(i + 1) % skillOrder.length];
    let nextIndex = skillOrder.indexOf(nextSkill);
    if (nextIndex !== -1) {
      let nextAngle = (nextIndex * TWO_PI) / skillOrder.length - HALF_PI;
      let nextX = centerX + radius * cos(nextAngle);
      let nextY = centerY + radius * sin(nextAngle);

      // Yeni vektör hesaplama
      let dx = nextX - x;
      let dy = nextY - y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        let dirX = dx / distance;
        let dirY = dy / distance;
        let offset = cardSize / 2.2; // %10 daha kısa için
        let startX = x + dirX * offset;
        let startY = y + dirY * offset;
        let endX = nextX - dirX * offset;
        let endY = nextY - dirY * offset;

        stroke(255);
        strokeWeight(1.5);
        line(startX, startY, endX, endY);

        let arrowSize = 6;
        let arrowAngle = atan2(dy, dx);
        push();
        translate(endX, endY);
        rotate(arrowAngle);
        fill(255);
        noStroke();
        triangle(-arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2, 0, 0);
        pop();
      }
    }

    // Üstte puan skill circle
    push();
    textSize(16);
    textFont("Trebuchet MS");
    textStyle(BOLD);
    fill("#e1e2e6"); // Siyah arka plan
    stroke(0); // Beyaz çerçeve
    strokeWeight(3);
    textAlign(CENTER);
    text(score, x, y - cardSize / 2 + 10); // Puanı dairenin üstüne yerleştir
    pop();

    // Altta skill adı
    push();
    textSize(12);
    textStyle(BOLD);
    fill("#e1e2e6"); // Beyaz yazı
    noStroke();
    text(`${skill}`, x, y + cardSize / 2 - 5);
    pop();
  }

  // Ortadaki Combo ve 3T kartları
  const centerCardSize = cardSize * 0.8; // %20 daha küçük
  const centerSpacing = 20; // İki kart arası boşluk

  // Sol taraf - Combo Kartı
  const comboX = centerX - centerSpacing / 2 - 35 - centerCardSize / 2;
  const comboY = centerY - 30;

  // Combo kart arka planı (daire şeklinde)
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(comboX + centerCardSize / 2, comboY + centerCardSize / 2, centerCardSize / 3, 0, TWO_PI);
  drawingContext.clip();

  // Combo resmi
  if (comboImg) {
    image(comboImg, comboX, comboY, centerCardSize, centerCardSize);
  } else {
    fill(100);
    ellipse(comboX + centerCardSize / 2, comboY + centerCardSize / 2, centerCardSize, centerCardSize);
  }

  drawingContext.restore();
  pop();

  // Combo puanı (üstte)
  const comboBonus = calculateTraitBonusScore(selectedWolves);
  push();
  textSize(16);
  textFont("Trebuchet MS");
  textStyle(BOLD);
  fill("#e1e2e6"); // Siyah arka plan
  stroke(0); // Beyaz çerçeve
  strokeWeight(1);
  textAlign(CENTER);
  text(`${comboBonus}`, comboX + centerCardSize / 2, comboY + 7);
  pop();

  // "Combo Traits" yazısı (altta)
  push();
  textSize(12);
  textStyle(BOLD);
  fill("#e1e2e6"); // Beyaz yazı
  noStroke();
  text("Trait Combos", comboX + centerCardSize / 2, comboY + centerCardSize - 3);
  pop();

  // Sağ taraf - 3T Kartı
  const threeTX = centerX + centerSpacing / 2 - 15 + centerCardSize / 2;
  const threeTY = centerY - 30;

  // 3T kart arka planı (daire şeklinde)
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(threeTX + centerCardSize / 2, threeTY + centerCardSize / 2, centerCardSize / 3, 0, TWO_PI);
  drawingContext.clip();

  // 3T resmi
  if (threeTImg) {
    image(threeTImg, threeTX, threeTY, centerCardSize, centerCardSize);
  } else {
    fill(100);
    ellipse(threeTX + centerCardSize / 2, threeTY + centerCardSize / 2, centerCardSize, centerCardSize);
  }

  drawingContext.restore();
  pop();

  // 3T Bonus puanı (üstte)
  const threeTBonus = numberOf3TWolves === 1 ? 9 : 
                     numberOf3TWolves === 2 ? 18 : 
                     numberOf3TWolves >= 3 ? 27 : 0;
  push();
  textSize(16);
  textFont("Trebuchet MS");
  textStyle(BOLD);
  fill("#e1e2e6"); // Siyah arka plan
  stroke(0); // Beyaz çerçeve
  strokeWeight(1);
  textAlign(CENTER);
  text(`${threeTBonus}`, threeTX + centerCardSize / 2, threeTY + 7);
  pop();

  // "Three Traits" yazısı (altta)
  push();
  textSize(12);
  textStyle(BOLD);
  fill("#e1e2e6"); // Beyaz yazı
  noStroke();
  text("3T Wolves", threeTX + centerCardSize / 2, threeTY + centerCardSize - 3);
  pop();

  // Açıklama metni (çemberin altında)
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("", popupX + 180, popupY + 430);

  // Kapatma butonu (✖)
  const xButtonX = popupX + 340;
  const xButtonY = popupY + 15;
  textFont("Arial");
  fill(0);
  noStroke();
  ellipse(xButtonX, xButtonY, 20, 20);
  fill("#F5F5F5");
  textAlign(CENTER);
  text("✖", xButtonX, xButtonY + 5);
  if (
    mouseX >= xButtonX - 10 &&
    mouseX <= xButtonX + 10 &&
    mouseY >= xButtonY - 10 &&
    mouseY <= xButtonY + 10
  ) {
    fill(255, 0, 0);
    ellipse(xButtonX, xButtonY, 20, 20);
    fill("#FFFFFF");
    text("✖", xButtonX, xButtonY + 5);
  }

  
    textSize(12);
    textStyle(NORMAL);
    fill("#e1e2e6");
    textAlign(LEFT);
    const infoStartY = popupY + 440; // Popup'un alt kısmına yakın
    text("• Each skill blocks another (e.g. Perception blocks Sneak)", popupX + 10, infoStartY + 10);
    text("• +2 bonus for 2 same traits, +3 bonus for triple", popupX + 10, infoStartY + 25);
    text("• +9 bonus per 3T wolf (wolves with only 3 traits)", popupX + 10, infoStartY + 40);  
  
  
  
  pop();
}

  // Rival Selection Bölümü
  const rivalSectionX = leftMargin + leftSectionWidth + 10;
  const rivalSectionY = 60;
  drawRivalSelectionTable(rivalSectionX, rivalSectionY);

  searchInput.show();
  walletInput.show();
  columnSelect.show();

    // Sea Wolves GIF gösterimi
  if (showSeaGif) {
    const elapsed = millis() - gifStartTime;
    if (elapsed < gifDuration) {
      imageMode(CENTER);
      image(seaGif, width/2, height/2, 400, 400);
      imageMode(CORNER);
    } else {
      showSeaGif = false;
    }
  }  
 
// Tüm çizimlerin sonunda bilgi kutucuğunu çiz
  if (showInfoBox) {
    push();
    fill("#221f3e");
    stroke("#3f3973");
    strokeWeight(1);
    const boxWidth = 230;
    const boxHeight = 20;
    let boxX = infoBoxX - boxWidth / 2;
    let boxY = infoBoxY - boxHeight - 10;

    // Ekran sınırları içinde tut
    boxX = constrain(boxX, 0, width - boxWidth);
    boxY = constrain(boxY, 0, height - boxHeight);

    rect(boxX, boxY, boxWidth, boxHeight, 5);
    textSize(12);
    textStyle(NORMAL);
    fill("#e1e2e6");
    textAlign(CENTER);
    text(infoBoxText, boxX + boxWidth / 2, boxY + boxHeight / 2 + 3);
    pop();
  }
}

// Yardımcı fonksiyonlar
function drawEmptyPopup() {
  push();
  fill(0, 0, 0, 150); // Yarı şeffaf arka plan
  rect(0, 0, width, height);
  
  // Popup kutusu
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  const popupWidth = 300;
  const popupHeight = 200;
  const popupX = width / 2 - popupWidth / 2;
  const popupY = height / 2 - popupHeight / 2;
  rect(popupX, popupY, popupWidth, popupHeight, 10);

  // Popup başlığı
  textSize(16);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("Team Info", popupX + popupWidth / 2, popupY + 25);

  // Kapatma butonu (✖)
  const xButtonX = popupX + popupWidth - 25;
  const xButtonY = popupY + 15;
  pop();
  push();
  textFont("Arial");
  fill(0);
  noStroke();
  ellipse(xButtonX, xButtonY, 20, 20);
  fill("#F5F5F5");
  text("✖", xButtonX, xButtonY + 5);

  // Kapatma butonu hover efekti
  if (
    mouseX >= xButtonX - 10 &&
    mouseX <= xButtonX + 10 &&
    mouseY >= xButtonY - 10 &&
    mouseY <= xButtonY + 10
  ) {
    fill(255, 0, 0);
    ellipse(xButtonX, xButtonY, 20, 20);
    fill("#FFFFFF");
    text("✖", xButtonX, xButtonY + 5);
    pop();
  }

  // İçerik (boş)
  textSize(14);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("This is an empty popup.", popupX + popupWidth / 2, popupY + popupHeight / 2);

  pop();
  
  

  
  
}


// Tek kart çizme fonksiyonu (drawCards yerine)
function drawCard(card, x, y, color, size, textOffset) {
  fill(color);
  rect(x, y, size, size, 10);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(card.id, x + size / 2, y + size / 2 - textOffset);
  text(card.attack, x + size / 2, y + size / 2 + textOffset);
}

function drawCards(cards, xStart, yStart, teamColor, cardSize, cardSpacing, textOffset) {
  const filteredCards = cards.filter(card => card.ability !== "3T Bonus");

  filteredCards.forEach((card, index) => {
    let xPos = floor(xStart + index * (cardSize + cardSpacing));
    let img = abilityImages[card.ability];
    let colors = abilityColors[card.ability] || { text: "#ffffff", border: teamColor };
    let displayTeamColor = teamColor === "#0093ff" ? "#0093ff" : "#ff4c40";

    // Çerçeve
    push();
    stroke("#64636d");
    strokeWeight(5);
    noFill();
    rect(xPos + 5, yStart + 3, cardSize - 10, cardSize - 3, 3);
    pop();

    if (img) {
      let clipX = floor(xPos + 5);
      let clipY = floor(yStart + 3);
      let clipW = cardSize - 10; // 65
      let clipH = cardSize - 3;  // 72

      let drawX = floor(clipX + (clipW - img.width) / 2);
      let drawY = floor(clipY + (clipH - img.height) / 2);

      push();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.roundRect(clipX, clipY, clipW, clipH, 3);
      drawingContext.clip();
      image(img, drawX, drawY, img.width, img.height);
      drawingContext.restore();
      pop();
    }

    // PUAN üstte
    push();
    textSize(20);
    textFont("Trebuchet MS");
    textStyle(BOLD);
    fill(displayTeamColor);
    noStroke();
    textAlign(CENTER);
    text(`${card.score}`, xPos + cardSize / 2, yStart - textOffset + 13);
    pop();

    push();
    textSize(13);
    textFont("Trebuchet MS");
    textStyle(BOLD);
    fill(colors.text);
    stroke(colors.border);
    strokeWeight(3);
    text(card.ability.toUpperCase(), xPos + cardSize / 2, yStart + cardSize + textOffset - 12);
    noStroke();
    pop();
  });
}

// Güncellenmiş drawRivalSelectionTable fonksiyonu
function drawRivalSelectionTable(x, y) {
  const tableWidth = 200;
  const rowHeight = 80;
  const imageSize = 75;
  const clipWidth = imageSize - 10;
  const clipHeight = imageSize - 3;
  const tableHeight = 800; // Wolf Selection ile aynı yükseklik

  push();
  translate(x, y);
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  rect(0, 0, tableWidth, tableHeight, 10);

  textSize(14);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(LEFT);
  text("Rival Selection", 10, 20);

  // Yenilen takım sayısını hesapla (Player 2 hariç)
  const defeatedTeamsCount = rivalTeams.filter(team => team.eliminatedBy !== null && team.name !== "Player 2").length;
  // Royal Wolves'un yenilip yenilmediğini kontrol et
  const isRoyalWolvesDefeated = rivalTeams.some(team => team.name === "Royal Wolves" && team.eliminatedBy !== null);

  // Pagination
  const startIndex = rivalCurrentPage * rivalItemsPerPage;
  const endIndex = min(startIndex + rivalItemsPerPage, rivalTeams.length);
  const pageData = rivalTeams.slice(startIndex, endIndex);

  pageData.forEach((team, index) => {
    let yOffset = 30 + index * rowHeight;

    // Royal Wolves ve Ice Wolves kontrolü
    const isRoyalWolves = team.name === "Royal Wolves";
    const isIceWolves = team.name === "Ice Wolves";
    const isRoyalWolvesSelectable = defeatedTeamsCount >= 6;
    const isIceWolvesSelectable = isRoyalWolvesDefeated;

    // Takım kilitli mi?
    const isRoyalWolvesLocked = isRoyalWolves && !isRoyalWolvesSelectable;
    const isIceWolvesLocked = isIceWolves && !isIceWolvesSelectable;

    // Satır arka planı
    fill((isRoyalWolvesLocked || isIceWolvesLocked) ? "#1a1a2e" : (index % 2 === 0 ? "#302a5d" : "#221f3e")); // Kilitliyse koyu renk
    noStroke();
    rect(0, yOffset, tableWidth, rowHeight);

    // İnce çerçeve
    stroke("#3f3973");
    strokeWeight(1);
    noFill();
    rect(0, yOffset, tableWidth, rowHeight);

    // Resim çizimi
    let imgX = floor(10); // Tam sayı
    let imgY = floor(yOffset + (rowHeight - imageSize) / 2); // Tam sayı

    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(imgX + 5, imgY + 1, clipWidth, clipHeight, 5);
    drawingContext.clip();

    if (isIceWolvesLocked) {
      // Ice Wolves kilitliyse question.png göster
      if (!resizedImages["question"]) {
        let resized = createGraphics(imageSize, imageSize);
        resized.drawingContext.beginPath();
        resized.drawingContext.roundRect(0, 0, imageSize, imageSize, 10);
        resized.drawingContext.clip();
        resized.image(questionImg, 0, 0, imageSize, imageSize);
        resizedImages["question"] = resized;
      }
      image(resizedImages["question"], imgX, imgY, imageSize, imageSize);
    } else if (team.imgId && loadedImages[team.imgId]) {
      // Royal Wolves dahil normal resim
      if (!resizedImages[team.imgId]) {
        let img = loadedImages[team.imgId];
        let resized = createGraphics(imageSize, imageSize);
        resized.drawingContext.beginPath();
        resized.drawingContext.roundRect(0, 0, imageSize, imageSize, 10);
        resized.drawingContext.clip();
        resized.image(img, 0, 0, imageSize, imageSize);
        resizedImages[team.imgId] = resized;
      }
      image(resizedImages[team.imgId], imgX, imgY, imageSize, imageSize);
    } else {
      if (!resizedImages["empty"]) {
        let resized = createGraphics(imageSize, imageSize);
        resized.drawingContext.beginPath();
        resized.drawingContext.roundRect(0, 0, imageSize, imageSize, 10);
        resized.drawingContext.clip();
        resized.image(emptyImg, 0, 0, imageSize, imageSize);
        resizedImages["empty"] = resized;
      }
      image(resizedImages["empty"], imgX, imgY, imageSize, imageSize);
    }

    drawingContext.restore();
    pop();

    // Takım adı
    textSize(12);
    textStyle(NORMAL);
    fill((isRoyalWolvesLocked || isIceWolvesLocked) ? "#64636d" : "#e1e2e6"); // Kilitliyse gri yazı
    textAlign(LEFT);
    text(isIceWolvesLocked ? "???" : team.name, imgX + imageSize + 6, yOffset + rowHeight / 2 - 5);

    // Eğer takım yenilmişse
    if (team.eliminatedBy && !isIceWolvesLocked) {
      // Kırmızı çarpı ekle (resmin üzerine)
      push();
      stroke("#e42712"); // Kırmızı renk
      strokeWeight(4); // Kalın çizgi
      line(imgX + 12, imgY + 10, imgX + 75 - 12, imgY + 75 - 10);
      line(imgX + 75 - 12, imgY + 10, imgX + 12, imgY + 75 - 10);
      pop();

      // "eliminated by" mesajını alt satıra al
      textSize(12);
      fill("#91eee6"); // Kırmızı renk
      text(`eliminated by`, imgX + imageSize + 6, yOffset + rowHeight / 2 + 10);
      text(team.eliminatedBy, imgX + imageSize + 6, yOffset + rowHeight / 2 + 25);
    }

    // Kilitliyse yarı şeffaf katman ekle
    if (isRoyalWolvesLocked || isIceWolvesLocked) {
      fill(0, 0, 0, 150); // Yarı şeffaf siyah katman
      rect(0, yOffset, tableWidth, rowHeight);
    }

    // Seçili takım vurgusu
    if (selectedRivalTeam === team.name && !isRoyalWolvesLocked && !isIceWolvesLocked) {
      push();
      noFill();
      stroke("#91eee6");
      strokeWeight(2);
      rect(0, yOffset, tableWidth, rowHeight, 5);
      pop();
    }
  });

  // Sayfa geçme butonları
  const tableBottomY = tableHeight - 40; // Butonlar için alt kısımda yer aç
  const buttonWidth = 25;
  const buttonHeight = 20;
  const buttonSpacing = 2;

  rivalFirstPageButton.size(buttonWidth, buttonHeight);
  rivalFirstPageButton.position(x + 10, y + tableBottomY);
  rivalFirstPageButton.show();

  rivalPrevPageButton.size(buttonWidth, buttonHeight);
  rivalPrevPageButton.position(x + 10 + buttonWidth + buttonSpacing, y + tableBottomY);
  rivalPrevPageButton.show();

  rivalNextPageButton.size(buttonWidth, buttonHeight);
  rivalNextPageButton.position(x + 7 + 2 * (buttonWidth + buttonSpacing) + 80, y + tableBottomY);
  rivalNextPageButton.show();

  rivalLastPageButton.size(buttonWidth, buttonHeight);
  rivalLastPageButton.position(x + 7 + 3 * (buttonWidth + buttonSpacing) + 80, y + tableBottomY);
  rivalLastPageButton.show();

  const totalRivalPages = Math.ceil(rivalTeams.length / rivalItemsPerPage);
  const currentRivalPageDisplay = rivalCurrentPage + 1;
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text(
    `${currentRivalPageDisplay} of ${totalRivalPages}`,
    20 + 2 * buttonWidth + 2 * buttonSpacing + 25,
    tableBottomY + buttonHeight / 2 + 5
  );

  pop();
}


function drawHealthBar(x, y, score, color, maxUnits = 12) {
  const barWidth = 100; // Bar genişliğini artırdık (yazının tamamını kapsayacak)
  const barHeight = 16; // Bar yüksekliğini biraz artırdık
  const fillWidth = (score / maxUnits) * barWidth; // Dolu kısım genişliği

  // Arka plan (boş bar)
  push();
  fill("#64636d"); // Gri arka plan
  noStroke();
  rect(x, y - barHeight / 2, barWidth, barHeight, 5); // Yuvarlak köşeler, y merkezlendi

  // Dolu kısım
  fill(color); // #22d3ee (atak) veya #ca8a04 (defans)
  rect(x, y - barHeight / 2, min(fillWidth, barWidth), barHeight, 5); // Dolu kısmı çiz
  pop();
}

function startBattleRound1() {
  if (userSelectedIDs.length === 0 || opponentSelectedIDs.length === 0) {
    console.log("Hata: Her iki takımda da kurt olmalı!");
    return;
  }

    // Önceki savaş verilerini temizle
  currentBattle = {
    startTime: new Date().toISOString(),
    initialUserTeam: [...userSelectedIDs], // O anki takımın kopyası
    initialOpponentTeam: [...opponentSelectedIDs]
  };
  
  // Kartları ve pozisyonları yeniden hesapla
  player1Cards = calculateCards(userSelectedIDs);
  player2Cards = calculateCards(opponentSelectedIDs);
  saveOriginalPositions();

  battleStarted = true;
  battleAnimationState = "p1_attacks";
  animationTimer = 0;
  stateStartTime = millis();
  shakeTimer = 100;
  playButton.hide();
  
  console.log("Yeni savaş başladı! Kart sayıları:", {
    player1: player1Cards.length, 
    player2: player2Cards.length
  });
}

function initializeBattle() {
  const userWolves = userSelectedIDs.map((id) =>
    wolfdata.find((w) => w.id === id)
  );
  const opponentWolves = opponentSelectedIDs.map((id) =>
    wolfdata.find((w) => w.id === id)
  );

  player1Abilities = getTeamAbilities(userWolves);
  player2Abilities = getTeamAbilities(opponentWolves);
  //player1ComboBonuses = calculateComboBonuses(userWolves);
  //player2ComboBonuses = calculateComboBonuses(opponentWolves);
  // New 3T Bonus calculation for Player 1
  const player1ThreeTCount = userWolves.filter((wolf) => has3TBonus(wolf)).length;
  player1ThreeTBonus = player1ThreeTCount === 1 ? 3 : player1ThreeTCount === 2 ? 12 : player1ThreeTCount === 3 ? 27 : 0;

  // New 3T Bonus calculation for Player 2
  const player2ThreeTCount = opponentWolves.filter((wolf) => has3TBonus(wolf)).length;
  player2ThreeTBonus = player2ThreeTCount === 1 ? 3 : player2ThreeTCount === 2 ? 12 : player2ThreeTCount === 3 ? 27 : 0;

  // Player 1 atakları
  player1Attacks = [];
  attackAbilities.forEach((ability) => {
    let score =
      (player1Abilities[ability] || 0);
    if (score > 0) player1Attacks.push({ ability, score });
  });
  if (player1ThreeTBonus > 0)
    player1Attacks.push({ ability: "3T Bonus", score: player1ThreeTBonus });

  // Player 2 atakları
  player2Attacks = [];
  attackAbilities.forEach((ability) => {
    let score =
      (player2Abilities[ability] || 0);
    if (score > 0) player2Attacks.push({ ability, score });
  });
  if (player2ThreeTBonus > 0)
    player2Attacks.push({ ability: "3T Bonus", score: player2ThreeTBonus });

  // Player 1 blokları (Player 2'nin ataklarına karşı)
  player1Blocks = [];
  defenseAbilities.forEach((ability) => {
    let score =
      (player1Abilities[ability] || 0);
    if (score > 0) player1Blocks.push({ ability, score });
  });
  while (player1Blocks.length < player2Attacks.length) {
    player1Blocks.push({ ability: "none", score: 0 });
  }

  // Player 2 blokları (Player 1'in ataklarına karşı)
  player2Blocks = [];
  defenseAbilities.forEach((ability) => {
    let score =
      (player2Abilities[ability] || 0);
    if (score > 0) player2Blocks.push({ ability, score });
  });
  while (player2Blocks.length < player1Attacks.length) {
    player2Blocks.push({ ability: "none", score: 0 });
  }

  // Player 2'nin bloklarını Player 1'in ataklarına ata
  let availableBlocksP2 = [...player2Blocks];
  player2AssignedBlocks = player1Attacks.map((attack) => {
    let requiredBlock = blockRules[attack.ability];
    let blockIndex = availableBlocksP2.findIndex(
      (block) => block.ability === requiredBlock
    );
    if (blockIndex !== -1) {
      let block = availableBlocksP2.splice(blockIndex, 1)[0];
      return block;
    } else {
      return { ability: "none", score: 0 };
    }
  });

  // Player 1'in bloklarını Player 2'nin ataklarına ata
  let availableBlocksP1 = [...player1Blocks];
  player1AssignedBlocks = player2Attacks.map((attack) => {
    let requiredBlock = blockRules[attack.ability];
    let blockIndex = availableBlocksP1.findIndex(
      (block) => block.ability === requiredBlock
    );
    if (blockIndex !== -1) {
      let block = availableBlocksP1.splice(blockIndex, 1)[0];
      return block;
    } else {
      return { ability: "none", score: 0 };
    }
  });

  // Savaş için diğer değişkenleri sıfırla
  netAttacks = [];
  netAttackValues = Array(player1Attacks.length + player2Attacks.length).fill(
    0
  );
  currentAttackIndex = 0;
  battleState = "attack";
  stateStartTime = millis();

  console.log("player1Attacks:", player1Attacks);
  console.log("player2AssignedBlocks:", player2AssignedBlocks);
  console.log("player2Attacks:", player2Attacks);
  console.log("player1AssignedBlocks:", player1AssignedBlocks);
}

function calculateCards(teamIDs) {
  const wolves = teamIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  if (wolves.length === 0) return [];

  const abilityScores = {};
  wolves.forEach(wolf => {
    const { abilityScores: wolfAbilities } = getWolfAbilities(wolf);
    Object.entries(wolfAbilities).forEach(([ability, score]) => {
      abilityScores[ability] = (abilityScores[ability] || 0) + score;
    });
  });

  //const comboBonuses = calculateComboBonuses(wolves);
  //Object.entries(comboBonuses).forEach(([ability, bonus]) => {
  //  abilityScores[ability] = (abilityScores[ability] || 0) + bonus;
  //});

  // 3T Bonus hesaplama
  const numberOf3TWolves = wolves.filter(wolf => has3TBonus(wolf)).length;
  if (numberOf3TWolves > 0) {
    abilityScores["3T Bonus"] = numberOf3TWolves === 1 ? 9 : 
                               numberOf3TWolves === 2 ? 18 : 
                               27;
  }

  return Object.entries(abilityScores)
    .filter(([_, score]) => score > 0)
    .map(([ability, score]) => ({ ability, score }));
}


function calculateAllCards(wolves, teamName) {
  const allAbilities = [
    "Morale", "Money", "Sneak", "Rage", "Bloodlust",
    "Fear", "Cunning", "Perception", "Composure", "Badass"
  ];
  let cards = [];
  
  const teamAbilities = getTeamAbilities(wolves);
  //const comboBonuses = calculateComboBonuses(wolves);
  const numberOf3TWolves = wolves.filter((wolf) => has3TBonus(wolf)).length;
  let threeTBonus = numberOf3TWolves === 1 ? 9 : numberOf3TWolves === 2 ? 18 : numberOf3TWolves >= 3 ? 27 : 0;

  allAbilities.forEach((ability) => {
    const score = (teamAbilities[ability] || 0);
    if (score > 0) {
      cards.push({
        ability: ability,
        score: score,
        team: teamName
      });
    }
  });

  if (threeTBonus > 0) {
    cards.push({ ability: "3T Bonus", score: threeTBonus, team: teamName });
  }

  return cards;
}


function calculatePlayer1Attacks() {
  const userWolves = userSelectedIDs.map((id) =>
    wolfdata.find((w) => w.id === id)
  );
  player1Abilities = getTeamAbilities(userWolves);
  //player1ComboBonuses = calculateComboBonuses(userWolves);
  
  const player1ThreeTCount = userWolves.filter((wolf) => has3TBonus(wolf)).length;
  player1ThreeTBonus = player1ThreeTCount === 1 ? 3 : player1ThreeTCount === 2 ? 12 : player1ThreeTCount >= 3 ? 27 : 0;

  player1Attacks = [];
  attackAbilities.forEach((ability) => {
    let score =
      (player1Abilities[ability] || 0);
    if (score > 0) player1Attacks.push({ ability, score });
  });
  if (player1ThreeTBonus > 0)
    player1Attacks.push({ ability: "3T Bonus", score: player1ThreeTBonus });
  console.log("player1Attacks calculated:", player1Attacks);
}

function calculatePlayer2Blocks() {
  const opponentWolves = opponentSelectedIDs.map((id) =>
    wolfdata.find((w) => w.id === id)
  );
  player2Abilities = getTeamAbilities(opponentWolves);
  //player2ComboBonuses = calculateComboBonuses(opponentWolves);

  player2Blocks = [];
  defenseAbilities.forEach((ability) => {
    let score =
      (player2Abilities[ability] || 0);
    if (score > 0) player2Blocks.push({ ability, score });
  });
  while (player2Blocks.length < player1Attacks.length) {
    player2Blocks.push({ ability: "none", score: 0 });
  }
  console.log("player2Blocks calculated:", player2Blocks);
}

  function assignPlayer2Blocks(isDefenderCall = false) {
  let availableBlocksP2 = [...player2Blocks];
  player2AssignedBlocks = player1Attacks.map(attack => {
    if (attack.ability === "3T Bonus") return { ability: "none", score: 0 };

    let requiredBlock = blockRules[attack.ability];
    let blockIndex = availableBlocksP2.findIndex(block => block.ability === requiredBlock);

    if (blockIndex !== -1) {
      let block = availableBlocksP2.splice(blockIndex, 1)[0];
      return block;
    } else {
      return { ability: "none", score: 0 };
    }
  });

  // Mesajı yalnızca Defenders butonundan çağrıldığında tetikle
  if (isDefenderCall && player2AssignedBlocks.every(block => block.ability === "none")) {
    showNoDefendersMessage = true;
    noDefendersMessageTimer = millis();
    console.log("P2 için tüm bloklar eksik, 'No defenders exist' mesajı tetiklendi!");
  }

  console.log("player2AssignedBlocks assigned:", player2AssignedBlocks);
}


function calculatePlayer2Attacks() {
  const opponentWolves = opponentSelectedIDs.map(id => wolfdata.find(w => w.id === id));
  player2Abilities = getTeamAbilities(opponentWolves);
  //player2ComboBonuses = calculateComboBonuses(opponentWolves);
  
  const player2ThreeTCount = opponentWolves.filter((wolf) => has3TBonus(wolf)).length;
  player2ThreeTBonus = player2ThreeTCount === 1 ? 3 : player2ThreeTCount === 2 ? 12 : player2ThreeTCount >= 3 ? 27 : 0;

  player2Attacks = [];
  attackAbilities.forEach(ability => {
    let score = (player2Abilities[ability] || 0);
    if (score > 0) player2Attacks.push({ ability, score });
  });
  if (player2ThreeTBonus > 0) player2Attacks.push({ ability: "3T Bonus", score: player2ThreeTBonus });
}

function calculatePlayer1Blocks() {
  const userWolves = userSelectedIDs.map(id => wolfdata.find(w => w.id === id));
  player1Abilities = getTeamAbilities(userWolves);
  //player1ComboBonuses = calculateComboBonuses(userWolves);

  player1Blocks = [];
  defenseAbilities.forEach(ability => {
    let score = (player1Abilities[ability] || 0);
    if (score > 0) player1Blocks.push({ ability, score });
  });
  while (player1Blocks.length < player2Attacks.length) {
    player1Blocks.push({ ability: "none", score: 0 });
  }
}

  function assignPlayer1Blocks(isDefenderCall = false) {
  let availableBlocksP1 = [...player1Blocks];
  player1AssignedBlocks = player2Attacks.map(attack => {
    if (attack.ability === "3T Bonus") return { ability: "none", score: 0 };

    let requiredBlock = blockRules[attack.ability];
    let blockIndex = availableBlocksP1.findIndex(block => block.ability === requiredBlock);

    if (blockIndex !== -1) {
      let block = availableBlocksP1.splice(blockIndex, 1)[0];
      return block;
    } else {
      return { ability: "none", score: 0 };
    }
  });

  // Mesajı yalnızca Defenders butonundan çağrıldığında tetikle
  if (isDefenderCall && player1AssignedBlocks.every(block => block.ability === "none")) {
    showNoDefendersMessage = true;
    noDefendersMessageTimer = millis();
    console.log("P1 için tüm bloklar eksik, 'No defenders exist' mesajı tetiklendi!");
  }

  console.log("player1AssignedBlocks assigned:", player1AssignedBlocks);
}


function firstPage() {
  if (currentPage > 0) {
    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  }
}

function lastPage() {
  const totalItems = wolfdata
    .filter((w) => parseInt(w.id) <= 7500)
    .filter((w) => searchFilter === "" || w.id === searchFilter)
    .filter((w) => nftIds.length === 0 || nftIds.includes(w.id)).length;
  const maxPage = Math.ceil(totalItems / itemsPerPage) - 1;
  if (currentPage < maxPage) {
    currentPage = maxPage;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  }
}

function nextPage() {
  const totalItems = wolfdata
    .filter((w) => parseInt(w.id) <= 7500)
    .filter((w) => searchFilter === "" || w.id === searchFilter)
    .filter((w) => nftIds.length === 0 || nftIds.includes(w.id)).length;
  const maxPage = Math.ceil(totalItems / itemsPerPage) - 1;
  if (currentPage < maxPage) {
    currentPage++;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  }
}


// Rival Selection için sayfa geçme fonksiyonları
function rivalFirstPage() {
  rivalCurrentPage = 0;
}

function rivalPrevPage() {
  if (rivalCurrentPage > 0) rivalCurrentPage--;
}

function rivalNextPage() {
  const totalRivalPages = Math.ceil(rivalTeams.length / rivalItemsPerPage);
  if (rivalCurrentPage < totalRivalPages - 1) rivalCurrentPage++;
}

function rivalLastPage() {
  rivalCurrentPage = Math.ceil(rivalTeams.length / rivalItemsPerPage) - 1;
}


function handleBattle() {
  const cardSize = CARD_SIZE;
  const cardSpacing = CARD_SPACING;
  const textOffset = 15;
  const maxOffset2 = 10;
  const middleLineY = 417.5;
  const maxCardsPerRow = 5;
  const leftMargin = 220;

  animationTimer = millis() - stateStartTime;
  const totalAnimationTime = 1000;
  const progress = min(animationTimer / totalAnimationTime, 1);

  if (battleAnimationState === "p1_attacks") {
    if (!window.animationInitialized) {
      window.animationInitialized = true;
      stateStartTime = millis();
      
      // Orijinal kart pozisyonlarını 2 satır halinde kaydet
      if (originalCardPositions.p1.length === 0) {
        saveOriginalPositions();
      }
      
      shakeTimer = 150;
      flashAlpha = 0;
    }

    applyShake();

let offset, yPos;
if (progress < animationSettings.moveOutDuration) {
  offset = easeOutCubic(progress/animationSettings.moveOutDuration) * animationSettings.maxOffset;
} else if (progress < animationSettings.moveOutDuration + animationSettings.holdDuration) {
  offset = animationSettings.maxOffset;
} else {
  let collisionProgress = (progress-(animationSettings.moveOutDuration + animationSettings.holdDuration))/animationSettings.collisionDuration;  
  offset = animationSettings.maxOffset - easeInSine(collisionProgress) * animationSettings.maxOffset;

}    
    
// Çarpışma anı (progress 0.45-0.55 arası)
if (progress >= 0.45 && progress <= 0.55 && !window.clashTriggered) {
  window.clashTriggered = true;
  if (!clashSound.isPlaying()) clashSound.play();
  flashAlpha = 200;
  shakeTimer = collisionSettings.shakeDuration;
}

    if (flashAlpha > 0) {
      fill(255, 255, 255, flashAlpha);
      noStroke();
      rect(0, 0, width, height);
      flashAlpha -= 5;
    }

    // Player 1 kartlarını 2 satır halinde animasyonla çiz
    let p1FirstRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
    let p1SecondRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);
    
    let p1StartX = leftMargin + (leftSectionWidth - p1FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
    p1FirstRow.forEach((card, index) => {
      let pos = originalCardPositions.p1[index];
      yPos = pos.originalY + offset;
      if (progress >= 0.45 && progress <= 0.55) yPos = middleLineY;
      drawSingleCard(card, pos.originalX, yPos, "#0093ff");
    });

    if (p1SecondRow.length > 0) {
      let p1SecondStartX = leftMargin + (leftSectionWidth - p1SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
      p1SecondRow.forEach((card, index) => {
        let posIndex = index + maxCardsPerRow;
        if (posIndex < originalCardPositions.p1.length) {
          let pos = originalCardPositions.p1[posIndex];
          yPos = pos.originalY + offset;
          if (progress >= 0.45 && progress <= 0.55) yPos = middleLineY + cardSize + cardSpacing;
          drawSingleCard(card, pos.originalX, yPos, "#0093ff");
        }
      });
    }

// Player 2 kartlarını 2 satır halinde animasyonla çiz
let p2FirstRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
let p2SecondRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);

let p2StartX = leftMargin + (leftSectionWidth - p2FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
p2FirstRow.forEach((card, index) => {
  // Pozisyonun tanımlı olduğundan emin ol
  if (index < originalCardPositions.p2.length) {
    let pos = originalCardPositions.p2[index];
    if (pos) { // pos undefined değilse devam et
      let yPos = pos.originalY - offset;
      if (progress >= 0.45 && progress <= 0.55) yPos = middleLineY - cardSize - cardSpacing;
      drawSingleCard(card, pos.originalX, yPos, "#ff4c40");
    }
  }
});

if (p2SecondRow.length > 0) {
  let p2SecondStartX = leftMargin + (leftSectionWidth - p2SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
  p2SecondRow.forEach((card, index) => {
    let posIndex = index + maxCardsPerRow;
    // Pozisyonun tanımlı olduğundan emin ol
    if (posIndex < originalCardPositions.p2.length) {
      let pos = originalCardPositions.p2[posIndex];
      if (pos) { // pos undefined değilse devam et
        let yPos = pos.originalY - offset;
        if (progress >= 0.45 && progress <= 0.55) yPos = middleLineY - 2 * (cardSize + cardSpacing);
        drawSingleCard(card, pos.originalX, yPos, "#ff4c40");
      }
    }
  });
}

    if (progress >= 1) {
      battleAnimationState = "show_results";
      window.animationInitialized = false;
      window.clashTriggered = false;
      calculateBattleResult(userSelectedIDs, opponentSelectedIDs);
    }
  }
  
  if (battleAnimationState === "show_results") {
    // Sonuç ekranında kartları orijinal pozisyonlarında göster
    let p1FirstRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
    let p1SecondRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);
    
    let p1StartX = leftMargin + (leftSectionWidth - p1FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
    drawCards(p1FirstRow, p1StartX, middleLineY + 30, "#0093ff", cardSize, cardSpacing, textOffset);
    
    if (p1SecondRow.length > 0) {
      let p1SecondStartX = leftMargin + (leftSectionWidth - p1SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
      drawCards(p1SecondRow, p1SecondStartX, middleLineY + 60 + cardSize + cardSpacing, "#0093ff", cardSize, cardSpacing, textOffset);
    }

    let p2FirstRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
    let p2SecondRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);
    
    let p2StartX = leftMargin + (leftSectionWidth - p2FirstRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
    drawCards(p2FirstRow, p2StartX, middleLineY - cardSize - 30, "#ff4c40", cardSize, cardSpacing, textOffset);
    
    if (p2SecondRow.length > 0) {
      let p2SecondStartX = leftMargin + (leftSectionWidth - p2SecondRow.length * (cardSize + cardSpacing) + cardSpacing) / 2;
      drawCards(p2SecondRow, p2SecondStartX, middleLineY - 2 * (cardSize + cardSpacing) - 60, "#ff4c40", cardSize, cardSpacing, textOffset);
    }

    textSize(16);
    textStyle(BOLD);
    fill("#ffffff");
    textAlign(CENTER);
    //text(`P1 Net Attack: ${netAttackP1 || 0}`, leftMargin + leftSectionWidth / 2, middleLineY - 20);
    //text(`P2 Net Attack: ${netAttackP2 || 0}`, leftMargin + leftSectionWidth / 2, middleLineY + 20);

    if (animationTimer >= 1000) {
      winningTeam = netAttackP1 > netAttackP2 ? "Player 1" : netAttackP2 > netAttackP1 ? `${rivalPackTitle}` : "No one";
      push();
      textSize(24);
      textFont("Trebuchet MS");
      text(`${winningTeam} wins!`, leftMargin + leftSectionWidth / 2, middleLineY);
      pop();

      if (animationTimer >= 2000) {
        resetBattleState();
      }
    }
  }
}


function saveOriginalPositions() {
  const maxCardsPerRow = 5;
  const leftMargin = 220;
  
  // Player 1 pozisyonları
  originalCardPositions.p1 = [];
  let p1FirstRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
  let p1SecondRow = player1Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);

  let p1StartX = leftMargin + (leftSectionWidth - p1FirstRow.length * (CARD_SIZE + CARD_SPACING) + CARD_SPACING) / 2;
  p1FirstRow.forEach((card, index) => {
    originalCardPositions.p1.push({
      originalX: p1StartX + index * (CARD_SIZE + CARD_SPACING),
      originalY: 447.5
    });
  });

  if (p1SecondRow.length > 0) {
    let p1SecondStartX = leftMargin + (leftSectionWidth - p1SecondRow.length * (CARD_SIZE + CARD_SPACING) + CARD_SPACING) / 2;
    p1SecondRow.forEach((card, index) => {
      originalCardPositions.p1.push({
        originalX: p1SecondStartX + index * (CARD_SIZE + CARD_SPACING),
        originalY: 447.5 + CARD_SIZE + CARD_SPACING
      });
    });
  }

  // Player 2 pozisyonları
  originalCardPositions.p2 = [];
  let p2FirstRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(0, maxCardsPerRow);
  let p2SecondRow = player2Cards.filter(card => card.ability !== "3T Bonus").slice(maxCardsPerRow);

  let p2StartX = leftMargin + (leftSectionWidth - p2FirstRow.length * (CARD_SIZE + CARD_SPACING) + CARD_SPACING) / 2;
  p2FirstRow.forEach((card, index) => {
    originalCardPositions.p2.push({
      originalX: p2StartX + index * (CARD_SIZE + CARD_SPACING),
      originalY: 342.5
    });
  });

  if (p2SecondRow.length > 0) {
    let p2SecondStartX = leftMargin + (leftSectionWidth - p2SecondRow.length * (CARD_SIZE + CARD_SPACING) + CARD_SPACING) / 2;
    p2SecondRow.forEach((card, index) => {
      originalCardPositions.p2.push({
        originalX: p2SecondStartX + index * (CARD_SIZE + CARD_SPACING),
        originalY: 342.5 - CARD_SIZE - CARD_SPACING
      });
    });
  }
  updateEndTurnButtonStyle();
  console.log("Pozisyonlar güncellendi:", {
    p1: originalCardPositions.p1.length,
    p2: originalCardPositions.p2.length
  });
}

// drawSingleCard fonksiyonunu da güncelle
function drawSingleCard(card, x, y, teamColor) {
  if (!card || card.ability === "3T Bonus" || x === undefined || y === undefined) return;
  
  push();
  // Kart gölgesi
  fill(0, 0, 0, 50);
  noStroke();
  rect(x + 7, y + 10, CARD_SIZE, CARD_SIZE, 5);
  
  // Kart gövdesi (orijinal stile dönüş)
  noFill();
  stroke("#64636d");
  strokeWeight(5);
  rect(x + 5, y + 3, CARD_SIZE - 10, CARD_SIZE - 3, 5);

  // Ability resmi (orijinal clip stili)
  if (abilityImages[card.ability]) {
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(x + 5, y + 3, CARD_SIZE - 10, CARD_SIZE - 3, 5);
    drawingContext.clip();
    image(abilityImages[card.ability], x, y, CARD_SIZE, CARD_SIZE);
    drawingContext.restore();
    pop();
  }
  
  // Puan üstte (animasyon için)
    push();
  textSize(20);
  textFont("Trebuchet MS");
  textStyle(BOLD);
  fill(teamColor === "#0093ff" ? "#0093ff" : "#ff4c40");
  noStroke();
  textAlign(CENTER);
  text(`${card.score}`, x + CARD_SIZE/2, y - 2); // Üstte orijinal pozisyon
    pop();
  
  // Ability adı (orijinal stil)
  const colors = abilityColors[card.ability] || { text: "#ffffff", border: teamColor };
  push();
  textSize(13);
  textFont("Trebuchet MS");  
  textStyle(BOLD);
  fill(colors.text);
  stroke(colors.border);
  strokeWeight(5);
  text(card.ability.toUpperCase(), x + CARD_SIZE/2, y + CARD_SIZE + 15); // Altta orijinal pozisyon
  noStroke();
  pop();
}


function resetBattleState() {
  battleStarted = false;
  battleAnimationState = "p1_attacks";
  animationTimer = 0;
  stateStartTime = 0;
  
  // Orijinal pozisyonları ve kartları sıfırla
  originalCardPositions.p1 = [];
  originalCardPositions.p2 = [];
  player1Cards = [];
  player2Cards = [];
  
  window.animationInitialized = false;
  window.clashTriggered = false;
  playButton.show();
  
  // Yeni kartlar için pozisyonları yeniden hesapla
  saveOriginalPositions();
}

function determineWinner() {
  calculateNetAttack("P1");
  calculateNetAttack("P2");
  winningTeam = netAttackP1 > netAttackP2 ? "Player 1" : netAttackP2 > netAttackP1 ? "Player 2" : "Tie";
}

// Titreşim efekti
function applyShake() {
  if (shakeTimer > 0) {
    let intensity = map(shakeTimer, collisionSettings.shakeDuration, 0, 
                       collisionSettings.shakeIntensity, 0);
    translate(random(-intensity, intensity), random(-intensity, intensity));
    shakeTimer -= deltaTime;
  }
}

// Kolaylaştırılmış hareket fonksiyonları
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInSine(t) {
  return 1 - Math.cos((t * Math.PI) / 2);
}



function easeOutQuad(t) {
  return t * (2 - t);
}
function easeInQuad(t) {
  return t * (t);
}


// Net atak puanını hesaplama
function calculateNetAttack(player) {
  if (player === "P1") {
    netAttackP1 = player1Attacks.reduce((total, attack, index) => {
      const block = player2AssignedBlocks[index] || { score: 0 };
      const damage = attack.ability === "3T Bonus" ? attack.score : Math.max(0, attack.score - block.score);
      return total + damage;
    }, 0);
  } else if (player === "P2") {
    netAttackP2 = player2Attacks.reduce((total, attack, index) => {
      const block = player1AssignedBlocks[index] || { score: 0 };
      const damage = Math.max(0, attack.score - block.score); // P2 için 3T Bonus yok varsayımı
      return total + damage;
    }, 0);
  }
}

function drawButton(x, y, size, symbol, onClick) {
  const isHovered =
    mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size;
  fill(isHovered ? "#91eee6" : "#221f3e");
  stroke("#91eee6");
  strokeWeight(1);
  rect(x, y, size, size, 5);
  fill(isHovered ? "#221f3e" : "#91eee6");
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text(symbol, x + size / 2, y + size / 2 + 2);
}

// YENİ Savaş başlatıldığında sıfırlama (örnek kullanım)
function startBattle() {
  console.log("[DEBUG] Start Battle Triggered!");

  // Takım kontrolü
  if (userSelectedIDs.length === 0 || opponentSelectedIDs.length === 0) {
    console.error("HATA: Her iki takımda da kurt olmalı!");
    return;
  }

  // Hesaplamaları yap
  calculatePlayer1Attacks();
  calculatePlayer2Blocks();
  assignPlayer2Blocks();

  // Net attack hesapla
  calculateNetAttack("P1");
  redraw(); // Canvas'ı yeniden çiz
  console.log("[SONUÇ] Player 1 Net Atak: " + netAttackP1);

  // Arayüzü güncelle
  battleStarted = true;
  redraw(); // draw()'ı tetikle
}

// mousePressed fonksiyonu
function mousePressed() {
  const tableSectionX = 10;
  const tableSectionY = 60;
  const tableWidth = 200;
  const rowHeight = 80;
  const tableStartY = tableSectionY + 150 + 45;

  // Önce tablo kontrolü
  if (
    mouseX >= tableSectionX &&
    mouseX <= tableSectionX + tableWidth &&
    mouseY >= tableStartY &&
    mouseY <= tableStartY + itemsPerPage * rowHeight
  ) {
    console.log("Tablo içinde tıklama tespit edildi.");
    console.log("Mouse koordinatları:", mouseX, mouseY);
    console.log("tableStartY:", tableStartY);
    const rowIndex = floor((mouseY - tableStartY) / rowHeight);
    console.log("Hesaplanan rowIndex:", rowIndex);
    const startIndex = currentPage * itemsPerPage;
    let sortedWolfdata = wolfdata
      .filter((w) => parseInt(w.id) <= 7500)
      .filter((w) => searchFilter === "" || w.id === searchFilter)
      .filter((w) => nftIds.length === 0 || nftIds.includes(w.id));
    if (sortColumn !== null) {
      sortedWolfdata.sort((a, b) => {
        let valA, valB;
        if (sortColumn === "id") {
          valA = parseInt(a.id) || 0;
          valB = parseInt(b.id) || 0;
        } else if (sortColumn === "Total Points") {
          valA = wolfPointsCache[a.id].totalPoints;
          valB = wolfPointsCache[b.id].totalPoints;
        } else if (sortColumn === "3T Bonus") {
          valA = has3TBonus(a) ? 9 : 0;
          valB = has3TBonus(b) ? 9 : 0;
        } else {
          valA = getAbilityScore(a, sortColumn) || 0;
          valB = getAbilityScore(b, sortColumn) || 0;
        }
        return sortAscending ? valA - valB : valB - valA;
      });
    }
    const pageData = sortedWolfdata.slice(
      startIndex,
      min(startIndex + itemsPerPage, sortedWolfdata.length)
    );
    console.log("pageData:", pageData);
    if (rowIndex >= 0 && rowIndex < pageData.length) {
      const wolf = pageData[rowIndex];
      console.log("Seçilen kurt:", wolf.id);
      showPopup = true;
      selectedWolfId = wolf.id;
      const popupX = width / 2 - 100;
      const popupY = height / 2 - 75;
      addToPlayer1Button.position(popupX + 70, popupY + 90);
      addToPlayer1Button.show();
      addToPlayer2Button.position(popupX + 70, popupY + 120);
      addToPlayer2Button.show();
      return;
    } else {
      console.log("Hata: rowIndex geçersiz veya pageData boş.");
    }
  } else {
    console.log("mouseX, mouseY:", mouseX, mouseY);
  }

  const leftMargin = 10 + 200 + 10;
  // Takım detay kutusu kontrolü (Team Info)
  const teamInfoX = 62; // drawTeamSection'daki teamInfoX ile eşleşiyor
  const teamInfoY = 25; // drawTeamSection'daki teamInfoY ile eşleşiyor
  const teamInfoWidth = 75 - 10; // Box genişliği (boxWidth - padding)
  const teamInfoHeight = 75 - 3; // Box yüksekliği (drawTeamSection'daki yükseklik)
  // Rival Pack Team Info butonunun GERÇEK konumunu kontrol et
  const rivalTeamInfoX = leftMargin + 23; // drawTeamSection'daki teamInfoX (23) + leftMargin
  const rivalTeamInfoY = 60 + 25; // drawTeamSection'daki yPos (60) + teamInfoY (25)
  const rivalTeamInfoWidth = 75 - 10; // boxWidth - padding
  const rivalTeamInfoHeight = 75 - 3; // boxHeight - padding  

// Player 1 Team Info tıklama kontrolü (WC Logo)
const p1SectionX = 220; // leftMargin değeri
const p1SectionY = 665; // 305 + 240 + 120
const p1WcImgX = p1SectionX + 23 + 13; // xPos + teamInfoX + offset
const p1WcImgY = p1SectionY + 25 + 12; // yPos + teamInfoY + offset
const wcImgWidth = 50;
const wcImgHeight = 46;

if (
  mouseX >= p1WcImgX && 
  mouseX <= p1WcImgX + wcImgWidth &&
  mouseY >= p1WcImgY && 
  mouseY <= p1WcImgY + wcImgHeight
) {
  console.log("Your Pack Team Info tıklandı!");
  showTeamPopup = true;
  selectedTeamIDs = userSelectedIDs;
  return;
}

if (
    mouseX >= rivalTeamInfoX &&
    mouseX <= rivalTeamInfoX + rivalTeamInfoWidth &&
    mouseY >= rivalTeamInfoY &&
    mouseY <= rivalTeamInfoY + rivalTeamInfoHeight
) {
  console.log("Rival Pack Team Info GERÇEK tıklama alanında!");
  showTeamPopup = true;
  selectedTeamIDs = opponentSelectedIDs;
  return; // Diğer kontrolleri atla
}

   // Wolf Capital tıklama
    if (mouseX >= 450 && mouseX <= 540 && mouseY >= 25 && mouseY <= 40) {
    window.open("https://www.tensor.trade/trade/wolf_capital", "_blank");
    return;
  }
  
  
  // Popup açıkken sadece popup ile ilgili kontroller çalışsın
  if (showPopup) {
    const popupX = width / 2 - 175;
    const popupY = height / 2 - 100;
    const popupWidth = 350;
    const xButtonX = popupX + popupWidth - 20;
    const xButtonY = popupY + 15;
    const xButtonSize = 20;
      const popupCenterX = width/2;
  const buttonY = popupY + 160;
    
    if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      closePopup();
      return;
    }

    const addButtonX1 = popupX + 70;
    const addButtonY1 = popupY + 90;
    const addButtonX2 = popupX + 70;
    const addButtonY2 = popupY + 120;
    const buttonWidth = addToPlayer1Button.width;
    const buttonHeight = addToPlayer1Button.height;

  // P1 Buton tıklama alanı
  if (mouseX >= popupCenterX - 150 && 
      mouseX <= popupCenterX - 150 + 140 &&
      mouseY >= buttonY && 
      mouseY <= buttonY + 40) {
    addToPlayer1Button.elt.click();
    return;
  }

  // P2 Buton tıklama alanı
  if (mouseX >= popupCenterX + 10 && 
      mouseX <= popupCenterX + 10 + 140 &&
      mouseY >= buttonY && 
      mouseY <= buttonY + 40) {
    addToPlayer2Button.elt.click();
    return;
  }
  }
  
// P1 kurtlarına tıklama kontrolü (Player 1)
  p1WolfPositions.forEach((pos) => {
    const globalX = leftMargin + pos.x; // Global X koordinatı
    const globalY = 305 + 240 + 120 + pos.y; // Global Y koordinatı (P1'in Y pozisyonu)
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height
    ) {
      console.log(`P1 kurtuna tıklandı: ${pos.id}`); // Hata ayıklama için
      showTeamWolfPopup = true;
      selectedTeamWolfId = pos.id;
      selectedTeamType = "user";
      return;
    }
  });

  // P2 kurtlarına tıklama kontrolü (Rival Pack)
  p2WolfPositions.forEach((pos) => {
    const globalX = leftMargin + pos.x; // Global X koordinatı
    const globalY = 60 + pos.y; // Global Y koordinatı (P2'nin Y pozisyonu)
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height
    ) {
      console.log(`P2 kurtuna tıklandı: ${pos.id}`); // Hata ayıklama için
      showTeamWolfPopup = true;
      selectedTeamWolfId = pos.id;
      selectedTeamType = "opponent";
      return;
    }
  });

  // Popup kapatma kontrolü
  if (showTeamWolfPopup) {
    const popupX = width / 2 - 175;
    const popupY = height / 2 - 105;
    const xButtonX = popupX + 330;
    const xButtonY = popupY + 15;
    if (
      mouseX >= xButtonX - 10 &&
      mouseX <= xButtonX + 10 &&
      mouseY >= xButtonY - 10 &&
      mouseY <= xButtonY + 10
    ) {
      closeTeamWolfPopup();
      return;
    }

    const removeButtonX = popupX + 126;
    const removeButtonY = popupY + 160;
    const buttonWidth = removeWolfButton.width;
    const buttonHeight = removeWolfButton.height;
    if (
      mouseX >= removeButtonX &&
      mouseX <= removeButtonX + buttonWidth &&
      mouseY >= removeButtonY &&
      mouseY <= removeButtonY + buttonHeight
    ) {
      removeWolfButton.elt.click();
    }
    return;
  }
  
  
// Takım detay popup kapatma
if (showTeamPopup) {
    const popupX = width / 2 - 180; // drawTeamPopup ile aynı hesaplama
    const popupY = height / 2 - 250; // drawTeamPopup ile aynı hesaplama
    const xButtonX = popupX + 340; // drawTeamPopup ile aynı
    const xButtonY = popupY + 15;   // drawTeamPopup ile aynı
    const xButtonSize = 20;        // Çap 20, yani yarıçap 10
  if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      showTeamPopup = false;
      selectedTeamIDs = null;
    }
    return; // Popup açıkken diğer kontrolleri atla
  }

// Your Pack ve Rival Pack için ✖ simgesi kontrolü
const yourPackX = leftMargin; // 220
const yourPackY = 305 + 240 + 120; // P1'in Y pozisyonu = 665
const xButtonX = yourPackX + leftSectionWidth - 30; // 220 + 400 - 30 = 590
const xButtonY = yourPackY + 15; // 665 + 15 = 680
const xButtonSize = 20;
const rivalPackX = leftMargin;
const rivalPackY = 60;
const yourPackXButtonX = yourPackX + leftSectionWidth - 30;
const yourPackXButtonY = yourPackY + 15;
const rivalPackXButtonX = rivalPackX + leftSectionWidth - 30;
const rivalPackXButtonY = rivalPackY + 15;

if (
  mouseX >= yourPackXButtonX - xButtonSize / 2 &&
  mouseX <= yourPackXButtonX + xButtonSize / 2 &&
  mouseY >= yourPackXButtonY - xButtonSize / 2 &&
  mouseY <= yourPackXButtonY + xButtonSize / 2
) {
  userSelectedIDs = [];
  player1Team = [];
  updateEndTurnButtonStyle();
  if (removeSound) removeSound.play();
  console.log("Your Pack GERÇEKTEN X'le sıfırlandı");
}

if (
  mouseX >= rivalPackXButtonX - xButtonSize / 2 &&
  mouseX <= rivalPackXButtonX + xButtonSize / 2 &&
  mouseY >= rivalPackXButtonY - xButtonSize / 2 &&
  mouseY <= rivalPackXButtonY + xButtonSize / 2
) {
  opponentSelectedIDs = [];
  player2Team = [];
  opponentTeamInitialized = false;
  if (rivalPackTitle !== "Player 2") {
    rivalPackTitle = "Player 2"; // Rival Team ismini "Player 2" yap
    selectedRivalTeam = "Player 2"; // Varsayılan takım seçimi de "Player 2" olsun
  }
  updateEndTurnButtonStyle();
  if (removeSound) removeSound.play();
  console.log("Rival Pack sıfırlandı ve isim 'Player 2' olarak güncellendi");
}

  // Savaş sonucu popup kapatma
  if (battleResultPopup) {
    const popupX = leftMargin + leftSectionWidth / 2 - 100;
    const popupY = 250 + 75 - 50;
    const xButtonX = popupX + 200 - 20;
    const xButtonY = popupY + 15;
    const xButtonSize = 20;
    if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      battleResultPopup = false;
      winningTeam = null;
    }
  }
  
// Rival Selection kontrolü
  const rivalSectionX = leftMargin + leftSectionWidth + 10;
  const rivalSectionY = 60;
  if (
    mouseX >= rivalSectionX &&
    mouseX <= rivalSectionX + 200 &&
    mouseY >= rivalSectionY + 30 &&
    mouseY <= rivalSectionY + 30 + rivalItemsPerPage * 80 // Pagination'a göre sınır
  ) {
    const rowIndex = floor((mouseY - (rivalSectionY + 30)) / 80);
    const absoluteIndex = rivalCurrentPage * rivalItemsPerPage + rowIndex;
    if (absoluteIndex >= 0 && absoluteIndex < rivalTeams.length) {
      const team = rivalTeams[absoluteIndex];
      const defeatedTeamsCount = rivalTeams.filter(t => t.eliminatedBy !== null && t.name !== "Player 2").length;
      const isRoyalWolvesDefeated = rivalTeams.some(t => t.name === "Royal Wolves" && t.eliminatedBy !== null);
      const isRoyalWolves = team.name === "Royal Wolves";
      const isIceWolves = team.name === "Ice Wolves";
      const isSelectable = (!isRoyalWolves || defeatedTeamsCount >= 6) && (!isIceWolves || isRoyalWolvesDefeated);

      if (isSelectable) {
        //if (team.name === "Sea Wolves") {showSeaGif = true; gifStartTime = millis();}
        selectedRivalTeam = team.name;
        opponentSelectedIDs = team.ids.slice();
        rivalPackTitle = team.name;
        loadOpponentImages(opponentSelectedIDs);
        updateEndTurnButtonStyle();
        if (selectSound) selectSound.play();
        console.log(`Seçilen takım: ${rivalPackTitle}, IDs: ${opponentSelectedIDs}`);
      }
    }
  }
  
// Search ve Wallet Input için ✖ simgesi tıklama kontrolü
// Sabitler (draw() ile uyumlu olmalı)
const inputxButtonSize = 10; // Tıklanabilir alan boyutu (piksel cinsinden)

// Search ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,110)
const searchXButtonX = 200;
const searchXButtonY = 110;

// Wallet ✖ butonu için merkez koordinatları (sizin verdiğiniz: 200,150)
const walletXButtonX = 200;
const walletXButtonY = 150;

// Search ✖ tıklama kontrolü
if (
  mouseX >= searchXButtonX - inputxButtonSize / 2 &&
    mouseX <= searchXButtonX + inputxButtonSize / 2 &&
    mouseY >= searchXButtonY - inputxButtonSize - 2  &&
    mouseY <= searchXButtonY &&
  mouseIsPressed // Sadece tıklanırsa
) {
  searchInput.value("");
  searchFilter = "";
  nftIds = [];
  currentPage = 0;
  tableCacheDirty = true;
  drawWolfDataTableToBuffer();
  console.log("Search input temizlendi");
}

// Wallet ✖ tıklama kontrolü
if (
  mouseX >= walletXButtonX - inputxButtonSize / 2 &&
    mouseX <= walletXButtonX + inputxButtonSize / 2 &&
    mouseY >= walletXButtonY - inputxButtonSize - 2  &&
    mouseY <= walletXButtonY &&
  mouseIsPressed // Sadece tıklanırsa
) {
  walletInput.value("");
  nftIds = [];
  currentPage = 0;
  tableCacheDirty = true;
  drawWolfDataTableToBuffer();
  console.log("Wallet input temizlendi");
}
  
  
  
  
}

// Klavye girdisi
function keyPressed() {
  if (inputActive) {
    if (keyCode === ENTER) {
      handleInputSubmit();
    } else if (keyCode === BACKSPACE) {
      inputText = inputText.slice(0, -1);
    } else if (key.length === 1) {
      inputText += key;
    }
  }
}

function handleInputSubmit() {
  if (inputTeam) {
    if (inputTeam === "user" || inputTeam === "opponent") {
      const id = inputText.trim();
      const wolf = wolfdata.find((w) => w.id === id);
      if (wolf) {
        toggleSelection(wolf, inputTeam);
      }
    } else if (inputTeam === "titleYourPack") {
      yourPackTitle = inputText.trim() || "Your Pack";
      editingYourPack = false;
    } else if (inputTeam === "titleRivalPack") {
      rivalPackTitle = inputText.trim() || "Custom Pack";
      editingRivalPack = false;
    }
    inputActive = false;
    inputText = "";
    inputTeam = null;
    inputX = null;
    inputY = null;
  }
}

async function fetchNFTs() {
  let walletAddress = walletInput.value();
  if (!walletAddress) {
    nftIds = [];
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
    return;
  }

  let url =
    "https://rpc.helius.xyz/?api-key=640b84c0-5ccb-48e7-9227-fbb5724410c4";
  let requestBody = {
    jsonrpc: "2.0",
    id: "my-id",
    method: "getAssetsByOwner",
    params: {
      ownerAddress: walletAddress,
      page: 1,
      limit: 1000,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP hata: ${response.status}`);
    }

    const data = await response.json();
    nftIds = [];

    if (data.result && data.result.items) {
      let assets = data.result.items;
      for (let asset of assets) {
        let name = asset.content?.metadata?.name;
        if (name && name.includes("Wolf Capital")) {
          let idMatch = name.match(/#(\d+)/);
          if (idMatch) {
            nftIds.push(idMatch[1]);
          }
        }
      }
    }

    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  } catch (error) {
    console.error("Hata:", error);
    nftIds = [];
    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
  }
}


function drawWolfDataTableToBuffer(tableSectionX) {
  if (!tableCacheDirty) return;

  const tableSectionWidth = 200;
  tableBuffer = createGraphics(tableSectionWidth, 625);
  tableBuffer.background("#221f3e");
  tableBuffer.noStroke();

  const colWidths = [80, 40, 40, 40];
  const rowHeight = 80;
  const titleHeight = 35;
  tableBuffer.textSize(12);
  tableBuffer.textStyle(BOLD);

  tableBuffer.fill("#e1e2e6");
  tableBuffer.textAlign(CENTER, CENTER);
  tableBuffer.text("", colWidths[0] / 2, titleHeight);
  tableBuffer.text("#", colWidths[0] + colWidths[1] / 2, titleHeight);

  tableBuffer.fill("#ca8a04");
  tableBuffer.text(
    "🏆",
    colWidths[0] + colWidths[1] + colWidths[2] / 2,
    titleHeight
  );

  tableBuffer.fill("#22d3ee");
  tableBuffer.text(
    `▼`,
    colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] / 2,
    titleHeight
  );

  let sortedWolfdata = wolfdata.filter((w) => parseInt(w.id) <= 7500);

  if (searchFilter !== "") {
    sortedWolfdata = sortedWolfdata.filter((w) => w.id === searchFilter);
  } else if (walletInput.value().trim() !== "" && nftIds.length === 0) {
    sortedWolfdata = [];
  } else if (nftIds.length > 0) {
    sortedWolfdata = sortedWolfdata.filter((w) => nftIds.includes(w.id));
  }

  if (sortColumn !== null) {
    sortedWolfdata.sort((a, b) => {
      let valA, valB;
      if (sortColumn === "Total Points") {
        valA = wolfPointsCache[a.id]?.totalPoints || 0;
        valB = wolfPointsCache[b.id]?.totalPoints || 0;
      } else if (sortColumn === "3T Bonus") {
        valA = has3TBonus(a) ? 9 : 0;
        valB = has3TBonus(b) ? 9 : 0;
      } else {
        valA = getAbilityScore(a, sortColumn) || 0;
        valB = getAbilityScore(b, sortColumn) || 0;
      }
      return sortAscending ? valA - valB : valB - valA;
    });
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = min(startIndex + itemsPerPage, sortedWolfdata.length);
  const pageData = sortedWolfdata.slice(startIndex, endIndex);

  let yOffset = 45;
  pageData.forEach((wolf, index) => {
    const absoluteRowY = 150 + yOffset; // Ana tuvaldeki Y koordinatı (draw'daki image konumuyla uyumlu)
    tableBuffer.fill(index % 2 === 0 ? "#302a5d" : "#221f3e");
    tableBuffer.noStroke();
    tableBuffer.rect(0, yOffset, tableSectionWidth, rowHeight);

    const { totalPoints, attackingPoints, defensivePoints } = wolfPointsCache[
      wolf.id
    ] || { totalPoints: 0, attackingPoints: 0, defensivePoints: 0 };

    if (resizedImages[wolf.id]) {
      let img = resizedImages[wolf.id];
      tableBuffer.push();
      tableBuffer.drawingContext.save();
      tableBuffer.drawingContext.beginPath();
      tableBuffer.drawingContext.roundRect(5, yOffset + 3, 75 - 10, 75 - 3, 5);
      tableBuffer.drawingContext.clip();
      tableBuffer.image(img, 0, yOffset + 2.5, 75, 75);
      tableBuffer.drawingContext.restore();
      tableBuffer.pop();
    } else if (loadedImages[wolf.id]) {
      let img = loadedImages[wolf.id];
      let resized = createGraphics(75, 75);
      resized.drawingContext.beginPath();
      resized.drawingContext.roundRect(0, 0, 75, 75, 10);
      resized.drawingContext.clip();
      resized.image(img, 0, 0, 75, 75);
      resizedImages[wolf.id] = resized;
      tableBuffer.push();
      tableBuffer.drawingContext.save();
      tableBuffer.drawingContext.beginPath();
      tableBuffer.drawingContext.roundRect(0, yOffset + 3, 75, 75, 10);
      tableBuffer.drawingContext.clip();
      tableBuffer.image(resized, 0, yOffset + 3, 75, 75);
      tableBuffer.drawingContext.restore();
      tableBuffer.pop();
    } else {
      loadImageAsync(wolf.url)
        .then((img) => {
          loadedImages[wolf.id] = img;
          let resized = createGraphics(75, 75);
          resized.drawingContext.beginPath();
          resized.drawingContext.roundRect(0, 0, 75, 75, 10);
          resized.drawingContext.clip();
          resized.image(img, 0, 0, 75, 75);
          resizedImages[wolf.id] = resized;
          tableCacheDirty = true;
        })
        .catch(() => console.error(`Failed to load image for wolf ${wolf.id}`));
    }

    tableBuffer.fill("#e1e2e6");
    tableBuffer.textStyle(NORMAL);
    tableBuffer.textAlign(CENTER, CENTER);
    tableBuffer.text(
      wolf.id,
      colWidths[0] + colWidths[1] / 2,
      yOffset + rowHeight / 2
    );

    tableBuffer.fill("#ca8a04");
    tableBuffer.text(
      totalPoints,
      colWidths[0] + colWidths[1] + colWidths[2] / 2,
      yOffset + rowHeight / 2
    );

    tableBuffer.fill("#22d3ee");
    let value;
    if (selectedColumn === "Total Points") value = totalPoints;
    else if (selectedColumn === "3T Bonus")
      value = has3TBonus(wolf) ? "9" : "0";
    else value = getAbilityScore(wolf, selectedColumn) || "0";
    tableBuffer.text(
      value,
      colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] / 2,
      yOffset + rowHeight / 2
    );

    yOffset += rowHeight;
  });

  tableCacheDirty = false;
}

function mouseMoved() {
  let isOverClickableArea = false;

  // Wolf Selection kontrolü (değişmedi)
  const tableSectionX = 10;
  const tableSectionY = 60;
  const tableImageStartY = tableSectionY + 150;
  const rowHeight = 80;
  const imageSize = 75;

  let sortedWolfdata = wolfdata.filter((w) => parseInt(w.id) <= 7500);
  if (searchFilter !== "") {
    sortedWolfdata = sortedWolfdata.filter((w) => w.id === searchFilter);
  } else if (walletInput && walletInput.value && walletInput.value().trim() !== "" && nftIds.length === 0) {
    sortedWolfdata = [];
  } else if (nftIds.length > 0) {
    sortedWolfdata = sortedWolfdata.filter((w) => nftIds.includes(w.id));
  }

  if (sortColumn !== null) {
    sortedWolfdata.sort((a, b) => {
      let valA, valB;
      if (sortColumn === "Total Points") {
        valA = wolfPointsCache[a.id]?.totalPoints || 0;
        valB = wolfPointsCache[b.id]?.totalPoints || 0;
      } else if (sortColumn === "3T Bonus") {
        valA = has3TBonus(a) ? 9 : 0;
        valB = has3TBonus(b) ? 9 : 0;
      } else {
        valA = getAbilityScore(a, sortColumn) || 0;
        valB = getAbilityScore(b, sortColumn) || 0;
      }
      return sortAscending ? valA - valB : valB - valA;
    });
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = min(startIndex + itemsPerPage, sortedWolfdata.length);
  const pageData = sortedWolfdata.slice(startIndex, endIndex);

  let yOffset = 45;
  pageData.forEach(() => {
    const wolfImageX = tableSectionX;
    const wolfImageY = tableImageStartY + yOffset + 2.5;
    if (
      mouseX >= tableSectionX &&
      mouseX <= tableSectionX + 200 &&
      mouseY >= wolfImageY - 2.5 &&
      mouseY <= wolfImageY + rowHeight - 2.5
    ) {
      isOverClickableArea = true;
    }
    yOffset += rowHeight;
  });

// Rival Selection kontrolü
const rivalSectionX = 10 + 200 + 10 + 400 + 10;
const rivalSectionY = 60;
const rivalRowHeight = 80;
const tableWidth = 200;

const defeatedTeamsCount = rivalTeams.filter(team => team.eliminatedBy !== null && team.name !== "Player 2").length;
const isRoyalWolvesDefeated = rivalTeams.some(team => team.name === "Royal Wolves" && team.eliminatedBy !== null);

const rivalStartIndex = rivalCurrentPage * rivalItemsPerPage;
const rivalEndIndex = min(rivalStartIndex + rivalItemsPerPage, rivalTeams.length);
const rivalPageData = rivalTeams.slice(rivalStartIndex, rivalEndIndex);

// Tooltip için geçici değişkenler
let shouldShowInfoBox = false;
let infoText = "";
let infoX = 0;
let infoY = 0;

rivalPageData.forEach((team, index) => {
  const rivalRowY = rivalSectionY + 30 + index * rivalRowHeight;
  if (
    mouseX >= rivalSectionX &&
    mouseX <= rivalSectionX + tableWidth &&
    mouseY >= rivalRowY &&
    mouseY <= rivalRowY + rivalRowHeight
  ) {
    isOverClickableArea = true;

    if (team.name === "Royal Wolves" && defeatedTeamsCount < 6) {
      shouldShowInfoBox = true;
      infoText = "You must defeat six Wolf Packs first";
      infoX = mouseX;
      infoY = mouseY;
    } else if (team.name === "Ice Wolves" && !isRoyalWolvesDefeated) {
      shouldShowInfoBox = true;
      infoText = "You must defeat Royal Wolves first";
      infoX = mouseX;
      infoY = mouseY;
    }
  }
});

// Döngüden sonra tooltip ayarlarını güncelle
showInfoBox = shouldShowInfoBox;
if (showInfoBox) {
  infoBoxText = infoText;
  infoBoxX = infoX;
  infoBoxY = infoY;
} else {
  showInfoBox = false;
}

  // İmleç kontrolü
  if (isOverClickableArea) {
    cursor(HAND);
  } else if (document.querySelector("canvas")) {
    cursor(ARROW);
  }
}

function getAbilityScore(wolf, ability) {
  let score = 0;
  for (const [trait, value] of Object.entries(wolf)) {
    if (trait === "id" || trait === "url" || value === "None") continue;
    const abilityData = traitAbilities[trait]?.[value];
    if (abilityData && abilityData.ability === ability) {
      score += abilityData.score;
    }
  }
  return score;
}

function has3TBonus(wolf) {
  return (
    wolf.Clothing === "None" &&
    wolf.Hat === "None" &&
    wolf.Mouth === "None" &&
    wolf.Overhead === "None" &&
    wolf.Accessory === "None"
  );
}
function calculateWolfPoints(wolf) {
  if (!wolf) {
    return { 
      totalPoints: 0, 
      attackingPoints: 0, 
      defensivePoints: 0,
      baseTotalPoints: 0 // Yeni eklenen
    };
  }

  const { abilityScores } = getWolfAbilities(wolf);
  
  const attackingPoints = ["Morale", "Money", "Sneak", "Rage", "Bloodlust"]
    .reduce((sum, ability) => sum + (abilityScores[ability] || 0), 0);
  
  const defensivePoints = ["Fear", "Cunning", "Perception", "Composure", "Badass"]
    .reduce((sum, ability) => sum + (abilityScores[ability] || 0), 0);

  const baseTotalPoints = attackingPoints + defensivePoints; // Tanım eklendi
  
  return { 
    totalPoints: baseTotalPoints,
    attackingPoints,
    defensivePoints,
    baseTotalPoints // Döndürülen değere eklendi
  };
}

function calculateTeamPoints(selectedIDs) {
  const selectedWolves = selectedIDs
    .map(id => wolfdata.find(w => w.id === id))
    .filter(wolf => wolf);

  // Base points hesapla (3T bonus hariç)
  let baseTotalPoints = 0;
  selectedWolves.forEach(wolf => {
    const { baseTotalPoints: wolfBase } = calculateWolfPoints(wolf); // Destructuring kullanımı
    baseTotalPoints += wolfBase;
  });

  // 3T bonus hesapla
  const numberOf3TWolves = selectedWolves.filter(wolf => has3TBonus(wolf)).length;
  const threeTBonus = numberOf3TWolves * 9;

  return {
    baseTotalPoints,
    totalBonus: threeTBonus,
    totalPoints: baseTotalPoints + threeTBonus
  };
}

function calculateTraitBonusScore(wolves) {
  const traitBonuses = calculateTraitBonuses(wolves);
  let totalBonus = 0;
  wolves.forEach(wolf => {
    totalBonus += getWolfTraitBonuses(wolf, traitBonuses);
  });
  return totalBonus;
}

function calculateTraitBonuses(selectedWolves) {
  const traitCounts = {};

  // Traitlerin sayısını hesapla
  selectedWolves.forEach((wolf) => {
    for (const [category, trait] of Object.entries(wolf)) {
      if (category === "id" || category === "url" || trait === "None") continue;
      const traitKey = `${category}: ${trait}`;
      traitCounts[traitKey] = (traitCounts[traitKey] || 0) + 1;
    }
  });

  const bonuses = {};
  Object.entries(traitCounts).forEach(([traitKey, count]) => {
    if (count >= 3) {
      bonuses[traitKey] = 3; // 3 veya daha fazla trait için her kurt 3 bonus alır
    } else if (count === 2) {
      bonuses[traitKey] = 2; // 2 trait için her kurt 2 bonus alır
    }
    // 1 trait için bonus verilmez, bu yüzden else durumu eklenmedi
  });

  return bonuses;
}

function getWolfTraitBonuses(wolf, traitBonuses) {
  let bonus = 0;
  for (const [category, trait] of Object.entries(wolf)) {
    if (category === "id" || category === "url" || trait === "None") continue;
    const traitKey = `${category}: ${trait}`;
    if (traitBonuses[traitKey]) {
      bonus += traitBonuses[traitKey];
    }
  }
  return bonus;
}

function drawTeamSection(selectedIDs, xPos, yPos, title, bgColor, sectionWidth) {
  let wolfPositions = [];
  push();
  translate(xPos, yPos);

  // Arka plan kutusu
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  rect(10, 2, sectionWidth - 20, 105, 5);

  // Takım başlığı
  textSize(14);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(LEFT);
  text(title, 22, 20);

// Takım sıfırlama butonu (✖)
  if (selectedIDs.length > 0) {
    const xButtonX = sectionWidth - 30;
    const xButtonY = 15;
    const xButtonSize = 20;

    // Global koordinatlar
    const globalX = xPos + xButtonX;
    const globalY = yPos + xButtonY;

    // Hover kontrolü
    const isOver = 
      mouseX >= globalX - xButtonSize / 2 &&
      mouseX <= globalX + xButtonSize / 2 &&
      mouseY >= globalY - xButtonSize / 2 &&
      mouseY <= globalY + xButtonSize / 2;

    push();
    textFont("Arial");
    if (isOver) {
      fill(255, 0, 0); // Hover durumunda kırmızı
    } else {
      fill(0); // Normal durumda siyah
    }
    noStroke();
    ellipse(xButtonX, xButtonY, xButtonSize, xButtonSize);
    fill(isOver ? "#FFFFFF" : "#F5F5F5"); // Hoverda beyaz, normalde açık gri
    textAlign(CENTER);
    text("✖", xButtonX, xButtonY + 5);
    pop();
  }

  // WC Logo koordinatları
  const wcImgX = 23 + 13; // teamInfoX + offset
  const wcImgY = 25 + 12; // teamInfoY + offset
  const wcImgWidth = 50;
  const wcImgHeight = 46;

  // WC Logosu
  if (selectedIDs === userSelectedIDs && wcBlueImg) {
    image(wcBlueImg, wcImgX, wcImgY, wcImgWidth, wcImgHeight);
  } else if (selectedIDs === opponentSelectedIDs && wcRedImg) {
    image(wcRedImg, wcImgX, wcImgY, wcImgWidth, wcImgHeight);
  }

  // Puan hesaplamaları
  const selectedWolves = selectedIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  
  // Base puanları hesapla (3T bonus hariç)
  let baseTotalPoints = 0;
  selectedWolves.forEach(wolf => {
    const { totalPoints } = calculateWolfPoints(wolf);
    baseTotalPoints += totalPoints;
  });

  // 3T Bonus hesapla (1 kurt = +9, 2 kurt = +18, 3 kurt = +27)
  const threeTCount = selectedWolves.filter(wolf => has3TBonus(wolf)).length;
  const threeTBonus = threeTCount * 9;

  // Trait Bonus hesapla
  const traitBonuses = calculateTraitBonuses(selectedWolves);
  let totalTraitBonus = 0;
  selectedWolves.forEach(wolf => {
    totalTraitBonus += getWolfTraitBonuses(wolf, traitBonuses);
  });

  // Toplam bonus (3T + Trait)
  const totalBonus = threeTBonus + totalTraitBonus;

  // Puan gösterimi (base + bonus)
  if (selectedIDs.length > 0) {
    push();
    textSize(12);
    textFont("Trebuchet MS");
    textStyle(NORMAL);
    fill("#ffffff");
    noStroke();
    textAlign(CENTER);
    text(`${baseTotalPoints} + ${totalBonus}`, 23 + 75/2, 25 + 75);
    pop();
  }

  // Kurt resimleri ve bonus göstergeleri
  const boxWidth = 75;
  const spacing = -5;
  for (let i = 0; i < 3; i++) {
    let imgX = 23 + boxWidth + spacing + i * (boxWidth + spacing);
    let imgY = 25;
    
    if (i < selectedIDs.length && loadedImages[selectedIDs[i]]) {
      wolfPositions.push({
        id: selectedIDs[i],
        x: imgX,
        y: imgY,
        width: boxWidth,
        height: 75
      });

      // Kurt resmi
      push();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.roundRect(imgX + 5, imgY + 3, boxWidth - 10, 75 - 3, 5);
      drawingContext.clip();
      image(loadedImages[selectedIDs[i]], imgX, imgY, boxWidth, 75);
      drawingContext.restore();

      // Bonus göstergeleri
      const wolf = selectedWolves[i];
      if (wolf) {
        // 3T Bonus (sağ üst)
        if (has3TBonus(wolf)) {
          push();
          textSize(14);
          textFont("Trebuchet MS");
          textStyle(BOLD);
          fill(0);
          stroke(255);
          strokeWeight(2);
          textAlign(RIGHT, TOP);
          text("9", imgX + boxWidth - 10, imgY + 5);
          pop();
        }

        // Trait Bonus (sol üst)
        const traitBonus = getWolfTraitBonuses(wolf, traitBonuses);
        if (traitBonus > 0) {
          push();
          textSize(14);
          textFont("Trebuchet MS");
          textStyle(BOLD);
          fill(0);
          stroke(255);
          strokeWeight(2);
          textAlign(LEFT, TOP);
          text(traitBonus.toString(), imgX + 10, imgY + 5);
          pop();
        }
      }
      pop();
    } else {
      // Boş yuva
      push();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.roundRect(imgX + 5, imgY + 3, boxWidth - 10, 75 - 3, 5);
      drawingContext.clip();
      image(emptyImg, imgX, imgY, boxWidth, 75);
      drawingContext.restore();
      pop();
    }
  }

  // Net atak kutusu
  const netAttackBoxX = 23 + 4 * (boxWidth + spacing);
  const netAttackBoxY = 25;
  fill(selectedIDs === userSelectedIDs ? "#0093ff" : "#ff4c40");
  noStroke();
  rect(netAttackBoxX + 5, netAttackBoxY + 3, boxWidth - 10, 75 - 3, 5);

  // Net atak değeri
  const netAttackValue = selectedIDs === userSelectedIDs ? netAttackP1 : netAttackP2;
  textSize(30);
  textStyle(BOLD);
  fill(255);
  textAlign(CENTER);
  text(netAttackValue.toString(), netAttackBoxX + boxWidth/2, netAttackBoxY + 50);

  pop();

  return wolfPositions;
}

function drawWolfHeader(wolfId, imgX, imgY, sectionX, sectionY) {
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(LEFT);
  text(`#${wolfId}`, imgX, imgY - 5);
}

function calculateBattleResult(userIDs, opponentIDs) {
  const player1Cards = calculateCards(userIDs);
  const player2Cards = calculateCards(opponentIDs);

  let userNetAttack = 0;
  let opponentNetAttack = 0;

  // Player 1'in seçili kurtları ve trait bonusları
  const userWolves = userIDs
    .map((id) => wolfdata.find((w) => w.id === id))
    .filter((wolf) => wolf);
  const userTraitBonuses = calculateTraitBonuses(userWolves);

  // Player 2'nin seçili kurtları ve trait bonusları
  const opponentWolves = opponentIDs
    .map((id) => wolfdata.find((w) => w.id === id))
    .filter((wolf) => wolf);
  const opponentTraitBonuses = calculateTraitBonuses(opponentWolves);

  // Player 1 net atak hesaplama
  player1Cards.forEach((p1Card) => {
    if (p1Card.ability === "3T Bonus") {
      userNetAttack += p1Card.score;
    } else {
      let blockedScore = 0;
      const blockingAbility = blockRules[p1Card.ability];
      if (blockingAbility) {
        const opponentBlockCard = player2Cards.find(card => card.ability === blockingAbility);
        blockedScore = opponentBlockCard ? Math.min(p1Card.score, opponentBlockCard.score) : 0;
      }
      userNetAttack += Math.max(0, p1Card.score - blockedScore);
    }
  });

  // Player 2 net atak hesaplama
  player2Cards.forEach((p2Card) => {
    if (p2Card.ability === "3T Bonus") {
      opponentNetAttack += p2Card.score;
    } else {
      let blockedScore = 0;
      const blockingAbility = blockRules[p2Card.ability];
      if (blockingAbility) {
        const userBlockCard = player1Cards.find(card => card.ability === blockingAbility);
        blockedScore = userBlockCard ? Math.min(p2Card.score, userBlockCard.score) : 0;
      }
      opponentNetAttack += Math.max(0, p2Card.score - blockedScore);
    }
  });

  // Trait bonuslarını ekle
  userWolves.forEach((wolf) => {
    userNetAttack += getWolfTraitBonuses(wolf, userTraitBonuses);
  });

  opponentWolves.forEach((wolf) => {
    opponentNetAttack += getWolfTraitBonuses(wolf, opponentTraitBonuses);
  });

  netAttackP1 = userNetAttack;
  netAttackP2 = opponentNetAttack;

  // YENİ KOD: Savaş geçmişi kaydı (Değişmez kayıt oluştur)
  if (netAttackP1 > netAttackP2) {
    const defeatedTeamIndex = rivalTeams.findIndex(team => 
      team.ids.length > 0 && 
      team.ids.every(id => opponentIDs.includes(id))
    );

    if (defeatedTeamIndex !== -1) {
      // 1. Savaş anındaki takımın SNAPSHOT'unu al
      const battleSnapshot = {
        date: new Date().toLocaleString(),
        winnerTeam: [...userIDs], // Array kopyası
        defeatedTeam: rivalTeams[defeatedTeamIndex].name,
        netScores: { player1: netAttackP1, player2: netAttackP2 }
      };
      
      // 2. Geçmişe ekle (global battleHistory dizisine)
      if (!window.battleHistory) window.battleHistory = [];
      window.battleHistory.push(battleSnapshot);
      
      // 3. Rakip takımı işaretle (STRING olarak kaydet)
      rivalTeams[defeatedTeamIndex].eliminatedBy = 
        `${userIDs.join(", ")}`;
      
      // 4. LocalStorage'e kaydet
      saveRivalTeamsToStorage();
    }
  }

  return {
    userNetAttack: Math.max(0, userNetAttack),
    opponentNetAttack: Math.max(0, opponentNetAttack)
  };
}

function updateTeamWolfPopup() {
  if (selectedTeamWolfId && selectedTeamType) {
    const targetArray = selectedTeamType === "user" ? userSelectedIDs : opponentSelectedIDs;
    const index = targetArray.indexOf(selectedTeamWolfId);
    
    if (index !== -1) {
      // Eğer bu kurt bir "eliminatedBy" kaydında kullanılmışsa UYARI ver
      const isWolfInHistory = battleHistory.some(battle => 
        battle.winnerIDs.includes(selectedTeamWolfId)
      );
      
      if (isWolfInHistory) {
        alert("Bu kurt savaş geçmişinde kayıtlı! Değişiklik geçmişi etkilemeyecek.");
      }
      
      targetArray.splice(index, 1);
      if (selectedTeamType === "user") player1Team = userSelectedIDs.slice();
      else player2Team = opponentSelectedIDs.slice();
    }
    closeTeamWolfPopup();
  }
}

function saveRivalTeamsToStorage() {
  try {
    localStorage.setItem('wolfPackRivalTeams', JSON.stringify(rivalTeams));
  } catch (e) {
    console.error("LocalStorage kayıt hatası:", e);
  }
}

function loadRivalTeamsFromStorage() {
  try {
    const savedTeams = localStorage.getItem('wolfPackRivalTeams');
    if (savedTeams) {
      const parsedTeams = JSON.parse(savedTeams);
      // Sadece eliminatedBy bilgilerini güncelle, diğer bilgileri koru
      rivalTeams.forEach(team => {
        const savedTeam = parsedTeams.find(t => t.name === team.name);
        if (savedTeam && savedTeam.eliminatedBy) {
          team.eliminatedBy = savedTeam.eliminatedBy;
        }
      });
    }
  } catch (e) {
    console.error("LocalStorage okuma hatası:", e);
  }
}

function getTeamAbilities(wolves) {
  const abilityScores = {};
  wolves.forEach((wolf) => {
    const { abilityScores: wolfAbilities } = getWolfAbilities(wolf);
    Object.entries(wolfAbilities).forEach(([ability, score]) => {
      abilityScores[ability] = (abilityScores[ability] || 0) + score;
    });
  });
  return abilityScores;
}

function getWolfAbilities(wolf) {
  let abilities = [];
  let abilityScores = {};

  if (!wolf) {
    return { abilities, abilityScores };
  }

  for (const [trait, value] of Object.entries(wolf)) {
    if (trait === "id" || trait === "url" || value === "None") continue;
    const abilityData = traitAbilities[trait]?.[value];
    if (abilityData) {
      abilities.push(`${abilityData.ability}: +${abilityData.score}`);
      abilityScores[abilityData.ability] =
        (abilityScores[abilityData.ability] || 0) + abilityData.score;
    }
  }

  return { abilities, abilityScores };
}

//function calculateComboBonuses(wolves) {}

function toggleSelection(wolf, mode) {
  const targetArray = mode === "user" ? userSelectedIDs : opponentSelectedIDs;
  const otherArray = mode === "user" ? opponentSelectedIDs : userSelectedIDs;

  const otherIndex = otherArray.indexOf(wolf.id);
  if (otherIndex !== -1) {
    otherArray.splice(otherIndex, 1);
    delete loadedImages[wolf.id];
  }

  const index = targetArray.indexOf(wolf.id);

  if (index === -1) {
    if (targetArray.length >= 4) {
      return;
    }
    targetArray.push(wolf.id);
    loadImageAsync(wolf.url)
      .then((img) => {
        loadedImages[wolf.id] = img;
      })
      .catch(() => {
        console.error(`Image for ${wolf.id} could not be loaded!`);
      });
  } else {
    targetArray.splice(index, 1);
    delete loadedImages[wolf.id];
  }
}

function loadOpponentImages(ids) {
  ids.forEach((id) => {
    const wolf = wolfdata.find((w) => w.id === id);
    if (wolf && !loadedImages[id]) {
      loadImageAsync(wolf.url)
        .then((img) => {
          loadedImages[id] = img;
        })
        .catch(() => {});
    }
  });
}

async function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    loadImage(
      url,
      (img) => {
        loadedImages[img.id] = img;
        let resized = createGraphics(32, 32);
        resized.image(img, 0, 0, 32, 32);
        resizedImages[img.id] = resized;
        resolve(img);
      },
      reject
    );
  });
}

// Stil ve pozisyon fonksiyonları
function styleButton(btn) {
  if (!btn) {
    console.error("styleButton: Buton tanımlı değil");
    return;
  }

  // Ortak temel stiller
  btn.style("border-radius", "5px");
  btn.style("font-family", "sans-serif"); // CSS tarafında font adı
  btn.style("font-size", "12px");
  btn.style("font-weight", "bold");
  btn.style("text-align", "center");
  btn.style("line-height", "14px");

  if (btn === playButton) {
    // End Turn Butonu
    if (userSelectedIDs.length === 0 || opponentSelectedIDs.length === 0) {
      // Başlangıç durumu (Deploy yapılmadan önce)
      btn.style("color", "#000000"); // Yazı rengi siyah
      btn.style("border", "1px solid #000000"); // Çerçeve siyah
      btn.style("background-color", "#808080"); // Arka plan gri
      btn.mouseOver(() => {
        btn.style("color", "#000000");
        btn.style("border", "1px solid #000000");
        btn.style("background-color", "#808080");
      });
      btn.mouseOut(() => {
        btn.style("color", "#000000");
        btn.style("border", "1px solid #000000");
        btn.style("background-color", "#808080");
      });
    } else {
      // Deploy butonlarına tıklandıktan sonra
      btn.style("color", "#91eee6"); // Yazı rengi turkuaz
      btn.style("border", "1px solid #91eee6"); // Çerçeve turkuaz
      btn.style("background-color", "#221f3e"); // Arka plan koyu mor
      btn.mouseOver(() => {
        btn.style("color", "#221f3e"); // Yazı rengi koyu mor
        btn.style("border", "1px solid #91eee6"); // Çerçeve turkuaz
        btn.style("background-color", "#91eee6"); // Arka plan turkuaz
      });
      btn.mouseOut(() => {
        btn.style("color", "#91eee6");
        btn.style("border", "1px solid #91eee6");
        btn.style("background-color", "#221f3e");
      });
    }
  }  else {
    // Diğer butonlar için varsayılan stil
    btn.style("background-color", "transparent");
    btn.style("color", "#91eee6");
    btn.style("border", "1px solid #91eee6");
    btn.mouseOver(() => {
      btn.style("color", "#221f3e");
      btn.style("background-color", "#91eee6");
    });
    btn.mouseOut(() => {
      btn.style("color", "#91eee6");
      btn.style("background-color", "transparent");
    });
  }
}

function positionButton(btn, x, y) {
  if (!btn || typeof btn.position !== "function") {
    console.error("positionButton: btn is undefined or not a p5 element", btn);
    return;
  }
  let canvasX = (windowWidth - width) / 2;
  btn.position(canvasX + x, y);
}

function repositionElements() {
  let canvasX = (windowWidth - width) / 2;
  console.log("Repositioning elements, canvasX:", canvasX);

  if (nextPageButton)
    positionButton(nextPageButton, 35 + 344 + 10 + 294, 80 + 205);
  if (prevPageButton)
    positionButton(prevPageButton, 35 + 344 + 10 + 244, 80 + 205);
}

function updateCanvasPosition() {
  let cnv = select("canvas");
  if (!cnv) {
    console.warn("updateCanvasPosition: Canvas not found");
    return;
  }
  let x = (windowWidth - width) / 2;
  let y = 0;
  cnv.style("position", "absolute");
  cnv.style("left", x + "px");
  cnv.style("top", y + "px");
  repositionElements();
}
