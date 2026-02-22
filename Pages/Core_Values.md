# 📄 Core_Values.html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Core_Values.html** ay ang pahina para sa paglalagay ng **Core Values ratings** ng bawat estudyante sa bawat quarter (Q1–Q4). Ang mga ratings ay batay sa DepEd's 4 core value categories na may kabuuang 7 subcategories. Gumagamit ng **Handsontable** para sa spreadsheet-like data entry.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

| Seksyon | Paliwanag |
|---|---|
| **Search Bar** | Paghahanap ng estudyante sa pamamagitan ng pangalan (may autocomplete suggestions) |
| **Males Table** | Handsontable ng mga lalaking estudyante at kanilang core value ratings |
| **Females Table** | Handsontable ng mga babaeng estudyante at kanilang core value ratings |
| **Save Button** | I-save ang lahat ng ratings sa localStorage |
| **Clear All Button** | Burahin ang lahat ng core value data |

---

## 📊 Mga Core Value Categories at Ratings

### 7 Subcategories (Columns sa Table)

| Column | Category | Sub |
|---|---|---|
| Maka-Diyos 1 | Pagpapahalaga sa Espirituwalidad | Una |
| Maka-Diyos 2 | Pagpapahalaga sa Espirituwalidad | Ikalawa |
| Makatao 1 | Pagmamahal sa Kapwa | Una |
| Makatao 2 | Pagmamahal sa Kapwa | Ikalawa |
| Makakalikasan | Pangangalaga sa Kalikasan | — |
| Makabansa 1 | Pagmamahal sa Bayan | Una |
| Makabansa 2 | Pagmamahal sa Bayan | Ikalawa |

### 4 Valid Rating Values

| Rating | Kahulugan |
|---|---|
| **AO** | Always Observed — Lagi itong ginagawa ng estudyante |
| **SO** | Sometimes Observed — Minsan lang ginagawa |
| **RO** | Rarely Observed — Bihira na ginagawa |
| **NO** | Not Observed — Hindi nakikita ang behavior na ito |

> ⚠️ **Importante:** Tatanggapin lamang ng system ang `AO`, `SO`, `RO`, o `NO`. Ang ibang values ay hindi mase-save nang tama at maaaring hindi lumabas sa report card.

---

## 🔁 Workflow: Paano Mag-Enter ng Core Values

1. **Pumunta sa Core_Values.html**
2. **Hanapin ang estudyante** gamit ang search bar (o direktang hanapin sa table)
3. **I-click ang cell** sa ilalim ng tamang quarter at subcategory
4. **Mag-type ng rating:** `AO`, `SO`, `RO`, o `NO` (case-insensitive, iko-convert sa uppercase)
5. **Pindutin ang Tab** para lumipat sa susunod na cell
6. **Pindutin ang Save** kapag tapos na ang lahat ng ratings

---

## 🔍 Search Feature

- **Paraan ng paghahanap:** Partial match — kahit bahagi ng pangalan, lalabas ang suggestions
- **Navigation:** Kapag lumabas ang suggestions, gamitin ang ↑↓ arrow keys para pumili
- **I-click ang suggestion** o pindutin ang Enter para i-highlight ang row ng estudyanteng iyon sa table
- **Clear Search:** May X button sa kanan ng search bar para i-clear ang input
- **Hindi case-sensitive:** `pedro` at `PEDRO` ay magkapareho ang resulta

---

## ⚙️ Mga Pangunahing Function

### `getCardGen()`
- Kumukuha ng buong data mula sa `localStorage.getItem("CardGen")`
- Returns parsed JSON object

### `saveGen(data)`
- Sine-save ang pinagbagong data pabalik sa `localStorage`
- Ginagamit pagkatapos ng bawat save action

### `getSortedStudents(studentsObj)`
- **Input:** `data.students.boys` o `data.students.girls`
- **Output:** Array ng estudyante, sorted A-Z, na filtered para walang blankong pangalan
- **Bakit:** Para consistent ang order ng rows sa table

