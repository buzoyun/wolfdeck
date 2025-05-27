// Global değişkenler
let debugMode = false; // Hata ayıklama için true yap
let playButton, nextButton, addToPlayer1Button, addToPlayer2Button;
let winnerHighlightProgress = 0;
let winnerHighlightActive = false;
let abilityScoreCache = {};
let cachedSortedWolfdata = [];
let lastSortedPageData = [];
let lastSortColumn = null;
let lastSortAscending = null;
let hideUI = false;
let tableSectionWidth = 200;
let tableSectionX = 10;
let tableSectionY = 60;
let leftMargin = tableSectionX + tableSectionWidth + 10;
let showNextButton = false;
let sortNeedsUpdate = true;
let userSelectedIDs = [];
let opponentSelectedIDs = [];
let loadedImages = {};
let emptyImg;
let sheepImg;
let inputActive = false;
let inputText = "";
let inputX = null;
let inputY = null;
let inputTeam = null;
let opponentTeamInitialized = false;
let sortColumn = "Total Points";
let sortAscending = false;
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
let selectedColumn = "Total Points";
let tableCacheDirty = true;
let wolfPointsCache = {};
let resizedImages = {};
let debounceTimeout;
let battleStarted = false;
let battleText = [];
let battleTextIndex = 0;
let textDisplayTime = 0;
let animatedWolfSection = null;
let player1Input, player2Input;
let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Team = [];
let player2Team = [];
let showPopup = false;
let selectedWolfId = null;
let showTeamPopup = false;
let selectedTeamIDs = null;
let battleStep = 0;
let attackIndex = 0, blockIndex = 0;
let netAttacks = [];
let winnerMessage = null;
let winnerMessageTimer = 0;
let winnerMessageAlpha = 0;
let battleEndTime = 0;
const BATTLE_END_DELAY = 3000; // 3 saniye
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
let netAttackP1 = 0; // P1'in net atak puanı
let netAttackP2 = 0; // P2'in net atak puanı
let currentAttackIndex = 0; // Şu anki atak sırası
let winningTeam = ""; // Kazanan takım
let speedMultiplier = 1; // Hız katsayısı: 1 = normal, 2 = hızlı, 0.5 = yavaş
let isPaused = false; // Duraklatma durumu
let abilityImages = {}; // Ability resimleri için obje
let player1AssignedBlocks = []; // Player 1'in Player 2 ataklarına karşı atanmış blokları
let player2AssignedBlocks = []; // Player 2'nin Player 1 ataklarına karşı atanmış blokları
let cunningSound;
let sneakSound;
let moneySound;
let winnerSoundPlayed = false;
let rageSoundPlayed = false;
let endTurnButtonActive = true; // End Turn butonunun aktif/pasif durumu
let endTurnButtonY = 200; // End Turn butonunun Y pozisyonu
let showNoDefendersMessage = false; // Mesaj kontrolü
let noDefendersMessageTimer = 0; // Mesaj zamanlayıcısı
let selectedRivalTeam = "Player 2"; // Varsayılan olarak Player 2 seçili
const middleHeight = 267.5;
const teamSectionHeight = 105;
const CARD_SIZE = 75;
const CARD_SPACING = 3;
let rivalCurrentPage = 0;
let rivalItemsPerPage = 9; // Bir sayfada 9 satır
let rivalFirstPageButton, rivalPrevPageButton, rivalNextPageButton, rivalLastPageButton;
let removeWolfButton, keepWolfButton; // Button for removing the wolf
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
let gifStartTime = 0;
const gifDuration = 3000; // 3 saniye
let battleHistory = []; // Savaş geçmişini tutacak
let currentBattle = null; // Aktif savaş bilgisi
let showInfoBox = false; // Bilgi kutucuğunun görünüp görünmeyeceğini kontrol eder
let infoBoxText = "";    // Bilgi kutucuğunda gösterilecek metin
let infoBoxX = 0;        // Bilgi kutucuğunun X pozisyonu
let infoBoxY = 0;        // Bilgi kutucuğunun Y pozisyonu
let canvasWidth = 840;
let canvasHeight = 870;
let fieldCenterX = canvasWidth / 2;
let fieldCenterY = canvasHeight / 2;
let showSkillDetailsPopup = false; // Controls visibility of the skill details popup
let selectedSkill = null;          // The skill clicked (e.g., "Morale", "Rage")
let skillDetails = [];             // Array of { id, traits } for wolves with contributing traits
let showResetPopup = false; // New global variable for reset popup visibility
let resetButtonX, resetButtonY, resetButtonSize = 20;
let yesButton, noButton; // Reset popup butonları için
let currentSkillIndex = 0; // Şu anda oynanan kart türünün indeksi
let skillTimer = 0; // Kartlar arasındaki 3 saniyelik zamanlayıcı
let activeSkill = null; // Şu anda oynanan skill
let resultFadeAlpha = 0;
let resultFadeInStart = 0;
let moraleEffectActive = { P1: false, P2: false };
let moraleParticles = { P1: [], P2: [] };
let fearEffectActive = { P1: false, P2: false };
let fearParticles = { P1: [], P2: [] };
let moneyTransitions = { P1: [], P2: [] };
let cunningEffectActive = { P1: false, P2: false };
let cunningParticles = { P1: [], P2: [] };
let moneyTransitionsGlobal = [];
let moneyEffectActiveGlobal = true;
let moneyParticles = { P1: [], P2: [] };
let moneyEffectActive = { P1: false, P2: false };
let perceptionEffectActive = { P1: false, P2: false };
let perceptionParticles = { P1: [], P2: [] };
let badassEffectActive = { P1: false, P2: false };
let badassParticles = { P1: [], P2: [] };
let composureEffectActive = { P1: false, P2: false };
let composureParticles = { P1: [], P2: [] };
let cunningTransitionsGlobal = [];
let sneakTransitionsGlobal = [];
let penaltyEffects = { P1: [], P2: []};
let penaltyEffectActive = { P1: false, P2: false};
let bloodlustEffects = { P1: [], P2: [] };
let bloodlustApplied = { P1: false, P2: false };
let bloodlustTransitionsGlobal = [];
let rageEffects = { P1: [], P2: [] };
let rageEffectData = { P1: null, P2: null };
let rageApplied = { P1: false, P2: false };
function preload() {
  emptyImg = loadImage("assets/images/empty.png");
  comboImg = loadImage("assets/images/moves/combo.png");
  threeTImg = loadImage("assets/images/moves/3T.png");
  questionImg = loadImage("assets/images/question.png");
  wcBlueImg = loadImage("assets/images/packs/wc_blue.png");
  wcRedImg = loadImage("assets/images/packs/wc_red.png");
  sheepImg = loadImage("assets/images/bf.png");
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
    selectSound = loadSound("assets/sounds/select.ogg");
    removeSound = loadSound("assets/sounds/remove.ogg");
    cardSound = loadSound("assets/sounds/card.ogg");
    hitSound = loadSound("assets/sounds/arrow.ogg");
    cunningSound = loadSound("assets/sounds/cunning.ogg");
    fearSound = loadSound("assets/sounds/fear.ogg");
    moraleSound = loadSound("assets/sounds/morale.ogg");
    sneakSound = loadSound("assets/sounds/sneak.ogg");
    winSound = loadSound("assets/sounds/win.ogg");
    moneySound = loadSound("assets/sounds/money.ogg");
    rageSound = loadSound("assets/sounds/rage.ogg");
    clickSound = loadSound("assets/sounds/click.ogg");
    bloodlustSound = loadSound("assets/sounds/bloodlust.ogg");
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
const skillBlockRules = {
  Perception: { blocks: "Sneak", blockedBy: "Rage" },
  Sneak: { blocks: "Cunning", blockedBy: "Perception" },
  Rage: { blocks: "Perception", blockedBy: "Badass" },
  Badass: { blocks: "Rage", blockedBy: "Bloodlust" },
  Bloodlust: { blocks: "Badass", blockedBy: "Composure" },
  Composure: { blocks: "Bloodlust", blockedBy: "Morale" },
  Morale: { blocks: "Composure", blockedBy: "Fear" },
  Fear: { blocks: "Morale", blockedBy: "Money" },
  Money: { blocks: "Fear", blockedBy: "Cunning" },
  Cunning: { blocks: "Money", blockedBy: "Sneak" }
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
const skillOrder = ["Fear", "Morale", "Cunning", "Money", "Perception", "Sneak", "Badass", "Bloodlust", "Composure", "Rage"];
const skillPositions = {
  P2: {
    far: [
      { skill: "Morale", x: 230, y: 180 },
      { skill: "Money", x: 305, y: 180 },
      { skill: "Sneak", x: 380, y: 180 },
      { skill: "Bloodlust", x: 455, y: 180 },
      { skill: "Rage", x: 530, y: 180 },
    ],
    near: [
      { skill: "Fear", x: 230, y: 280 },
      { skill: "Cunning", x: 305, y: 280 },
      { skill: "Perception", x: 380, y: 280 },
      { skill: "Badass", x: 455, y: 280 },
      { skill: "Composure", x: 530, y: 280 },
    ],
  },
P1: {
    near: [
      { skill: "Fear", x: 230, y: 520 },
      { skill: "Cunning", x: 305, y: 520 },
      { skill: "Perception", x: 380, y: 520 },
      { skill: "Badass", x: 455, y: 520 },
      { skill: "Composure", x: 530, y: 520 },
    ],
    far: [
      { skill: "Morale", x: 230, y: 620 },
      { skill: "Money", x: 305, y: 620 },
      { skill: "Sneak", x: 380, y: 620 },
      { skill: "Bloodlust", x: 455, y: 620 },
      { skill: "Rage", x: 530, y: 620 },
    ],
  },
};
let rivalTeams = [
  { name: "Player 2", imgId: "empty", ids: [], eliminatedBy: null, hiScore: 0 },
  { name: "McWolves", imgId: "mc1", ids: ["mc1", "mc2", "mc3"], eliminatedBy: null, hiScore: 0 },
  { name: "Street Wolves", imgId: "street1", ids: ["street1", "street2", "street3"], eliminatedBy: null, hiScore: 0 },
  { name: "Sea Wolves", imgId: "sea1", ids: ["sea1", "sea2", "sea3"], eliminatedBy: null, hiScore: 0 },
  { name: "Mountain Wolves", imgId: "mountain1", ids: ["mountain1", "mountain2", "mountain3"], eliminatedBy: null, hiScore: 0 },
  { name: "Fire Wolves", imgId: "fire1", ids: ["fire1", "fire2", "fire3"], eliminatedBy: null, hiScore: 0 },
  { name: "Cyber Wolves", imgId: "cyber1", ids: ["cyber1", "cyber2", "cyber3"], eliminatedBy: null, hiScore: 0 },
  { name: "Royal Wolves", imgId: "royal1", ids: ["royal1", "royal2", "royal3"], eliminatedBy: null, hiScore: 0 },
  { name: "Ice Wolves", imgId: "ice1", ids: ["ice1", "ice2", "ice3"], eliminatedBy: null, hiScore: 0 },
];
// Puanları önceden hesapla
function precomputeWolfPoints() {
  wolfdata.forEach((wolf) => {
    wolfPointsCache[wolf.id] = calculateWolfPoints(wolf);
  });
}
class FearParticle {
  constructor(startX, startY, targetX, targetY, card, cardPos) {
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.x = startX;
    this.y = startY;
    this.progress = 0;
    this.speed = 0.05;
    this.reached = false;
    this.card = card;
    this.cardPos = cardPos;
  }

  update() {
    if (this.progress < 1) {
      this.progress += this.speed;
      let t = this.progress;
      this.x = lerp(this.startX, this.targetX, t);
      this.y = lerp(this.startY, this.targetY, t) + sin(t * PI) * 20;
    } else {
      this.reached = true;
    }
  }

  draw() {
    if (!this.reached) {
      push();
      fill(255, 0, 0);
      noStroke();
      ellipse(this.x, this.y, 6, 6);
      pop();
    }
  }
}
class Particle {
  constructor(startX, startY, targetX, targetY, card, cardPos) {
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.x = startX;
    this.y = startY;
    this.progress = 0; // 0 = başlangıç, 1 = hedefe ulaştı
    this.speed = 0.05; // Hareket hızı
    this.reached = false;
    this.card = card; // Hedef kart
    this.cardPos = cardPos; // Kart pozisyonu
  }

  update() {
    if (this.progress < 1) {
      this.progress += this.speed;
      let t = this.progress;
      this.x = lerp(this.startX, this.targetX, t);
      this.y = lerp(this.startY, this.targetY, t) + sin(t * PI) * 20; // Kavisli hareket
    } else {
      this.reached = true;
    }
  }

  draw() {
    push();
    fill(0, 255, 0); // Yeşil renkli top
    noStroke();
    ellipse(this.x, this.y, 6, 6); // Parçacık
    pop();
  }
}

// setup fonksiyonu
function setup() {
  frameRate(60);
  // LocalStorage'dan verileri yükle
  loadRivalTeamsFromStorage();
  // Sayfa kapatılırken verileri kaydetmek için event listener ekle
  window.addEventListener('beforeunload', saveRivalTeamsToStorage);
  textFont("sans-serif"); // Varsayılan olarak sans-serif kullanıyoruz 
  let canvasWidth = 840;
  let canvasHeight = 870;
  let canvas = createCanvas(canvasWidth, canvasHeight);
  let ctx = canvas.drawingContext;
  ctx.willReadFrequently = true;
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
  moraleSound.setVolume(0.1);
  winSound.setVolume(0.3);
  bloodlustSound.setVolume(1.8);
  
  window.skillPositions = [];
  ["P1", "P2"].forEach(team => {
  ["near", "far"].forEach(row => {
    skillPositions[team][row].forEach(pos => {
      window.skillPositions.push({ ...pos, x: pos.x, y: pos.y, radius: 30 });
      });
    });
  });

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
playButton.position(386, 825);
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
    if (clickSound) clickSound.play();
    playButton.hide(); // 👈 Play butonu savaş başlarken gizleniyor
    hideUI = true; // 👈 tablo ve girişleri gizle
  } else {
    updateEndTurnButtonStyle();
  }
}); 
  // İlk stil güncellemesi
  updateEndTurnButtonStyle();
  playButton.mouseReleased(() => {});

 
nextButton = createButton("Next");
nextButton.size(75, 30);
nextButton.position(386, 825);
nextButton.style("border-radius", "30px");
nextButton.style("font-size", "16px");
nextButton.style("font-weight", "bold");
nextButton.style("text-align", "center");
nextButton.style("cursor", "pointer");
nextButton.style("border", "2px solid #91eee6");
nextButton.style("background-color", "transparent"); // Şeffaf arka plan
nextButton.style("color", "#91eee6"); // Turkuaz yazı
nextButton.mouseOver(() => {
if (!showSkillDetailsPopup) {
    nextButton.style("background-color", "#91eee6"); // Turkuaz arka plan
    nextButton.style("color", "#221f3e"); // Koyu mor yazı
  }
});
nextButton.mouseOut(() => {
if (!showSkillDetailsPopup) {
    nextButton.style("background-color", "transparent"); // Şeffaf arka plan
    nextButton.style("color", "#91eee6"); // Turkuaz yazı
  }
});  
nextButton.mousePressed(handleNextButton);
nextButton.hide();
playButton.show();   // 👈 Play butonu tekrar görünsün 
  
  // Reset popup buton pozisyonları
  yesButtonX = canvasWidth / 2 + 10;
  yesButtonY = canvasHeight / 2 + 20;
  noButtonX = canvasWidth / 2 - 70;
  noButtonY = canvasHeight / 2 + 20;

  // Yes butonu
  yesButton = createButton("Yes");
  yesButton.position(yesButtonX, yesButtonY);
  yesButton.size(65, 25);
  yesButton.style("background-color", "#0093ff");
  yesButton.style("color", "#ffffff");
  yesButton.style("border", "2px solid #0077cc");
  yesButton.style("border-radius", "20px");
  yesButton.style("font-size", "14px");
  yesButton.style("font-weight", "bold");
  yesButton.style("cursor", "pointer");
  yesButton.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  yesButton.hide();
  yesButton.mousePressed(() => {
    rivalTeams.forEach(team => {
      if (clickSound) clickSound.play();
      team.eliminatedBy = null;
      team.hiScore = 0;
    });
    saveRivalTeamsToStorage();
    showResetPopup = false;
  });

  // No butonu
  noButton = createButton("No");
  noButton.position(noButtonX, noButtonY);
  noButton.size(65, 25);
  noButton.style("background-color", "#ff4c40");
  noButton.style("color", "#ffffff");
  noButton.style("border", "2px solid #cc3a35");
  noButton.style("border-radius", "20px");
  noButton.style("font-size", "14px");
  noButton.style("font-weight", "bold");
  noButton.style("cursor", "pointer");
  noButton.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  noButton.hide();
  noButton.mousePressed(() => {
    if (clickSound) clickSound.play();
    showResetPopup = false;
  });  
  
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
        player1Cards = calculateCards(userSelectedIDs);
        updateEndTurnButtonStyle();
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
        player2Cards = calculateCards(opponentSelectedIDs);
        updateEndTurnButtonStyle();
      }
      closePopup();
    });
  }

removeWolfButton = createButton("REMOVE");
  if (removeWolfButton) {
  removeWolfButton.size(65, 25); // Daha büyük boyut
  removeWolfButton.style("background-color", "#ff4c40"); // P1 mavi
  removeWolfButton.style("color", "#ffffff");
  removeWolfButton.style("border", "2px solid #cc3a35");
  removeWolfButton.style("border-radius", "20px");
  removeWolfButton.style("font-size", "14px");
  removeWolfButton.style("font-weight", "bold");
  removeWolfButton.style("cursor", "pointer");
  removeWolfButton.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  removeWolfButton.hide();
  removeWolfButton.mousePressed(() => {
  if (selectedTeamWolfId && selectedTeamType) {
    const targetArray = selectedTeamType === "user" ? userSelectedIDs : opponentSelectedIDs;
    const index = targetArray.indexOf(selectedTeamWolfId);

    if (index !== -1) {
      targetArray.splice(index, 1);

      if (removeSound) removeSound.play();
      // Güncel takımı kopyala
      if (selectedTeamType === "user") {
        player1Team = userSelectedIDs.slice();
        player1Cards = calculateCards(userSelectedIDs);  // 👈 Skill kartlarını güncelle
      } else {
        player2Team = opponentSelectedIDs.slice();
        player2Cards = calculateCards(opponentSelectedIDs);  // 👈 Skill kartlarını güncelle
      }

      // Savaş durumunu sıfırla ve buton stilini güncelle
      battleStarted = false;
      activeSkill = null;
      updateEndTurnButtonStyle();
    }

    closeTeamWolfPopup();
  }
});
}  
  
