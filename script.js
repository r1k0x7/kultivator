/* =========================================================
   Renegade Immortal — Cultivation Simulator
   Vanilla JavaScript (no frameworks)
   ========================================================= */
'use strict';

/* -------------------------------------------------
   1. DATA — Realms (20 tingkat kultivasi)
   Setiap realm menyimpan: probabilitas (weight), rarity,
   aura, gelar, rentang kekuatan, lore, dan simbol.
   ------------------------------------------------- */
const IMMEASURABLE = 'Tidak Terukur';

const REALMS = [
  { step: 1,  name: 'Condensation',            cn: '凝气', weight: 20,    rarity: 'Common',       auraClass: 'aura-green',       auraName: 'Aura Hijau Qi',          title: 'Murid Luar Sekte',      power: [1000, 9999],
    glyph: '气', lore: 'Baru saja memasuki jalan kultivasi dan mulai menyerap Qi Langit dan Bumi.' },
  { step: 2,  name: 'Foundation Establishment', cn: '筑基', weight: 18,    rarity: 'Common',       auraClass: 'aura-blue',        auraName: 'Aura Biru',              title: 'Murid Inti',            power: [10000, 99999],
    glyph: '基', lore: 'Fondasi Dao telah ditegakkan; Qi mengalir mantap membentuk lautan spiritual di dalam dirimu.' },
  { step: 3,  name: 'Core Formation',           cn: '结丹', weight: 15,    rarity: 'Common',       auraClass: 'aura-purple',      auraName: 'Aura Ungu',              title: 'Tetua Junior',          power: [100000, 999999],
    glyph: '丹', lore: 'Qi memadat menjadi inti emas, sumber kekuatan sejati seorang kultivator.' },
  { step: 4,  name: 'Nascent Soul',             cn: '婴变', weight: 12,    rarity: 'Rare',         auraClass: 'aura-gold',        auraName: 'Aura Emas',              title: 'Tetua',                 power: [1000000, 9999999],
    glyph: '婴', lore: 'Jiwamu telah lahir kembali dan mampu meninggalkan tubuh fisik.' },
  { step: 5,  name: 'Soul Formation',           cn: '化神', weight: 10,    rarity: 'Rare',         auraClass: 'aura-red',         auraName: 'Aura Merah',             title: 'Grand Elder',           power: [10000000, 99999999],
    glyph: '神', lore: 'Jiwa dan tubuh menyatu menjadi satu, memancarkan tekanan spiritual yang menggetarkan langit.' },
  { step: 6,  name: 'Spirit Transformation',    cn: '灵变', weight: 8,     rarity: 'Rare',         auraClass: 'aura-white',       auraName: 'Aura Putih',             title: 'Penguasa Wilayah',      power: [100000000, 999999999],
    glyph: '灵', lore: 'Rohmu berubah wujud, melampaui batas fana dan menyentuh misteri keabadian.' },
  { step: 7,  name: 'Ascendant',                cn: '登仙', weight: 5,     rarity: 'Epic',         auraClass: 'aura-cyan',        auraName: 'Aura Cyan',              title: 'Raja Kultivator',       power: [1000000000, 9999999999],
    glyph: '登', lore: 'Kau melangkah naik melampaui dunia bawah; namamu bergema di antara para kultivator agung.' },
  { step: 8,  name: 'Illusory Yin',             cn: '虚阴', weight: 3,     rarity: 'Epic',         auraClass: 'aura-yinviolet',   auraName: 'Aura Hitam-Ungu',        title: 'Pengendali Yin',        power: [10000000000, 99999999999],
    glyph: '阴', lore: 'Kau menguasai sisi Yin dari keberadaan; ilusi dan kematian tunduk pada kehendakmu.' },
  { step: 9,  name: 'Corporeal Yang',           cn: '实阳', weight: 2,     rarity: 'Epic',         auraClass: 'aura-brightgold',  auraName: 'Aura Emas Terang',       title: 'Pengendali Yang',       power: [100000000000, 999999999999],
    glyph: '阳', lore: 'Kau menguasai sisi Yang; kehidupan dan wujud sejati mengalir dari telapak tanganmu.' },
  { step: 10, name: 'Nirvana Scryer',           cn: '涅窥', weight: 1.8,   rarity: 'Legendary',    auraClass: 'aura-rainbow',     auraName: 'Aura Pelangi Spiritual', title: 'Pengintai Nirvana',     power: [1e12, 999e12],
    glyph: '涅', lore: 'Kau mulai mengintip rahasia Nirvana; batas antara hidup dan hancur menjadi kabur.' },
  { step: 11, name: 'Nirvana Cleanser',         cn: '涅净', weight: 1.5,   rarity: 'Legendary',    auraClass: 'aura-rainbow',     auraName: 'Aura Pelangi Spiritual', title: 'Pembersih Nirvana',     power: [1e12, 999e12],
    glyph: '净', lore: 'Kau membersihkan noda fana dari jiwamu, memurnikan diri dalam api Nirvana.' },
  { step: 12, name: 'Nirvana Shatterer',        cn: '涅碎', weight: 1,     rarity: 'Legendary',    auraClass: 'aura-rainbow',     auraName: 'Aura Pelangi Spiritual', title: 'Penghancur Nirvana',    power: [1e12, 999e12],
    glyph: '碎', lore: 'Kehancuran dan kelahiran kembali berada dalam satu pikiranmu.' },
  { step: 13, name: "Heaven's Blight",          cn: '天劫', weight: 0.7,   rarity: 'Mythic',       auraClass: 'aura-lightning',   auraName: 'Aura Petir Surgawi',     title: 'Saint',                 power: IMMEASURABLE,
    glyph: '劫', lore: 'Langit sendiri menganggapmu ancaman; petir surgawi turun untuk memusnahkanmu, namun kau bertahan.' },
  { step: 14, name: 'Void Tribulant',           cn: '虚劫', weight: 0.5,   rarity: 'Mythic',       auraClass: 'aura-void',        auraName: 'Aura Void',              title: 'Void Lord',             power: IMMEASURABLE,
    glyph: '虚', lore: 'Kau menaklukkan tribulasi kehampaan, berjalan di celah antara ruang dan ketiadaan.' },
  { step: 15, name: 'Arcane Void',              cn: '玄虚', weight: 0.3,   rarity: 'Mythic',       auraClass: 'aura-galaxy',      auraName: 'Aura Galaksi',           title: 'Dao Lord',              power: IMMEASURABLE,
    glyph: '玄', lore: 'Rahasia kehampaan purba terbuka bagimu; galaksi berputar mengikuti napasmu.' },
  { step: 16, name: 'Empty Nirvana',            cn: '空涅', weight: 0.1,   rarity: 'Mythic',       auraClass: 'aura-cosmic',      auraName: 'Aura Kosmik',            title: 'Ancient Dao Lord',      power: IMMEASURABLE,
    glyph: '空', lore: 'Kau mencapai kekosongan sempurna, wujud tanpa wujud, sunyi yang mengandung segala sesuatu.' },
  { step: 17, name: 'Heaven Trampling',         cn: '踏天', weight: 0.05,  rarity: 'Transcendent', auraClass: 'aura-heavendao',   auraName: 'Aura Dao Surgawi',       title: 'Heaven Trampler',       power: IMMEASURABLE,
    glyph: '踏', lore: 'Kau menginjak langit di bawah kakimu; hukum surgawi tak lagi mampu mengikatmu.' },
  { step: 18, name: 'Step Into Heaven',         cn: '入天', weight: 0.03,  rarity: 'Transcendent', auraClass: 'aura-emperor',     auraName: 'Aura Kaisar Langit',     title: 'Heaven Sovereign',      power: IMMEASURABLE,
    glyph: '入', lore: 'Kau melangkah masuk ke ranah surgawi sebagai penguasa, kaisar di antara para dewa.' },
  { step: 19, name: 'Third Step Cultivator',    cn: '三步', weight: 0.015, rarity: 'Transcendent', auraClass: 'aura-ancientdao',  auraName: 'Aura Ancient Dao',       title: 'Ancient Immortal',      power: IMMEASURABLE,
    glyph: '三', lore: 'Kau telah menapaki langkah ketiga Dao purba; keberadaanmu setua alam semesta itu sendiri.' },
  { step: 20, name: 'Fourth Step Cultivator',   cn: '四步', weight: 0.005, rarity: 'Transcendent', auraClass: 'aura-infinite',    auraName: 'Aura Transcendent Tak Terbatas', title: 'Transcendent Existence', power: IMMEASURABLE,
    glyph: '四', lore: 'Keberadaanmu telah melampaui hukum dunia dan Dao itu sendiri.' },
];

