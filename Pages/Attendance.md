# 📅 Attendance.html — Gabay at Dokumentasyon

## Ano ang Page na Ito?

Ang **Attendance Page** ay ginagamit para sa pagtatala ng attendance ng bawat estudyante sa bawat buwan ng school year. Awtomatikong kakalkulahin ng sistema ang **Days Present** batay sa bilang ng School Days at Days Absent na inilagay mo.

---

## Daloy ng Proseso (Workflow)

```
1. Piliin ang buwan → 2. Ilagay ang school days → 3. Ilagay ang absent days → 4. Auto-calculate ang present days
```

---

## Mga Bahagi ng Page

### 1. 📆 Attendance Month Selection

Dito pipiliin ang **unang buwan** at **huling buwan** ng attendance period.

**Paano gamitin:**
1. Piliin ang **First Month** (halimbawa: `Aug`)
2. Kapag napili na ang First Month, mae-enable ang **Last Month** dropdown
3. Piliin ang **Last Month** (halimbawa: `Mar`)
4. Awtomatikong lilikhain ang sequence ng mga buwan: `Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar`

> ⚠️ **TANDAAN:** Ang First Month at Last Month ay hindi maaaring parehong buwan. Kailangan magkaiba ang mga ito.

### 2. 🗓️ School Days Per Month Configuration

Ang config table na ito ay nagtatakda ng **bilang ng school days** para sa bawat buwan.

**Paano gamitin:**
- I-click ang cell sa ilalim ng buwan (halimbawa: ilalim ng "Aug")
- Ilagay ang bilang ng school days (0-99)
- Awtomatikong ia-update ang lahat ng students para sa napiling bilang

> 💡 **TIP:** Mag-set ng school days **bago** mag-enter ng absent days para maayos ang calculation.

### 3. 👦 Males Attendance Data (boysHot)

Table na naglalaman ng attendance ng mga male na estudyante.

**Structure ng table:**

| Column | Description |
|--------|-------------|
| **Names of Learners** | Auto-populated mula sa Student Information page |
| **Total - No. of School Days** | Kabuuang school days ng lahat ng buwan |
| **Total - No. of Days Absent** | Kabuuang absent ng lahat ng buwan |
| **Total - No. of Days Present** | Kabuuang present = School Days - Absent |
| **Absent (per month)** | Ilalagay mo ito — Jan, Feb, ... Dec |
| **Present (per month)** | Awtomatikong kalkulahin — School Days - Absent |

**Mga editable na cells:**
- **Absent columns** (per month) — Dito ka mag-enter ng bilang ng absent
- Lahat ng iba ay **read-only** (awtomatikong kinalkula)

### 4. 👧 Females Attendance Data (girlsHot)

Katulad ng Males table pero para sa mga female na estudyante.

---

## Paano Gumagana ang Auto-Calculation?

```
Para sa bawat buwan:
  Present[month] = SchoolDays[month] - Absent[month]

Para sa total:
  Total School Days = SUM ng lahat ng aktibong buwan
  Total Absent = SUM ng lahat ng aktibong buwan
  Total Present = Total School Days - Total Absent
```

**Mga patakaran ng calculation:**
- Kung ang School Days ay blangko para sa isang buwan → hindi kasama sa total
- Kung ang Absent ay blangko → itinuturing na 0 para sa kalkulasyon
- Kapag binago ang school days config → awtomatikong re-calculate ang lahat

---

## Row Tracker Feature

May **Row Tracker** toggle switch sa tuktok ng section. Kapag naka-on (default), mag-hi-highlight ng buong row kapag nag-click ka ng cell.

- **ON** → Hinahayaan kang makita ang buong row ng isang estudyante nang mas madali
- **OFF** → Normal na table behavior lang

---

## ⚠️ Clear All Attendance Data Button

Ang button na ito sa kanang tuktok ay **magtatanggal ng LAHAT** ng attendance data:
- Lahat ng absent at present records
- Ang school days configuration
- Ang napiling months (ibabalik sa blank)

**Hindi matatanggal ang:**
- Mga pangalan ng estudyante
- Ibang data (grades, core values, atbp.)

> ⚠️ **BABALA:** Walang undo para sa clear action. Mag-ingat bago gamitin ito.

---

## 💾 Data Storage

Ang attendance data ay naka-store sa loob ng bawat student object sa localStorage:

```json
{
  "students": {
    "boys": {
      "JUAN DELA CRUZ": {
        "name": "JUAN DELA CRUZ",
        "monthlyAttendance": {
          "total": { "schoolDays": 180, "absent": 5, "present": 175 },
          "schoolDays": { "month1": 20, "month2": 22, ... },
          "absent": { "month1": 1, "month2": 0, ... },
          "present": { "month1": 19, "month2": 22, ... }
        }
      }
    }
  },
  "schoolDaysConfig": { "month1": 20, "month2": 22, ... },
  "attendanceMonth": "Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar"
}
```

**Paliwanag ng keys:**
- `month1` = unang buwan na napili (hindi palaging January)
- `month2` = pangalawang buwan, etc.
- Ang `attendanceMonth` string ay nagtitiyak kung aling mga buwan ang aktibo

---

## 🔧 Mga Tips para sa Developer

- **`refreshAllTables()`** — Tinatawag ito kapag nagbago ang month selection para i-rebuild ang lahat ng tables
- **`recalcAttendance(ma, displayed)`** — Core calculation function. Tinatanggap ang `monthlyAttendance` object at array ng displayed months
- **`applyGlobalSchoolDaysToAllStudents()`** — Kapag nagbago ang school days config, tinatawag ito para ma-update ang lahat ng students
- **`autoInitializeAbsentDaysForSelectedMonths()`** — Kapag nagdagdag ng bagong buwan, inilalagay ang 0 bilang default na absent para sa mga bagong buwan