keepWolfButton = createButton("KEEP IT");
  if (keepWolfButton) {
  keepWolfButton.size(65, 25);
  keepWolfButton.style("background-color", "#808080");
  keepWolfButton.style("color", "#ffffff");
  keepWolfButton.style("border", "2px solid #666666");
  keepWolfButton.style("border-radius", "20px");
  keepWolfButton.style("font-size", "14px");
  keepWolfButton.style("font-weight", "bold");
  keepWolfButton.style("cursor", "pointer");
  keepWolfButton.style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)");
  keepWolfButton.hide();
  keepWolfButton.mousePressed(() => {
    if (clickSound) clickSound.play();
    closeTeamWolfPopup();
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
        abilityScoreCache = {}; // 💡 burada cache temizleniyor
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
        abilityScoreCache = {}; // 💡 burada cache temizleniyor
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
  keepWolfButton.hide();
  // Takım durumlarını güncelle
  player1Team = userSelectedIDs.slice();
  player2Team = opponentSelectedIDs.slice();
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
  push();
  background("#181530");
  document.body.style.backgroundColor = "#000000";
  // Draw Canvas Border
  noFill();
  stroke("#3f3973");
  strokeWeight(4);
  rect(0, 0, canvasWidth, canvasHeight);
  noStroke();

  // Title
  textSize(16);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("WolfDeck", 400, 40);

  // Wolf Capital Link
  textSize(12);
  fill("#91eee6");
  textStyle(BOLD);
  text("by Wolf Capital", 485, 40);

  // Wolf Selection Section
  if (!hideUI) {

    
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

    if (tableCacheDirty) {
      drawWolfDataTableToBuffer(tableSectionX);
    }

    image(tableBuffer, 0, 150);
    //pop();


  const rowHeight = 80;
  const startIndex = currentPage * itemsPerPage;
  
  let filteredWolfdata = wolfdata
  .filter((w) => parseInt(w.id) <= 7500)
  .filter((w) => searchFilter === "" || w.id === searchFilter)
  .filter((w) => nftIds.length === 0 || nftIds.includes(w.id));

  // Sıralamayı sadece gerektiğinde yap
  if (
  sortNeedsUpdate ||
  sortColumn !== lastSortColumn ||
  sortAscending !== lastSortAscending
  ) {
  cachedSortedWolfdata = [...filteredWolfdata];

  cachedSortedWolfdata.sort((a, b) => {
    let valA, valB;
    if (sortColumn === "id") {
      valA = parseInt(a.id) || 0;
      valB = parseInt(b.id) || 0;
    } else if (sortColumn === "Total Points") {
      valA = wolfPointsCache[a.id]?.totalPoints || 0;
      valB = wolfPointsCache[b.id]?.totalPoints || 0;
    } else if (sortColumn === "3T Bonus") {
      valA = has3TBonus(a) ? 9 : 0;
      valB = has3TBonus(b) ? 9 : 0;
    } else {
      valA = getAbilityScoreCached(a, sortColumn) || 0;
      valB = getAbilityScoreCached(b, sortColumn) || 0;
    }
    return sortAscending ? valA - valB : valB - valA;
  });

  lastSortColumn = sortColumn;
  lastSortAscending = sortAscending;
  sortNeedsUpdate = false;
  }

  
  const pageData = cachedSortedWolfdata.slice(
    startIndex,
    Math.min(startIndex + itemsPerPage, cachedSortedWolfdata.length)
  );
  lastSortedPageData = pageData; // 👈 BUNU EKLE
  let yOffset = 150 + 45;
  pageData.forEach((wolf) => {
    noFill();
    stroke("#3f3973");
    strokeWeight(1);
    rect(0, yOffset, tableSectionWidth, rowHeight);
    yOffset += rowHeight;
  });
  pop();
    
    
  if (showEmptyPopup) drawEmptyPopup();
  // Input Fields and Sorting
  const inputWidth = Math.min(tableSectionWidth - 30, 180);
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

  // Wolves Shown Text
  let filteredWolvesCount;
  const searchValue = searchInput.value().trim();
  const walletValue = walletInput.value().trim();
  if (searchValue === "" && walletValue === "") {
    filteredWolvesCount = wolfdata.filter((w) => parseInt(w.id) <= 7500).length;
  } else if (searchValue !== "") {
    filteredWolvesCount = wolfdata.some((w) => w.id === searchValue) ? 1 : 0;
  } else {
    filteredWolvesCount = nftIds.length;
  }
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text(
    `${filteredWolvesCount} ${filteredWolvesCount === 1 ? "wolf" : "wolves"} shown`,
    tableSectionX + 100,
    tableSectionY + 43 + 2 * (inputHeight + padding) + 15 + inputHeight + 5
  );

  // Search and Wallet Clear Buttons
  const inputxButtonSize = 10;
  if (searchInput.value().length > 0) {
    push();
    textSize(14);
    textStyle(NORMAL);
    if (
      mouseX >= 200 - inputxButtonSize / 2 &&
      mouseX <= 200 + inputxButtonSize / 2 &&
      mouseY >= 110 - inputxButtonSize - 2 &&
      mouseY <= 110
    ) {
      fill("#ff0000");
      cursor(HAND);
    } else {
      fill("#e1e2e6");
    }
    textAlign(CENTER);
    text("✖", 200, 110);
    pop();
  }

  if (walletInput.value().length > 0) {
    push();
    textSize(14);
    textStyle(NORMAL);
    if (
      mouseX >= 200 - inputxButtonSize / 2 &&
      mouseX <= 200 + inputxButtonSize / 2 &&
      mouseY >= 150 - inputxButtonSize - 2 &&
      mouseY <= 150
    ) {
      fill("#ff0000");
      cursor(HAND);
    } else {
      fill("#e1e2e6");
    }
    textAlign(CENTER);
    text("✖", 200, 150);
    pop();
  }

  // Navigation Buttons
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
  const totalPages = Math.ceil(cachedSortedWolfdata.length / itemsPerPage);
  textSize(12);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text(
    `${currentPage + 1} of ${totalPages}`,
    tableSectionX + 20 + 2 * buttonWidth + 2 * buttonSpacing + 25,
    tableBottomY + 85 + buttonHeight / 2 + 5
  );
  // Rival Selection Section
  const rivalSectionX = leftMargin + leftSectionWidth + 10;
  const rivalSectionY = 60;
  drawRivalSelectionTable(rivalSectionX, rivalSectionY);

  searchInput.show();
  walletInput.show();
  columnSelect.show();    
  } //hideUI kontrol bitiş
  
  // Battle Area
  push();
  fill("#2e2a54");
  stroke("#3f3973");
  strokeWeight(1);
  const offset = 10;
  const topY = 170;
  const midY = topY + middleHeight;
  const bottomY = topY + middleHeight * 2;

  beginShape();
  vertex(leftMargin + offset, topY);
  vertex(leftMargin + leftSectionWidth - offset, topY);
  vertex(leftMargin + leftSectionWidth, midY);
  vertex(leftMargin + leftSectionWidth - offset, bottomY);
  vertex(leftMargin + offset, bottomY);
  vertex(leftMargin, midY);
  endShape(CLOSE);

  // Orta çizgi
  stroke("#3f3973");
  strokeWeight(2);
  line(
  leftMargin + 10,
  midY,
  leftMargin + leftSectionWidth - 10,
  midY
  );
  pop();

  
  if (sheepImg) {
  const sheepWidth = 382;
  const sheepHeight = 94;
  const centerX = Math.round(canvasWidth / 2);
  const centerY = Math.round(170 + middleHeight);
  imageMode(CENTER);
  
  // Bloodlust kartı merkezde mi kontrol et
  const isBloodlustAtCenter = bloodlustTransitionsGlobal.some(t => t.phase === "effect");
  if (isBloodlustAtCenter) {
    tint(139, 0, 0); // Kan kırmızısı ton
  }
  image(sheepImg, centerX, centerY, sheepWidth, sheepHeight);
  noTint(); // Tint etkisini kaldır
  imageMode(CORNER); // Geri eski moda
}

  
  // Team Sections
const teamSectionHeight = 105;
const teamSpacing = 30;
const centerY = 170 + middleHeight; // Orta çizgi

// Üstteki P2 biraz yukarıda olsun ama görünür kalsın
const player2Y = centerY - teamSpacing - teamSectionHeight - 245;
// Alttaki P1 ortanın biraz altında
const player1Y = centerY + teamSpacing + 240;

p2WolfPositions = drawTeamSection(opponentSelectedIDs, leftMargin, player2Y, rivalPackTitle, "#ffe0e0", leftSectionWidth);
p1WolfPositions = drawTeamSection(userSelectedIDs, leftMargin, player1Y, "Player 1", "#e0f0ff", leftSectionWidth);



  // End Turn Button Background
  const defaultColor = "#808080";
  const activeColor = "#91eee6";
  if (playButton && playButton.elt && playButton.elt.style.display !== "none") {
    push();
    translate(playButton.x, playButton.y + 125);
    fill(
      userSelectedIDs.length > 0 && opponentSelectedIDs.length > 0
        ? activeColor
        : defaultColor
    );
    noStroke();
    rect(0, 0, 100, 30, 5);
    pop();
  }

// Draw Cards  
if (battleStarted) {
  if (
    activeSkill === null &&
    millis() - skillTimer >= 3000 &&
    currentSkillIndex < skillOrder.length
  ) {
    activeSkill = null;
    applyNextSkill();
  }
  drawStaticSkillCards();
}
// Savaş bittiyse ve Next butonu GÖZÜKMÜYORSA (örneğin play'e basılmadıysa)
else if (
  (userSelectedIDs.length > 0 || opponentSelectedIDs.length > 0) &&
  !battleStarted &&
  !showNextButton
) {
  // Eğer kartlar zaten hesaplandıysa onları koru
  if (player1Cards.length === 0 && userSelectedIDs.length > 0) {
    player1Cards = calculateCards(userSelectedIDs);
  }
  if (player2Cards.length === 0 && opponentSelectedIDs.length > 0) {
    player2Cards = calculateCards(opponentSelectedIDs);
  }
  drawStaticSkillCards();
}
// Savaş bittikten sonra “Next” butonu görünüyorsa: sadece kartları çiz
else if (showNextButton) {
  drawStaticSkillCards(); // ❗ Konumları koru, hesaplama yapma
}
    
  // Yetenek efektlerini çiz
  if (battleStarted) {
    if (activeSkill === "Bloodlust") {
      drawBloodlustTransitionsGlobal();
      updateBloodlustEffects();
    }
    if (activeSkill === "Cunning") {
      drawCunningTransitionsGlobal();
      drawCunningEffect("P1");
      drawCunningEffect("P2");
    }
    if (activeSkill === "Fear") {
      drawFearEffect(player1Cards, "P1");
      drawFearEffect(player2Cards, "P2");
    }
    if (activeSkill === "Perception") {
      drawPerceptionEffect(player1Cards, "P1");
      drawPerceptionEffect(player2Cards, "P2");
    }
    if (activeSkill === "Money") {
      drawMoneyEffectGlobal();
      drawMoneyParticles("P1");
      drawMoneyParticles("P2");
    }
    if (activeSkill === "Morale") {
      drawMoraleEffect(player1Cards, "P1");
      drawMoraleEffect(player2Cards, "P2");
    }
    if (activeSkill === "Rage") {
      updateRageEffects();
    }
    if (activeSkill === "Sneak") {
      drawSneakTransitionsGlobal();
      if (sneakTransitionsGlobal.some(t => t.phase === "wiggle")) {
        updateBloodlustEffects();
      }
    }
    // Yeni efekt fonksiyonları
    if (activeSkill === "Badass") {
      drawBadassEffect(player1Cards, "P1");
      drawBadassEffect(player2Cards, "P2");
    }
    if (activeSkill === "Composure") {
      drawComposureEffect(player1Cards, "P1");
      drawComposureEffect(player2Cards, "P2");
    }
  }

  // Ceza efektleri sadece diğer beceriler için
  if (
    (battleStarted || showNextButton) &&
    (penaltyEffects["P1"].length > 0 || penaltyEffects["P2"].length > 0)
  ) {
    // Sadece Badass ve Composure dışındaki cezalar için drawPenaltyEffects kullan
    penaltyEffects["P1"].forEach(effect => {
      if (effect.card.ability !== "Bloodlust" && effect.card.ability !== "Rage") {
        drawPenaltyEffects(player1Cards, "P1");
      }
    });
    penaltyEffects["P2"].forEach(effect => {
      if (effect.card.ability !== "Bloodlust" && effect.card.ability !== "Rage") {
        drawPenaltyEffects(player2Cards, "P2");
      }
    });
  }
  
  if (showNextButton && nextButton && nextButton.elt && nextButton.elt.style.display !== "block")   {
  nextButton.show();
  nextButton.position(386, 825);
  } else if (!showNextButton && nextButton) {
  nextButton.hide();
  }
  
  // Tüm popup'lar için ortak yarı saydam katman
  if (showTeamPopup || showPopup || showSkillDetailsPopup || showTeamWolfPopup || showResetPopup) {
  push();
  fill(0, 0, 0, 150);
  rect(0, 0, canvasWidth, canvasHeight);
  pop();
 // DOM elemanlarının opacity’sini düşür
    [
      searchInput,
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
      playButton,
    ].forEach((element) => {
      if (element) element.style("opacity", "0.5");
    });
    // Wolf selection popup butonlarının opacity’sini koru
      if (showResetPopup) {
      if (yesButton) yesButton.style("opacity", "1.0");
      if (noButton) noButton.style("opacity", "1.0");
  }
  else if (showPopup) {
      if (addToPlayer1Button) addToPlayer1Button.style("opacity", "1.0");
      if (addToPlayer2Button) addToPlayer2Button.style("opacity", "1.0");
    }
  } else {
    // Popup kapalıyken opacity’yi geri getir
    [
      searchInput,
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
      playButton,
      addToPlayer1Button,
      addToPlayer2Button,
    ].forEach((element) => {
      if (element) element.style("opacity", "1.0");
    });
  }  
    updateBattle(); // Savaş durumunu güncelle

  // Wolf Selection Popup
  if (showPopup && selectedWolfId) {
    push();
    const popupCenterX = canvasWidth/2;
    const popupX = canvasWidth / 2 - 175;
    const popupY = canvasHeight / 2 - 105;
    //fill(0, 0, 0, 150);
    //rect(0, 0, canvasWidth, canvasHeight);
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
      fill("#FFFFFF"); //showPopup kapatma hover
      text("✖", xButtonX, xButtonY + 5);
    }
  pop();

  // Buton pozisyonlarını ayarla
  addToPlayer1Button.position(popupX + 7, popupY + 163);
  addToPlayer2Button.position(popupX + 7, popupY + 130);
  }

  // Team Wolf Popup çizdirme (draw)
  if (showTeamWolfPopup && selectedTeamWolfId) {
    push();
    const popupX = canvasWidth / 2 - 175;
    const popupY = canvasHeight / 2 - 105;
    const xButtonX = popupX + 330;
    const xButtonY = popupY + 15;
    fill(0, 0, 0, 150);
    rect(0, 0, canvasWidth, canvasHeight);
    fill("#221f3e");
    stroke("#3f3973");
    strokeWeight(1);
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
      textStyle(NORMAL);
      fill("#e1e2e6");
      text("Skills", attackColX + 80, attackYOffset);
    if (selectedTeamType === "opponent" && rivalPackTitle !== "Player 2") {
      text("Skills", attackColX + 80, attackYOffset);
      text("", 255, 453);
    } else {
      text("Skills", attackColX + 80, attackYOffset);
      text("Remove wolf?", 255, 453);
    } 
      attackYOffset += 20;
      defenseYOffset += 20;

      const attackAbilities = ["Morale", "Money", "Sneak", "Rage", "Bloodlust", "3T Bonus"];
      attackAbilities.forEach((ability) => {
        const score = abilityScores[ability] || 0;
        drawHealthBar(attackColX, attackYOffset, score, "#03A9F4");
        textSize(12);
        textStyle(NORMAL);
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
      fill("#FFFFFF"); //showTeamWolfPopup kapatma hover
      text("✖", xButtonX, xButtonY + 5);
    }
    pop();
    removeWolfButton.position(popupX + 7, popupY + 130);
    keepWolfButton.position(popupX + 7, popupY + 165);
    if (selectedTeamType === "opponent" && rivalPackTitle !== "Player 2") {
      removeWolfButton.hide();
      keepWolfButton.hide();
    } else {
      removeWolfButton.show();
      keepWolfButton.show();
    }   
  }
  // Reset popup
if (showResetPopup) {
  push();
  // Popup kutusu
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(2);
  rect(width / 2 - 100, height / 2 - 40, 200, 100, 10);
  // Başlık
  textSize(18);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(CENTER);
  text("Reset progress?", width / 2, height / 2 - 10);
  // Butonları göster
  yesButton.show();
  noButton.show();
  // Hover efektleri
  const isOverYes =
    mouseX >= yesButtonX &&
    mouseX <= yesButtonX + 60 &&
    mouseY >= yesButtonY &&
    mouseY <= yesButtonY + 40;
  const isOverNo =
    mouseX >= noButtonX &&
    mouseX <= noButtonX + 60 &&
    mouseY >= noButtonY &&
    mouseY <= noButtonY + 40;
  yesButton.style("background-color", isOverYes ? "#0093ff" : "#005bbb");
  noButton.style("background-color", isOverNo ? "#ff4c40" : "#cc3a30");
  pop();
} else {
  yesButton.hide();
  noButton.hide();
} 

// Team Info Popup Draw
if (showTeamPopup && selectedTeamIDs) {
  push();
  fill(34, 31, 62); // #221f3e
  stroke(63, 57, 115); // #3f3973
  strokeWeight(1);
  const popupX = canvasWidth / 2 - 216; // popupWidth / 2 ile ortalanmış
  const popupY = canvasHeight / 2 - 280; // popupHeight / 2 ile ortalanmış
  const popupWidth = 432; // Genişlik artırıldı
  const popupHeight = 560; // Yükseklik artırıldı
  rect(popupX, popupY, popupWidth, popupHeight, 10);

  textSize(14);
  textStyle(BOLD);
  fill(225, 226, 230); // #e1e2e6
  textAlign(CENTER);
  const teamTitle = selectedTeamIDs === userSelectedIDs ? player1Name : rivalPackTitle;
  text("Skill Cards", popupX + popupWidth / 2, popupY + 20);

  const selectedWolves = selectedTeamIDs
    .map((id) => wolfdata.find((w) => w.id === id))
    .filter((w) => w);
  const abilityScores = getTeamAbilities(selectedWolves);
  const numberOf3TWolves = selectedWolves.filter((wolf) => has3TBonus(wolf)).length;
  abilityScores["3T Bonus"] =
    numberOf3TWolves === 1 ? 9 : numberOf3TWolves === 2 ? 18 : numberOf3TWolves >= 3 ? 27 : 0;

  const leftSkills = ["Fear", "Cunning", "Perception", "Badass", "Composure"];
  const rightSkills = ["Morale", "Money", "Sneak", "Bloodlust", "Rage"];

  const skillDescriptions = {
    Fear: "If this card's Power is higher than your rival's Morale power; -1 Power for each enemy card.",
    Morale: "If this card's Power is higher than your rival's Fear power; +1 Power for each of your cards.",
    Cunning: "Steal Power from your rival's Money card equal to this card's Power.",
    Money: "Recruit the lowest-Power enemy card with Power below this card's Power.",
    Perception: "Afflict your rival's Sneak card with negative Power equal to this card's Power.",
    Sneak: "Assassinate the lowest-Power enemy card.",
    Badass: "Afflict your rival's Bloodlust card with negative Power equal to this card's Power.",
    Bloodlust: "Destroy each enemy card with 5 or less Power.",
    Composure: "Afflict your rival's Rage card with negative Power equal to this card's Power.",
    Rage: "+2 Power for each of your destroyed cards."
  };

  const startXLeft = popupX + 13;
  const startXRight = popupX + 226; // popupWidth artırıldığı için kaydırıldı
  let startY = popupY + 30;
  const rowSpacing = 80; // Kutular arası mesafe artırıldı
  const iconSize = 48;

  textFont("Trebuchet MS");

  for (let i = 0; i < leftSkills.length; i++) {
    [leftSkills[i], rightSkills[i]].forEach((skill, colIndex) => {
      const x = colIndex === 0 ? startXLeft : startXRight;
      const y = startY + i * rowSpacing;

      // Yetenek için çerçeve (arka plan kutusu)
      push();
      fill(63, 57, 115, 200); // #3f3973, opaklık 200/255
      stroke(225, 226, 230); // #e1e2e6
      strokeWeight(1);
      rect(x - 10, y - 4, iconSize + 155, iconSize + 25, 5); // Kutu: ikon + açıklama
      pop();

      // Hover efekti
      const isHovered = mouseX > x && mouseX < x + iconSize + 155 && mouseY > y && mouseY < y + iconSize + 25;
      if (isHovered) {
        push();
        fill(225, 226, 230, 50); // #e1e2e6, opaklık 50/255
        rect(x - 10, y - 4, iconSize + 155, iconSize + 25, 5);
        pop();
      }

      // Skill ikon
      push();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.arc(x + iconSize / 2, y + iconSize / 2, iconSize / 2, 0, TWO_PI);
      drawingContext.clip();
      if (abilityImages[skill]) {
        image(abilityImages[skill], x, y, iconSize, iconSize);
      } else {
        fill(100);
        ellipse(x + iconSize / 2, y + iconSize / 2, iconSize, iconSize);
      }
      drawingContext.restore();
      pop();

      // Skill adı (ikonun altında)
      push();
      textSize(12);
      textStyle(BOLD);
      fill(225, 226, 230); // #e1e2e6
      noStroke();
      textAlign(CENTER);
      text(skill, x + iconSize / 2, y + iconSize + 14);
      pop();

      // Skill açıklama
      push();
      textSize(11);
      textStyle(NORMAL);
      fill(225, 226, 230); // #e1e2e6
      noStroke();
      textAlign(LEFT);
      const desc = skillDescriptions[skill] || "No description.";
      text(desc, x + iconSize + 5, y + 10, 140, 70); // Daha yakın konum
      pop();
    });
  }

  const bottomYOffset = startY + 20 + leftSkills.length * rowSpacing + 15; // Mesafe artırıldı
  const bottomIconSize = 48;
  
  textSize(14);
  textStyle(BOLD);
  fill(225, 226, 230); // #e1e2e6
  textAlign(CENTER);
  text("Wolf Pack Cards", popupX + popupWidth / 2, popupY + 450); // popupHeight artırıldığı için kaydırıldı

  // Trait Combos (sol alt)
  push();
  fill(63, 57, 115, 200); // #3f3973, opaklık 200/255
  stroke(225, 226, 230); // #e1e2e6
  strokeWeight(1);
  rect(startXLeft - 5, bottomYOffset - 5, bottomIconSize + 150, bottomIconSize + 30, 5); // Çerçeve
  pop();

  // Trait Combos hover efekti
  const isComboHovered = mouseX > startXLeft && mouseX < startXLeft + bottomIconSize + 150 && mouseY > bottomYOffset && mouseY < bottomYOffset + bottomIconSize + 30;
  if (isComboHovered) {
    push();
    fill(225, 226, 230, 50); // #e1e2e6, opaklık 50/255
    rect(startXLeft - 5, bottomYOffset - 5, bottomIconSize + 150, bottomIconSize + 30, 5);
    pop();
  }

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(
    startXLeft + bottomIconSize / 2,
    bottomYOffset + bottomIconSize / 2,
    bottomIconSize / 2,
    0,
    TWO_PI
  );
  drawingContext.clip();
  if (comboImg) {
    image(comboImg, startXLeft, bottomYOffset, bottomIconSize, bottomIconSize);
  } else {
    fill(100);
    ellipse(startXLeft + bottomIconSize / 2, bottomYOffset + bottomIconSize / 2, bottomIconSize, bottomIconSize);
  }
  drawingContext.restore();
  pop();

  push();
  textSize(12);
  textStyle(BOLD);
  fill(225, 226, 230); // #e1e2e6
  noStroke();
  textAlign(LEFT);
  text("Trait Combos", startXLeft - 25 + bottomIconSize / 2, bottomYOffset + bottomIconSize + 14);
  pop();
  
  push();
  textSize(11);
  textStyle(NORMAL);
  fill(225, 226, 230); // #e1e2e6
  noStroke();
  textAlign(LEFT);
  text("+2 Power for 2 same traits,\n+3 Power for 3 same traits", startXLeft + bottomIconSize + 5, bottomYOffset + 20);
  pop();

  // 3T Wolves (sağ alt)
  push();
  fill(63, 57, 115, 200); // #3f3973, opaklık 200/255
  stroke(225, 226, 230); // #e1e2e6
  strokeWeight(1);
  rect(startXRight - 5, bottomYOffset - 5, bottomIconSize + 150, bottomIconSize + 30, 5); // Çerçeve
  pop();

  // 3T Wolves hover efekti
  const is3THovered = mouseX > startXRight && mouseX < startXRight + bottomIconSize + 150 && mouseY > bottomYOffset && mouseY < bottomYOffset + bottomIconSize + 30;
  if (is3THovered) {
    push();
    fill(225, 226, 230, 50); // #e1e2e6, opaklık 50/255
    rect(startXRight - 5, bottomYOffset - 5, bottomIconSize + 150, bottomIconSize + 30, 5);
    pop();
  }

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(
    startXRight + bottomIconSize / 2,
    bottomYOffset + bottomIconSize / 2,
    bottomIconSize / 2,
    0,
    TWO_PI
  );
  drawingContext.clip();
  if (threeTImg) {
    image(threeTImg, startXRight, bottomYOffset, bottomIconSize, bottomIconSize);
  } else {
    fill(100);
    ellipse(startXRight + bottomIconSize / 2, bottomYOffset + bottomIconSize / 2, bottomIconSize, bottomIconSize);
  }
  drawingContext.restore();
  pop();

  push();
  textSize(12);
  textStyle(BOLD);
  fill(225, 226, 230); // #e1e2e6
  noStroke();
  textAlign(LEFT);
  text("3T Wolves", startXRight - 25 + bottomIconSize / 2, bottomYOffset + bottomIconSize + 14);
  pop();
  
  push();
  textSize(11);
  textStyle(NORMAL);
  fill(225, 226, 230); // #e1e2e6
  noStroke();
  textAlign(LEFT);
  text("+9 Power per 3T wolf\n(wolves with only 3 traits)", startXRight + bottomIconSize + 5, bottomYOffset + 20);
  pop();

  const xButtonX = popupX + popupWidth - 20;
  const xButtonY = popupY + 15;
  textFont("Arial");
  fill(0);
  noStroke();
  ellipse(xButtonX, xButtonY, 20, 20);
  fill(245, 245, 245); // #F5F5F5
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
    fill(255, 255, 255); // #FFFFFF
    text("✖", xButtonX, xButtonY + 5);
  }

  if (showSkillDetailsPopup) {
    drawSkillDetailsPopup();
  }
  pop();
}
  // Info Box
  if (showInfoBox) {
    push();
    fill("#221f3e");
    stroke("#3f3973");
    strokeWeight(1);
    const boxWidth = 230;
    const boxHeight = 20;
    let boxX = infoBoxX - boxWidth / 2;
    let boxY = infoBoxY - boxHeight - 10;
    boxX = constrain(boxX, 0, canvasWidth - boxWidth);
    boxY = constrain(boxY, 0, canvasHeight - boxHeight);
    rect(boxX, boxY, boxWidth, boxHeight, 5);
    textSize(12);
    textStyle(NORMAL);
    fill("#e1e2e6");
    textAlign(CENTER);
    text(infoBoxText, boxX + boxWidth / 2, boxY + boxHeight / 2 + 3);
    pop();
  }
if (winnerMessage) {
  const elapsed = millis() - winnerMessageTimer;

  if (elapsed > 1500) {
    winnerMessage = null;
    showNextButton = true;
    winnerSoundPlayed = false; // Sonraki kazanan için sıfırla
  } else if (elapsed >= 800) { // ✨ Yazı ancak 800ms sonra başlar

    // ✅ Ses yalnızca bir kere çalınır
    if (!winnerSoundPlayed && winSound) {
      winSound.play();
      winnerSoundPlayed = true;
    }

    const centerX = canvasWidth / 2;
    const centerY = 170 + middleHeight;
    let scaleFactor = 1;
    if (elapsed < 850) {
      scaleFactor = 1;
    } else if (elapsed < 1200) {
      scaleFactor = map(elapsed, 850, 1200, 1, 1.4);
    } else if (elapsed < 1400) {
      scaleFactor = 1.4;
    } else {
      scaleFactor = map(elapsed, 1400, 1500, 1.4, 0.1);
    }

    push();
    translate(centerX, centerY);
    scale(scaleFactor);
    textAlign(CENTER, CENTER);
    textSize(36);
    textStyle(BOLD);
    stroke("#91eee6");
    fill("#181530");
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "rgba(128, 128, 128, 0.7)";

    let rectWidth = 300;
    let rectHeight = 60;
    let protrusion = 20;
    beginShape();
    vertex(-rectWidth / 2, -rectHeight / 2);
    vertex(-rectWidth / 2 + protrusion, -rectHeight / 2 - protrusion / 2);
    vertex(rectWidth / 2 - protrusion, -rectHeight / 2 - protrusion / 2);
    vertex(rectWidth / 2, -rectHeight / 2);
    vertex(rectWidth / 2, rectHeight / 2);
    vertex(rectWidth / 2 - protrusion, rectHeight / 2 + protrusion / 2);
    vertex(-rectWidth / 2 + protrusion, rectHeight / 2 + protrusion / 2);
    vertex(-rectWidth / 2, rectHeight / 2);
    endShape(CLOSE);

    fill("#ffffff");
    noStroke();
    text(winnerMessage, 0, 5);
    drawingContext.shadowBlur = 0;
    pop();
  }
}


  
  if (hideUI) {
  [
    searchInput,
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
  ].forEach(el => {
    if (el) el.hide();
  });
} else {
  [
    searchInput,
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
  ].forEach(el => {
    if (el) el.show();
  });
}

  if (showNextButton && nextButton) {
  nextButton.show();
  } else if (nextButton) {
    nextButton.hide();
  }


  if (showSkillDetailsPopup) {
    drawSkillDetailsPopup();
    }
}
// Yardımcı fonksiyonlar
function handleNextButton() {
  if (showSkillDetailsPopup) {return;}
  if (clickSound) clickSound.play();
  showNextButton = false;
  hideUI = false;
  battleStarted = false;
  activeSkill = null;
  currentSkillIndex = 0;
  skillTimer = millis(); // Sıfırlamak yerine mevcut zamanı kaydet

  winnerMessage = null;
  winningTeam = null;

  player1Cards = userSelectedIDs.length > 0 ? calculateCards(userSelectedIDs) : [];
  player2Cards = opponentSelectedIDs.length > 0 ? calculateCards(opponentSelectedIDs) : [];

  netAttackP1 = 0; // 👈 P1 toplam puanı sıfırla
  netAttackP2 = 0; // 👈 P2 toplam puanı sıfırla

  if (playButton) playButton.show();
  if (nextButton) nextButton.hide();
}