const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Transcendent'];
const RARITY_CLASS = {
  Common: 'rarity-common', Rare: 'rarity-rare', Epic: 'rarity-epic',
  Legendary: 'rarity-legendary', Mythic: 'rarity-mythic', Transcendent: 'rarity-transcendent',
};

const TOTAL_WEIGHT = REALMS.reduce((sum, r) => sum + r.weight, 0);

/* -------------------------------------------------
   2. UTILITIES
   ------------------------------------------------- */

/** Weighted random: memilih realm sesuai bobot probabilitas. */
function rollRealm() {
  let ticket = Math.random() * TOTAL_WEIGHT;
  for (const realm of REALMS) {
    ticket -= realm.weight;
    if (ticket <= 0) return realm;
  }
  return REALMS[0]; // fallback aman
}

/** Angka acak bilangan bulat inklusif. */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Format kekuatan spiritual → string yang enak dibaca (ID). */
function formatPower(realm) {
  if (realm.power === IMMEASURABLE) return IMMEASURABLE;
  const value = randInt(realm.power[0], realm.power[1]);
  return formatBigNumber(value);
}

/** Ubah angka besar menjadi "1,23 Triliun" dsb. */
function formatBigNumber(n) {
  const units = [
    { v: 1e15, s: 'Kuadriliun' },
    { v: 1e12, s: 'Triliun' },
    { v: 1e9,  s: 'Miliar' },
    { v: 1e6,  s: 'Juta' },
  ];
  for (const u of units) {
    if (n >= u.v) {
      const num = (n / u.v).toLocaleString('id-ID', { maximumFractionDigits: 2 });
      return `${num} ${u.s}`;
    }
  }
  return n.toLocaleString('id-ID');
}

