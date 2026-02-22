# 📄 Front_Card.html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Front_Card.html** ay responsable sa pagpapakita at pag-download ng **harap na bahagi ng report card** ng bawat estudyante. Gumagamit ito ng `html2canvas` at `jsPDF` para i-convert ang HTML card sa isang PDF file na puwedeng i-print o i-download.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

| Seksyon | Paliwanag |
|---|---|
| **Student Dropdown** | Listahan ng lahat ng estudyante (lalaki at babae), pagsamahin at sorted alphabetically |
| **Card Preview** | Live preview ng front card — nag-a-update agad kapag pumili ng ibang estudyante |
| **Download Current Card** | Nagda-download ng PDF para sa isang estudyante lang |
| **Download All Cards** | Nagge-generate ng isang malaking PDF na may lahat ng estudyante |
| **Print Card** | Nagbubukas ng print dialog ng browser |
| **Progress Overlay** | Lumalabas kapag nag-download ng lahat ng cards; may progress bar at Cancel button |

---

## 🔁 Workflow: Paano Gumagana ang Page

```
Load Page
   ↓
Basahin ang localStorage ("CardGen")
   ↓
I-load ang lahat ng estudyante (boys + girls)
   ↓
I-populate ang Dropdown
   ↓
Pumili ng Estudyante
   ↓
updateCard(student) → Ipakita ang impormasyon sa card template
fillMonthlyAttendance(student) → Ipunan ang attendance data
loadSignaturesToCard() → I-load ang pirma mula sa IndexedDB
   ↓
Download / Print
```

---

## ⚙️ Mga Pangunahing Function

### `updateCard(student)`
- **Ginagawa:** Pinupunan ang lahat ng text fields sa card template gamit ang data ng estudyante
- **Kabilang ang:** Pangalan, edad, track, strand, LRN, pangalan ng magulang, adviser, principal, school year
- **Helper:** `set(id, val)` — isang maliit na function para i-set ang `textContent` ng isang element

### `fillMonthlyAttendance(student)`
- **Ginagawa:** Pinupunan ang bawat buwan na kolumna sa attendance section ng card
- **Logic:** Loop mula month1 hanggang month12; kinukuha ang `schoolDays`, `present`, at `absent` mula sa `student.monthlyAttendance`
- **Total:** Kinakalkula at inilalagay ang kabuuan ng school days, present, at absent

### `scaleCard()`
- **Ginagawa:** Ina-adjust ang laki ng card preview para magkasya sa screen
- **Formula:** `scale = wrapper.clientWidth / card.offsetWidth` — kapag maliit ang screen, mag-s-shrink ang card
- **Pwedeng baguhin:** Ang `Math.min(..., 1)` ay nag-e-ensure na hindi lalampas sa 1x (hindi mag-z-zoom in)

### `fitTextToWrapper(textElement, maxWidth)`
- **Ginagawa:** Binabawasan ang font size ng pangalan kapag masyadong mahaba para sa available na espasyo
- **Algorithm:** Binary search — sumusubok ng iba't ibang font sizes para mahanap ang pinakamalaking fit
- **Hangganan:** Minimum font size ay 5px; maximum ay ang orihinal na font size

### `adjustAllNameSizes()`
- **Ginagawa:** Tinatawagan ang `fitTextToWrapper()` para sa lahat ng text fields na may pangalan (student, parent, adviser, principal)
- **Bakit kailangan:** Para hindi maputol ang mahabang pangalan sa printed card

### `adjustTrackStrandDisplay()`
- **Ginagawa:** Tinitingnan kung may laman ang Track at Strand fields; kapag magkasama nilang isusulat ay masyadong mahaba, pinagsasama sila sa isang element

### `loadSignaturesToCard()`
- **Ginagawa:** Kumukuha ng pirma (teacher at principal) mula sa IndexedDB at inilalagay sa `<img>` tags sa card
- **IndexedDB:** DB Name = `CardGenSignatures`, Object Store = `signatures`, Keys = `'teacher'` at `'principal'`

### `captureCard()`
- **Ginagawa:** Gumagamit ng `html2canvas` para i-screenshot ang HTML card element
- **Settings:** `scale: 3` (high resolution), `useCORS: true` (para sa images), `logging: false`
- **Output:** Base64 JPEG image string (95% quality)

### `downloadSinglePDF()`
- **Ginagawa:** Ina-capture ang current card gamit ang `captureCard()` at sini-save bilang PDF
- **PDF Settings:** Landscape orientation, Letter format (279.4mm x 215.9mm)
- **Filename:** `[PANGALAN NG ESTUDYANTE]_front_card.pdf`