function drawEmptyPopup() {
  push();
  //fill(0, 0, 0, 150); // Yarı şeffaf arka plan
  //rect(0, 0, canvasWidth, canvasHeight); 
  // Popup kutusu
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  const popupWidth = 300;
  const popupHeight = 200;
  const popupX = canvasWidth / 2 - popupWidth / 2;
  const popupY = canvasHeight / 2 - popupHeight / 2;
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
    fill("#FFFFFF"); //? hover
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
function drawStaticSkillCards() {
  // Player 1 kartlarını çiz
  player1Cards.forEach(card => {
    const isSneakAnimating = sneakTransitionsGlobal.some(t => t.card === card && t.phase !== "done");
    const isBloodlustAnimating = bloodlustTransitionsGlobal.some(t => t.card === card && t.phase !== "done");

    if ((card.ability === "Sneak" && isSneakAnimating) ||
        (card.ability === "Bloodlust" && isBloodlustAnimating)) {
      return; // Animasyon devam ediyorsa kartı çizme
    }

    const pos = skillPositions.P1.near.find(p => p.skill === card.ability) ||
                skillPositions.P1.far.find(p => p.skill === card.ability);
    if (pos) {
      // Bu kart Player 1'e ait olduğu için isOpponent: false
      drawSkillCard(card, pos.x, pos.y, "#0093ff", false);
    }
  });

  // Player 2 kartlarını çiz
  player2Cards.forEach(card => {
    const isSneakAnimating = sneakTransitionsGlobal.some(t => t.card === card && t.phase !== "done");
    const isBloodlustAnimating = bloodlustTransitionsGlobal.some(t => t.card === card && t.phase !== "done");

    if ((card.ability === "Sneak" && isSneakAnimating) ||
        (card.ability === "Bloodlust" && isBloodlustAnimating)) {
      return; // Animasyon devam ediyorsa kartı çizme
    }

    const pos = skillPositions.P2.near.find(p => p.skill === card.ability) ||
                skillPositions.P2.far.find(p => p.skill === card.ability);
    if (pos) {
      // Bu kart Player 2'ye ait olduğu için isOpponent: true
      drawSkillCard(card, pos.x, pos.y, "#ff4c40", true);
    }
  });
}
function drawSkillCard(card, x, y, teamColor, isOpponent = false) {
  const cardSize = CARD_SIZE;
  const img = abilityImages[card.ability];
  const colors = abilityColors[card.ability] || { text: "#ffffff", border: teamColor };
  const isActive = card.ability === activeSkill && card.score > 0;
  const scale = isActive ? 1.2 : 1.0;
  const scaledCardSize = cardSize * scale;
  const offsetX = (scaledCardSize - cardSize) / 2;
  const offsetY = (scaledCardSize - cardSize) / 2;

  // Zıplama efekti
  let bounceY = 0;
  if (isActive) {
    const t = millis() - skillTimer;
    if (t > 950 && t < 1100) {
      bounceY = -10 * sin((t - 950) / 150 * PI);
    }
  }

  const adjustedX = x - offsetX;
  const adjustedY = y - offsetY + bounceY;

  // Takımı belirle ve rage efektini kontrol et
  const teamKey = isOpponent ? "P2" : "P1";
  const textEffect = rageEffects[teamKey].find(e => e.type === "text" && millis() < e.bonusUntil);
  const isRageGlowing = card.ability === "Rage" && textEffect;

  // Rage aktifse titreme efekti
  let finalX = adjustedX;
  let finalY = adjustedY;
  if (isRageGlowing) {
    finalX += random(-2, 2); // Öfke için hafif titreme
    finalY += random(-2, 2);
  }

  // Rage parıldama efekti (kırmızı "x" simgeleri ulaştığında)
  if (isRageGlowing) {
  // ✅ Sadece bir kere çalsın
  if (!rageSoundPlayed && rageSound) {rageSound.play();rageSoundPlayed = true;}

  const elapsed = millis() - (textEffect.bonusUntil - 1500);
  const progress = constrain(elapsed / 1500, 0, 1);
  const glowAlpha = 100 + 50 * sin(millis() / 100); // Titreşen efekt
  push();
  stroke(255, 0, 0, glowAlpha * progress); // Kırmızı parıldama zamanla artar
  strokeWeight(8);
  noFill();
  rect(finalX + 5, finalY, scaledCardSize - 10, scaledCardSize, 3);
  pop();
  }

  // Aktif yetenek parıldama efekti (sarı parıldama)
  if (isActive) {
    const glow = 100 + 50 * sin(millis() / 100);
    push();
    stroke(255, 255, 0, glow);
    strokeWeight(8);
    noFill();
    rect(finalX + 5, finalY, scaledCardSize - 10, scaledCardSize, 3);
    pop();
  }

  // Ana çerçeve
  push();
  stroke(teamColor);
  strokeWeight(4);
  noFill();
  rect(finalX + 5, finalY, scaledCardSize - 10, scaledCardSize, 3);
  pop();

  // Kart görseli, rage için kırmızı renk tonu
  if (img) {
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(finalX + 5, finalY, scaledCardSize - 10, scaledCardSize, 3);
    drawingContext.clip();
    if (isRageGlowing) {
      const elapsed = millis() - (textEffect.bonusUntil - 1500);
      const progress = constrain(elapsed / 1500, 0, 1);
      const redTint = 255 * progress; // Kademeli kırmızılaşma
      tint(255, 255 - redTint, 255 - redTint); // Yavaşça kırmızıya döner
    } else if (card.score <= 0) {
      tint(100); // Yenilmiş kartlar için gri ton
    } else {
      noTint();
    }
    const baseImgSize = 75;
    const imgSize = baseImgSize * scale;
    const imgX = finalX + scaledCardSize / 2 - imgSize / 2;
    const imgY = finalY + scaledCardSize / 2 - imgSize / 2;
    image(img, imgX, imgY, imgSize, imgSize);
    drawingContext.restore();
    pop();
  }

  // Yetenek başlığı
  push();
  textSize(13 * scale);
  textFont("Trebuchet MS");
  textStyle(BOLD);
  if (card.score <= 0) {
    fill("#888888");
    stroke("#444444");
  } else {
    fill(colors.text);
    stroke(colors.border);
  }
  strokeWeight(3);
  textAlign(CENTER);
  text(card.ability.toUpperCase(), finalX + scaledCardSize / 2, finalY + scaledCardSize + 5);
  pop();

  // Puan balonu
  push();
  textSize(14 * scale);
  textStyle(BOLD);
  textAlign(CENTER);
  fill("#fe6207");
  stroke("#ffffc3");
  strokeWeight(2);
  ellipse(finalX + scaledCardSize / 2 + 30, finalY + scaledCardSize / 2 - 35, 20 * scale, 20 * scale);
  fill(card.score <= 0 ? "#aaaaaa" : "#ffffff");
  stroke("#000000");
  strokeWeight(2);
  text(card.score, finalX + scaledCardSize / 2 + 30, finalY + scaledCardSize / 2 - 30);
  pop();

  // "No fear!" efekti
  if (card.showNoFear && activeSkill === "Fear" && millis() - skillTimer >= 1000) {
    push();
    fill("#ffffff");
    stroke("#000000");
    strokeWeight(2);
    rect(finalX + scaledCardSize / 2 - 40, finalY - 0, 80, 30, 10);
    triangle(
      finalX + scaledCardSize / 2 - 10, finalY + 30,
      finalX + scaledCardSize / 2 + 10, finalY + 30,
      finalX + scaledCardSize / 2, finalY + 40
    );
    textSize(14);
    textStyle(BOLD);
    fill("#000000");
    noStroke();
    textAlign(CENTER);
    text("No fear!", finalX + scaledCardSize / 2, finalY + 20);
    pop();
  }

  // "No hope!" efekti
  if (card.showNoHope && activeSkill === "Morale" && millis() - skillTimer >= 1000) {
    push();
    fill("#ffffff");
    stroke("#000000");
    strokeWeight(2);
    rect(finalX + scaledCardSize / 2 - 40, finalY - 0, 80, 30, 10);
    triangle(
      finalX + scaledCardSize / 2 - 10, finalY + 30,
      finalX + scaledCardSize / 2 + 10, finalY + 30,
      finalX + scaledCardSize / 2, finalY + 40
    );
    textSize(14);
    textStyle(BOLD);
    fill("#000000");
    noStroke();
    textAlign(CENTER);
    text("No hope!", finalX + scaledCardSize / 2, finalY + 20);
    pop();
  }

  // "Join us!" efekti (Money)
  if (
    card.ability === "Money" &&
    activeSkill === "Money" &&
    card.score > 0 &&
    millis() - skillTimer >= 1000
  ) {
    const team = isOpponent ? player2Cards : player1Cards;
    const opponent = isOpponent ? player1Cards : player2Cards;
    const validTargets = opponent.filter(c => c.score >= 1 && c.ability !== "Money");

    if (validTargets.length > 0) {
      push();
      fill("#ffffff");
      stroke("#000000");
      strokeWeight(2);
      rect(finalX + scaledCardSize / 2 - 40, finalY - 0, 80, 30, 10);
      triangle(
        finalX + scaledCardSize / 2 - 10, finalY + 30,
        finalX + scaledCardSize / 2 + 10, finalY + 30,
        finalX + scaledCardSize / 2, finalY + 40
      );
      textSize(14);
      textStyle(BOLD);
      fill("#000000");
      noStroke();
      textAlign(CENTER);
      text("Join us!", finalX + scaledCardSize / 2, finalY + 20);
      pop();
    }
  }

  // "I see you!" efekti (Perception)
  if (
    card.ability === "Perception" &&
    activeSkill === "Perception" &&
    card.showISeeYou &&
    millis() - skillTimer >= 1000
  ) {
    push();
    fill("#ffffff");
    stroke("#000000");
    strokeWeight(2);
    rect(finalX + scaledCardSize / 2 - 40, finalY, 80, 30, 10);
    triangle(
      finalX + scaledCardSize / 2 - 10, finalY + 30,
      finalX + scaledCardSize / 2 + 10, finalY + 30,
      finalX + scaledCardSize / 2, finalY + 40
    );
    textSize(14);
    textStyle(BOLD);
    fill("#000000");
    noStroke();
    textAlign(CENTER);
    text("I see you!", finalX + scaledCardSize / 2, finalY + 20);
    pop();
  }

  // Skor değişim animasyonu
  if (card.scoreChange && millis() - card.scoreChangeTime < 1000) {
    const dt = millis() - card.scoreChangeTime;
    const offset = map(dt, 0, 1000, 0, -30);
    const alpha = map(dt, 0, 1000, 255, 0);
    push();
    textSize(16);
    textStyle(BOLD);
    fill(card.scoreChange > 0 ? color(0, 255, 0, alpha) : color(255, 0, 0, alpha));
    noStroke();
    textAlign(CENTER);
    text((card.scoreChange > 0 ? "+" : "") + card.scoreChange, finalX + scaledCardSize / 2, finalY + scaledCardSize / 2 + offset);
    pop();
  }

  // KO efekti
  if (card.score <= 0) {
    push();
    textSize(20);
    textStyle(BOLD);
    fill("#ff0000");
    stroke("#000000");
    strokeWeight(3);
    textAlign(CENTER);
    text("x", finalX + scaledCardSize / 2, finalY + 40);
    pop();
  }
}
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
// Reset butonu
  resetButtonX = 180; // Sağ üst köşe
  resetButtonY = 15; // Başlık ile aynı satır
  const isOverResetButton =
    mouseX >= x + resetButtonX - resetButtonSize / 2 &&
    mouseX <= x + resetButtonX + resetButtonSize / 2 &&
    mouseY >= y + resetButtonY - resetButtonSize / 2 &&
    mouseY <= y + resetButtonY + resetButtonSize / 2;
  push();
  textFont("Arial");
  if (isOverResetButton && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup) {
    fill(255, 0, 0); //reset butonu kapatma hover
  } else {
    fill(0); // Normal: siyah
  }
  noStroke();
  ellipse(resetButtonX, resetButtonY, resetButtonSize, resetButtonSize);
  fill(isOverResetButton ? "#FFFFFF" : "#F5F5F5"); // Hover: beyaz, normal: açık gri
  textAlign(CENTER);
  text("✖", resetButtonX, resetButtonY + 5);
  pop(); 
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
      let eliminatorText = "";
      if (Array.isArray(team.eliminatedBy)) {
        eliminatorText = team.eliminatedBy.join(", ");
      } else if (typeof team.eliminatedBy === "string") {
        eliminatorText = team.eliminatedBy;
      }
      text(eliminatorText, imgX + imageSize + 6, yOffset + rowHeight / 2 + 25);
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
  winnerMessage = null;
  winnerMessageTimer = 0;
  battleEndTime = 0;
  resultFadeAlpha = 0;
  resultFadeInStart = 0;
  bloodlustApplied = { P1: false, P2: false };
  bloodlustEffects = { P1: [], P2: [] };

  if (userSelectedIDs.length === 0 || opponentSelectedIDs.length === 0) {
    return;
  }

  battleStarted = true;
  currentSkillIndex = 0;
  skillTimer = millis();

  player1Cards = calculateCards(userSelectedIDs);
  player2Cards = calculateCards(opponentSelectedIDs);

  netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
  netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);

  applyNextSkill();
}

