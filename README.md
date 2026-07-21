# 仙逆 · Renegade Immortal — Cultivation Simulator

Simulator **gacha kultivasi** bertema *Renegade Immortal (Xian Ni)*. Masukkan
namamu, tarik takdir Dao-mu, dan singkap **realm, gelar, aura, rarity, dan
kekuatan spiritual** dari 20 tingkat kultivasi — lengkap dengan efek visual
sinematik ala donghua Xianxia kelas premium.

Dibangun **100% dengan HTML5, CSS3, dan Vanilla JavaScript** — tanpa framework,
tanpa build step. Siap di-deploy ke Vercel tanpa modifikasi tambahan.

---

## ✨ Fitur

- **Weighted random** 20 realm dengan probabilitas presisi (0,005%–20%).
- **6 tingkat rarity**: Common, Rare, Epic, Legendary, Mythic, Transcendent.
- **Sistem aura** — 18 gaya aura beranimasi (hijau, emas, pelangi spiritual,
  petir surgawi, void, galaksi, kosmik, transcendent tak terbatas, dll).
- **Sistem gelar & kekuatan** per realm (hingga "Tidak Terukur").
- **Lore unik** untuk setiap realm.
- **Animasi gacha** sinematik: realm berganti tiap 80–120 ms, shake, aura
  berkedip, lingkaran Dao berputar, lalu flash + burst energi saat reveal.
- **Latar kosmik** dari `<canvas>`: bintang berkelip, partikel spiritual
  mengambang, nebula parallax, dan rune melayang.
- **Statistik & riwayat** tersimpan di `localStorage` (10 hasil terakhir).
- **Tombol**: Mulai/Kultivasi Lagi, Acak Nama, Salin, Bagikan, Reset, Hapus Riwayat.
- **Audio** dengan cadangan sintetis — tetap jalan walau file audio belum ada.
- **PWA** (installable) + **SEO** (Open Graph, Twitter Card, canonical, favicon).
- **Responsif** penuh dan menghormati `prefers-reduced-motion`.

---

## 📁 Struktur Folder

```
kultivator/
├── index.html          # Markup + meta SEO + PWA
├── style.css           # Tema Xianxia, glassmorphism, animasi & aura
├── script.js           # Logika gacha, weighted random, localStorage, audio
├── vercel.json         # { "cleanUrls": true }
├── manifest.json       # Manifest PWA
├── README.md
└── assets/
    ├── images/
    │   └── og-image.svg     # Gambar Open Graph / Twitter Card
    ├── sounds/              # (opsional) click, rolling, reveal, legendary…
    ├── icons/
    │   ├── favicon.svg
    │   ├── icon-192.svg
    │   └── icon-512.svg
    └── particles/           # partikel prosedural (canvas/CSS)
```

> Catatan: file website ditempatkan di **root** repositori agar Vercel dapat
> mendeteksi dan mendeploy sebagai situs statis **tanpa konfigurasi tambahan**.

---

## 🔮 Sistem Kultivasi (20 Realm)

| # | Realm | Rarity | Peluang | Gelar |
|---|-------|--------|--------:|-------|
| 1 | Condensation (凝气) | Common | 20% | Murid Luar Sekte |
| 2 | Foundation Establishment (筑基) | Common | 18% | Murid Inti |
| 3 | Core Formation (结丹) | Common | 15% | Tetua Junior |
| 4 | Nascent Soul (婴变) | Rare | 12% | Tetua |
| 5 | Soul Formation (化神) | Rare | 10% | Grand Elder |
| 6 | Spirit Transformation (灵变) | Rare | 8% | Penguasa Wilayah |
| 7 | Ascendant (登仙) | Epic | 5% | Raja Kultivator |
| 8 | Illusory Yin (虚阴) | Epic | 3% | Pengendali Yin |
| 9 | Corporeal Yang (实阳) | Epic | 2% | Pengendali Yang |
| 10 | Nirvana Scryer (涅窥) | Legendary | 1,8% | Pengintai Nirvana |
| 11 | Nirvana Cleanser (涅净) | Legendary | 1,5% | Pembersih Nirvana |
| 12 | Nirvana Shatterer (涅碎) | Legendary | 1% | Penghancur Nirvana |
| 13 | Heaven's Blight (天劫) | Mythic | 0,7% | Saint |
| 14 | Void Tribulant (虚劫) | Mythic | 0,5% | Void Lord |
| 15 | Arcane Void (玄虚) | Mythic | 0,3% | Dao Lord |
| 16 | Empty Nirvana (空涅) | Mythic | 0,1% | Ancient Dao Lord |
| 17 | Heaven Trampling (踏天) | Transcendent | 0,05% | Heaven Trampler |
| 18 | Step Into Heaven (入天) | Transcendent | 0,03% | Heaven Sovereign |
| 19 | Third Step Cultivator (三步) | Transcendent | 0,015% | Ancient Immortal |
| 20 | Fourth Step Cultivator (四步) | Transcendent | 0,005% | Transcendent Existence |

Weighted random dinormalisasi terhadap total bobot, sehingga distribusi tetap
benar meski jumlah bobot tidak persis 100.

---

## 🚀 Menjalankan Secara Lokal

Karena murni statis, cukup buka `index.html`. Untuk pengalaman terbaik
(agar `fetch`/PWA/audio berperilaku seperti produksi), jalankan server lokal:

```bash
# Python 3
python3 -m http.server 5173

# atau Node
npx serve .
```

Lalu buka `http://localhost:5173`.

---

## 📦 Deploy ke GitHub

```bash
# 1. Inisialisasi (lewati jika repo sudah ada)
git init
git add .
git commit -m "feat: Renegade Immortal cultivation simulator"

# 2. Hubungkan ke remote GitHub
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git

# 3. Push
git push -u origin main
```

---

## ▲ Deploy ke Vercel

**Cara 1 — Dashboard (paling mudah):**
1. Masuk ke [vercel.com](https://vercel.com) → **Add New… → Project**.
2. **Import** repositori GitHub ini.
3. Framework Preset: **Other** (situs statis). *Root Directory* biarkan `./`.
4. Klik **Deploy**. Selesai — `vercel.json` sudah mengaktifkan `cleanUrls`.

**Cara 2 — Vercel CLI:**
```bash
npm i -g vercel
vercel        # deploy preview
vercel --prod # deploy produksi
```

Setelah live, perbarui URL `canonical` dan `og:url` di `index.html` +
`start_url` di `manifest.json` bila domain berbeda.

---

## 🎧 Menambahkan Audio (opsional)

Letakkan file `.mp3` di `assets/sounds/` sesuai daftar pada
`assets/sounds/README.md`. Tanpa file pun website tetap bersuara berkat bunyi
sintetis WebAudio bawaan.

---

## 🛠️ Teknologi

HTML5 · CSS3 (glassmorphism, keyframes, conic/radial gradient, backdrop-filter)
· Vanilla JavaScript (Canvas 2D, WebAudio, localStorage, Web Share/Clipboard).

Tanpa React/Vue/Angular/jQuery/Bootstrap/Tailwind atau framework apa pun.

---

## ⚖️ Lisensi & Atribusi

Proyek penggemar untuk hiburan. *Renegade Immortal (仙逆)* dan nama-nama terkait
adalah milik pemegang hak cipta masing-masing. Bukan produk resmi.