/** Pemilihan acak dari array. */
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/** Generator nama kultivator gaya Xianxia. */
const SURNAMES = ['Wang', 'Li', 'Bai', 'Su', 'Han', 'Ye', 'Lin', 'Meng', 'Zhao', 'Xu', 'Chu', 'Nie', 'Yun', 'Gu', 'Mo', 'Feng'];
const GIVEN = ['Lin', 'Xuan', 'Chen', 'Yan', 'Fei', 'Tian', 'Hao', 'Jun', 'Wu', 'Yi', 'Long', 'Xue', 'Ming', 'Zhen', 'Kong', 'Ling'];
const EPITHETS = ['sang Abadi', 'Pembelah Langit', 'Tanpa Bayangan', 'Penjelajah Void', 'Pewaris Dao', 'Api Utara', 'Bintang Jatuh', 'Naga Rimba', 'Penakluk Tribulasi', 'Roh Kuno'];
function randomCultivatorName() {
  const base = `${pick(SURNAMES)} ${pick(GIVEN)}`;
  return Math.random() < 0.4 ? `${base}, ${pick(EPITHETS)}` : base;
}

/* -------------------------------------------------
   3. AUDIO MANAGER (aman tanpa file audio)
   ------------------------------------------------- */
const Audio5 = (() => {
  // Peta file audio (opsional). Website tetap berbunyi memakai sintesis
  // WebAudio meski file ini belum ada.
  const files = {
    click: 'assets/sounds/click.mp3',
    roll: 'assets/sounds/rolling.mp3',
    reveal: 'assets/sounds/reveal.mp3',
    legendary: 'assets/sounds/legendary.mp3',
    mythic: 'assets/sounds/mythic.mp3',
    transcendent: 'assets/sounds/transcendent.mp3',
  };

  // Setel true SETELAH menaruh file .mp3 di assets/sounds/.
  // Dibiarkan false agar tidak ada request 404 saat file belum tersedia —
  // suara tetap aktif lewat sintesis WebAudio (lihat fungsi beep).
  const USE_SOUND_FILES = false;

  const cache = {};
  let enabled = true;
  let ctx = null; // WebAudio fallback

  function preload() {
    if (!USE_SOUND_FILES) return; // pakai sintesis; jangan minta file
    for (const key in files) {
      try {
        const a = new Audio();
        a.src = files[key];
        a.preload = 'auto';
        a.volume = key === 'roll' ? 0.35 : 0.6;
        cache[key] = a;
      } catch (_) { /* abaikan */ }
    }
  }

  /** Fallback bunyi sintetis bila file audio tidak tersedia. */
  function beep(kind) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const tone = {
        click: [520, 0.05], roll: [220, 0.04], reveal: [660, 0.18],
        legendary: [880, 0.3], mythic: [990, 0.35], transcendent: [1240, 0.45],
      }[kind] || [440, 0.1];
      osc.type = kind === 'transcendent' || kind === 'mythic' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(tone[0], now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + tone[1]);
      osc.start(now);
      osc.stop(now + tone[1] + 0.02);
    } catch (_) { /* audio tidak didukung — abaikan */ }
  }

  function play(kind) {
    if (!enabled) return;
    const a = USE_SOUND_FILES ? cache[kind] : null;
    if (a && a.src) {
      try {
        a.currentTime = 0;
        const p = a.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => beep(kind)); // file hilang/diblokir → beep
        }
        return;
      } catch (_) { /* jatuh ke beep */ }
    }
    beep(kind);
  }

  function setEnabled(v) { enabled = v; }
  function isEnabled() { return enabled; }

  return { preload, play, setEnabled, isEnabled };
})();

/* -------------------------------------------------
   4. PERSISTENCE (localStorage) — statistik & riwayat
   ------------------------------------------------- */
const STORE_KEYS = { stats: 'ric_stats_v1', history: 'ric_history_v1', name: 'ric_name_v1', sound: 'ric_sound_v1' };

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* storage penuh/diblokir */ }
}

function defaultStats() {
  return {
    total: 0, highestStep: 0, highestName: '—',
    Common: 0, Rare: 0, Epic: 0, Legendary: 0, Mythic: 0, Transcendent: 0,
  };
}

let stats = loadJSON(STORE_KEYS.stats, defaultStats());
let history = loadJSON(STORE_KEYS.history, []);

