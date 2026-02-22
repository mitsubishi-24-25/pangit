# 📋 Student_Information.html — Gabay at Dokumentasyon

## Ano ang Page na Ito?

Ito ang **pinaka-importanteng page** ng CardGen. Dito mo ilalagay ang lahat ng pangunahing impormasyon ng klase at ng mga estudyante. Ang data na inilagay mo dito ay **gagamitin sa lahat ng ibang pages** — mula sa grades, attendance, hanggang sa report card generation.

---

## Mga Bahagi ng Page

### 1. 🏫 Metadata Table (Class Information)

Ang metadata table ay naglalaman ng mga sumusunod na fields:

| Field | Halimbawa | Paliwanag |
|-------|-----------|-----------|
| **Track** | `ACADEMIC TRACK -` | Piliin mula sa dropdown: Academic, TVL, Arts & Design, Sports |
| **Strand** | `SCIENCE, TECHNOLOGY, ENGINEERING AND MATHEMATICS` | Nakadepende sa napiling Track |
| **School Year** | `2024-2025` | Format: YYYY-YYYY. Kailangang sundin ang format na ito. |
| **Adviser** | `JUAN DELA CRUZ` | Pangalan ng class adviser (max 40 characters) |
| **Principal** | `MARIA SANTOS` | Pangalan ng principal (max 35 characters) |
| **Section** | `STEM-A` | Pangalan ng section |
| **Grade** | `12` | Dapat 11 o 12 lamang |

> ⚠️ **MAHALAGA:** Ang lahat ng fields ay awtomatikong nako-convert sa UPPERCASE maliban sa Adviser at Principal.

### 2. 👦 Males Data Table (boysHot)

Listahan ng lahat ng male na estudyante. Ang bawat row ay may mga sumusunod na columns:

| Column | Format | Validation |
|--------|--------|------------|
| **Name** | UPPERCASE | Walang duplicate na pangalan. Awtomatikong naco-convert sa uppercase. |
| **Age** | 2 digits | Halimbawa: `17`, `16`. Kailangan exactly 2-digit. |
| **Gender** | Auto-filled | Awtomatikong "MALE" — hindi mo kailangang baguhin ito. |
| **LRN** | 12 digits | Learner Reference Number. Halimbawa: `123456789012` |
| **Parent** | Text | Pangalan ng magulang/guardian |
| **Parent Number** | 11 digits | Kailangang magsimula sa `09`. Halimbawa: `09123456789` |
| **Parent Gmail** | Email | Kailangang may `@gmail.com` sa dulo |

### 3. 👧 Females Data Table (girlsHot)

Pareho sa Males Data pero para sa mga female na estudyante. Awtomatikong "FEMALE" ang Gender column.

### 4. ✍️ Signature Upload Section

May dalawang signature upload: **Teacher Signature** at **Principal Signature**.

#### Proseso ng Pag-upload ng Signature:
1. **I-click ang Upload button** → Magbubukas ang file picker
2. **Pumili ng larawan** → Lalabas ang **Crop Modal**
3. **I-crop ang signature** → I-click ang "Crop & Proceed to Removal"
4. **Background Removal** → Gamitin ang slider para alisin ang background color
   - 0 = Walang background removal
   - 200 = Maximum na background removal
5. **I-click ang Save** → Mase-save ang signature sa browser's IndexedDB storage

> 💡 **TIP:** Para sa pinakamahusay na resulta, gumamit ng larawan na may maitim na pirma sa maputing background. Gamitin ang slider nang dahan-dahan para hindi ma-cut off ang mga bahagi ng pirma.

---

## Mga Buttons at Kanilang Function

### 📤 Export Data
- Kapag **walang data**: Nagda-download ng blank template file (`CardGen_Template.xlsx`)
- Kapag **may data**: Nagda-download ng Excel file na may lahat ng impormasyon

**Format ng exported file:**
```
Sheet: "Main Data"
- Rows 1-8: Class information (Track, Strand, etc.)
- Rows 11-60: Male students (50 rows)
- Rows 62-111: Female students (50 rows)
```

### 📥 Import Data
> ⚠️ **BABALA:** Ang import ay **papalitan** ang lahat ng kasalukuyang student data. Hindi ito mababawi.

1. I-click ang "Import Data"
2. Lalabas ang confirmation dialog
3. Pipiliin ang Excel file
4. Ang data ay ilo-load at ipapakita sa mga tables

**Kailangan ng Excel file na may sheet na "Main Data"** — katulad ng format ng exported file.

### 🔡 Sort Students Alphabetically
- Inaayos ang parehong Males at Females listahan sa alphabetical order
- Sine-save ang bagong order sa localStorage

---

## 🔍 Search Feature

May search bar sa navbar ng page. Hinahanap ang estudyante sa pamamagitan ng:
- **Pangalan** (partial match — hindi kailangan ng buong pangalan)
- **LRN** (partial match)

**Paano gamitin ang search:**
1. Mag-type sa search bar
2. Lalabas ang mga suggestion
3. I-click ang suggestion o gamitin ang Arrow keys at Enter para piliin
4. Ang table ay mag-i-scroll at mag-hi-highlight ng piniling estudyante

---

## 💾 Paano Sine-save ang Data?

Lahat ng data ay sine-save sa **localStorage** ng browser gamit ang key na `"CardGen"`. 

**Structure ng data:**
```json
{
  "information": { "track": "", "strand": "", "school-year": "", ... },
  "subject": { "sem1": { "core": {}, "applied": {} }, "sem2": { ... } },
  "students": {
    "boys": {
      "JUAN DELA CRUZ": { "name": "JUAN DELA CRUZ", "age": "17", ... }
    },
    "girls": { ... }
  }
}
```

> ⚠️ **TANDAAN:** Ang localStorage ay naka-store sa browser mo. Kung mag-clear ng browser data, mawawala ang lahat ng CardGen data. **Regular na i-export ang iyong data para may backup.**

---

## ❓ Mga Karaniwang Tanong

**Q: Bakit hindi nag-se-save ang pangalan ng estudyante?**
A: Suriin kung may duplicate na pangalan. Ang CardGen ay hindi nagpapahintulot ng dalawang estudyante na may parehong pangalan.

**Q: Bakit hindi valid ang LRN ko?**
A: Ang LRN ay kailangan ng exactly 12 digits. Walang letters o espasyo.

**Q: Maaari bang mag-alis ng estudyante?**
A: Oo. Burahin ang pangalan ng estudyante sa Name column (gawing blangko). Awtomatikong mabubura ang record.

**Q: Paano kung mali ang School Year format?**
A: Ang tamang format ay `YYYY-YYYY` halimbawa `2024-2025`. Kailangan may gitling sa gitna.

---

## 📝 Mga Tips para sa Developer

Kung gagawa ka ng pagbabago sa code ng page na ito, tandaan:

- **`STORAGE_KEY = "CardGen"`** — Huwag baguhin ito. Ginagamit ng lahat ng pages para ma-access ang parehong data.
- **`getCardGen()`** — Gamitin ito para makuha ang data, hindi direktang `localStorage.getItem()`
- **`saveGen(data)`** — Gamitin ito para i-save, hindi direktang `localStorage.setItem()`
- **Ang student keys ay uppercase** — Halimbawa: `students.boys["JUAN DELA CRUZ"]`
- **`reloadStudentTables()`** — Tawagan ito kapag kailangan i-refresh ang tables