### `reloadCoreValuesTables()`
- Ire-refresh ang parehong Males at Females tables
- Kinukuha ang pinakabagong data mula sa localStorage
- Ibinabalik ang data sa Handsontable instances

### Handsontable Configuration
```javascript
// Bawat table ay may ganito:
{
  data: [...],           // 2D array ng rows at columns
  colHeaders: [...],     // Pangalan ng bawat column
  rowHeaders: true,      // Row numbers sa kaliwa
  readOnly: [0],         // Column 0 (Pangalan) ay hindi maaaring i-edit
  dropdownMenu: true,    // Para sa filter options
  filters: true          // Para makapag-filter ng rows
}
```

### Search Highlight Logic
- Kapag pumili ng estudyante mula sa suggestions, hahanapin ng system ang row number ng estudyante sa table
- Gagamitin ang `hot.scrollViewportTo(rowIndex)` para mag-scroll papunta sa row
- Mag-a-apply ng temporary highlight class sa row para makita nang madali

---

## 🗂️ Data Structure na Sine-save

```json
{
  "students": {
    "boys": {
      "PEDRO REYES": {
        "name": "PEDRO REYES",
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
          "q2": { "maka-diyos1": "AO", ... },
          "q3": { "maka-diyos1": "SO", ... },
          "q4": { "maka-diyos1": "AO", ... }
        }
      }
    },
    "girls": { ... }
  }
}
```

---

## 🎨 CSS na Pwedeng Baguhin

| CSS Property | Lokasyon | Paliwanag |
|---|---|---|
| `#searchBar` styles | `<style>` sa head | Styling ng search input field |
| `#searchSuggestions` | `<style>` sa head | Dropdown suggestions box styling |
| `.search-container` | `<style>` | Wrapper ng search bar — may responsive adjustments |
| `.hot-container` | `admin-style.css` | Container ng Handsontable — may border at shadow |

---

## ❓ FAQ

**Q: Anong mangyayari kapag naglagay ako ng ibang value bukod sa AO/SO/RO/NO?**
A: Hindi niya ito ia-accept bilang valid. Kapag nag-save at nag-reload, maaaring maging blangko ang cell o hindi maipakita nang tama sa report card.

**Q: Maaari bang mag-paste ng data mula sa Excel?**
A: Oo! Sinusuportahan ng Handsontable ang paste (Ctrl+V). Siguraduhing ang values ay `AO`, `SO`, `RO`, o `NO` lamang bago mag-paste.

**Q: Bakit hindi nag-a-update ang report card kahit nalagyan ko na ng ratings?**
A: Siguraduhing pinindot ang **Save** button pagkatapos mag-enter ng ratings. Kung hindi nag-save, hindi mababago ang data sa localStorage.

**Q: Maaari bang mag-filter ng partikular na quarter?**
A: Ang table ay nagpapakita ng lahat ng quarters nang sabay-sabay (Q1, Q2, Q3, Q4 bilang mga column groups). Walang separate na quarter filter sa Core Values page.

**Q: Naalis ko ang lahat ng data gamit ang Clear All. Pwede bang ibalik?**
A: Hindi na. Ang Clear All ay permanenteng nagbubura ng core values data. Walang undo para dito. Inirerekomenda ang mag-export ng data bago mag-clear.

---

## 🛠️ Tips para sa Developer

- Ang `fields` array (`['maka-diyos1', 'maka-diyos2', ...]`) ay ginagamit para mag-loop sa lahat ng subcategories — kapag gusto mong magdagdag ng bagong field, idagdag lang ito sa array na ito
- Ang table columns ay nakaayos bilang: **Pangalan** (col 0), tapos **Q1-fields** (cols 1-7), **Q2-fields** (cols 8-14), **Q3-fields** (cols 15-21), **Q4-fields** (cols 22-28)
- Ang `hot.__hotInstance` pattern ay ginagamit para ma-access ang Handsontable API mula sa labas ng instance
- Ang search suggestions ay dinamikong ginagawa sa DOM (walang framework) — kailangan mong tiyakin na ang `stopPropagation` ay tama para hindi mawala ang dropdown nang maaga