/* -------------------------------------------------
   5. DOM REFERENCES
   ------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const el = {
  nameInput: $('cultivator-name'),
  randomName: $('random-name-btn'),
  cultivate: $('cultivate-btn'),
  stage: $('gacha-stage'),
  stageCircle: $('stage-circle'),
  stageRealm: $('stage-realm'),
  stageHint: $('stage-hint'),
  auraOrb: $('aura-orb'),
  resultSection: $('result-section'),
  resFlash: $('result-flash'),
  resRarity: $('res-rarity'),
  resStep: $('res-step'),
  resultEmblem: $('result-emblem'),
  resultAura: $('result-aura'),
  resultGlyph: $('result-glyph'),
  resCultivator: $('res-cultivator'),
  resRealm: $('res-realm'),
  resRealmCn: $('res-realm-cn'),
  resTitle: $('res-title'),
  resAuraName: $('res-aura-name'),
  resPower: $('res-power'),
  resLore: $('res-lore'),
  again: $('again-btn'),
  copy: $('copy-btn'),
  share: $('share-btn'),
  reset: $('reset-btn'),
  clearHistory: $('clear-history-btn'),
  historyList: $('history-list'),
  historyEmpty: $('history-empty'),
  globalFlash: $('global-flash'),
  toast: $('toast'),
  soundToggle: $('sound-toggle'),
  // share modal
  shareModal: $('share-modal'),
  shareBackdrop: $('share-backdrop'),
  shareClose: $('share-close'),
  shareImage: $('share-image'),
  shareNative: $('share-native-btn'),
  shareDownload: $('share-download-btn'),
  // stats
  stTotal: $('st-total'), stHighest: $('st-highest'),
  stCommon: $('st-common'), stRare: $('st-rare'), stEpic: $('st-epic'),
  stLegendary: $('st-legendary'), stMythic: $('st-mythic'), stTranscendent: $('st-transcendent'),
};

let rolling = false;
let lastResult = null;

/* -------------------------------------------------
   6. COSMIC BACKGROUND (canvas: bintang + partikel)
   ------------------------------------------------- */