// Savaş durum güncelleme fonksiyonu
function updateBattle() {
  if (!battleStarted) {
    return;
  }
  // Son kart oynanmış ve süresi dolmuşsa
  const allSkillsDone = currentSkillIndex >= skillOrder.length;
  const lastCardExpired = millis() - skillTimer >= 3000;
  if (allSkillsDone && lastCardExpired && winnerMessage === null) {
    if (battleEndTime === 0) {
      battleEndTime = millis();
      determineWinner(); 
      activeSkill = null; // Artık süresi dolduğu için sıfırlayabiliriz
      battleStarted = false;

      // Eğer özel takım yendiyse skor kaydı
      if (winningTeam === "Player 1" && rivalPackTitle !== "Player 2") {
        const currentRival = rivalTeams.find(t => t.name === rivalPackTitle);
        if (currentRival && currentRival.hiScore < netAttackP1) {
          currentRival.hiScore = netAttackP1;
        }
      }
    }
    if (millis() - battleEndTime > BATTLE_END_DELAY) {
      saveRivalTeamsToStorage();
}
  }
}
function calculateCards(teamIDs) {
  const wolves = teamIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  if (wolves.length === 0) return [];

  const abilityScores = {};

  // Her kurt için bireysel yetenek puanlarını topla
  wolves.forEach(wolf => {
    const { abilityScores: wolfAbilities } = getWolfAbilities(wolf);
    Object.entries(wolfAbilities).forEach(([ability, score]) => {
      abilityScores[ability] = (abilityScores[ability] || 0) + score;
    });
  });

  // ✅ SADECE 3T Bonus ekleniyor
  const numberOf3TWolves = wolves.filter(wolf => has3TBonus(wolf)).length;
  if (numberOf3TWolves > 0) {
    abilityScores["3T Bonus"] = numberOf3TWolves * 9;
  }

  return Object.entries(abilityScores)
    .filter(([_, score]) => score > 0)
    .map(([ability, score]) => ({ ability, score }));
}

function getNetAttack(cards, selectedIDs) {
  const base = cards.reduce((sum, card) => sum + card.score, 0);
  const wolves = selectedIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  const traitBonuses = calculateTraitBonuses(wolves);
  const traitBonus = wolves.reduce((sum, wolf) => sum + getWolfTraitBonuses(wolf, traitBonuses), 0);
  return base + traitBonus;
}


function firstPage() {
  if (currentPage > 0) {
    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
    if (clickSound) clickSound.play();
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
    if (clickSound) clickSound.play();
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
    if (clickSound) clickSound.play();
  }
}
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
    if (clickSound) clickSound.play();
  }
}
// Rival Selection için sayfa geçme fonksiyonları
function rivalFirstPage() {
  rivalCurrentPage = 0;
  if (clickSound) clickSound.play();
}
function rivalPrevPage() {
  if (rivalCurrentPage > 0) rivalCurrentPage--;
  if (clickSound) clickSound.play();
}
function rivalNextPage() {
  const totalRivalPages = Math.ceil(rivalTeams.length / rivalItemsPerPage);
  if (rivalCurrentPage < totalRivalPages - 1) rivalCurrentPage++;
  if (clickSound) clickSound.play();
}
function rivalLastPage() {
  rivalCurrentPage = Math.ceil(rivalTeams.length / rivalItemsPerPage) - 1;
  if (clickSound) clickSound.play();
}
function saveOriginalPositions() {
  const maxCardsPerRow = 5;
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
}
// determineWinner fonksiyonunu güncelleyin
function determineWinner() {
  const baseP1 = player1Cards.reduce((sum, card) => sum + card.score, 0);
  const baseP2 = player2Cards.reduce((sum, card) => sum + card.score, 0);

  netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
  netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);

  if (netAttackP1 > netAttackP2) {
    winningTeam = "Player 1";
    winnerMessage = "Player 1 wins!";
  } else if (netAttackP2 > netAttackP1) {
    winningTeam = "Player 2";
    winnerMessage = "Player 2 wins!";
  } else {
    winningTeam = "Berabere";
    winnerMessage = "It's a draw!";
  }

  winnerMessageTimer = millis();
  battleStarted = false;

  if (winningTeam === "Player 1" && rivalPackTitle !== "Player 2") {
    const currentRival = rivalTeams.find(t => t.name === rivalPackTitle);
    if (currentRival) {
      currentRival.hiScore = Math.max(currentRival.hiScore, netAttackP1);
      currentRival.eliminatedBy = userSelectedIDs.slice();
      saveRivalTeamsToStorage();
    }
  }
  winnerHighlightProgress = 0;
  winnerHighlightActive = true;
}



function drawWolfDataTableToBuffer(tableSectionX) {
  if (!tableCacheDirty) return;

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

  let cachedSortedWolfdata = wolfdata.filter((w) => parseInt(w.id) <= 7500);

  if (searchFilter !== "") {
    cachedSortedWolfdata = cachedSortedWolfdata.filter((w) => w.id === searchFilter);
  } else if (walletInput.value().trim() !== "" && nftIds.length === 0) {
    cachedSortedWolfdata = [];
  } else if (nftIds.length > 0) {
    cachedSortedWolfdata = cachedSortedWolfdata.filter((w) => nftIds.includes(w.id));
  }

  if (sortColumn !== null) {
    cachedSortedWolfdata.sort((a, b) => {
      let valA, valB;
      if (sortColumn === "Total Points") {
        valA = wolfPointsCache[a.id]?.totalPoints || 0;
        valB = wolfPointsCache[b.id]?.totalPoints || 0;
      } else if (sortColumn === "3T Bonus") {
        valA = has3TBonus(a) ? 9 : 0;
        valB = has3TBonus(b) ? 9 : 0;
      } else {
        valA = getAbilityScoreCached(a, sortColumn) || 0;
        valB = getAbilityScoreCached(b, sortColumn) || 0;
      }
      return sortAscending ? valA - valB : valB - valA;
    });
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = min(startIndex + itemsPerPage, cachedSortedWolfdata.length);
  const pageData = cachedSortedWolfdata.slice(startIndex, endIndex);

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
    else value = getAbilityScoreCached(wolf, selectedColumn) || "0";
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

  // Reset butonu hover kontrolü
  const restableX = 628;
  const restableY = 60;
  if (
    mouseX >= restableX + resetButtonX - resetButtonSize / 2 &&
    mouseX <= restableX + resetButtonX + resetButtonSize / 2 &&
    mouseY >= restableY + resetButtonY - resetButtonSize / 2 &&
    mouseY <= restableY + resetButtonY + resetButtonSize / 2 &&
    !hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup
  ) {
    isOverClickableArea = true;
  }

  // Team Wolf Popup ✖ butonu
  if (showTeamWolfPopup) {
    const popupX = canvasWidth / 2 - 175;
    const popupY = canvasHeight / 2 - 105;
    const xButtonX = popupX + 330;
    const xButtonY = popupY + 15;
    const xButtonSize = 20;
    if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      isOverClickableArea = true;
    }
  }

  // Team Info Popup ✖ butonu (güncellenmiş boyutlarla)
  if (showTeamPopup) {
    const popupX = canvasWidth / 2 - 216; // Yeni popupWidth (432) ile ortalanmış
    const popupY = canvasHeight / 2 - 280; // Yeni popupHeight (560) ile ortalanmış
    const xButtonSize = 20;
    const xButtonX = popupX + 432 - 20; // popupWidth - 20
    const xButtonY = popupY + 15;
    if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      isOverClickableArea = true;
    }
  }
  // Wolf Info Popup ✖ butonu (showPopup)
  if (showPopup) {
  const popupX = canvasWidth / 2 - 175;
  const popupY = canvasHeight / 2 - 105;
  const popupWidth = 350;
  const xButtonX = popupX + popupWidth - 20;
  const xButtonY = popupY + 15;
  const xButtonSize = 20;

  if (
    mouseX >= xButtonX - xButtonSize / 2 &&
    mouseX <= xButtonX + xButtonSize / 2 &&
    mouseY >= xButtonY - xButtonSize / 2 &&
    mouseY <= xButtonY + xButtonSize / 2
  ) {
    isOverClickableArea = true;
  }
  }


  /// Savaş alanı skill kartlarına hover (savaş başlamamışsa ve popup'lar kapalıysa)
  if (!battleStarted && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup) {
  const cardSize = 75;

  // Player 1 kartları için hover kontrolü
  for (const card of player1Cards) {
    const pos =
      skillPositions.P1.near.find(p => p.skill === card.ability) ||
      skillPositions.P1.far.find(p => p.skill === card.ability);

    if (
      pos &&
      mouseX >= pos.x && mouseX <= pos.x + cardSize &&
      mouseY >= pos.y && mouseY <= pos.y + cardSize
    ) {
      isOverClickableArea = true;
      break;
    }
  }

  // Player 2 kartları için hover kontrolü
  for (const card of player2Cards) {
    const pos =
      skillPositions.P2.near.find(p => p.skill === card.ability) ||
      skillPositions.P2.far.find(p => p.skill === card.ability);

    if (
      pos &&
      mouseX >= pos.x && mouseX <= pos.x + cardSize &&
      mouseY >= pos.y && mouseY <= pos.y + cardSize
    ) {
      isOverClickableArea = true;
      break;
      }
    }
  }


  // Takım sıfırlama butonları hover
  const teamSectionHeight = 105;
  const teamSpacing = 30;
  const centerY = 170 + middleHeight;
  const player2Y = centerY - teamSpacing - teamSectionHeight - 245;
  const player1Y = centerY + teamSpacing + 240;
  const xButtonSize = 20;

  const yourPackXButtonX = leftMargin + leftSectionWidth - 30;
  const yourPackXButtonY = player1Y + 15;
  if (
    mouseX >= yourPackXButtonX - xButtonSize / 2 &&
    mouseX <= yourPackXButtonX + xButtonSize / 2 &&
    mouseY >= yourPackXButtonY - xButtonSize / 2 &&
    mouseY <= yourPackXButtonY + xButtonSize / 2 &&
    !hideUI && !battleStarted && userSelectedIDs.length > 0
  ) {
    isOverClickableArea = true;
  }

  const rivalPackXButtonX = leftMargin + leftSectionWidth - 30;
  const rivalPackXButtonY = player2Y + 15;
  if (
    mouseX >= rivalPackXButtonX - xButtonSize / 2 &&
    mouseX <= rivalPackXButtonX + xButtonSize / 2 &&
    mouseY >= rivalPackXButtonY - xButtonSize / 2 &&
    mouseY <= rivalPackXButtonY + xButtonSize / 2 &&
    !hideUI && !battleStarted && opponentSelectedIDs.length > 0
  ) {
    isOverClickableArea = true;
  }

  // Kurt kartları hover
  p1WolfPositions.forEach((pos) => {
    const globalX = leftMargin + pos.x;
    const globalY = player1Y + pos.y;
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height &&
      !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup
    ) {
      isOverClickableArea = true;
    }
  });

  p2WolfPositions.forEach((pos) => {
    const globalX = leftMargin + pos.x;
    const globalY = player2Y + pos.y;
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height &&
      !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup
    ) {
      isOverClickableArea = true;
    }
  });

  // Diğer hover alanları (link, info kutuları, tablo vs.)
  if (mouseX >= 450 && mouseX <= 540 && mouseY >= 25 && mouseY <= 40) {
    isOverClickableArea = true;
  }

  const rivalTeamInfoX = leftMargin + 23;
  const rivalTeamInfoY = player2Y + 25;
  if (
    !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup &&
    mouseX >= rivalTeamInfoX &&
    mouseX <= rivalTeamInfoX + 65 &&
    mouseY >= rivalTeamInfoY &&
    mouseY <= rivalTeamInfoY + 72
  ) {
    isOverClickableArea = true;
  }

  const p1WcImgX = leftMargin + 36;
  const p1WcImgY = player1Y + 37;
  if (
    !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup &&
    mouseX >= p1WcImgX &&
    mouseX <= p1WcImgX + 50 &&
    mouseY >= p1WcImgY &&
    mouseY <= p1WcImgY + 46
  ) {
    isOverClickableArea = true;
  }

  if (!hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showResetPopup) {
    const tableImageStartY = tableSectionY + 150;
    const rowHeight = 80;
    if (lastSortedPageData && lastSortedPageData.length > 0) {
      let yOffset = 45;
      lastSortedPageData.forEach(() => {
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
    }
  }

  // Rival selection hover + tooltip
  const rivalSectionX = 10 + 200 + 10 + 400 + 10;
  const rivalSectionY = 60;
  const rivalRowHeight = 80;
  const tableWidth = 200;
  const defeatedTeamsCount = rivalTeams.filter(team => team.eliminatedBy !== null && team.name !== "Player 2").length;
  const isRoyalWolvesDefeated = rivalTeams.some(team => team.name === "Royal Wolves" && team.eliminatedBy !== null);
  const rivalStartIndex = rivalCurrentPage * rivalItemsPerPage;
  const rivalEndIndex = min(rivalStartIndex + rivalItemsPerPage, rivalTeams.length);
  const rivalPageData = rivalTeams.slice(rivalStartIndex, rivalEndIndex);

  let shouldShowInfoBox = false;
  let infoText = "";
  let infoX = 0;
  let infoY = 0;

  if (!hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup) {
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
        } else if (team.name === "Ice Wolves" && !isRoyalWolvesDefeated) {
          shouldShowInfoBox = true;
          infoText = "You must defeat Royal Wolves first";
        }
        infoX = mouseX;
        infoY = mouseY;
      }
    });
  }

  showInfoBox = shouldShowInfoBox;
  if (showInfoBox) {
    infoBoxText = infoText;
    infoBoxX = infoX;
    infoBoxY = infoY;
  }

  // İmleç değişimi
  if (isOverClickableArea) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}


