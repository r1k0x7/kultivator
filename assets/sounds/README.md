# Sounds

Letakkan file audio berikut di folder ini (opsional). Jika file **tidak ada**,
website tetap berjalan tanpa error — `script.js` otomatis memakai bunyi
sintetis (WebAudio) sebagai cadangan.

| File | Dimainkan saat |
|------|----------------|
| `click.mp3` | menekan tombol |
| `rolling.mp3` | animasi gacha berputar |
| `reveal.mp3` | hasil biasa muncul |
| `legendary.mp3` | hasil rarity **Legendary** |
| `mythic.mp3` | hasil rarity **Mythic** |
| `transcendent.mp3` | hasil rarity **Transcendent** |

Format yang disarankan: `.mp3` (kompatibel di semua browser modern).

## Mengaktifkan file audio

Secara bawaan website memakai **bunyi sintetis** (WebAudio) agar tidak ada
request 404 ketika file belum ada. Setelah menaruh file `.mp3` di folder ini,
buka `script.js`, cari `USE_SOUND_FILES`, lalu ubah menjadi:

```js
const USE_SOUND_FILES = true;
```

File yang hilang tetap otomatis jatuh kembali ke bunyi sintetis.
