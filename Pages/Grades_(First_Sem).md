# 📄 Grades_(First_Sem).html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Grades_(First_Sem).html** ay ang pahina para sa paglalagay ng **mga grades ng 1st Semester** (Q1 at Q2) ng bawat estudyante. Ito rin ang lugar para mag-define ng mga subject names (Core at Applied). Gumagamit ng **Handsontable** para sa efficient na data entry, at may built-in na **Undo/Redo** (hanggang 50 steps), **Export/Import** sa Excel format, at automatic na **Final Grade at General Average** computation.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

| Seksyon | Paliwanag |
|---|---|
| **Export Data** | I-download ang lahat ng 1st sem grades bilang Excel file |
| **Import Data** | Mag-load ng grades mula sa Excel file |
| **Undo / Redo** | Ibalik o i-ulit ang nakaraang pagbabago (max 50 steps) |
| **Subject List Table** | Ang pangunahing Handsontable ng mga grades |
| **Import Modal** | Progress modal kapag nag-iimport ng Excel file |

---

## 📊 Istruktura ng Table (Columns)

Ang table ay may sumusunod na column layout:

```
Col 0: LRN (read-only)
Col 1: Pangalan (read-only)
Col 2-25: Core Subjects (8 subjects × 3 cols each: Q1, Q2, Final)
Col 26-49: Applied Subjects (8 subjects × 3 cols each: Q1, Q2, Final)
Col 50: General Average (GenAve) — auto-computed, read-only
```

### Bawat Subject Group (3 columns):
| Column | Nilalaman |
|---|---|
| Q1 | 1st Quarter grade (editable) |
| Q2 | 2nd Quarter grade (editable) |
| Final | Average ng Q1 at Q2 (auto-computed, read-only) |

> ⚠️ **Hindi dapat i-edit ang Final at GenAve columns** — awtomatiko itong kinakalkula. Kapag pinaksalan, maaaring mag-override ng maling value.

---

## 🔢 Mga Computation Formula

### Final Grade (per subject)
```
Final = ROUND((Q1 + Q2) / 2)
```
- Puro integer ang resulta (walang decimal)
- Kapag wala pang Q1 o Q2, walang Final na ipinapakita

### General Average (GenAve)
```
GenAve = ROUND(SUM ng lahat ng Final grades / bilang ng subjects na may grades)
```
- Kinabibilangan lamang ang subjects na may Q1 at Q2 values
- Puro integer din ang resulta

---

## ✅ Validation: Q2 Hindi Pwedeng Mas Mababa sa Q1

May built-in na validation ang system: **kapag ang Q2 grade ay mas mababa sa Q1**, ang cell ay maghi-highlight ng **pula** bilang babala.

- Hindi nito pipigilan ang pag-save — babala lang ito
- Makikita ang red highlight sa cell ng Q2 na may problema
- Kapag naitama ang value, mawawala ang highlight

**Function:** `applyQ2InvalidHighlights(hot, containerId)`

---

## ↩️ Undo / Redo System

- **Maximum:** 50 steps ang maaaring ibalik o i-ulit
- **Paano gumagana:**
  1. Bago mag-edit, sine-save ng system ang kasalukuyang state sa `history` array (`saveState()`)
  2. Kapag Undo: `historyIndex--` → `loadState(historyIndex)` → ire-restore ang nakaraang state
  3. Kapag Redo: `historyIndex++` → `loadState(historyIndex)` → ire-apply ang susunod na state
- **Buttons:** Automatic na nadi-disable ang Undo kapag wala nang mas lumang state, at Redo kapag wala nang mas bagong state

```javascript
// State na sine-save sa bawat snapshot:
{
  subjects: {  // Subject names
    core: { subject1: "...", subject2: "..." },
    applied: { subject1: "...", subject2: "..." }
  },
  grades: {  // Grades ng lahat ng estudyante
    boys: { ... },
    girls: { ... }
  }
}
```

---

## 📤 Export Data (Excel)

1. Pindutin ang **Export Data** button
2. Gagawa ng Excel file (`.xlsx`) gamit ang SheetJS library
3. **Sheet Name:** `First Sem`
4. **Format ng Excel:**

| Row | Nilalaman |
|---|---|
| Row 1 | Header: "LRN", "Pangalan", "[Subject1] Q1", "[Subject1] Q2", "[Subject1] Final", ... |
| Row 2+ | Data ng bawat estudyante |

- **Filename:** `CardGen_FirstSem_Grades.xlsx` (o katulad)
- Kasama ang subject names sa header para madaling ma-identify

---

## 📥 Import Data (Excel)

1. Pindutin ang **Import Data** button
2. Pumili ng `.xlsx` file na may tamang format
3. Lumalabas ang **Import Modal** na nagpapakita ng progress
4. **Validation ng Import:**
   - Tinitingnan kung tama ang sheet name (`First Sem`)
   - Kino-match ang pangalan ng estudyante (case-insensitive, trimmed)
   - Ang hindi nakilalang pangalan ay isi-skip na may babala
5. Pagkatapos ng import, awtomatiko itong nag-recompute ng Final at GenAve

