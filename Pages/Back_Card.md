# 📄 Back_Card.html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Back_Card.html** ay responsable sa pagpapakita at pag-download ng **likod na bahagi ng report card** ng bawat estudyante. Naglalaman ito ng mga **grades per quarter**, **General Average**, at **Core Values ratings**. May dalawang view mode: **Q1+Q2 (1st Semester)** at **Q3+Q4 (2nd Semester)**.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

| Seksyon | Paliwanag |
|---|---|
| **Student Dropdown** | Listahan ng lahat ng estudyante, sorted A-Z |
| **Q1+Q2 / Q3+Q4 Toggle** | Pumili kung aling quarter ang ipapakita sa card |
| **Card Preview** | Live preview ng back card na may grades at core values |
| **Download Current Card** | PDF ng back card ng isang estudyante |
| **Download All Cards** | Lahat ng estudyante sa iisang PDF |
| **Print Card** | Print dialog ng browser |

---

## 🔁 Workflow: Paano Gumagana ang Page

```
Load Page
   ↓
Basahin ang localStorage ("CardGen")
   ↓
I-populate ang Student Dropdown (boys + girls, A-Z)
   ↓
Pumili ng Estudyante
   ↓
updateBackCard(student)
   ├── Kunin ang sem1 at sem2 grades
   ├── Kunin ang subject names mula sa cardGen.subject
   ├── Ipakita ang grades base sa active quarter view (Q1+Q2 o Q3+Q4)
   └── Ipakita ang Core Values ratings
   ↓
Toggle Quarter View → Mag-redraw ng grades
   ↓
Download / Print
```

---

## ⚙️ Mga Pangunahing Function

### `updateBackCard(student)`
- **Ginagawa:** Pangunahing function na nagpu-populate ng buong back card
- **Kabilang:** Pangalan ng estudyante, track, strand, school year, grades ng bawat subject, GenAve, at Core Values
- **Data source:** `cardGen.subject.sem1.core`, `cardGen.subject.sem1.applied`, `student.grade.sem1`, `student.grade.sem2`

### Quarter Toggle (Mga Button: `btnQ2` at `btnQ4`)
- **`btnQ2` (2nd Quarter + Final):** Nagpapakita ng Q1, Q2, at Final grade para sa 1st semester
- **`btnQ4` (4th Quarter + Final):** Nagpapakita ng Q3, Q4, at Final grade para sa 2nd semester
- **Kung paano gumagana:** Kapag pinindot ang button, binabago ang visibility ng mga kolumna at ire-redraw ang card gamit ang kasalukuyang estudyante

### Grade Display Logic
- **Core Subjects:** Kinukuha mula sa `student.grade.sem1.core.subject1`, `subject2`, atbp.
- **Applied Subjects:** Kinukuha mula sa `student.grade.sem1.applied.subject1`, atbp.
- **Bawat subject ay may structure:**
  ```json
  {
    "q1": "88",
    "q2": "90",
    "final": "89"
  }
  ```
- **Final Grade:** Ipinakita na pre-computed (hindi kinakalkula dito — ginagawa na sa Grades pages)
- **GenAve:** `setText("GenAve1", student.grade?.sem1?.genAve)` — pre-computed din

### Core Values Display
- **4 Categories:** Maka-Diyos, Makatao, Makakalikasan, Makabansa
- **7 Fields Total:** maka-diyos1, maka-diyos2, makatao1, makatao2, makakalikasan, makabansa1, makabansa2
- **4 Quarters:** q1, q2, q3, q4
- **Rating Values:** AO (Always Observed), SO (Sometimes Observed), RO (Rarely Observed), NO (Not Observed)
- **Format:** Naka-display bilang checkmark o text sa card template

### `captureCard()` at PDF Generation
- Katulad ng Front_Card: gumagamit ng `html2canvas` (scale: 3) at `jsPDF`
- **Orientation:** Landscape, Letter size
- **Filename para sa single:** `[PANGALAN]_back_card.pdf`
- **Filename para sa all:** `All_Students_Back_Card.pdf`

---

## 🗂️ Data Structure na Ginagamit

```json
{
  "subject": {
    "sem1": {
      "core": {
        "subject1": "ORAL COMMUNICATION",
        "subject2": "READING AND WRITING"
      },
      "applied": {
        "subject1": "EMPOWERMENT TECHNOLOGIES",
        "subject2": "ENTREPRENEURSHIP"
      }
    },
    "sem2": { ... }
  },
  "students": {
    "boys": {
      "PEDRO REYES": {
        "grade": {
          "sem1": {
            "genAve": "88",
            "core": {
              "subject1": { "q1": "87", "q2": "89", "final": "88" },
              "subject2": { "q1": "85", "q2": "91", "final": "88" }
            },
            "applied": {
              "subject1": { "q1": "90", "q2": "88", "final": "89" }
            }
          },
          "sem2": { ... }
        },
        "coreValues": {
          "q1": {
            "maka-diyos1": "AO",
            "maka-diyos2": "SO",
            "makatao1": "AO",
            "makatao2": "AO",
            "makakalikasan": "SO",
            "makabansa1": "AO",
            "makabansa2": "AO"
          },
          "q2": { ... },
          "q3": { ... },
          "q4": { ... }
        }
      }
    }
  }
}
```

---

## 🎨 CSS at Layout na Pwedeng Baguhin

| CSS Property | Paliwanag |
|---|---|
| `.grade-col` | Lapad at alignment ng grade columns sa card preview |
| `.grades-table` | Table styling ng grades section |
| `@media print` | Print-specific styles na nag-hide ng UI controls |

> ⚠️ **Babala:** Tulad ng Front Card, ang mga positions ng text overlays ay nakatali sa back card template image. Huwag baguhin nang hindi nire-review ang template.

---

## ❓ FAQ

**Q: Bakit walang grades na lumalabas sa card?**
A: Siguraduhing nai-enter na ang grades sa Grades (First Sem) at Grades (Second Sem) pages, at nai-type na rin ang mga subject names.

**Q: Paano ko mababago ang subject names na lumalabas sa card?**
A: Pumunta sa **Grades (First Sem)** o **Grades (Second Sem)** page → hanapin ang row sa pinakaitaas ng table para sa subject names → i-type ang tamang pangalan.

**Q: Lumalabas ang "—" sa halip na grade. Bakit?**
A: Kapag walang naka-save na grade para sa subject na iyon, nagpapakita ng "—" bilang placeholder. Normal ito.

**Q: Iba ang lumalabas sa Q1+Q2 at Q3+Q4 buttons?**
A: Tama iyon — ang Q1+Q2 ay nagpapakita ng 1st semester data, at ang Q3+Q4 ay nagpapakita ng 2nd semester data. Iba ang data source nila.

**Q: Maaari bang nasa iisang PDF ang front at back card?**
A: Hindi direkta sa page na ito. Kailangan mong i-download ang front at back card nang hiwalay at i-merge gamit ang ibang software.

---

## 🛠️ Tips para sa Developer

- Ang `setText(id, value)` helper ay ginagamit para hindi mag-crash kapag walang element na nahanap (may null check)
- Ang `allStudents` array ay pinagsama-sama mula sa `boys` at `girls` at sorted alphabetically
- Ang active quarter view ay tinatago sa isang variable (e.g., `activeQuarter = 'sem1'` o `'sem2'`) na nagde-determine kung anong data ang ipapakita
- Ang `generationInProgress` flag ay katulad ng Front_Card — pumipigil ng double-click sa Download All
- Ang `AbortController` pattern ay ginagamit para sa cancelable bulk PDF generation