function getAbilityScoreCached(wolf, ability) {
  if (!wolf || !wolf.id) return 0;

  // Eğer cache'te varsa kullan
  if (abilityScoreCache[wolf.id]?.[ability] !== undefined) {
    return abilityScoreCache[wolf.id][ability];
  }

  // Yoksa hesapla
  let score = 0;
  for (const [trait, value] of Object.entries(wolf)) {
    if (trait === "id" || trait === "url" || value === "None") continue;
    const abilityData = traitAbilities[trait]?.[value];
    if (abilityData && abilityData.ability === ability) {
      score += abilityData.score;
    }
  }

  // Cache'e yaz
  if (!abilityScoreCache[wolf.id]) {
    abilityScoreCache[wolf.id] = {};
  }
  abilityScoreCache[wolf.id][ability] = score;

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
  if (!hideUI && !battleStarted && selectedIDs.length > 0) {
    const xButtonX = sectionWidth - 30;
    const xButtonY = 15;
    const xButtonSize = 20;

    const globalX = xPos + xButtonX;
    const globalY = yPos + xButtonY;

    const isOver =
      mouseX >= globalX - xButtonSize / 2 &&
      mouseX <= globalX + xButtonSize / 2 &&
      mouseY >= globalY - xButtonSize / 2 &&
      mouseY <= globalY + xButtonSize / 2;

    push();
    textFont("Arial");
    if (isOver && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup) {
      fill(255, 0, 0); //Takım sıfırlama butonu hover
    } else {
      fill(0);
    }
    noStroke();
    ellipse(xButtonX, xButtonY, xButtonSize, xButtonSize);
    fill(isOver ? "#FFFFFF" : "#F5F5F5");
    textAlign(CENTER);
    text("✖", xButtonX, xButtonY + 5);
    pop();
  }

// Takım logosu (wcblue veya wcred)
  let wcImgX = 23 + 13; // 36
  let wcImgY = 25 + 12; // 37
  let wcImgWidth = 50;
  let wcImgHeight = 46;

  // Global koordinatlar (parlama için)
  const globalX = xPos + wcImgX;
  const globalY = yPos + wcImgY;

  // Fare resmin üzerinde mi?
  const isOverWcImg =
    mouseX >= globalX &&
    mouseX <= globalX + wcImgWidth &&
    mouseY >= globalY &&
    mouseY <= globalY + wcImgHeight;

  push();
  // Parlama efekti
  if (isOverWcImg && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup) {
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "rgba(255, 255, 255, 0.8)";
    fill(255, 255, 255, 50);
  }
  // Resmi çiz (eski yöntemle)
  if (selectedIDs === userSelectedIDs && wcBlueImg) {
    image(wcBlueImg, wcImgX, wcImgY, wcImgWidth, wcImgHeight);
  } else if (selectedIDs === opponentSelectedIDs && wcRedImg) {
    image(wcRedImg, wcImgX, wcImgY, wcImgWidth, wcImgHeight);
  }
  drawingContext.shadowBlur = 0;
  pop();
  
  // Puan hesaplamaları
  const selectedWolves = selectedIDs.map(id => wolfdata.find(w => w.id === id)).filter(w => w);
  let baseTotalPoints = 0;
  selectedWolves.forEach(wolf => {
    const { totalPoints } = calculateWolfPoints(wolf);
    baseTotalPoints += totalPoints;
  });

  const threeTCount = selectedWolves.filter(wolf => has3TBonus(wolf)).length;
  const threeTBonus = threeTCount * 9;

  const traitBonuses = calculateTraitBonuses(selectedWolves);
  let totalTraitBonus = 0;
  selectedWolves.forEach(wolf => {
    totalTraitBonus += getWolfTraitBonuses(wolf, traitBonuses);
  });

  const totalBonus = threeTBonus + totalTraitBonus;

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

  // Kurt resimleri ve pozisyonlar
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
        width: boxWidth,  // width olarak güncellendi
        height: 75       // height olarak güncellendi
      });

      push();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.roundRect(imgX + 5, imgY + 3, boxWidth - 10, 75 - 3, 5);
      drawingContext.clip();
      image(loadedImages[selectedIDs[i]], imgX, imgY, boxWidth, 75);
      drawingContext.restore();

    const wolf = selectedWolves[i];
    if (wolf) {
      // Toplam bonusu hesapla
      const traitBonus = getWolfTraitBonuses(wolf, traitBonuses);
      const threeTBonus = has3TBonus(wolf) ? 9 : 0;
      const totalBonus = traitBonus + threeTBonus;

      // Toplam bonusu sağ üst köşede göster (eğer 0'dan büyükse)
      if (totalBonus > 0) {
        push();
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER);
        fill("#fe6207");
        stroke("#ffffc3");
        strokeWeight(2);
        ellipse(imgX + boxWidth - 12, imgY + 6, 20, 20);
        fill("#ffffff");
        stroke("#000000");
        strokeWeight(2);
        text(totalBonus.toString(), imgX + boxWidth - 12, imgY + 11);
        pop();
      }
    }
    pop();
  } else {
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
    
// NET ATAK KUTUSU (sadece yerel koordinatlar üzerinden)
const netAttackBoxX = sectionWidth / 2 - boxWidth / 2;
const teamMiddleY = 105 / 2;
const battleMiddleY = 170 + middleHeight - yPos;
const netAttackBoxY = lerp(teamMiddleY, battleMiddleY, 0.87) - 75 / 2;

let defaultCircleColor = "#888888";
let highlightColor = "#fe6207";
let isPlayer1 = selectedIDs === userSelectedIDs;
let isPlayer2 = selectedIDs === opponentSelectedIDs;
let p1 = netAttackP1;
let p2 = netAttackP2;

let circleColor = defaultCircleColor;
if ((isPlayer1 && p1 > p2) || (isPlayer2 && p2 > p1)) {
  circleColor = highlightColor;
}

const cx = netAttackBoxX + boxWidth / 2;
const cy = netAttackBoxY + 75 / 2;
const circleRadius = 30;

// Glow efekti (sadece kazanan takım için)
push();
if (circleColor === highlightColor) {
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = "rgba(254, 98, 7, 0.5)";
}
fill(circleColor);
stroke("#ffffc3");
strokeWeight(2);
ellipse(cx, cy, circleRadius, circleRadius);
drawingContext.shadowBlur = 0;
pop();

// Skor yazısı
push();
const netAttackValue = selectedIDs === userSelectedIDs ? netAttackP1 : netAttackP2;
textSize(20);
textStyle(BOLD);
fill(255);
textAlign(CENTER);
text(netAttackValue.toString(), cx, cy + 8);
pop();

   
  // Total HI SCORE gösterimi (sadece Player 1 için)
  if (selectedIDs === userSelectedIDs) {
  const totalHiScore = calculateTotalHiScore();
  textSize(14);
  textStyle(NORMAL);
  fill("#ffffff");
  textAlign(CENTER);
  // Play butonunun X: 386, Y: 790
  text(`HI SCORE: ${totalHiScore}`, 340, 140);
  }

  
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
// Kart özelliklerini uygulayan fonksiyonlar
function applyFear(myCards, opponentCards, isPlayer1) {
  const fearCard = myCards.find(c => c.ability === "Fear");
  const moraleCard = opponentCards.find(c => c.ability === "Morale");
  const team = isPlayer1 ? "P1" : "P2";
  const enemyTeam = isPlayer1 ? "P2" : "P1";

  if (fearCard && moraleCard && fearCard.score <= moraleCard.score) {
    moraleCard.showNoFear = true;
  }
  
  if (fearCard && (!moraleCard || fearCard.score > moraleCard.score)) {
    fearEffectActive[team] = true;
    fearParticles[team] = [];

    const myPositions = skillPositions[team];
    const opponentPositions = skillPositions[enemyTeam];
    const fearPos = myPositions.near.find(p => p.skill === "Fear") || myPositions.far.find(p => p.skill === "Fear");

    const validAbilities = ["Morale", "Cunning", "Sneak", "Money", "Perception", "Badass", "Bloodlust", "Composure", "Rage"];

    opponentCards.forEach(card => {
      if (validAbilities.includes(card.ability) && card.ability !== "Fear" && card.score >= 1) {
        const cardPos = [...opponentPositions.near, ...opponentPositions.far].find(p => p.skill === card.ability);
        if (cardPos) {
          card.score -= 1;
          card.showFearPenalty = true;
          card.fearPenaltyUntil = millis() + 1500;

          for (let i = 0; i < 2; i++) {
            fearParticles[team].push({
              x: fearPos.x + CARD_SIZE / 2,
              y: fearPos.y + CARD_SIZE / 2,
              targetX: cardPos.x + CARD_SIZE / 2,
              targetY: cardPos.y + CARD_SIZE / 2,
              progress: 0,
              speed: 0.05,
              reached: false,
              card: card,
              cardPos: cardPos
            });
          }
        }
      }
    });
  }
}
function drawFearEffect(cards, team) {
  if (!fearEffectActive[team]) return;

  let allReached = true;

  fearParticles[team].forEach(p => {
    if (!p.reached) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 1;
        p.reached = true;
      }
      p.x = lerp(p.x, p.targetX, p.progress);
      p.y = lerp(p.y, p.targetY, p.progress);
    }

    if (!p.reached) {
      push();
      fill(255, 0, 0);
      noStroke();
      ellipse(p.x, p.y, 6, 6);
      pop();
      allReached = false;
    }

    if (
      p.reached &&
      p.card &&
      millis() < p.card.fearPenaltyUntil &&
      p.cardPos &&
      p.cardPos.skill
    ) {
      // ✅ Sesi yalnızca bir kere çal
      if (!p.soundPlayed && fearSound) {
        fearSound.play();
        p.soundPlayed = true;
      }

      const centerX = p.cardPos.x + CARD_SIZE / 2;
      const centerY = p.cardPos.y + CARD_SIZE / 2;

      push();
      fill("#ff1e1e");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(centerX, centerY, 24, 24);
      pop();

      push();
      textSize(14);
      textStyle(BOLD);
      fill(0);
      textAlign(CENTER, CENTER);
      text("-1", centerX, centerY);
      pop();
    }
  });

  if (allReached && fearParticles[team].length > 0) {
    setTimeout(() => {
      fearEffectActive[team] = false;
      cards.forEach(card => card.showFearPenalty = false);
      fearParticles[team] = [];
    }, 1500);
  }
}

function applyMorale(myCards, opponentCards, isPlayer1) {
  const team = isPlayer1 ? "P1" : "P2";
  const moraleCard = myCards.find(c => c.ability === "Morale");
  const fearCard = opponentCards.find(c => c.ability === "Fear");

  if (!moraleCard || (fearCard && moraleCard.score <= fearCard.score)) {
    if (fearCard && moraleCard) {
      fearCard.showNoHope = true;
    }
    return;
  }

  moraleEffectActive[team] = true;
  moraleParticles[team] = [];

  const positions = skillPositions[team];
  const moralePos = positions.near.find(p => p.skill === "Morale") || positions.far.find(p => p.skill === "Morale");

  myCards.forEach(card => card.showMoraleBonus = false);

  const validAbilities = ["Cunning", "Sneak", "Money", "Perception", "Badass", "Bloodlust", "Composure", "Rage"];
  let anyAffected = false;

  myCards.forEach(card => {
    const isNotMoraleCard = card.ability !== "Morale";
    const isValid = validAbilities.includes(card.ability);
    const hasPositiveScore = card.score >= 1;

    if (isNotMoraleCard && isValid && hasPositiveScore) {
      card.score += 1;
      card.showMoraleBonus = true;
      card.moraleBonusUntil = millis() + 1500;
      anyAffected = true;

      const cardPos = [...positions.near, ...positions.far].find(p => p.skill === card.ability);
      if (moralePos && cardPos) {
        for (let i = 0; i < 2; i++) {
          moraleParticles[team].push(new Particle(
            moralePos.x + CARD_SIZE / 2,
            moralePos.y + CARD_SIZE / 2,
            cardPos.x + CARD_SIZE / 2,
            cardPos.y + CARD_SIZE / 2,
            card,
            cardPos
          ));
        }
      } else {
        card.showMoraleBonus = false;
      }
    }
  });
}
function drawMoraleEffect(cards, team) {
  if (!moraleEffectActive[team]) return;

  let allReached = true;

  moraleParticles[team].forEach(p => {
    p.update();

    if (!p.reached) {
      p.draw();
      allReached = false;
    }

    if (
      p.reached &&
      p.card &&
      p.card.moraleBonusUntil &&
      millis() < p.card.moraleBonusUntil &&
      p.cardPos &&
      p.cardPos.skill
    ) {
      // ✅ Sesi yalnızca bir kere çal
      if (!p.soundPlayed && moraleSound) {
        moraleSound.play();
        p.soundPlayed = true;
      }

      const centerX = p.cardPos.x + CARD_SIZE / 2;
      const centerY = p.cardPos.y + CARD_SIZE / 2;

      push();
      fill("#06fe02");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(centerX, centerY, 24, 24);
      pop();

      push();
      textSize(14);
      textStyle(BOLD);
      fill(0);
      textAlign(CENTER, CENTER);
      text("+2", centerX, centerY);
      pop();
    }
  });

  if (allReached && moraleParticles[team].length > 0) {
    const cleanupTime = 1500;
    setTimeout(() => {
      moraleEffectActive[team] = false;
      cards.forEach(card => {
        card.showMoraleBonus = false;
        card.moraleBonusUntil = 0;
      });
      moraleParticles[team] = [];
    }, cleanupTime);
  }
}

function applyCunning(team, opponent) {
  const cunningCard = team.find(card => card.ability === "Cunning");
  if (!cunningCard || cunningCard.score <= 0) {
    return;
  }

  const opponentMoneyCard = opponent.find(card => card.ability === "Money" && card.score >= 1);
  if (!opponentMoneyCard) {
    return;
  }

  const transferAmount = Math.min(cunningCard.score, opponentMoneyCard.score);
  const teamKey = team === player1Cards ? "P1" : "P2";
  const opponentKey = team === player1Cards ? "P2" : "P1";

  const fromPos = skillPositions[opponentKey].near.find(p => p.skill === "Money") || skillPositions[opponentKey].far.find(p => p.skill === "Money");
  let toPos = skillPositions[teamKey].near.find(p => p.skill === "Money") || skillPositions[teamKey].far.find(p => p.skill === "Money");

  if (!toPos) {
    const cunningPos = skillPositions[teamKey].near.find(p => p.skill === "Cunning") || skillPositions[teamKey].far.find(p => p.skill === "Cunning");
    toPos = { x: cunningPos.x + CARD_SIZE, y: cunningPos.y };
  }

  if (!fromPos || !toPos) {
    return;
  }

  const isPartialTransfer = opponentMoneyCard.score > transferAmount;
  let cardToAnimate; // Bu, animasyon sırasında hareket edecek obje olacak

  if (isPartialTransfer) {
    // Eğer kısmi transfer ise, rakip kartın puanını hemen azalt
    opponentMoneyCard.score -= transferAmount;
    // Animasyon için transfer edilen puan miktarıyla yeni bir Money kartı kopyası oluştur
    cardToAnimate = { ability: "Money", score: transferAmount };
  } else {
    // Eğer tam transfer ise, orijinal rakip kart objesini animasyon için kullan
    cardToAnimate = opponentMoneyCard; // Orijinal karta referansı sakla
  }
  
  // 🎯 Particle üretimi — Cunning'den rakip Money'e doğru gitsin
  const cunningPos = skillPositions[teamKey].near.find(p => p.skill === "Cunning") || skillPositions[teamKey].far.find(p => p.skill === "Cunning");

  if (cunningPos && fromPos) {
    if (!cunningParticles[teamKey]) cunningParticles[teamKey] = [];

    cunningParticles[teamKey].push({
      x: cunningPos.x + CARD_SIZE / 2,
      y: cunningPos.y + CARD_SIZE / 2,
      targetX: fromPos.x + CARD_SIZE / 2, // Hedef: rakip Money kartının merkezi
      targetY: fromPos.y + CARD_SIZE / 2,
      progress: 0,
      speed: 0.05,
      reached: false
    });
  }

  // 🎨 Animasyon bilgisi — "01010" sembolü ve kart transferi için
  cunningTransitionsGlobal.push({
    card: cardToAnimate, // Bu, animasyon yapılacak kart objesi
    from: { x: fromPos.x, y: fromPos.y },
    to: { x: toPos.x, y: toPos.y },
    progress: 0,
    phase: "symbol", // Yeni faz: "symbol"
    symbolUntil: millis() + 700, // "01010" sembolünün görünür kalma süresi (Money ile aynı)
    added: false,
    removedFromOpponent: false, // Yeni bayrak: Rakip takımdan kaldırıldı mı?
    isPartial: isPartialTransfer, // Kısmi transfer mi?
    originalOpponentCard: isPartialTransfer ? null : opponentMoneyCard, // Tam transferse orijinal kartı sakla
    team: team, // Hedef takım dizisine referans
    opponent: opponent, // Rakip takım dizisine referans
    soundPlayed: false
  });
}
function drawCunningTransitionsGlobal() {
  for (let i = cunningTransitionsGlobal.length - 1; i >= 0; i--) {
    const t = cunningTransitionsGlobal[i];

    // 1) "01010" simgesi fazı (Money efektindeki gibi)
    if (t.phase === "symbol") {
      if (millis() < t.symbolUntil) {
        // "01010" yazısını çiz
        push();
        fill("#139c13"); // Sabit dolgu
        stroke(255); // Sabit kenarlık
        strokeWeight(2);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("01010", t.from.x + CARD_SIZE / 2, t.from.y + CARD_SIZE / 2 - 10);
        text("10101", t.from.x + CARD_SIZE / 2, t.from.y + CARD_SIZE / 2);
        text("01010", t.from.x + CARD_SIZE / 2, t.from.y + CARD_SIZE / 2 + 10);
        pop();
        continue; // Diğer fazlara geçme
      } else {
        // Sembol fazı bitti, harekete geç
        t.phase = "moving";
        t.progress = 0;
      }
    }

    // 2) Hareket fazı
    if (t.phase === "moving") {
      // ✅ cunningSound yalnızca bir kez çalınsın (kart harekete başladığında)
      if (cunningSound && !t.soundPlayed && t.progress > 0) {
        cunningSound.play();
        t.soundPlayed = true;
      }

      // Kartın rakip takımdan silinme mantığı (sadece tam transferlerde ve henüz silinmediyse)
      if (!t.isPartial && !t.removedFromOpponent) {
        const index = t.opponent.indexOf(t.originalOpponentCard);
        if (index !== -1) {
          t.opponent.splice(index, 1);
          t.removedFromOpponent = true; // Silindi olarak işaretle
          tableCacheDirty = true; // Tabloyu güncellemek için bayrağı ayarla
        }
      }

      t.progress += 0.04; // Kartın hareket hızı
      const x = lerp(t.from.x, t.to.x, t.progress);
      const y = lerp(t.from.y, t.to.y, t.progress);

      const card = t.card; // Bu, animasyon yapılan kart objesi
      const img = abilityImages[card.ability];
      const colors = abilityColors[card.ability] || { text: "#fff", border: "#fff" };

      push();
      stroke(colors.border);
      strokeWeight(3);
      fill("#222");
      rect(x, y, CARD_SIZE, CARD_SIZE, 5);
      if (img) {
        imageMode(CENTER);
        image(img, x + CARD_SIZE / 2, y + CARD_SIZE / 2, 75, 75);
      }

      textAlign(CENTER);
      textSize(12);
      fill(colors.text);
      noStroke();
      textStyle(BOLD);
      text(card.ability, x + CARD_SIZE / 2, y + CARD_SIZE + 14);

      fill("#fe6207");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(x + CARD_SIZE - 15, y + 15, 20, 20);
      fill("#fff");
      noStroke();
      text(card.score, x + CARD_SIZE - 15, y + 18);
      pop();

      // Tamamlanınca kendi takımına ekle (1 kez)
      if (!t.added && t.progress >= 1) {
        const existing = t.team.find(c => c.ability === "Money");
        if (existing) {
          // Eğer zaten Money kartı varsa puanını ekle
          existing.score += t.card.score;
        } else {
          // Yoksa yeni kart olarak ekle
          t.team.push({ ability: "Money", score: t.card.score });
        }

        t.added = true;
        netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
        netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);
        tableCacheDirty = true; // Tabloyu güncellemek için bayrağı ayarla
        cunningTransitionsGlobal.splice(i, 1); // Animasyon bittiğinde listeden kaldır
      }
    }
  }
}
function drawCunningEffect(teamKey) {
  if (!cunningParticles[teamKey]) return;
  for (let i = cunningParticles[teamKey].length - 1; i >= 0; i--) {
    const p = cunningParticles[teamKey][i];
    
    p.progress += p.speed;
    if (p.progress >= 1) {
      p.progress = 1;
      p.reached = true;
    }

    const x = lerp(p.x, p.targetX, p.progress);
    const y = lerp(p.y, p.targetY, p.progress);

    push();
    fill("#139c13"); // binary yeşili
    noStroke();
    ellipse(x, y, 6, 6);
    pop();

    if (p.reached) {
      cunningParticles[teamKey].splice(i, 1);
    }
  }
}

function applyMoney(team, opponent, isPlayer1) {
  const teamKey = isPlayer1 ? "P1" : "P2";
  const opponentKey = isPlayer1 ? "P2" : "P1";

  const moneyCard = team.find(c => c.ability === "Money");
  if (!moneyCard || moneyCard.score <= 0) return;

  const validTargets = opponent.filter(card =>
    card.score >= 1 && card.ability !== "Money"
  );

  if (validTargets.length === 0) {
    return;
  }

  const minScore = Math.min(...validTargets.map(c => c.score));
  const minCards = validTargets.filter(c => c.score === minScore);
  const selectedCard = minCards.sort((a, b) => a.ability.localeCompare(b.ability))[0];

  const opponentPositions = skillPositions[opponentKey];
  const teamPositions = skillPositions[teamKey];
  const fromPos = [...opponentPositions.near, ...opponentPositions.far].find(p => p.skill === selectedCard.ability);
  const toPos = [...teamPositions.near, ...teamPositions.far].find(p => p.skill === selectedCard.ability);

  if (!fromPos || !toPos) {
    return;
  }

  // 💥 Küçük top animasyonu başlat
  moneyEffectActive[teamKey] = true;
  moneyParticles[teamKey] = [];

  for (let i = 0; i < 2; i++) {
  moneyParticles[teamKey].push({
    x: fromPos.x + CARD_SIZE / 2,
    y: fromPos.y + CARD_SIZE / 2,
    targetX: fromPos.x + CARD_SIZE / 2,
    targetY: fromPos.y + CARD_SIZE / 2,
    progress: 0,
    speed: 0.04,
    startX: fromPos.x + CARD_SIZE / 2,
    startY: fromPos.y + CARD_SIZE / 2,
    endX: toPos.x + CARD_SIZE / 2,
    endY: toPos.y + CARD_SIZE / 2
  });
  }


  // ✅ Sadece animasyon bilgisi (orijinal kart referansını sakla)
  moneyTransitionsGlobal.push({
    card: selectedCard,         // orijinal kart referansı
    team,
    opponent,
    from: { x: fromPos.x, y: fromPos.y },
    to: { x: toPos.x, y: toPos.y },
    progress: 0,
    phase: "symbol",
    symbolUntil: millis() + 700,
    hasTransferred: false
  });
  if (!moneyParticles[teamKey]) moneyParticles[teamKey] = [];

  // Money kartının pozisyonunu bul
  const moneyPos = skillPositions[teamKey].near.find(p => p.skill === "Money") || skillPositions[teamKey].far.find(p => p.skill === "Money");
  if (moneyPos && fromPos) {
  moneyParticles[teamKey].push({
    x: moneyPos.x + CARD_SIZE / 2,
    y: moneyPos.y + CARD_SIZE / 2,
    targetX: fromPos.x + CARD_SIZE / 2,
    targetY: fromPos.y + CARD_SIZE / 2,
    progress: 0,
    speed: 0.04,
    active: true
  });
  }

}
function drawMoneyEffectGlobal() {
  for (let i = moneyTransitionsGlobal.length - 1; i >= 0; i--) {
    const t = moneyTransitionsGlobal[i];

    // 1) $ simgesi fazı
    if (t.phase === "symbol") {
      if (millis() < t.symbolUntil) {
        push();
        fill("#ed7614");
        stroke(255);
        strokeWeight(2);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("$", t.from.x + CARD_SIZE / 2, t.from.y + CARD_SIZE / 2);
        pop();
        continue;
      } else {
        // Simge fazı bitti, harekete geç
        t.phase = "moving";
        t.progress = 0;
        t.removed = false;
        t.soundPlayed = false; // ses çalma durumu başlangıçta false
      }
    }

    // 2) hareket fazı
    if (t.phase === "moving") {
      // ✅ Ses yalnızca bir kez çalınır
      if (!t.soundPlayed && moneySound) {
        moneySound.play();
        t.soundPlayed = true;
      }

      t.progress += 0.04;
      const x = lerp(t.from.x, t.to.x, t.progress);
      const y = lerp(t.from.y, t.to.y, t.progress);

      const card = t.card;
      const img = abilityImages[card.ability];
      const colors = abilityColors[card.ability] || { text: "#fff", border: "#fff" };

      push();
      stroke(colors.border);
      strokeWeight(3);
      fill("#222");
      rect(x, y, CARD_SIZE, CARD_SIZE, 5);
      if (img) {
        imageMode(CENTER);
        image(img, x + CARD_SIZE / 2, y + CARD_SIZE / 2, 75, 75);
      }
      textAlign(CENTER);
      textSize(12);
      fill(colors.text);
      noStroke();
      textStyle(BOLD);
      text(card.ability, x + CARD_SIZE / 2, y + CARD_SIZE + 14);

      fill("#fe6207");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(x + CARD_SIZE - 15, y + 15, 20, 20);
      fill("#fff");
      noStroke();
      text(card.score, x + CARD_SIZE - 15, y + 18);
      pop();

      // Rakipten silme
      if (!t.removed) {
        const idx = t.opponent.indexOf(card);
        if (idx !== -1) t.opponent.splice(idx, 1);
        t.removed = true;
      }

      // Takıma ekle ve bitir
      if (!t.added && t.progress >= 1) {
        const existing = t.team.find(c => c.ability === card.ability);
        if (existing) {
          existing.score += card.score;
        } else {
          t.team.push({ ...card });
        }
        t.added = true;

        netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
        netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);

        moneyTransitionsGlobal.splice(i, 1);
      }
    }
  }
}
function drawMoneyParticles(teamKey) {
  const particles = moneyParticles[teamKey];
  if (!particles) return;

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (!p.active) continue;

    p.progress += p.speed;
    if (p.progress >= 1) {
      p.progress = 1;
      p.active = false;
    }

    const x = lerp(p.x, p.targetX, p.progress);
    const y = lerp(p.y, p.targetY, p.progress);

    push();
    fill("#ed7614");
    noStroke();
    ellipse(x, y, 6, 6);
    pop();

    if (!p.active) particles.splice(i, 1);
  }
}