(function cosmicBackground() {
  const canvas = $('cosmic-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars, particles, raf;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
    h = canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    build();
  }

  function build() {
    const count = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 * devicePixelRatio + 0.3,
      tw: Math.random() * Math.PI * 2,
      sp: 0.005 + Math.random() * 0.02,
    }));
    particles = Array.from({ length: Math.floor(count / 5) }, () => spawnParticle());
  }

  function spawnParticle() {
    const hue = pick([190, 210, 265, 45]); // cyan, blue, violet, gold
    return {
      x: Math.random() * w, y: h + Math.random() * h,
      r: Math.random() * 2.4 * devicePixelRatio + 0.6,
      vy: -(0.15 + Math.random() * 0.5) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
      hue, life: 0, max: 400 + Math.random() * 400,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    // stars twinkle
    for (const s of stars) {
      s.tw += s.sp;
      const a = 0.4 + Math.sin(s.tw) * 0.4;
      ctx.globalAlpha = Math.max(0.05, a);
      ctx.fillStyle = '#dbe7ff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // floating spiritual particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life++;
      const a = Math.sin((p.life / p.max) * Math.PI) * 0.7;
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = `hsl(${p.hue}, 90%, 70%)`;
      ctx.shadowBlur = 12; ctx.shadowColor = `hsl(${p.hue}, 90%, 70%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (p.life > p.max || p.y < -20) particles[i] = spawnParticle();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  if (!reduce) frame();
  else { // gambar sekali saja (statis) untuk reduced-motion
    ctx.fillStyle = '#dbe7ff';
    stars.forEach((s) => { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
  }

  // parallax ringan pada nebula mengikuti pointer
  window.addEventListener('pointermove', (e) => {
    if (reduce) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 20;
    const ny = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.nebula').forEach((n, i) => {
      const f = i === 0 ? 1 : -1;
      n.style.transform = `translate3d(${nx * f}px, ${ny * f}px, 0)`;
    });
  }, { passive: true });
})();

/* -------------------------------------------------
   7. GACHA FLOW
   ------------------------------------------------- */
function setAura(node, auraClass) {
  node.className = node.classList.contains('aura-orb--lg') ? 'aura-orb aura-orb--lg' : 'aura-orb';
  node.classList.add(auraClass);
}

function startCultivation() {
  if (rolling) return;
  rolling = true;

  const name = (el.nameInput.value || '').trim() || 'Kultivator Tanpa Nama';
  saveJSON(STORE_KEYS.name, name);

  el.cultivate.disabled = true;
  el.again.disabled = true;
  el.resultSection.classList.add('hidden');
  el.stage.classList.add('rolling');
  el.stageHint.textContent = 'Menyerap Qi Langit dan Bumi…';
  Audio5.play('roll');

  // Tentukan hasil akhir lebih dulu (weighted random).
  const finalRealm = rollRealm();

  const duration = 2000 + Math.random() * 1000; // 2–3 detik
  const start = performance.now();
  let nextTick = 0;

  function tick(now) {
    const elapsed = now - start;
    if (now >= nextTick) {
      const preview = pick(REALMS);
      el.stageRealm.textContent = preview.name;
      el.stageRealm.style.color = getComputedStyle(document.documentElement)
        .getPropertyValue('--rc-' + preview.rarity.toLowerCase()).trim() || '#fff';
      setAura(el.auraOrb, preview.auraClass);
      Audio5.play('roll');
      nextTick = now + (80 + Math.random() * 40); // 80–120 ms
    }
    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      finishCultivation(finalRealm, name);
    }
  }
  requestAnimationFrame(tick);
}

function finishCultivation(realm, name) {
  rolling = false;
  el.stage.classList.remove('rolling');
  el.stageRealm.textContent = realm.name;
  el.stageHint.textContent = 'Takdirmu telah tersingkap.';
  setAura(el.auraOrb, realm.auraClass);

  const power = formatPower(realm);
  const result = {
    name, step: realm.step, realm: realm.name, cn: realm.cn,
    rarity: realm.rarity, title: realm.title, auraName: realm.auraName,
    auraClass: realm.auraClass, glyph: realm.glyph, lore: realm.lore,
    power, time: Date.now(),
  };
  lastResult = result;

  revealResult(realm, result);
  recordStats(result);
  addHistory(result);

  el.cultivate.disabled = false;
  el.again.disabled = false;
}

function revealResult(realm, result) {
  // reveal sound berdasarkan rarity
  if (realm.rarity === 'Transcendent') Audio5.play('transcendent');
  else if (realm.rarity === 'Mythic') Audio5.play('mythic');
  else if (realm.rarity === 'Legendary') Audio5.play('legendary');
  else Audio5.play('reveal');

  // isi konten
  el.resCultivator.textContent = result.name;
  el.resRealm.textContent = result.realm;
  el.resRealmCn.textContent = result.cn;
  el.resTitle.textContent = result.title;
  el.resRarity.textContent = result.rarity;
  el.resStep.textContent = `Realm #${result.step} / 20`;
  el.resAuraName.textContent = result.auraName;
  el.resPower.textContent = result.power;
  el.resLore.textContent = `“${result.lore}”`;
  el.resultGlyph.textContent = result.glyph;
  setAura(el.resultAura, result.auraClass);

  // tema rarity
  const rc = RARITY_CLASS[result.rarity];
  el.resultSection.className = 'panel result ' + rc;
  el.resRarity.className = 'chip chip-rarity ' + rc;

  // tampilkan + animasi
  el.resultSection.classList.remove('hidden');
  void el.resultSection.offsetWidth; // reflow untuk restart animasi
  el.resultSection.classList.add('reveal');
  el.resultSection.addEventListener('animationend', function h() {
    el.resultSection.classList.remove('reveal');
    el.resultSection.removeEventListener('animationend', h);
  });

  // flash layar untuk rarity tinggi
  if (['Legendary', 'Mythic', 'Transcendent'].includes(result.rarity)) {
    el.globalFlash.classList.remove('fire');
    void el.globalFlash.offsetWidth;
    el.globalFlash.classList.add('fire');
  }

  spawnBurst(el.resultEmblem);
  el.resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** Ledakan partikel energi spiritual di sekitar emblem. */
function spawnBurst(container) {
  const burst = document.createElement('div');
  burst.className = 'burst';
  const n = 18;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    const angle = (Math.PI * 2 * i) / n;
    const dist = 70 + Math.random() * 90;
    s.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    s.style.animationDelay = Math.random() * 0.1 + 's';
    burst.appendChild(s);
  }
  container.appendChild(burst);
  setTimeout(() => burst.remove(), 1100);
}

/* -------------------------------------------------
   8. STATS & HISTORY
   ------------------------------------------------- */
function recordStats(result) {
  stats.total += 1;
  stats[result.rarity] = (stats[result.rarity] || 0) + 1;
  if (result.step > stats.highestStep) {
    stats.highestStep = result.step;
    stats.highestName = result.realm;
  }
  saveJSON(STORE_KEYS.stats, stats);
  renderStats();
}

function renderStats() {
  el.stTotal.textContent = stats.total.toLocaleString('id-ID');
  el.stHighest.textContent = stats.highestName || '—';
  el.stCommon.textContent = stats.Common || 0;
  el.stRare.textContent = stats.Rare || 0;
  el.stEpic.textContent = stats.Epic || 0;
  el.stLegendary.textContent = stats.Legendary || 0;
  el.stMythic.textContent = stats.Mythic || 0;
  el.stTranscendent.textContent = stats.Transcendent || 0;
}

function addHistory(result) {
  history.unshift({
    name: result.name, realm: result.realm, rarity: result.rarity,
    auraClass: result.auraClass, time: result.time,
  });
  history = history.slice(0, 10); // simpan 10 terakhir
  saveJSON(STORE_KEYS.history, history);
  renderHistory();
}

function timeAgo(ts) {
  const d = new Date(ts);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function rarityColorVar(rarity) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--rc-' + rarity.toLowerCase()).trim() || '#fff';
}

function renderHistory() {
  if (!history.length) {
    el.historyList.innerHTML = '<li class="history-empty" id="history-empty">Belum ada catatan Dao. Mulailah perjalananmu.</li>';
    return;
  }
  el.historyList.innerHTML = '';
  for (const h of history) {
    const color = rarityColorVar(h.rarity);
    const li = document.createElement('li');
    li.className = 'history-item';
    li.style.borderLeftColor = color;
    li.innerHTML = `
      <span class="hi-dot" style="background:${color};color:${color}"></span>
      <div class="hi-body">
        <div class="hi-name">${escapeHTML(h.name)}</div>
        <div class="hi-realm">${escapeHTML(h.realm)}</div>
      </div>
      <div class="hi-meta">
        <span class="hi-rarity" style="color:${color}">${h.rarity}</span>
        <span class="hi-time">${timeAgo(h.time)}</span>
      </div>`;
    el.historyList.appendChild(li);
  }
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/* -------------------------------------------------
   9. ACTIONS — copy, share, reset, clear
   ------------------------------------------------- */
function resultToText(r) {
  if (!r) return '';
  return [
    '⚔ Renegade Immortal — Cultivation Simulator ⚔',
    `Kultivator : ${r.name}`,
    `Realm      : ${r.realm} (${r.cn}) — Realm #${r.step}/20`,
    `Rarity     : ${r.rarity}`,
    `Gelar      : ${r.title}`,
    `Aura       : ${r.auraName}`,
    `Kekuatan   : ${r.power}`,
    `"${r.lore}"`,
  ].join('\n');
}

async function copyResult() {
  if (!lastResult) return toast('Belum ada hasil untuk disalin.');
  const text = resultToText(lastResult);
  try {
    await navigator.clipboard.writeText(text);
    toast('Hasil disalin ke papan klip.');
  } catch (_) {
    // fallback lawas
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Hasil disalin.'); }
    catch (e) { toast('Gagal menyalin hasil.'); }
    ta.remove();
  }
}

/* ---- Render kartu hasil menjadi gambar (Canvas) untuk dibagikan ---- */
const RARITY_HEX = {
  Common: '#7be08a', Rare: '#5aa2ff', Epic: '#c084fc',
  Legendary: '#ffcf5c', Mythic: '#ff6bd6', Transcendent: '#7ffcff',
};
const AURA_PAINT = {
  'aura-green':      { type: 'radial', stops: ['#ffffff', '#a6ffb0', '#2fbf5a'] },
  'aura-blue':       { type: 'radial', stops: ['#ffffff', '#bcd6ff', '#3f7cff'] },
  'aura-purple':     { type: 'radial', stops: ['#ffffff', '#e5c9ff', '#8b3ff0'] },
  'aura-gold':       { type: 'radial', stops: ['#ffffff', '#fff2c8', '#ffcf5c'] },
  'aura-red':        { type: 'radial', stops: ['#ffffff', '#ffc3c3', '#ff4d4d'] },
  'aura-white':      { type: 'radial', stops: ['#ffffff', '#ffffff', '#cfe0ff'] },
  'aura-cyan':       { type: 'radial', stops: ['#ffffff', '#c8fbff', '#22d3ee'] },
  'aura-yinviolet':  { type: 'radial', stops: ['#b98bff', '#3a1b6b', '#05030a'] },
  'aura-brightgold': { type: 'radial', stops: ['#ffffff', '#ffd777', '#b8860b'] },
  'aura-rainbow':    { type: 'conic',  stops: ['#ff5c8a', '#ffd45c', '#7bff9b', '#5ce1ff', '#a17bff', '#ff5c8a'] },
  'aura-lightning':  { type: 'radial', stops: ['#ffffff', '#a9e5ff', '#2b3ff0'] },
  'aura-void':       { type: 'radial', stops: ['#2a0b4a', '#0a0316', '#000000'] },
  'aura-galaxy':     { type: 'conic',  stops: ['#1b1040', '#6d28d9', '#22d3ee', '#1b1040'] },
  'aura-cosmic':     { type: 'radial', stops: ['#ffffff', '#a78bfa', '#3b0764'] },
  'aura-heavendao':  { type: 'conic',  stops: ['#fff7d6', '#ffd777', '#67e8f9', '#ffffff', '#ffd777'] },
  'aura-emperor':    { type: 'radial', stops: ['#ffffff', '#ffe08a', '#ff8a3c'] },
  'aura-ancientdao': { type: 'conic',  stops: ['#0a0a1a', '#ffd777', '#67e8f9', '#a78bfa', '#0a0a1a'] },
  'aura-infinite':   { type: 'conic',  stops: ['#ffffff', '#ffd777', '#ff6bd6', '#7ffcff', '#a78bfa', '#ffffff'] },
};

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function paintAura(ctx, cx, cy, r, auraClass) {
  const cfg = AURA_PAINT[auraClass] || AURA_PAINT['aura-white'];
  ctx.save();
  try { ctx.filter = 'blur(18px)'; } catch (_) { /* filter tak didukung */ }
  let grad;
  if (cfg.type === 'conic' && typeof ctx.createConicGradient === 'function') {
    grad = ctx.createConicGradient(0, cx, cy);
    cfg.stops.forEach((c, i) => grad.addColorStop(i / (cfg.stops.length - 1), c));
  } else {
    grad = ctx.createRadialGradient(cx - r * 0.18, cy - r * 0.18, r * 0.08, cx, cy, r);
    cfg.stops.forEach((c, i) => grad.addColorStop(Math.min(1, i / (cfg.stops.length - 1)), c));
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      line = words[i];
      y += lineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
  return y;
}

async function buildResultCanvas(r) {
  const W = 1080, H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const rc = RARITY_HEX[r.rarity] || '#ffffff';

  try {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('900 64px Cinzel'),
      document.fonts.load('700 40px Rajdhani'),
      document.fonts.load('900 120px "Noto Serif SC"'),
    ]);
  } catch (_) { /* pakai font sistem */ }

  // background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0a0a1a'); bg.addColorStop(1, '#05060f');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, H * 0.34, 0, W / 2, H * 0.34, W * 0.72);
  glow.addColorStop(0, hexA(rc, 0.22)); glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  // stars
  ctx.fillStyle = '#dbe7ff';
  for (let i = 0; i < 90; i++) {
    ctx.globalAlpha = 0.15 + Math.random() * 0.5;
    const sx = Math.random() * W, sy = Math.random() * H, sr = Math.random() * 2 + 0.4;
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // frame
  ctx.strokeStyle = hexA(rc, 0.55);
  ctx.lineWidth = 3;
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(36, 36, W - 72, H - 72, 40); ctx.stroke(); }

  // header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd777';
  ctx.font = '900 54px Cinzel, serif';
  ctx.fillText('RENEGADE IMMORTAL', W / 2, 150);
  ctx.fillStyle = '#67e8f9';
  ctx.font = '600 26px Rajdhani, sans-serif';
  ctx.fillText('仙 逆 · CULTIVATION SIMULATOR', W / 2, 196);

  // aura orb + rings
  const cx = W / 2, cy = 470, R = 200;
  paintAura(ctx, cx, cy, R, r.auraClass);
  ctx.save();
  ctx.strokeStyle = hexA('#ffd777', 0.8); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(cx, cy, R + 40, -0.6, 2.0); ctx.stroke();
  ctx.strokeStyle = hexA('#67e8f9', 0.7); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, R + 66, 1.4, 4.2); ctx.stroke();
  ctx.restore();
  // glyph
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 150px "Noto Serif SC", serif';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = rc; ctx.shadowBlur = 40;
  ctx.fillText(r.glyph, cx, cy + 6);
  ctx.shadowBlur = 0;
  ctx.textBaseline = 'alphabetic';

  // rarity chip
  ctx.font = '700 30px Rajdhani, sans-serif';
  const chip = r.rarity.toUpperCase();
  const cw = ctx.measureText(chip).width + 60;
  const chx = W / 2 - cw / 2, chy = 726;
  ctx.strokeStyle = rc; ctx.lineWidth = 2; ctx.fillStyle = hexA(rc, 0.12);
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(chx, chy, cw, 52, 26); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = rc;
  ctx.fillText(chip, W / 2, chy + 36);

  // cultivator + realm
  ctx.fillStyle = '#9fb0d6';
  ctx.font = '600 30px Rajdhani, sans-serif';
  ctx.fillText(r.name.toUpperCase(), W / 2, 838);
  ctx.fillStyle = rc;
  ctx.font = '900 76px Cinzel, serif';
  ctx.shadowColor = hexA(rc, 0.6); ctx.shadowBlur = 24;
  ctx.fillText(r.realm, W / 2, 918);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#67e8f9';
  ctx.font = '700 34px "Noto Serif SC", serif';
  ctx.fillText(`${r.cn}  ·  ${r.title}`, W / 2, 968);

  // stats: aura & power
  ctx.font = '600 26px Rajdhani, sans-serif';
  ctx.fillStyle = '#6a7aa8';
  ctx.fillText('AURA', W * 0.3, 1050);
  ctx.fillText('KEKUATAN SPIRITUAL', W * 0.7, 1050);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 32px Rajdhani, sans-serif';
  ctx.fillText(r.auraName, W * 0.3, 1092);
  ctx.fillText(r.power, W * 0.7, 1092);

  // lore
  ctx.fillStyle = '#c3cef0';
  ctx.font = 'italic 30px Rajdhani, sans-serif';
  wrapText(ctx, `“${r.lore}”`, W / 2, 1176, W - 220, 40);

  // footer
  ctx.fillStyle = '#6a7aa8';
  ctx.font = '600 24px Rajdhani, sans-serif';
  ctx.fillText('Dibuat oleh r1k0x7 · Terinspirasi Renegade Immortal (仙逆)', W / 2, H - 70);

  return canvas;
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/* State berbagi: menyimpan gambar yang sedang dipratinjau di modal. */
let shareState = { url: null, file: null, text: '' };

function openShareModal() {
  el.shareModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  el.shareClose.focus();
}

function closeShareModal() {
  el.shareModal.classList.add('hidden');
  document.body.style.overflow = '';
  if (shareState.url) { URL.revokeObjectURL(shareState.url); shareState.url = null; }
}

async function shareResult() {
  if (!lastResult) return toast('Belum ada hasil untuk dibagikan.');
  const text = resultToText(lastResult);
  toast('Menyiapkan gambar hasil…');

  let blob = null;
  try {
    const canvas = await buildResultCanvas(lastResult);
    blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  } catch (_) { blob = null; }

  // Jika gambar gagal dibuat → jatuh ke berbagi/salin teks.
  if (!blob) {
    if (navigator.share) {
      try { await navigator.share({ title: 'Renegade Immortal Cultivation', text, url: location.href }); return; }
      catch (_) { /* dibatalkan */ }
    }
    await copyResult();
    toast('Tak dapat membuat gambar — hasil disalin sebagai teks.');
    return;
  }

  // Tampilkan gambar di modal pratinjau.
  if (shareState.url) URL.revokeObjectURL(shareState.url);
  const url = URL.createObjectURL(blob);
  const file = new File([blob], `kultivasi-${slug(lastResult.realm)}.png`, { type: 'image/png' });
  shareState = { url, file, text };
  el.shareImage.src = url;

  // Tombol "Bagikan" hanya bila perangkat mendukung berbagi berkas.
  const canShareFile = !!(navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share);
  el.shareNative.classList.toggle('hidden', !canShareFile);

  openShareModal();
}

async function doNativeShare() {
  if (!shareState.file) return;
  try {
    await navigator.share({ files: [shareState.file], title: 'Renegade Immortal Cultivation', text: shareState.text });
  } catch (e) {
    if (!(e && e.name === 'AbortError')) toast('Berbagi dibatalkan.');
  }
}

function doDownloadShare() {
  if (!shareState.file) return;
  downloadBlob(shareState.file, shareState.file.name);
  toast('Gambar hasil diunduh.');
}

function resetAll() {
  if (!confirm('Reset seluruh statistik, riwayat, dan hasil? Tindakan ini tidak dapat dibatalkan.')) return;
  stats = defaultStats();
  history = [];
  lastResult = null;
  saveJSON(STORE_KEYS.stats, stats);
  saveJSON(STORE_KEYS.history, history);
  renderStats();
  renderHistory();
  el.resultSection.classList.add('hidden');
  el.stageRealm.textContent = '?';
  el.stageRealm.style.color = '#fff';
  el.auraOrb.className = 'aura-orb';
  el.stageHint.textContent = 'Pusatkan pikiranmu, lalu mulai kultivasi.';
  toast('Semua data telah direset.');
}

function clearHistory() {
  if (!history.length) return toast('Riwayat sudah kosong.');
  if (!confirm('Hapus seluruh riwayat kultivasi?')) return;
  history = [];
  saveJSON(STORE_KEYS.history, history);
  renderHistory();
  toast('Riwayat dihapus.');
}

/* -------------------------------------------------
   10. TOAST
   ------------------------------------------------- */
let toastTimer = null;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 2600);
}

