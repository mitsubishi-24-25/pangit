# 📄 Temporary_Card.html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Temporary_Card.html** ay isang espesyal na pahina para sa pag-print ng **temporary report cards** na nakalagay nang **4 cards sa isang page** (2×2 layout). Dinisenyo ito para sa mabilis na pag-print ng preliminary grades bago pa mailabas ang pormal na report card. Gumagamit ng **checkbox selection system** kung saan pumipili ka ng hanggang 4 estudyante nang sabay-sabay.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

| Seksyon | Paliwanag |
|---|---|
| **Student Selection Checkboxes** | Listahan ng lahat ng estudyante na may checkbox sa tabi ng bawat isa |
| **Card Preview Area** | Nagpapakita ng 2×2 layout na may hanggang 4 cards |
| **Download Current Page** | I-download ang kasalukuyang 4-card layout bilang PDF |
| **Download All Cards** | Awtomatikong magge-generate ng lahat ng pages para sa lahat ng estudyante |
| **Print Card** | Print dialog ng browser |

---

## ☑️ Checkbox Selection System

### Paano Pumili ng Estudyante

1. Makikita ang lahat ng estudyante (boys at girls) bilang mga checkbox sa **Student Selection** panel
2. **Mag-check ng hanggang 4 estudyante** — kapag 5 na ang niche-check, lalabas ang babala: *"Maximum 4 students selectable."*
3. Kapag pumili ng 1-4 estudyante, awtomatiko itong lalabas sa card preview
4. Ang mga blangko na card slot (kung hindi 4 ang pinili) ay nagiging **empty/blank** sa preview

### Key Logic
```javascript
function updateSelected(e) {
    const checks = [...document.querySelectorAll('.student-check:checked')];
    
    // Pigilan ang higit sa 4 selections
    if (checks.length > 4) {
        showToast("Maximum 4 students selectable.", "warning");
        e.target.checked = false;
        return;
    }
    
    const selectedStudents = checks.map(c => allStudents.find(s => s.name === c.value));
    
    // I-update ang 4 card slots (null para sa walang laman)
    for (let i = 0; i < 4; i++) {
        const student = selectedStudents[i] || null;
        updateBackCard(i, student);
    }
}
```

---

## 📐 2×2 Layout: Paano Nakaposisyon ang Cards

Ang 4 cards ay nakaayos sa isang **2 columns × 2 rows** na grid:

```
┌─────────────────┬─────────────────┐
│    Card Slot 0  │    Card Slot 1  │
│   (Student 1)   │   (Student 2)   │
├─────────────────┼─────────────────┤
│    Card Slot 2  │    Card Slot 3  │
│   (Student 3)   │   (Student 4)   │
└─────────────────┴─────────────────┘
```

- **Scale:** Bawat card ay naka-scale sa **50%** ng original size para magkasya ang 4 sa iisang page
- **Orientation:** Landscape (katulad ng regular na report card)
- **Template:** Gumagamit ng `Back_Card_Template 2.0.html` style na layout

---

## 🔁 Download All Cards — Paano Gumagana

Kapag pinindot ang **Download All Cards**:

1. Kinukuha ang lahat ng estudyante (boys + girls, sorted A-Z)
2. Hinahati sa mga group ng 4 (`chunk size = 4`)
3. Para sa bawat group:
   - Ine-update ang 4 card slots gamit ang estudyante sa group
   - Ina-capture ang buong 2×2 layout gamit ang `html2canvas`
   - Idinadadag bilang isang page sa PDF
4. Kapag tapos na lahat ng groups, ise-save ang PDF
5. **Filename:** `All_Students_Temporary_Cards.pdf`

> 💡 Halimbawa: Kung may 25 estudyante, magkakaroon ng 7 pages sa PDF (6 full pages + 1 page na may 1 estudyante lang at 3 blankong slots).

---

## ✍️ Teacher Signature

- Gumagamit ng **IndexedDB** para i-load ang naka-save na pirma ng guro
- **DB Name:** `CardGenSignatures`
- **Key:** `'teacher'`
- Ang pirma ay ilalagay sa lahat ng 4 card slots sa bawat page

### `applyTeacherSignature(container)`
```javascript
function applyTeacherSignature(container) {
    if (!teacherSignatureDataURL) return;
    const imgs = container.querySelectorAll(".teacherSignatureImg");
    imgs.forEach(img => {
        img.src = teacherSignatureDataURL;
        img.style.display = 'block';
    });
}
```

### `preloadTeacherSignature()`
- Tinatawag sa page load para i-pre-load ang pirma bago pa man pumili ng estudyante
- Nag-iimbak ng pirma bilang DataURL sa `teacherSignatureDataURL` variable
- Para hindi paulit-ulit mag-access ng IndexedDB sa bawat card update

---

## ⚙️ Mga Pangunahing Function