function applyPerception(team, opponent) {
  const perceptionCard = team.find(card => card.ability === "Perception");
  if (!perceptionCard) return;

  const opponentSneakCard = opponent.find(card => card.ability === "Sneak" && card.score >= 1);
  if (opponentSneakCard) {
  const opponentKey = opponent === player1Cards ? "P1" : "P2";
  const teamKey = opponentKey === "P1" ? "P2" : "P1";

  // 🧠 Etki öncesi skor
  opponentSneakCard.originalScoreBeforePerception = opponentSneakCard.score;

  const penaltyAmount = Math.min(opponentSneakCard.score, perceptionCard.score);
  opponentSneakCard.score = Math.max(0, opponentSneakCard.score - perceptionCard.score);
  opponentSneakCard.penaltyUntil = millis() + 1500;

  // ✅ Eğer perception skoru sneak skoruna eşit veya fazlaysa, yazıyı göster
  if (perceptionCard.score >= opponentSneakCard.originalScoreBeforePerception) {
    perceptionCard.showISeeYou = true;
  } else {
    perceptionCard.showISeeYou = false;
  }

    // 🔴 Particle başlat
    perceptionEffectActive[teamKey] = true;
    perceptionParticles[teamKey] = [];

    const myPositions = skillPositions[teamKey];
    const opponentPositions = skillPositions[opponentKey];

    const perceptionPos = [...myPositions.near, ...myPositions.far].find(p => p.skill === "Perception");
    const sneakPos = [...opponentPositions.near, ...opponentPositions.far].find(p => p.skill === "Sneak");

    if (perceptionPos && sneakPos) {
      perceptionParticles[teamKey].push({
        x: perceptionPos.x + CARD_SIZE / 2,
        y: perceptionPos.y + CARD_SIZE / 2,
        targetX: sneakPos.x + CARD_SIZE / 2,
        targetY: sneakPos.y + CARD_SIZE / 2,
        progress: 0,
        speed: 0.05,
        reached: false,
        card: opponentSneakCard,
        cardPos: sneakPos,
        penaltyAmount
      });
    }
  }
}
function drawPerceptionEffect(cards, team) {
  if (!perceptionEffectActive[team]) return;

  // Sadece ilk karede sesi bir kere çal
  if (!perceptionEffectActive[team + "_soundPlayed"]) {
    if (hitSound && hitSound.isLoaded()) {
      hitSound.play();
    }
    perceptionEffectActive[team + "_soundPlayed"] = true;
  }

  let allReached = true;

  perceptionParticles[team].forEach(p => {
    if (!p.reached) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 1;
        p.reached = true;
      }
      p.x = lerp(p.x, p.targetX, p.progress);
      p.y = lerp(p.y, p.targetY, p.progress);
    }

    // Top hareketi
    if (!p.reached) {
      push();
      fill("#ff1e1e"); // kırmızı top
      noStroke();
      ellipse(p.x, p.y, 6, 6);
      pop();
      allReached = false;
    }

    // Top ulaştıysa ceza efekti
    if (p.reached && p.card && millis() < p.card.penaltyUntil && p.cardPos) {
      const centerX = p.cardPos.x + CARD_SIZE / 2;
      const centerY = p.cardPos.y + CARD_SIZE / 2;

      push();
      fill("#ff1e1e");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(centerX, centerY, 24, 24);
      pop();

      push();
      textSize(14);
      textStyle(BOLD);
      fill(0);
      textAlign(CENTER, CENTER);
      text(`-${p.penaltyAmount}`, centerX, centerY);
      pop();
    }
  });

  // Temizleme
  if (allReached && perceptionParticles[team].length > 0) {
    setTimeout(() => {
      perceptionEffectActive[team] = false;
      delete perceptionEffectActive[team + "_soundPlayed"];
      cards.forEach(card => card.showPenalty = false);
      perceptionParticles[team] = [];
    }, 1500);
  }
}
function applySneak(team, opponent) {
  const sneakCard = team.find(card => card.ability === "Sneak" && card.score >= 1);
  if (!sneakCard) {
    return;
  }

  // 💬 Baloncuk için bayrağı ayarla
  sneakCard.showWatchYourBack = true;

  // Sneak kartını hariç tutarak uygun kartları seç
  let validCards = opponent.filter(card => card.score >= 1 && card.ability !== "Sneak");
  if (validCards.length === 0) {
    return;
  }

  // 🔁 En düşük puan ve alfabetik sıraya göre hedef kartı seç
  validCards.sort((a, b) => {
    if (a.score !== b.score) {
      return a.score - b.score; // puanı düşük olan önce
    } else {
      return a.ability.localeCompare(b.ability); // eşitse alfabetik sıraya göre
    }
  });

  const targetCard = validCards[0];
  if (!targetCard) {
    return;
  }

  // Pozisyonları bul
  const teamKey = team === player1Cards ? "P1" : "P2";
  const opponentKey = team === player1Cards ? "P2" : "P1";
  const sneakPos = skillPositions[teamKey].near.find(p => p.skill === "Sneak") || skillPositions[teamKey].far.find(p => p.skill === "Sneak");
  const targetPos = skillPositions[opponentKey].near.find(p => p.skill === targetCard.ability) || skillPositions[opponentKey].far.find(p => p.skill === targetCard.ability);

  if (!sneakPos || !targetPos) {
    return;
  }

  // Animasyon ekle
  sneakTransitionsGlobal.push({
    card: sneakCard,
    targetCard: targetCard,
    from: { x: sneakPos.x, y: sneakPos.y },
    to: { x: targetPos.x, y: targetPos.y },
    progress: 0,
    phase: "going",
    wiggleStart: null,
    wiggleCount: 0,
    effectStart: null,
    team: team,
    opponent: opponent,
    teamKey: teamKey,
    opponentKey: opponentKey,
    originalScore: targetCard.score
  });

  // Bloodlust pençe efekti ekle (wiggle fazında gösterilecek)
  if (!bloodlustEffects[opponentKey]) {
    bloodlustEffects[opponentKey] = [];
  }
  const centerX = targetPos.x;
  const centerY = targetPos.y;
  bloodlustEffects[opponentKey].push({
    x: centerX - 50,
    y: centerY + 150,
    startTime: millis() + 1000,
    duration: 200,
    teamKey: opponentKey
  });
}
function drawSneakTransitionsGlobal() {
  if (sneakTransitionsGlobal.length === 0) return;

  for (let i = 0; i < sneakTransitionsGlobal.length; i++) {
    const t = sneakTransitionsGlobal[i];
    let x, y;

    if (t.phase === "going") {
      t.progress += 0.04;
      x = lerp(t.from.x, t.to.x, t.progress);
      y = lerp(t.from.y, t.to.y, t.progress);
      if (t.progress >= 1) {
        t.phase = "wiggle";
        t.wiggleStart = millis();
        t.progress = 0;

        // ✅ Sesi yalnızca bir kez çal
        if (!t.soundPlayed && sneakSound) {
          sneakSound.play();
          t.soundPlayed = true;
        }
      }
    } else if (t.phase === "wiggle") {
      const wiggleDuration = 200;
      const elapsed = millis() - t.wiggleStart;
      if (elapsed < wiggleDuration) {
        const half = wiggleDuration / 2;
        if (elapsed < half) {
          x = t.to.x + 10;
        } else {
          x = t.to.x - 10;
        }
        y = t.to.y;
      } else {
        t.phase = "effect";
        t.effectStart = millis();
        t.progress = 0;
        t.targetCard.score = 0;
        t.targetCard.xEffectUntil = millis() + 700;
      }
    } else if (t.phase === "effect") {
      // Net attack güncelleme
      netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
      netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);

      x = t.to.x;
      y = t.to.y;
      const elapsed = millis() - t.effectStart;
      if (elapsed >= 700) {
        t.phase = "returning";
        t.progress = 0;
      }
      if (t.targetCard.xEffectUntil && millis() < t.targetCard.xEffectUntil) {
        push();
        stroke(255, 0, 0);
        strokeWeight(4);
        const cx = t.to.x + CARD_SIZE / 2;
        const cy = t.to.y + CARD_SIZE / 2;
        line(cx - 15, cy - 15, cx + 15, cy + 15);
        line(cx + 15, cy - 15, cx - 15, cy + 15);
        pop();
      }
    } else if (t.phase === "returning") {
      t.progress += 0.04;
      x = lerp(t.to.x, t.from.x, t.progress);
      y = lerp(t.to.y, t.from.y, t.progress);
      if (t.progress >= 1) {
        t.phase = "done";
      }
    } else if (t.phase === "done") {
      x = t.from.x;
      y = t.from.y;
    }

    // Sneak kartını çiz
    const card = t.card;
    const img = abilityImages[card.ability];
    const colors = abilityColors[card.ability] || { text: "#fff", border: "#fff" };

    push();
    stroke(colors.border);
    strokeWeight(3);
    fill("#222");
    rect(x, y, CARD_SIZE, CARD_SIZE, 5);

    if (img) {
      imageMode(CENTER);
      image(img, x + CARD_SIZE / 2, y + CARD_SIZE / 2, 75, 75);
    }

    textAlign(CENTER);
    textSize(12);
    fill(colors.text);
    noStroke();
    textStyle(BOLD);
    text(card.ability, x + CARD_SIZE / 2, y + CARD_SIZE + 14);

    fill("#fe6207");
    stroke("#ffffc3");
    strokeWeight(2);
    ellipse(x + CARD_SIZE - 15, y + 15, 20, 20);
    fill("#fff");
    noStroke();
    text(card.score, x + CARD_SIZE - 15, y + 18);
    pop();
  }

  sneakTransitionsGlobal = sneakTransitionsGlobal.filter(t => t.phase !== "done");
}

function applyBadass(team, opponent) {
  const badassCard = team.find(card => card.ability === "Badass");
  if (!badassCard) return;

  const opponentBloodlustCard = opponent.find(card => card.ability === "Bloodlust" && card.score >= 1);
  if (opponentBloodlustCard) {
    const opponentKey = opponent === player1Cards ? "P1" : "P2";
    const teamKey = opponentKey === "P1" ? "P2" : "P1";

    // 🧠 Etki öncesi skor
    opponentBloodlustCard.originalScoreBeforeBadass = opponentBloodlustCard.score;

    const penaltyAmount = Math.min(opponentBloodlustCard.score, badassCard.score);
    opponentBloodlustCard.score = Math.max(0, opponentBloodlustCard.score - badassCard.score);
    opponentBloodlustCard.penaltyUntil = millis() + 1500;

    // ✅ Eğer badass skoru bloodlust skoruna eşit veya fazlaysa, yazıyı göster
    if (badassCard.score >= opponentBloodlustCard.originalScoreBeforeBadass) {
      badassCard.showISeeYou = true;
    } else {
      badassCard.showISeeYou = false;
    }

    // 🔴 Particle başlat
    badassEffectActive[teamKey] = true;
    badassParticles[teamKey] = [];

    const myPositions = skillPositions[teamKey];
    const opponentPositions = skillPositions[opponentKey];

    const badassPos = [...myPositions.near, ...myPositions.far].find(p => p.skill === "Badass");
    const bloodlustPos = [...opponentPositions.near, ...opponentPositions.far].find(p => p.skill === "Bloodlust");

    if (badassPos && bloodlustPos) {
      badassParticles[teamKey].push({
        x: badassPos.x + CARD_SIZE / 2,
        y: badassPos.y + CARD_SIZE / 2,
        targetX: bloodlustPos.x + CARD_SIZE / 2,
        targetY: bloodlustPos.y + CARD_SIZE / 2,
        progress: 0,
        speed: 0.05,
        reached: false,
        card: opponentBloodlustCard,
        cardPos: bloodlustPos,
        penaltyAmount
      });
    }
  }
}
function drawBadassEffect(cards, team) {
  if (!badassEffectActive[team]) return;

  // Sadece ilk karede sesi bir kere çal
  if (!badassEffectActive[team + "_soundPlayed"]) {
    if (hitSound && hitSound.isLoaded()) {
      hitSound.play();
    }
    badassEffectActive[team + "_soundPlayed"] = true;
  }

  let allReached = true;

  badassParticles[team].forEach(p => {
    if (!p.reached) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 1;
        p.reached = true;
      }
      p.x = lerp(p.x, p.targetX, p.progress);
      p.y = lerp(p.y, p.targetY, p.progress);
    }

    // Top hareketi
    if (!p.reached) {
      push();
      fill("#ff1e1e"); // Kırmızı top
      noStroke();
      ellipse(p.x, p.y, 6, 6);
      pop();
      allReached = false;
    }

    // Top ulaştıysa ceza efekti
    if (p.reached && p.card && millis() < p.card.penaltyUntil && p.cardPos) {
      const centerX = p.cardPos.x + CARD_SIZE / 2;
      const centerY = p.cardPos.y + CARD_SIZE / 2;

      push();
      fill("#ff1e1e");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(centerX, centerY, 24, 24);
      pop();

      push();
      textSize(14);
      textStyle(BOLD);
      fill(0);
      textAlign(CENTER, CENTER);
      text(`-${p.penaltyAmount}`, centerX, centerY);
      pop();
    }
  });

  // Temizleme
  if (allReached && badassParticles[team].length > 0) {
    setTimeout(() => {
      badassEffectActive[team] = false;
      delete badassEffectActive[team + "_soundPlayed"];
      cards.forEach(card => card.showPenalty = false);
      badassParticles[team] = [];
    }, 1500);
  }
}

function applyBloodlust(team, opponent, opponentKey) {
  if (bloodlustApplied[opponentKey]) {
    return;
  }

  const bloodlustCard = team.find(card => card.ability === "Bloodlust" && card.score >= 1);
  if (!bloodlustCard) return;

  const teamKey = team === player1Cards ? "P1" : "P2";
  const bloodlustPos = skillPositions[teamKey].near.find(p => p.skill === "Bloodlust") || 
                      skillPositions[teamKey].far.find(p => p.skill === "Bloodlust");

  if (!bloodlustPos) return;

  // Düşük puanlı kartları kontrol et
  const destroyedCards = opponent.filter(card => 
    card.ability !== "Bloodlust" && card.score >= 1 && card.score <= 5
  );

  // Eğer etkilenecek kart yoksa, animasyon başlatmadan çık
  if (destroyedCards.length === 0) {
    bloodlustApplied[opponentKey] = true;
    return;
  }

  // Animasyon için merkez koordinatlar
  const centerX = canvasWidth / 2;
  const centerY = 170 + middleHeight;

  // Animasyonu başlat
  bloodlustTransitionsGlobal.push({
    card: bloodlustCard,
    from: { x: bloodlustPos.x, y: bloodlustPos.y },
    to: { x: centerX - CARD_SIZE/2, y: centerY - CARD_SIZE/2 },
    progress: 0,
    phase: "going",
    effectStart: null,
    team: team,
    opponent: opponent,
    teamKey: teamKey,
    opponentKey: opponentKey,
    destroyedCards: destroyedCards
  });

  bloodlustApplied[opponentKey] = true;
}
function drawBloodlustTransitionsGlobal() {
  if (bloodlustTransitionsGlobal.length === 0) return;

  for (let i = 0; i < bloodlustTransitionsGlobal.length; i++) {
    const t = bloodlustTransitionsGlobal[i];
    let x, y;

    if (t.phase === "going") {
      t.progress += 0.04;
      x = lerp(t.from.x, t.to.x, t.progress);
      y = lerp(t.from.y, t.to.y, t.progress);
      
      if (t.progress >= 1) {
        t.phase = "effect";
        t.effectStart = millis();
        t.progress = 0;

  if (bloodlustSound && !bloodlustSound.isPlaying()) {bloodlustSound.play();}
        
        t.destroyedCards.forEach((card, index) => {
          card.score = 0;
          const pos = skillPositions[t.opponentKey].near.find(p => p.skill === card.ability) || 
                      skillPositions[t.opponentKey].far.find(p => p.skill === card.ability);
          if (pos) {
            addBloodlustEffect(
              pos.x + CARD_SIZE/2,
              pos.y + CARD_SIZE/2,
              t.opponentKey,
              t.effectStart + index * 200
            );
          }
        });
      }
    } else if (t.phase === "effect") {
      x = t.to.x;
      y = t.to.y;
      
      const elapsed = millis() - t.effectStart;
      if (elapsed >= 1000 + t.destroyedCards.length * 200) {
        t.phase = "returning";
        t.progress = 0;
        updateScores();
      }
    } else if (t.phase === "returning") {
      t.progress += 0.04;
      x = lerp(t.to.x, t.from.x, t.progress);
      y = lerp(t.to.y, t.from.y, t.progress);
      if (t.progress >= 1) {
        t.phase = "done";
      }
    } else if (t.phase === "done") {
      x = t.from.x;
      y = t.from.y;
    }

    // Bloodlust kartını çiz
    push();
    stroke(abilityColors["Bloodlust"].border);
    strokeWeight(3);
    fill("#222");
    rect(x, y, CARD_SIZE, CARD_SIZE, 5);

    const img = abilityImages["Bloodlust"];
    if (img) {
      imageMode(CENTER);
      image(img, x + CARD_SIZE/2, y + CARD_SIZE/2, 75, 75);
    }

    textAlign(CENTER);
    textSize(12);
    fill(abilityColors["Bloodlust"].text);
    noStroke();
    textStyle(BOLD);
    text("BLOODLUST", x + CARD_SIZE/2, y + CARD_SIZE + 14);

    fill("#fe6207");
    stroke("#ffffc3");
    strokeWeight(2);
    ellipse(x + CARD_SIZE - 15, y + 15, 20, 20);
    fill("#fff");
    noStroke();
    text(t.card.score, x + CARD_SIZE - 15, y + 18);
    pop();
  }

  bloodlustTransitionsGlobal = bloodlustTransitionsGlobal.filter(t => t.phase !== "done");
}
function addBloodlustEffect(x, y, teamKey) {
  if (!bloodlustEffects[teamKey]) {
    bloodlustEffects[teamKey] = [];
  }
  if (bloodlustEffects[teamKey].some(effect => effect.x === x && effect.y === y)) {
    return;
  }
  if (bloodlustEffects[teamKey].length >= 10) {
    return;
  }
  bloodlustEffects[teamKey].push({
    x,
    y,
    startTime: millis(),
    duration: 1000,
    teamKey
  });
}
function updateBloodlustEffects() {
  const teams = ["P1", "P2"];
  teams.forEach(teamKey => {
    bloodlustEffects[teamKey] = bloodlustEffects[teamKey].filter(effect => {
      const elapsed = millis() - effect.startTime;
      if (elapsed > effect.duration) {
        return false;
      }

      push();
      stroke(255, 0, 0, 255 * (1 - elapsed / effect.duration));
      strokeWeight(4);
      const spacing = 15;
      const progress = elapsed / effect.duration; // 200ms'de tam animasyon

      const startX = effect.x + CARD_SIZE / 2;
      const startY = effect.y - CARD_SIZE / 2;
      const endX = effect.x - CARD_SIZE / 2;
      const endY = effect.y + CARD_SIZE / 2;

      for (let i = -1; i <= 1; i++) {
        const offset = i * spacing;
        const currentX = lerp(startX, endX, progress);
        const currentY = lerp(startY, endY, progress);
        line(
          startX,
          startY + offset,
          currentX,
          currentY + offset
        );
      }
      pop();

      return true;
    });
  });
}
function applyComposure(team, opponent) {
  const composureCard = team.find(card => card.ability === "Composure");
  if (!composureCard) return;

  const opponentRageCard = opponent.find(card => card.ability === "Rage" && card.score >= 1);
  if (opponentRageCard) {
    const opponentKey = opponent === player1Cards ? "P1" : "P2";
    const teamKey = opponentKey === "P1" ? "P2" : "P1";

    // 🧠 Etki öncesi skor
    opponentRageCard.originalScoreBeforeComposure = opponentRageCard.score;

    const penaltyAmount = Math.min(opponentRageCard.score, composureCard.score);
    opponentRageCard.score = Math.max(0, opponentRageCard.score - composureCard.score);
    opponentRageCard.penaltyUntil = millis() + 1500;

    // ✅ Eğer composure skoru rage skoruna eşit veya fazlaysa, yazıyı göster
    if (composureCard.score >= opponentRageCard.originalScoreBeforeComposure) {
      composureCard.showISeeYou = true;
    } else {
      composureCard.showISeeYou = false;
    }

    // 🔴 Particle başlat
    composureEffectActive[teamKey] = true;
    composureParticles[teamKey] = [];

    const myPositions = skillPositions[teamKey];
    const opponentPositions = skillPositions[opponentKey];

    const composurePos = [...myPositions.near, ...myPositions.far].find(p => p.skill === "Composure");
    const ragePos = [...opponentPositions.near, ...opponentPositions.far].find(p => p.skill === "Rage");

    if (composurePos && ragePos) {
      composureParticles[teamKey].push({
        x: composurePos.x + CARD_SIZE / 2,
        y: composurePos.y + CARD_SIZE / 2,
        targetX: ragePos.x + CARD_SIZE / 2,
        targetY: ragePos.y + CARD_SIZE / 2,
        progress: 0,
        speed: 0.05,
        reached: false,
        card: opponentRageCard,
        cardPos: ragePos,
        penaltyAmount
      });
    }
  }
}
function drawComposureEffect(cards, team) {
  if (!composureEffectActive[team]) return;

  // 🔒 Sadece ilk frame’de sesi bir kere çal
  if (!composureEffectActive[team + "_soundPlayed"]) {
    if (hitSound && hitSound.isLoaded()) {
      hitSound.play();
    }
    composureEffectActive[team + "_soundPlayed"] = true;
  }

  let allReached = true;

  composureParticles[team].forEach(p => {
    if (!p.reached) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 1;
        p.reached = true;
      }
      p.x = lerp(p.x, p.targetX, p.progress);
      p.y = lerp(p.y, p.targetY, p.progress);
    }

    // Top hareketi
    if (!p.reached) {
      push();
      fill("#ff1e1e"); // Kırmızı top
      noStroke();
      ellipse(p.x, p.y, 6, 6);
      pop();
      allReached = false;
    }

    // Top ulaştıysa ceza efekti
    if (p.reached && p.card && millis() < p.card.penaltyUntil && p.cardPos) {
      const centerX = p.cardPos.x + CARD_SIZE / 2;
      const centerY = p.cardPos.y + CARD_SIZE / 2;

      push();
      fill("#ff1e1e");
      stroke("#ffffc3");
      strokeWeight(2);
      ellipse(centerX, centerY, 24, 24);
      pop();

      push();
      textSize(14);
      textStyle(BOLD);
      fill(0);
      textAlign(CENTER, CENTER);
      text(`-${p.penaltyAmount}`, centerX, centerY);
      pop();
    }
  });

  // Temizleme
  if (allReached && composureParticles[team].length > 0) {
    setTimeout(() => {
      composureEffectActive[team] = false;
      delete composureEffectActive[team + "_soundPlayed"];
      cards.forEach(card => card.showPenalty = false);
      composureParticles[team] = [];
    }, 1500);
  }
}