### `downloadAllPDFs()`
- **Ginagawa:** Naglo-loop sa lahat ng estudyante, ina-update ang card para sa bawat isa, at nag-a-add ng page sa iisang malaking PDF
- **Progress:** Ina-update ang progress bar habang gumagawa (`updateProgress(percent, message)`)
- **Abort:** Gumagamit ng `AbortController` para makapag-cancel ng generation sa gitna ng proseso
- **Filename:** `All_Students_Front_Card.pdf`

---

## 🗂️ Data Structure na Ginagamit

Ang data ay kinukuha mula sa `localStorage` key na `"CardGen"`:

```json
{
  "information": {
    "track": "TVL",
    "strand": "ICT",
    "schoolYear": "2024-2025",
    "adviser": "JUAN DELA CRUZ",
    "principal": "MARIA SANTOS",
    "grade": "11"
  },
  "students": {
    "boys": {
      "PEDRO REYES": {
        "name": "PEDRO REYES",
        "age": "17",
        "lrn": "123456789012",
        "parent": "JOSE REYES",
        "monthlyAttendance": {
          "schoolDays": { "month1": 20, "month2": 18 },
          "present": { "month1": 19, "month2": 18 },
          "absent": { "month1": 1, "month2": 0 },
          "total": { "month1": 20 }
        }
      }
    },
    "girls": { ... }
  }
}
```

---

## 🎨 CSS at Layout na Pwedeng Baguhin

| CSS Property | Lokasyon | Paliwanag |
|---|---|---|
| `#printableCard width/height` | `<style>` sa `<head>` | Sukat ng card — **huwag baguhin** maliban kung binago ang template image |
| `.overlay-text` positions | `<style>` | Exact positions ng bawat text overlay sa card image |
| `#month1wrapper` hanggang `#month12wrapper` | `<style>` | Horizontal positions ng bawat buwan sa attendance row |
| `scale: 3` sa `captureCard()` | JavaScript | Resolution ng PDF — mas mataas = mas malinaw pero mas mabagal |

> ⚠️ **Babala:** Ang mga `left` at `top` pixel values sa `.overlay-text` wrappers ay nakatutok sa front card template image. Kapag pinalitan ang template, kailangang i-adjust ang lahat ng positions.

---

## 📦 External Libraries na Ginagamit

| Library | CDN | Purpose |
|---|---|---|
| `html2canvas` v1.4.1 | cdnjs.cloudflare.com | I-convert ang HTML element sa canvas/image |
| `jsPDF` v2.5.1 | cdnjs.cloudflare.com | Gumawa ng PDF file mula sa image |
| `Bootstrap` v5.3.3 | jsdelivr.net | UI at layout |

---

## 🔴 Progress Overlay at Cancel

Kapag pinindot ang **Download All Cards**:

1. Lumalabas ang dark overlay na may progress bar
2. Gumagawa ng `AbortController` → `abortController = new AbortController()`
3. Sa bawat estudyante, tinitingnan kung `signal.aborted === true` bago magpatuloy
4. Kapag pinindot ang **Cancel**: `abortController.abort()` → Titigil ang generation → Ise-save ang natapos na pages bilang partial PDF

---

## ❓ FAQ

**Q: Bakit blangko ang card kahit may data na?**
A: Siguraduhing na-save ang data sa Student Information page muna. Pindutin ang F5 para i-refresh.

**Q: Hindi lumalabas ang pirma sa downloaded PDF?**
A: Buksan muna ang Student Information page at i-upload ulit ang pirma. Naka-store ito sa IndexedDB na maaaring ma-clear ng browser.

**Q: Bakit mabagal ang Download All Cards?**
A: Ang `html2canvas` ay kailangang i-render ang bawat card nang isa-isa. Normal ito para sa maraming estudyante. Pwedeng bawasan ang `scale` sa `captureCard()` mula `3` papunta `2` para mas mabilis, pero magiging mas maliit ang resolution.

**Q: Paano ko malalaman kung ilang estudyante ang tapos na?**
A: Makikita sa progress bar at sa message sa ibaba nito, e.g., "Processing: PEDRO REYES (3 of 25)".

---

## 🛠️ Tips para sa Developer

- Ang `generationInProgress` flag ay ginagamit para pigilan ang double-click sa Download All button
- Ang `allStudents` array ay pinagsama-sama mula sa `boys` at `girls` objects, sorted A-Z
- Ang `window.downloadSinglePDF` at `window.downloadAllPDFs` ay explicitly attached sa `window` object para ma-access ng mga `onclick` attributes sa HTML
- Kung gusto mong palakihin ang preview ng card sa screen, hanapin ang `scaleCard()` at alisin ang `Math.min(..., 1)` para mapayagan ang zoom-in