> ⚠️ **Babala:** Ang import ay **nagre-replace** ng existing data, hindi nagdadagdag. Mag-export muna bago mag-import ng bagong file.

---

## 📝 Paano Mag-Enter ng Subject Names

Ang unang dalawang rows ng table ay para sa **subject names**:

1. **Row 1** (sa ilalim ng header) = Pangalan ng Core Subjects
2. **Row 2** = Pangalan ng Applied Subjects

- Mag-type ng subject name sa Q1 column ng bawat subject group
- Awtomatiko itong mase-save bilang `subject.sem1.core.subject1`, `subject.sem1.core.subject2`, atbp.
- Pwede hanggang **8 Core Subjects** at **8 Applied Subjects**

---

## 🗂️ Data Structure na Sine-save

```json
{
  "subject": {
    "sem1": {
      "core": {
        "subject1": "ORAL COMMUNICATION",
        "subject2": "READING AND WRITING",
        "subject3": "21ST CENTURY LITERATURE",
        "subject4": "STATISTICS AND PROBABILITY",
        "subject5": "EARTH AND LIFE SCIENCE",
        "subject6": "PERSONAL DEVELOPMENT",
        "subject7": "UNDERSTANDING CULTURE",
        "subject8": ""
      },
      "applied": {
        "subject1": "EMPOWERMENT TECHNOLOGIES",
        "subject2": "ENTREPRENEURSHIP",
        "subject3": "",
        ...
      }
    }
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
          }
        }
      }
    }
  }
}
```

---

## 🎨 CSS na Pwedeng Baguhin

| CSS Class/ID | Paliwanag |
|---|---|
| `.hot-container` | Wrapper ng Handsontable — may border at shadow |
| Background ng header row | May special color para ma-distinguish ang subject name rows |
| `.undo`, `.redo` buttons | Automatic na may `opacity: 0.4` kapag disabled |
| Red highlight sa Q2 cells | Ginagamit ang Handsontable's `cells` callback para mag-apply ng custom class |

---

## ❓ FAQ

**Q: Hindi nababago ang Final Grade kahit nag-enter na ako ng Q1 at Q2.**
A: Siguraduhing valid ang values (numerical, 60-100 range). Kung ang cell ay marked as read-only, huwag nang subukan pang i-edit ang Final column — awtomatiko itong magbabago.

**Q: Bakit naka-highlight ng pula ang Q2 cell?**
A: Ibig sabihin ay mas mababa ang Q2 grade kaysa sa Q1. Sa DepEd guidelines, ang Q2 ay hindi dapat mas mababa sa Q1. Itama ang grade para maalis ang highlight.

**Q: Ang Undo ko ay hindi gumagana. Bakit?**
A: Ang Undo ay may maximum na 50 steps. Kung lampas na doon, hindi na maaaring ibalik ang mas lumang states. Ang Undo button ay magdi-disable kapag wala nang mas lumang history.

**Q: Paano ko malalaman kung tama ang import ng Excel file?**
A: Makikita ang confirmation toast notification pagkatapos ng import. Kung may mga pangalang hindi nakilala, may babala na lalabas.

**Q: Maaari bang mag-import ng file na may ibang format?**
A: Dapat ay `.xlsx` format at may sheet na may pangalang `First Sem`. Kapag ibang format o ibang sheet name, hindi tatanggapin ng system.

**Q: Gaano karami ang maximum na subjects?**
A: Hanggang **8 Core Subjects** at **8 Applied Subjects** — kabuuang 16 subjects sa 1st semester.

---

## 🛠️ Tips para sa Developer

### Key Variables
```javascript
const HISTORY_LIMIT = 50;     // Max undo steps — pwedeng baguhin
let history = [];             // Array ng saved states
let historyIndex = -1;        // Current position sa history array
```

### `computeFinalSemForCell(instance, row, col)`
- **Input:** Handsontable instance, row index, column index ng Q1 o Q2
- **Ginagawa:** Kinakalkula ang column indices ng Q1, Q2, at Final para sa subject group ng cell na iyon
- **Column math:** `base + floor((col - base) / 3) * 3` — ito ang Q1 column ng subject group

### `computeGenAveForStudent(instance, row)`
- **Loop:** Naglo-loop sa 8 core at 8 applied subjects
- **Kinabibilangan:** Ang subject ay kasama lang sa GenAve kapag may Q1 at Q2 values
- **Index:** Core starts at col 4 (Q2 column ng subject1); Applied starts at col 28

### `saveGradesToCardGen(instance, gender)`
- Tinatawag pagkatapos ng bawat cell edit (afterChange event)
- Sine-save ang buong grades ng lahat ng estudyante pabalik sa localStorage
- Ang `gender` parameter ay `'boys'` o `'girls'`

### AfterChange Event
```javascript
hot.addHook('afterChange', (changes, source) => {
  if (source === 'loadData') return;  // I-skip ang pag-save kapag nag-load
  computeFinalsAndGenAve();
  applyQ2InvalidHighlights(hot, containerId);
  saveGradesToCardGen(hot, gender);
  saveState();
});
```