### `updateBackCard(cardIndex, student)`
- **cardIndex:** 0, 1, 2, o 3 — kung aling slot sa 2×2 grid
- **student:** Ang data ng estudyante, o `null` para sa blangko na slot
- **Ginagawa:** Pinupunan ang text fields sa isang card slot gamit ang data ng estudyante

### `setCardText(container, selector, value)`
- Helper function para i-set ang text ng isang element sa loob ng isang card container
- Ang `container` ay ang specific card div (hindi ang buong page)
- Ang `selector` ay isang CSS selector tulad ng `'.studentName'`

### `scaleCard()`
- Ina-adjust ang laki ng buong 2×2 preview para magkasya sa screen
- Gumagamit ng `transform: scale()` CSS property

### `captureCard()`
- Gumagamit ng `html2canvas` (scale: 2 para sa temporary card — mas mababa kaysa sa regular)
- I-convert ang buong 2×2 card layout sa isang imahe

---

## 🗂️ Data na Ginagamit

Ang temporary card ay gumagamit ng bahagi ng datos mula sa localStorage:

```json
{
  "information": {
    "track": "TVL",
    "strand": "ICT",
    "schoolYear": "2024-2025",
    "adviser": "JUAN DELA CRUZ",
    "grade": "11"
  },
  "students": {
    "boys": {
      "PEDRO REYES": {
        "name": "PEDRO REYES",
        "lrn": "123456789012",
        "grade": {
          "sem1": { "genAve": "88", ... },
          "sem2": { "genAve": "87", ... }
        }
      }
    },
    "girls": { ... }
  }
}
```

---

## 🎨 CSS na Pwedeng Baguhin

| CSS Property | Paliwanag |
|---|---|
| `.grade-col` | Lapad ng grade columns sa loob ng card |
| `.grades-table` | Table styling ng grades sa loob ng temporary card |
| `@media print` | Print styles — tinatago ang UI controls kapag nag-print |
| Scale sa `scaleCard()` | Ang `Math.min(wrapper/card, 0.5)` ay nagde-determine ng maximum preview size |

---

## ❓ FAQ

**Q: Bakit hanggang 4 lang ang pwedeng piliin?**
A: Ang page layout ay dinisenyo para sa 2×2 na grid — 4 cards sa isang pahina. Ito ang maximum na magkakasya sa isang standard na papel.

**Q: Paano kung odd number ang estudyante (e.g., 25)? Blangko ba ang iba?**
A: Oo. Ang huling page ay magkakaroon ng blangko na card slots para sa natitirang espasyo. Normal at expected ito.

**Q: Maaari ba akong mag-print ng temporary card para sa iisang estudyante lang?**
A: Oo! I-check lang ang checkbox ng isang estudyante, tapos pindutin ang **Download Current Page** o **Print Card**. Ang natitirang 3 slots ay magiging blangko.

**Q: Iba ba ang grades sa Temporary Card kumpara sa regular na Back Card?**
A: Depende sa kung anong data ang naka-save. Ang Temporary Card ay gumagamit ng parehong grades mula sa localStorage. Kung nai-enter mo na ang grades sa Grades pages, lalabas iyon dito.

**Q: Hindi lumalabas ang pirma ng guro sa Temporary Card.**
A: Siguraduhing naka-upload na ang pirma ng guro sa **Student Information** page. Kapag naka-upload na, awtomatiko itong lalabas sa Temporary Card.

**Q: Pwede bang palitan ang layout ng 1 card per page?**
A: Kailangan mong baguhin ang CSS ng card container (alisin ang 2×2 grid) at i-adjust ang scale. Hindi ito supported out-of-the-box ngunit pwedeng gawin ng developer.

---

## 🛠️ Tips para sa Developer

### Chunk Logic para sa Download All
```javascript
// Hatiin ang allStudents array sa groups ng 4
for (let i = 0; i < allStudents.length; i += 4) {
    const chunk = allStudents.slice(i, i + 4);
    // I-process ang bawat chunk
    for (let j = 0; j < 4; j++) {
        updateBackCard(j, chunk[j] || null); // null para sa blangko
    }
    // I-capture at i-add sa PDF
}
```

### Scale ng html2canvas
- Temporary Card ay gumagamit ng `scale: 2` (mas mababa kaysa sa `3` ng regular cards)
- Dahil smaller ang bawat card (50% ng original), hindi kailangan ng galong resolution
- Pwedeng palakihin sa `3` para sa mas mataas na kalidad, ngunit magiging mas mabagal

### `generationInProgress` Flag
- Katulad ng ibang card pages, ginagamit ito para pigilan ang double-click sa Download All
- Kapag nag-abort, nire-reset ang flag at naililpas ang progress overlay

### Selector Pattern para sa Multi-Card
```javascript
// Hindi `document.getElementById` — kundi query sa loob ng specific card container:
const card0 = document.getElementById('card0');
setCardText(card0, '.studentName', 'PEDRO REYES');
setCardText(card0, '.lrnNumber', '123456789012');
```
Ito ay mahalaga para hindi magtabrukan ang mga text updates ng 4 na cards.