function applyRage(team) {
  const rageCard = team.find(card => card.ability === "Rage");
  if (!rageCard || rageCard.score < 1) {
    return;
  }

  const teamKey = team === player1Cards ? "P1" : "P2";
  if (rageApplied[teamKey]) {
    return;
  }
  rageApplied[teamKey] = true;

  const affectedCards = team.filter(card => card.ability !== "Rage" && card.score < 1);
  const bonus = affectedCards.length * 2;
  rageCard.score += bonus;

  if (bonus > 0) {
    applyRageEffect(team, teamKey);
  }
}
function applyRageEffect(cards, teamKey) {
  rageEffectData[teamKey] = null;

  let rageCard = cards.find(c => c.ability === "Rage" && c.score >= 1);
  if (!rageCard) {
    return;
  }
  rageEffects[teamKey].length = 0;
  let bonus = 0;
  const targets = [];

  for (let c of cards) {
    if (c.ability !== "Rage" && c.score < 1) {
      bonus += 2;
      targets.push(c);
    }
  }
  if (bonus > 0) {
    const allPositions = [...skillPositions[teamKey].near, ...skillPositions[teamKey].far];
    const ragePos = allPositions.find(p => p.skill === "Rage");

    if (!ragePos) {
      return;
    }

    const targetX = ragePos.x + CARD_SIZE / 2;
    const targetY = ragePos.y + CARD_SIZE / 2;
    for (let target of targets) {
      const fromPos = allPositions.find(p => p.skill === target.ability);
      if (fromPos) {
        addRageXEffect(
          fromPos.x + CARD_SIZE / 2,
          fromPos.y + CARD_SIZE / 2,
          targetX,
          targetY,
          teamKey
        );
      }
    }
    rageEffectData[teamKey] = { bonus, targetX, targetY, textAdded: false };
  }
}
function addRageXEffect(startX, startY, targetX, targetY, teamKey) {
  rageEffects[teamKey].push({
    type: "x",
    startX,
    startY,
    targetX,
    targetY,
    x: startX,
    y: startY,
    progress: 0,
    speed: 0.05,
    alpha: 255,
    reached: false,
    teamKey
  });
}
function addRageEffect(x, y, amount, teamKey) {
  rageEffects[teamKey].push({
    type: "text",
    x,
    y,
    text: `+${amount}`,
    bonusUntil: millis() + 1500,
    teamKey
  });
}
function updateRageEffects() {
  ["P1", "P2"].forEach(teamKey => {
    const effects = rageEffects[teamKey];
    const toRemove = [];

    for (let e of effects) {
      if (e.type === "x") {
        if (!e.reached) {
          e.progress += e.speed;
          if (e.progress >= 1) {
            e.progress = 1;
            e.reached = true;
          }

          e.x = lerp(e.startX, e.targetX, e.progress);
          e.y = lerp(e.startY, e.targetY, e.progress) + sin(e.progress * PI) * 20;

          if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
            push();
            fill(255, 0, 0, e.alpha);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(18);
            text("✖", e.x, e.y);
            pop();
          }
        } else {
          e.alpha -= 4;
          if (e.alpha <= 0) {
            toRemove.push(e);
          }
        }
      }

      if (e.type === "text") {
        if (millis() < e.bonusUntil) {
          push();
          fill("#06fe02");
          stroke("#ffffc3");
          strokeWeight(2);
          ellipse(e.x, e.y, 24, 24);
          pop();

          push();
          textSize(14);
          textStyle(BOLD);
          fill(0);
          textAlign(CENTER, CENTER);
          text(e.text, e.x, e.y);
          pop();
        } else {
          toRemove.push(e);
        }
      }
    }

    for (let e of toRemove) {
      const index = effects.indexOf(e);
      if (index !== -1) {
        effects.splice(index, 1);
      }
    }

    const xEffects = effects.filter(e => e.type === "x");

    if (
      xEffects.length > 0 &&
      xEffects.every(e => e.reached) &&
      rageEffectData[teamKey] &&
      !rageEffectData[teamKey].textAdded
    ) {
      const { bonus, targetX, targetY } = rageEffectData[teamKey];
      if (bonus > 0) {      
    // 🧮 Skorları burada hemen güncelle
        netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
        netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);
    // 🎨 Yeşil sayı efekti
        addRageEffect(targetX, targetY, bonus, teamKey);
        rageEffectData[teamKey].textAdded = true;
        // ✅ Ses flag’ini sıfırla (bir sonraki Rage için)
        rageSoundPlayed = false;
      }
    }
  });
}
function drawPenaltyEffects(cards, teamKey) {
  if (!penaltyEffectActive[teamKey]) return;

  penaltyEffects[teamKey].forEach(effect => {
    if (!effect.card || !effect.card.penaltyUntil || millis() > effect.card.penaltyUntil || effect.card.score < 1) return;

    const posList = skillPositions[teamKey];
    const allPositions = [...posList.near, ...posList.far];
    const pos = allPositions.find(p => p.skill === effect.card.ability);
    if (!pos) return;

    const centerX = pos.x + CARD_SIZE / 2;
    const centerY = pos.y + CARD_SIZE / 2;

    push();
    fill("#ff1e1e");
    stroke("#ffffc3");
    strokeWeight(2);
    ellipse(centerX, centerY, 24, 24);
    pop();

    push();
    textSize(14);
    textStyle(BOLD);
    fill(0);
    textAlign(CENTER, CENTER);
    text(`-${effect.amount}`, centerX, centerY);
    pop();
  });

  const stillActive = penaltyEffects[teamKey].some(e => millis() <= (e.card.penaltyUntil || 0) && e.card.score >= 1);
  if (!stillActive) {
    penaltyEffects[teamKey] = [];
    penaltyEffectActive[teamKey] = false;
  }
}
function applySkillForBothTeams(skill) {
  const skillFunctions = {
    Fear: applyFear,
    Morale: applyMorale,
    Cunning: applyCunning,
    Money: applyMoney,
    Perception: applyPerception,
    Sneak: applySneak,
    Badass: applyBadass,
    Bloodlust: applyBloodlust,
    Composure: applyComposure,
    Rage: applyRage
  };

  if (!skillFunctions[skill]) return;

  const p1SkillCard = player1Cards.find(card => card.ability === skill && card.score > 0);
  const p2SkillCard = player2Cards.find(card => card.ability === skill && card.score > 0);

  if (!p1SkillCard && !p2SkillCard) return;

  if (skill === "Money" && p1SkillCard && p2SkillCard) {
    const p1Total = player1Cards.reduce((sum, c) => sum + c.score, 0);
    const p2Total = player2Cards.reduce((sum, c) => sum + c.score, 0);

    if (p1Total > p2Total) {
      applyMoney(player1Cards, player2Cards, true);
      applyMoney(player2Cards, player1Cards, false);
    } else if (p2Total > p1Total) {
      applyMoney(player2Cards, player1Cards, false);
      applyMoney(player1Cards, player2Cards, true);
    } else {
      const p1Wolf = player1Cards.filter(c => c.skill === "wolf").sort((a, b) => a.id - b.id)[0];
      const p2Wolf = player2Cards.filter(c => c.skill === "wolf").sort((a, b) => a.id - b.id)[0];

      if (!p1Wolf && !p2Wolf) {
        applyMoney(player1Cards, player2Cards, true);
        applyMoney(player2Cards, player1Cards, false);
      } else if (p1Wolf && (!p2Wolf || p1Wolf.id < p2Wolf.id)) {
        applyMoney(player1Cards, player2Cards, true);
        applyMoney(player2Cards, player1Cards, false);
      } else {
        applyMoney(player2Cards, player1Cards, false);
        applyMoney(player1Cards, player2Cards, true);
      }
    }
  } else if (skill === "Bloodlust") {
    if (p1SkillCard) applyBloodlust(player1Cards, player2Cards, "P2");
    if (p2SkillCard) applyBloodlust(player2Cards, player1Cards, "P1");
  } else {
    if (p1SkillCard) skillFunctions[skill](player1Cards, player2Cards, true);
    if (p2SkillCard) skillFunctions[skill](player2Cards, player1Cards, false);
  }

  netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
  netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);

}
function applyNextSkill() {
  // Bayrakları temizle
  player1Cards.forEach(card => card.showNoFear = card.showNoHope = false);
  player2Cards.forEach(card => card.showNoFear = card.showNoHope = false);
  player1Cards.forEach(c => delete c.showISeeYou);
  player2Cards.forEach(c => delete c.showISeeYou);

  if (currentSkillIndex >= skillOrder.length) {
    activeSkill = null;
    calculateFinalResult();
    return;
  }

  const skill = skillOrder[currentSkillIndex];
  const p1HasSkill = player1Cards.some(c => c.ability === skill && c.score > 0);
  const p2HasSkill = player2Cards.some(c => c.ability === skill && c.score > 0);

  if (!p1HasSkill && !p2HasSkill) {
    currentSkillIndex++;
    applyNextSkill();
    return;
  }

  activeSkill = skill;
  
  // 🎵 Skill başlarken sesi çal
  if (cardSound && cardSound.isLoaded()) {
    cardSound.play();
  }
  
  skillTimer = millis();

  setTimeout(() => {
    if (skill === "Rage") {
      rageApplied = { P1: false, P2: false };
      applyRage(player1Cards);
      applyRage(player2Cards);
    } else {
      applySkillForBothTeams(skill);
    }

    // Animasyonlu skill'ler için özel bekleme
    if (["Cunning", "Money", "Sneak", "Bloodlust"].includes(skill)) {
      waitForAnimations(() => {
        currentSkillIndex++;
        applyNextSkill();
      });
    } else {
      setTimeout(() => {
        currentSkillIndex++;
        applyNextSkill();
      }, 2000);
    }
  }, 1000);
}
function waitForAnimations(callback) {
  const check = () => {
    if (
      cunningTransitionsGlobal.length === 0 &&
      moneyTransitionsGlobal.length === 0 &&
      sneakTransitionsGlobal.length === 0 &&
      bloodlustTransitionsGlobal.length === 0 &&
      badassParticles.P1.length === 0 &&
      badassParticles.P2.length === 0 &&
      composureParticles.P1.length === 0 &&
      composureParticles.P2.length === 0
    ) {
      callback();
    } else {
      setTimeout(check, 100);
    }
  };
  check();
}
function updateScores() {
  player1Score = calculateTotalScore(player1Cards);
  player2Score = calculateTotalScore(player2Cards);
  netAttackP1 = getNetAttack(player1Cards, userSelectedIDs);
  netAttackP2 = getNetAttack(player2Cards, opponentSelectedIDs);
}
function calculateTotalScore(cards) {
  return cards.reduce((sum, card) => sum + card.score, 0);
}
function calculateFinalResult() {
  const p1Score = player1Cards.reduce((sum, card) => sum + card.score, 0);
  const p2Score = player2Cards.reduce((sum, card) => sum + card.score, 0);
  winningTeam = p1Score > p2Score ? "Player 1" : p2Score > p1Score ? "Player 2" : "Berabere";
}
function calculateTotalHiScore() {
  return rivalTeams
    .filter(team => team.name !== "Player 2" && team.eliminatedBy !== null)
    .reduce((total, team) => total + team.hiScore, 0);
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
      rivalTeams.forEach(team => {
        const savedTeam = parsedTeams.find(t => t.name === team.name);
        if (savedTeam) {
          team.eliminatedBy = savedTeam.eliminatedBy;
          team.hiScore = savedTeam.hiScore || 0;
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
function getAllTraitsForSkill(skill) {
  let traits = [];
  for (const [category, traitsData] of Object.entries(traitAbilities)) {
    for (const [trait, data] of Object.entries(traitsData)) {
      if (data.ability === skill) {
        traits.push(`${category}: ${trait} (+${data.score})`);
      }
    }
  }
  // Sort alphabetically for consistent display
  return traits.sort();
}
function drawSkillDetailsPopup() {
  push();
  //fill(0, 0, 0, 150);
  //rect(0, 0, canvasWidth, canvasHeight);
  const popupX = canvasWidth / 2 - 180;
  const popupY = canvasHeight / 2 - 250;
  const popupWidth = 360;
  const popupHeight = 500;
  fill("#221f3e");
  stroke("#3f3973");
  strokeWeight(1);
  rect(popupX, popupY, popupWidth, popupHeight, 10);
// Skill kartını çiz
  const cardSize = 75;
  const textOffset = 15;
  const teamColor = "#3f3973"; // Nötr renk (Your Pack mavisi)
  const xPos = popupX + (popupWidth - cardSize) / 2; // Ortala
  const yStart = popupY + 20; // Üstten boşluk  
  let img = abilityImages[selectedSkill];
  let colors = abilityColors[selectedSkill] || { text: "#ffffff", border: teamColor };
  let displayTeamColor = teamColor;
  // Çerçeve
  push();
  stroke(displayTeamColor);
  strokeWeight(4);
  noFill();
  rect(xPos + 5, yStart, cardSize - 10, cardSize, 3);
  pop();
  if (img) {
    let clipX = floor(xPos + 5);
    let clipY = floor(yStart);
    let clipW = cardSize - 10;
    let clipH = cardSize;
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
  // Skill adı (altta)
  push();
  textSize(13);
  textFont("Trebuchet MS");
  textStyle(BOLD);
  fill(colors.text);
  stroke(colors.border);
  strokeWeight(3);
  textAlign(CENTER);
  text(selectedSkill.toUpperCase(), xPos + cardSize / 2, yStart + cardSize + textOffset - 12);
  noStroke();
  pop();  
  
  // Özel tanım bilgisi
  const skillDescriptions = {
    Fear: "If this card's Power is higher than your rival's Morale power; -1 Power for each enemy card.",
    Morale: "If this card's Power is higher than your rival's Fear power; +1 Power for each of your cards.",
    Cunning: "Steal Power from your rival's Money card equal to this card's Power.",
    Money: "Recruit the lowest-Power enemy card with Power below this card's Power.",
    Perception: "Afflict your rival's Sneak card with negative Power equal to this card's Power.",
    Sneak: "Assassinate the lowest-Power enemy card.",
    Badass: "Afflict your rival's Bloodlust card with negative Power equal to this card's Power.",
    Bloodlust: "Destroy each enemy card with 5 or less Power.",
    Composure: "Afflict your rival's Rage card with negative Power equal to this card's Power.",
    Rage: "+2 Power for each of your destroyed cards."
  };
  textSize(14);
  textStyle(BOLD);
  fill("#e1e2e6");
  textAlign(CENTER);
  textWrap(WORD);
  const descText = skillDescriptions[selectedSkill] || "No description available.";
  text(descText, popupX + 20, popupY + 110, popupWidth - 40); // 40 piksel kenar boşluğu
  
  // Başlık
  textSize(14);
  textStyle(NORMAL);
  fill("#e1e2e6");
  textAlign(CENTER);
  text(`Traits contributing to ${selectedSkill}`, popupX + popupWidth / 2, popupY + 175);
  
  let yOffset = popupY + 195;
  if (skillTraits.length === 0) {
    textSize(14);
    textStyle(NORMAL);
    textAlign(CENTER);
    fill("#e1e2e6");
    text("No traits contribute to this skill.", popupX + popupWidth / 2, yOffset);
  } else {
    
    const labelX = popupX + 20;       // Sol sütun (trait tipi)
    const valueX = popupX + 110;      // Orta sütun (trait değeri)
    const scoreX = popupX + 330;      // Sağ sütun (puan)
    yOffset = popupY + 195;

  if (skillTraits.length === 0) {
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER);
  fill("#e1e2e6");
  text("No traits contribute to this skill.", popupX + popupWidth / 2, yOffset);
  } else {
  skillTraits.forEach(trait => {
    const match = trait.match(/^(.+?):\s+(.+?)\s+\((\+\d+)\)$/);
    if (match) {
      const [_, key, value, score] = match;

      textSize(12);
      textStyle(NORMAL);
      fill("#e1e2e6");

      textAlign(LEFT);
      text(key, labelX, yOffset);

      textAlign(LEFT);
      text(value, valueX, yOffset);

      textAlign(RIGHT);
      text(score, scoreX, yOffset);
    } else {
      // Eğer eşleşmezse eski şekilde yaz
      textAlign(CENTER);
      text(trait, popupX + popupWidth / 2, yOffset);
    }

    yOffset += 15;
    });
    }
    
  }
  const xButtonX = popupX + popupWidth - 20;
  const xButtonY = popupY + 15;
  textFont("Arial");
  if (
    mouseX >= xButtonX - 10 &&
    mouseX <= xButtonX + 10 &&
    mouseY >= xButtonY - 10 &&
    mouseY <= xButtonY + 10
  ) {
    fill(255, 0, 0); //showSkillDetailsPopup kapatma hover
  } else {
    fill(0);
  }
  noStroke();
  ellipse(xButtonX, xButtonY, 20, 20);
  fill("#F5F5F5");
  textAlign(CENTER);
  text("✖", xButtonX, xButtonY + 5);
  pop();
}
function toggleSelection(wolf, mode) {
  const targetArray = mode === "user" ? userSelectedIDs : opponentSelectedIDs;
  const otherArray = mode === "user" ? opponentSelectedIDs : userSelectedIDs;
  const isUser = mode === "user";

  // Diğer takımdan varsa çıkar
  const otherIndex = otherArray.indexOf(wolf.id);
  if (otherIndex !== -1) {
    otherArray.splice(otherIndex, 1);
    delete loadedImages[wolf.id];
    delete resizedImages[wolf.id];
  }

  const index = targetArray.indexOf(wolf.id);
  if (index === -1) {
    if (targetArray.length >= 4) return;

    targetArray.push(wolf.id);
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
      .catch(() => console.error(`Image for ${wolf.id} could not be loaded!`));
  } else {
    targetArray.splice(index, 1);
    delete loadedImages[wolf.id];
    delete resizedImages[wolf.id];
  }

  // Güncel takım kopyasını oluştur
  if (isUser) {
    player1Team = userSelectedIDs.slice();
    player1Cards = calculateCards(userSelectedIDs);
  } else {
    player2Team = opponentSelectedIDs.slice();
    player2Cards = calculateCards(opponentSelectedIDs);
  }

  // Savaş başlamışsa sıfırla
  battleStarted = false;
  activeSkill = null;
  currentSkillIndex = 0;
  skillTimer = 0;

  updateEndTurnButtonStyle();
}
function loadOpponentImages(ids) {
  ids.forEach((id) => {
    const wolf = wolfdata.find((w) => w.id === id);
    if (wolf && !loadedImages[id]) {
      loadImageAsync(wolf.url)
        .then((img) => {
          loadedImages[id] = img;
        }).catch(() => {}); }});}
async function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    loadImage(
      url,(img) => {loadedImages[img.id] = img;
        let resized = createGraphics(32, 32);
        resized.image(img, 0, 0, 32, 32);
        resizedImages[img.id] = resized;
        resolve(img); },reject);});}
function mousePressed() {
  const tableWidth = 200;
  const rowHeight = 80;
  const tableStartY = tableSectionY + 150 + 45;

  // Savaş başlamadan önce: savaş alanındaki skill kartına dikdörtgensel tıklama ile detay göster
  if (!battleStarted && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup) {
  const cardSize = 75;

  for (const card of player1Cards) {
    const pos =
      skillPositions.P1.near.find(p => p.skill === card.ability) ||
      skillPositions.P1.far.find(p => p.skill === card.ability);
    if (pos && mouseX >= pos.x && mouseX <= pos.x + cardSize &&
               mouseY >= pos.y && mouseY <= pos.y + cardSize) {
      selectedSkill = card.ability;
      showSkillDetailsPopup = true;
      skillTraits = getAllTraitsForSkill(card.ability);
      if (clickSound) clickSound.play();
      return;
    }
  }

  for (const card of player2Cards) {
    const pos =
      skillPositions.P2.near.find(p => p.skill === card.ability) ||
      skillPositions.P2.far.find(p => p.skill === card.ability);
    if (pos && mouseX >= pos.x && mouseX <= pos.x + cardSize &&
               mouseY >= pos.y && mouseY <= pos.y + cardSize) {
      selectedSkill = card.ability;
      showSkillDetailsPopup = true;
      skillTraits = getAllTraitsForSkill(card.ability);
      if (clickSound) clickSound.play();
      return;
    }
  }
}

  if (showSkillDetailsPopup) {
  const popupX = canvasWidth / 2 - 180;
  const popupY = canvasHeight / 2 - 250;
  const xButtonX = popupX + 340;
  const xButtonY = popupY + 15;
  const xButtonSize = 20;
  if (
    mouseX >= xButtonX - xButtonSize / 2 &&
    mouseX <= xButtonX + xButtonSize / 2 &&
    mouseY >= xButtonY - xButtonSize / 2 &&
    mouseY <= xButtonY + xButtonSize / 2
  ) {
    showSkillDetailsPopup = false;
    selectedSkill = null;
    skillTraits = [];
    return;
  }
}

  // Reset butonu tıklama kontrolü
  const restableX = 628;
  const restableY = 60;
  if (
    mouseX >= restableX + resetButtonX - resetButtonSize / 2 &&
    mouseX <= restableX + resetButtonX + resetButtonSize / 2 &&
    mouseY >= restableY + resetButtonY - resetButtonSize / 2 &&
    mouseY <= restableY + resetButtonY + resetButtonSize / 2 &&
    !hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup
  ) {
    showResetPopup = true;
    return;
  }
  
  // Reset popup butonları tıklama kontrolü
  if (showResetPopup) {
    const yesButtonX = width / 2 - 80;
    const yesButtonY = height / 2 + 20;
    const noButtonX = width / 2 + 20;
    const noButtonY = height / 2 + 20;
    const buttonWidth = 60;
    const buttonHeight = 40;
    if (
      mouseX >= yesButtonX && mouseX <= yesButtonX + buttonWidth &&
      mouseY >= yesButtonY && mouseY <= yesButtonY + buttonHeight
    ) {
      rivalTeams.forEach(team => {
        team.eliminatedBy = null;
        team.hiScore = 0;
      });
      saveRivalTeamsToStorage();
      showResetPopup = false;
    }
    if (
      mouseX >= noButtonX && mouseX <= noButtonX + buttonWidth &&
      mouseY >= noButtonY && mouseY <= noButtonY + buttonHeight
    ) {
      showResetPopup = false;
    }
  }

// Wolf Selection Table Click Detection (güncellenmiş)
if (
  !hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup &&
  mouseX >= tableSectionX &&
  mouseX <= tableSectionX + tableWidth &&
  mouseY >= tableStartY &&
  mouseY <= tableStartY + itemsPerPage * rowHeight
) {
  const rowIndex = Math.floor((mouseY - tableStartY) / rowHeight);

  // Filtreleme ve sıralama işlemini burada tekrar yap (search sonrası doğru kurtu bulmak için)
  let filtered = wolfdata.filter((w) => parseInt(w.id) <= 7500);

  if (searchFilter !== "") {
    filtered = filtered.filter((w) => w.id === searchFilter);
  } else if (walletInput && walletInput.value && walletInput.value().trim() !== "" && nftIds.length === 0) {
    filtered = [];
  } else if (nftIds.length > 0) {
    filtered = filtered.filter((w) => nftIds.includes(w.id));
  }

  if (sortColumn !== null) {
    filtered.sort((a, b) => {
      let valA, valB;
      if (sortColumn === "Total Points") {
        valA = wolfPointsCache[a.id]?.totalPoints || 0;
        valB = wolfPointsCache[b.id]?.totalPoints || 0;
      } else if (sortColumn === "3T Bonus") {
        valA = has3TBonus(a) ? 9 : 0;
        valB = has3TBonus(b) ? 9 : 0;
      } else {
        valA = getAbilityScoreCached(a, sortColumn) || 0;
        valB = getAbilityScoreCached(b, sortColumn) || 0;
      }
      return sortAscending ? valA - valB : valB - valA;
    });
  }

  const startIndex = currentPage * itemsPerPage;
  const pageData = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (rowIndex >= 0 && rowIndex < pageData.length) {
    const wolf = pageData[rowIndex];
    showPopup = true;
    selectedWolfId = wolf.id;

    const popupX = canvasWidth / 2 - 175;
    const popupY = canvasHeight / 2 - 105;
    addToPlayer1Button.position(popupX + 7, popupY + 165);
    addToPlayer1Button.show();
    addToPlayer2Button.position(popupX + 157, popupY + 165);
    addToPlayer2Button.show();
    if (clickSound) clickSound.play();
    return;
  }
}


// Team Info Click Detection
const rivalTeamInfoX = leftMargin + 23;
const rivalTeamInfoY = 60 + 25;
const teamInfoWidth = 65;
const teamInfoHeight = 72;
if (
  mouseX >= rivalTeamInfoX &&
  mouseX <= rivalTeamInfoX + teamInfoWidth &&
  mouseY >= rivalTeamInfoY &&
  mouseY <= rivalTeamInfoY + teamInfoHeight
) {
  if (battleStarted || showNextButton || showSkillDetailsPopup || showTeamWolfPopup || showPopup) return; // 👈 EKLE
  showTeamPopup = true;
  selectedTeamIDs = opponentSelectedIDs;
  if (clickSound) clickSound.play(); 
  return;
}

const p1SectionX = leftMargin;
const p1SectionY = 305 + 240 + 120;
const p1WcImgX = p1SectionX + 23 + 13;
const p1WcImgY = p1SectionY + 25 + 12 + 43;
const wcImgWidth = 50;
const wcImgHeight = 46;
if (
  mouseX >= p1WcImgX &&
  mouseX <= p1WcImgX + wcImgWidth &&
  mouseY >= p1WcImgY &&
  mouseY <= p1WcImgY + wcImgHeight
) {
  if (battleStarted || showNextButton || showSkillDetailsPopup || showTeamWolfPopup || showPopup) return;
  showTeamPopup = true;
  selectedTeamIDs = userSelectedIDs;
  if (clickSound) clickSound.play(); 
  return;
}

  // Wolf Capital Link Click
  if (mouseX >= 450 && mouseX <= 540 && mouseY >= 25 && mouseY <= 40) {
    window.open("https://www.tensor.trade/trade/wolf_capital", "_blank");
    return;
  }
// Popup Controls
if (showPopup) {
  const popupX = canvasWidth / 2 - 175;
  const popupY = canvasHeight / 2 - 105;
  const popupWidth = 350;
  const xButtonX = popupX + popupWidth - 20;
  const xButtonY = popupY + 15;
  const xButtonSize = 20;

  // ✖ butonuna tıklama
  if (
    mouseX >= xButtonX - xButtonSize / 2 &&
    mouseX <= xButtonX + xButtonSize / 2 &&
    mouseY >= xButtonY - xButtonSize / 2 &&
    mouseY <= xButtonY + xButtonSize / 2
  ) {
    closePopup();
    return;
  }

  const buttonY = popupY + 165;

  // Player 1 butonu tıklama
  if (
    mouseX >= popupX + 7 &&
    mouseX <= popupX + 7 + 140 &&
    mouseY >= buttonY &&
    mouseY <= buttonY + 40
  ) {
    if (addToPlayer1Button && addToPlayer1Button.elt && typeof addToPlayer1Button.elt.click ===   "function") {
  addToPlayer1Button.elt.click();
  } else {
      console.warn("addToPlayer1Button tanımsız!");
    }
    return;
  }

  // Player 2 butonu tıklama
  if (
    mouseX >= popupX + 157 &&
    mouseX <= popupX + 157 + 140 &&
    mouseY >= buttonY &&
    mouseY <= buttonY + 40
  ) {
    if (addToPlayer2Button && addToPlayer2Button.elt && typeof addToPlayer2Button.elt.click === "function") {
  addToPlayer2Button.elt.click();
  } else {
      console.warn("addToPlayer2Button tanımsız!");
    }
    return;
  }
}

   // team info popup kapatma (mousePressed fonksiyonu)
  if (showTeamPopup) {
    const popupX = canvasWidth / 2 - 216; // Yeni popupWidth (432) ile ortalanmış
    const popupY = canvasHeight / 2 - 280; // Yeni popupHeight (560) ile ortalanmış
    const xButtonSize = 20;
    const xButtonX = popupX + 432 - 20; // popupWidth - 20
    const xButtonY = popupY + 15;

    if (
      mouseX >= xButtonX - xButtonSize / 2 &&
      mouseX <= xButtonX + xButtonSize / 2 &&
      mouseY >= xButtonY - xButtonSize / 2 &&
      mouseY <= xButtonY + xButtonSize / 2
    ) {
      showTeamPopup = false;
      selectedTeamIDs = null;
      return;
    }
  }

  //wolf info popup kapatma 
  if (showTeamWolfPopup) {
  const popupX = canvasWidth / 2 - 175;
  const popupY = canvasHeight / 2 - 105;
  const xButtonX = popupX + 330;
  const xButtonY = popupY + 15;
  const xButtonSize = 20;

  if (
    mouseX >= xButtonX - xButtonSize / 2 &&
    mouseX <= xButtonX + xButtonSize / 2 &&
    mouseY >= xButtonY - xButtonSize / 2 &&
    mouseY <= xButtonY + xButtonSize / 2
  ) {
    showTeamWolfPopup = false;
    selectedTeamWolfId = null;
    selectedTeamType = null;
    closeTeamWolfPopup();
    return;
  }
}

  // Player 1 Wolves Click Detection
  const teamSectionHeight = 105;
  const teamSpacing = 30;
  const centerY = 170 + middleHeight; // Orta çizgi
  const player2Y = centerY - teamSpacing - teamSectionHeight - 245;
  const player1Y = centerY + teamSpacing + 240;  
  p1WolfPositions.forEach((pos) => {
    if (battleStarted || showNextButton || showSkillDetailsPopup || showTeamWolfPopup || showTeamPopup || showPopup || showResetPopup) return; // 👈 EKLE
    const globalX = leftMargin + pos.x;
    const globalY = player1Y + pos.y;
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height
    ) {
      showTeamWolfPopup = true;
      selectedTeamWolfId = pos.id;
      selectedTeamType = "user";
      if (clickSound) clickSound.play();
      return;
    }
  });
  // Player 2 Wolves Click Detection
  p2WolfPositions.forEach((pos) => {
    if (battleStarted || showNextButton || showSkillDetailsPopup || showTeamWolfPopup || showTeamPopup || showPopup || showResetPopup) return; // 👈 EKLE
    const globalX = leftMargin + pos.x;
    const globalY = player2Y + pos.y;
    if (
      mouseX >= globalX &&
      mouseX <= globalX + pos.width &&
      mouseY >= globalY &&
      mouseY <= globalY + pos.height
    ) {
      showTeamWolfPopup = true;
      selectedTeamWolfId = pos.id;
      selectedTeamType = "opponent";
      if (clickSound) clickSound.play();
      return;
    }
  });
  // Team Reset Buttons
  const xButtonSize = 20;
  const yourPackXButtonX = leftMargin + leftSectionWidth - 30;
  const yourPackXButtonY = player1Y + 15;
  if (
    mouseX >= yourPackXButtonX - xButtonSize / 2 &&
    mouseX <= yourPackXButtonX + xButtonSize / 2 &&
    mouseY >= yourPackXButtonY - xButtonSize / 2 &&
    mouseY <= yourPackXButtonY + xButtonSize / 2 &&
    userSelectedIDs.length > 0
  ) {
  if (battleStarted || showNextButton) return; // 👈 EKLE
  userSelectedIDs.forEach(id => {
    delete loadedImages[id];
    delete resizedImages[id];
  });
  userSelectedIDs = [];
  player1Team = [];
  player1Cards = []; // Kartları da temizle
  updateEndTurnButtonStyle();
  if (removeSound) removeSound.play();
  return;
}
const rivalPackXButtonX = leftMargin + leftSectionWidth - 30;
const rivalPackXButtonY = player2Y + 15;
if (
  mouseX >= rivalPackXButtonX - xButtonSize / 2 &&
  mouseX <= rivalPackXButtonX + xButtonSize / 2 &&
  mouseY >= rivalPackXButtonY - xButtonSize / 2 &&
  mouseY <= rivalPackXButtonY + xButtonSize / 2 &&
  opponentSelectedIDs.length > 0
) {
  if (battleStarted || showNextButton) return; // 👈 Savaş sırasında sıfırlama engellendi

  opponentSelectedIDs.forEach(id => {
    const isInRivalTeams = rivalTeams.some(team => team.ids.includes(id));
    if (!isInRivalTeams) {
      delete loadedImages[id];
      delete resizedImages[id];
    }
  });

  opponentSelectedIDs = [];
  player2Team = [];
  player2Cards = [];
  opponentTeamInitialized = false;

  if (rivalPackTitle !== "Player 2") {
    rivalPackTitle = "Player 2";
    selectedRivalTeam = "Player 2";
  }

  updateEndTurnButtonStyle();
  if (removeSound) removeSound.play();
  return;
}

// Rival Selection Table Click
const rivalSectionX = leftMargin + leftSectionWidth + 10;
const rivalSectionY = 60;

if (
  !hideUI && !showSkillDetailsPopup && !showTeamWolfPopup && !showTeamPopup && !showPopup && !showResetPopup &&
  mouseX >= rivalSectionX &&
  mouseX <= rivalSectionX + 200 &&
  mouseY >= rivalSectionY + 30 &&
  mouseY <= rivalSectionY + 30 + rivalItemsPerPage * 80
) {
  const rowIndex = Math.floor((mouseY - (rivalSectionY + 30)) / 80);
  const absoluteIndex = rivalCurrentPage * rivalItemsPerPage + rowIndex;

  if (absoluteIndex >= 0 && absoluteIndex < rivalTeams.length) {
    const team = rivalTeams[absoluteIndex];
    const defeatedTeamsCount = rivalTeams.filter(
      (t) => t.eliminatedBy !== null && t.name !== "Player 2"
    ).length;
    const isRoyalWolvesDefeated = rivalTeams.some(
      (t) => t.name === "Royal Wolves" && t.eliminatedBy !== null
    );
    const isRoyalWolves = team.name === "Royal Wolves";
    const isIceWolves = team.name === "Ice Wolves";

    const isSelectable =
      (!isRoyalWolves || defeatedTeamsCount >= 6) &&
      (!isIceWolves || isRoyalWolvesDefeated);

    if (isSelectable) {
      selectedRivalTeam = team.name;
      opponentSelectedIDs = team.ids.slice();
      rivalPackTitle = team.name;
      player2Team = opponentSelectedIDs.slice(); // ✅ takım ata
      player2Cards = calculateCards(opponentSelectedIDs); // ✅ kartları hesapla
      loadOpponentImages(opponentSelectedIDs);
      updateEndTurnButtonStyle();
      if (selectSound) selectSound.play();
    }
  }
  return;
}

  // Search and Wallet Input Clear Buttons
  const inputxButtonSize = 10;
  const searchXButtonX = 200;
  const searchXButtonY = 110;
  if (
    mouseX >= searchXButtonX - inputxButtonSize / 2 &&
    mouseX <= searchXButtonX + inputxButtonSize / 2 &&
    mouseY >= searchXButtonY - inputxButtonSize - 2 &&
    mouseY <= searchXButtonY
  ) {
    searchInput.value("");
    searchFilter = "";
    nftIds = [];
    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
    return;
  }

  const walletXButtonX = 200;
  const walletXButtonY = 150;
  if (
    mouseX >= walletXButtonX - inputxButtonSize / 2 &&
    mouseX <= walletXButtonX + inputxButtonSize / 2 &&
    mouseY >= walletXButtonY - inputxButtonSize - 2 &&
    mouseY <= walletXButtonY
  ) {
    walletInput.value("");
    nftIds = [];
    currentPage = 0;
    tableCacheDirty = true;
    drawWolfDataTableToBuffer();
    return;
  }
}
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
        // 🗑️ Yeni seçim yapıldığı için cache'i temizle
        abilityScoreCache = {};
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
    abilityScoreCache = {}; // 💡 burada cache temizleniyor
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
function distBetween(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