/* -------------------------------------------------
   11. EVENT WIRING & INIT
   ------------------------------------------------- */
function bindEvents() {
  el.cultivate.addEventListener('click', () => { Audio5.play('click'); startCultivation(); });
  el.again.addEventListener('click', () => { Audio5.play('click'); startCultivation(); });
  el.randomName.addEventListener('click', () => {
    Audio5.play('click');
    el.nameInput.value = randomCultivatorName();
    saveJSON(STORE_KEYS.name, el.nameInput.value);
  });
  el.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') startCultivation(); });
  el.copy.addEventListener('click', () => { Audio5.play('click'); copyResult(); });
  el.share.addEventListener('click', () => { Audio5.play('click'); shareResult(); });
  el.reset.addEventListener('click', () => { Audio5.play('click'); resetAll(); });
  el.clearHistory.addEventListener('click', () => { Audio5.play('click'); clearHistory(); });

  // share modal
  el.shareClose.addEventListener('click', () => { Audio5.play('click'); closeShareModal(); });
  el.shareBackdrop.addEventListener('click', closeShareModal);
  el.shareNative.addEventListener('click', () => { Audio5.play('click'); doNativeShare(); });
  el.shareDownload.addEventListener('click', () => { Audio5.play('click'); doDownloadShare(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !el.shareModal.classList.contains('hidden')) closeShareModal();
  });

  el.soundToggle.addEventListener('click', () => {
    const next = !Audio5.isEnabled();
    Audio5.setEnabled(next);
    saveJSON(STORE_KEYS.sound, next);
    el.soundToggle.setAttribute('aria-pressed', String(next));
    el.soundToggle.textContent = next ? '🔊 Suara: Aktif' : '🔇 Suara: Mati';
    if (next) Audio5.play('click');
  });
}

function init() {
  Audio5.preload();
  bindEvents();

  // pulihkan preferensi
  const savedName = loadJSON(STORE_KEYS.name, '');
  if (savedName) el.nameInput.value = savedName;
  const savedSound = loadJSON(STORE_KEYS.sound, true);
  Audio5.setEnabled(savedSound);
  el.soundToggle.setAttribute('aria-pressed', String(savedSound));
  el.soundToggle.textContent = savedSound ? '🔊 Suara: Aktif' : '🔇 Suara: Mati';

  renderStats();
  renderHistory();
}

document.addEventListener('DOMContentLoaded', init);
