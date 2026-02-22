# 📄 Grades_(Second_Sem).html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Grades_(Second_Sem).html** ay halos kapareho ng First Sem page, ngunit ito ay para sa **2nd Semester grades (Q3 at Q4)**. Gumagamit din ng **Handsontable**, may **Undo/Redo**, **Export/Import**, at automatic na **Final Grade at General Average** computation.

---

## 🔑 Mga Pangunahing Pagkakaiba sa First Sem

| Aspeto | First Sem | Second Sem |
|---|---|---|
| **Quarter Columns** | Q1, Q2, Final | Q3, Q4, Final |
| **Data key** | `grade.sem1` | `grade.sem2` |
| **Subject source** | `subject.sem1.core/applied` | `subject.sem2.core/applied` |
| **History variable** | `history`, `historyIndex` | `sem2History`, `sem2HistoryIndex` |
| **Excel Sheet Name** | `First Sem` | `Second Sem` |
| **Validation** | Q2 ≥ Q1 | Q4 ≥ Q3 |
| **State save function** | `saveState()` | `saveSem2State()` |
| **Load state function** | `loadState(idx)` | `loadSem2State(idx)` |

> 💡 **Tip:** Kapag nagtatrabaho sa codebase, ang lahat ng logic ay kapareho ng First Sem — ang pangunahing pagbabago ay ang mga variable names at ang data keys na ginagamit.

---

## 📊 Istruktura ng Table (Columns)

Katulad ng First Sem, ngunit Q3 at Q4 ang columns sa halip na Q1 at Q2:

```
Col 0: LRN (read-only)
Col 1: Pangalan (read-only)
Col 2-25: Core Subjects (8 subjects × 3 cols: Q3, Q4, Final)
Col 26-49: Applied Subjects (8 subjects × 3 cols: Q3, Q4, Final)
Col 50: General Average (GenAve) — auto-computed
```

---

## 🔢 Mga Computation Formula

### Final Grade (per subject)
```
Final = ROUND((Q3 + Q4) / 2)
```

### General Average (GenAve)
```
GenAve = ROUND(SUM ng lahat ng Final grades / bilang ng subjects)
```

---

## ✅ Validation: Q4 Hindi Pwedeng Mas Mababa sa Q3

Kapag ang **Q4 grade ay mas mababa sa Q3**, mag-hi-highlight ng **pula** ang cell bilang babala.

- **Function:** `applyQ2InvalidHighlights(hot, containerId)` — kahit `Q2` ang pangalan, ginagamit din ito para sa Q3/Q4 check sa 2nd sem (reused na function)
- Hindi nito pipigilan ang pag-save — babala lang

---

## ↩️ Undo / Redo System

Katulad ng First Sem ngunit gumagamit ng sariling variables:

```javascript
const HISTORY_LIMIT = 50;
let sem2History = [];          // Hiwalay sa First Sem history
let sem2HistoryIndex = -1;
```

**Bakit hiwalay ang history?** Para hindi magsabay ang undo operations ng First Sem at Second Sem. Ang bawat page ay may sariling history.

---

## 📤 Export Data (Excel)

- **Sheet Name:** `Second Sem` ← Ito ang pinakaimportanteng pagkakaiba
- Format at columns ay katulad ng First Sem export
- **Filename:** `CardGen_SecondSem_Grades.xlsx` (o katulad)

---

## 📥 Import Data (Excel)

- **Required Sheet Name:** `Second Sem`
- Kapag naglagay ng `First Sem` file dito, tatanggihan ng system
- Process at validation ay katulad ng First Sem import

> ⚠️ **Babala:** Huwag i-import ang First Sem Excel file sa Second Sem page at vice versa — mag-e-error ito o maglalagay ng data sa maling lugar.

---

## 🗂️ Data Structure na Sine-save

```json
{
  "subject": {
    "sem2": {
      "core": {
        "subject1": "CONTEMPORARY PHILIPPINE ARTS",
        "subject2": "MEDIA AND INFORMATION LITERACY",
        "subject3": "PRACTICAL RESEARCH 2",
        "subject4": "PRE-CALCULUS",
        "subject5": "BASIC CALCULUS",
        "subject6": "PHYSICAL EDUCATION",
        "subject7": "",
        "subject8": ""
      },
      "applied": {
        "subject1": "WORK IMMERSION",
        "subject2": "",
        ...
      }
    }
  },
  "students": {
    "boys": {
      "PEDRO REYES": {
        "grade": {
          "sem2": {
            "genAve": "87",
            "core": {
              "subject1": { "q3": "86", "q4": "88", "final": "87" },
              "subject2": { "q3": "85", "q4": "90", "final": "88" }
            },
            "applied": {
              "subject1": { "q3": "92", "q4": "90", "final": "91" }
            }
          }
        }
      }
    }
  }
}
```

---

## ❓ FAQ

**Q: Nalagyan ko ng grades sa First Sem. Bakit hindi ito lumalabas sa Second Sem page?**
A: Hiwalay ang data ng First at Second Sem. Kailangan mong mag-enter ng bagong grades dito para sa Q3 at Q4.

**Q: Maaari bang gamitin ang parehong subject names sa First at Second Sem?**
A: Hindi awtomatiko. Kailangan mong i-type ulit ang subject names sa Second Sem page (Row 1 at Row 2 ng table). Pwede kang mag-copy-paste para makatipid ng oras.

**Q: Bakit iba ang GenAve sa First at Second Sem page?**
A: Normal iyon — iba ang quarters na ginagamit sa computation. Ang First Sem ay gumagamit ng Q1+Q2 Final grades, at ang Second Sem ay gumagamit ng Q3+Q4 Final grades.

**Q: Ang import ba ay nag-o-override ng lahat ng Second Sem data?**
A: Oo. Ang import ay nagre-replace ng kasalukuyang Second Sem data. Mag-export muna bago mag-import ng bagong file para may backup ka.

---

## 🛠️ Tips para sa Developer

### Mahalagang Variable Names
```javascript
// Second Sem — hiwalay sa First Sem
let sem2History = [];
let sem2HistoryIndex = -1;

function saveSem2State() { ... }
function loadSem2State(idx) { ... }
```

### Paano Mag-modify ng HISTORY_LIMIT
```javascript
const HISTORY_LIMIT = 50;  // Palakihin para mas maraming undo steps
```
> Paalala: Mas malaking history = mas maraming memory ang gagamitin.

### Key sa localStorage
- Ang sem2 grades ay naka-save sa `data.students[gender][name].grade.sem2`
- Ang sem2 subject names ay nasa `data.subject.sem2.core` at `data.subject.sem2.applied`
- Pareho itong nasa iisang `"CardGen"` key sa localStorage — hindi hiwalay ang storage

### `computeFinalSemForCell` — Parehong Function, Iba ang Data
Ang function na ito ay katulad ng First Sem ngunit nag-a-access ng `.sem2` data path. Ang column math ay pareho:
```javascript
const base = isCore ? 2 : 26;
const subjectOffset = Math.floor((col - base) / 3) * 3;
// Q3 = base + offset, Q4 = base + offset + 1, Final = base + offset + 2
```
