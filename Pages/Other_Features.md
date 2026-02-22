# 📄 Other_Features.html — Gabay at Dokumentasyon

## Pangkalahatang Layunin

Ang **Other_Features.html** ay isang **navigation hub** — isang pahina na nagsisilbing gateway sa lahat ng karagdagang features ng CardGen na hindi sakop ng mga pangunahing pages. Ito ay isang simpleng grid ng mga card buttons, bawat isa ay nagdadala sa isang espesyal na feature page.

---

## 🖥️ Ano ang Makikita sa Page na Ito?

Isang grid ng mga **feature cards** — mga clickable na kahon na may pangalan ng feature sa gitna. Kapag ini-hover ang isang card, nag-a-animate ito at nagpapakita ng visual feedback.

---

## 📋 Listahan ng mga Feature Cards

| Feature | Destination File | Paliwanag |
|---|---|---|
| **Temporary Card** | `Temporary_Card.html` | 2×2 layout na pang-temporary na report card |
| **With Honors Certificate** | `Certificate_With_Honors.html` | Certificate para sa mga nag-honor |
| **Perfect Attendance Certificate** | `Certificate_Perfect_Attendance.html` | Certificate para sa walang absent |
| **Conduct Awardee Certificate** | `Certificate_Conduct_Awardee.html` | Certificate para sa conduct award |
| **Student ID** | `Student ID.html` | Generator ng student ID cards |
| **SFR** | `SFR.html` | Student Family Reunification form |
| **Send Temporary Card Thru Gmail** | `Send Thru Gmail.html` | Magpadala ng temporary card sa Gmail ng magulang |
| **Settings** | `Settings.html` | Mga setting ng sistema |

---

## 🎨 Feature Card Styling

Ang bawat feature card ay gumagamit ng `.feature-card` CSS class na may sumusunod na properties:

| Property | Value | Bakit |
|---|---|---|
| `aspect-ratio: 1/1` | Square shape | Para pare-pareho ang sukat ng lahat ng cards |
| `border-radius: 16px` | Rounded corners | Para mas maganda ang hitsura |
| `transition: all 0.25s ease` | Smooth animation | Para sa hover effect |
| `cursor: pointer` | Pointer cursor | Para malaman ng user na clickable ito |

### Hover Effect
```css
.feature-card:hover {
    transform: translateY(-6px);          /* Gumagalaw pataas kapag hovered */
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);  /* Mas malalim ang shadow */
    border-color: #0d6efd;               /* Blue border */
    background: linear-gradient(115deg, white 0%, rgba(13,110,253,0.11) 100%);
}
```

### Active/Highlight State
```css
.feature-card.active, .feature-card.highlight {
    background: linear-gradient(135deg, #0d6efd, #0b5ed7);  /* Solid blue gradient */
    color: white;
    transform: scale(1.08);              /* Mas malaki kapag active */
    z-index: 2;                          /* Nasa ibabaw ng ibang cards */
}
```

---

## 🔧 Grid Layout

Ang mga cards ay nakaayos gamit ang CSS Grid:

```css
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    max-width: 1100px;
}
```

- **`auto-fit`:** Awtomatikong tinutukoy kung ilang columns ang magkakasya sa screen
- **`minmax(220px, 1fr)`:** Bawat card ay hindi bababa sa 220px ang lapad, ngunit lumalaki para mapuno ang espasyo
- **Responsive:** Sa malaking screen, maraming columns; sa maliit na screen, isa o dalawang columns lang

---

## ➕ Paano Magdagdag ng Bagong Feature Card

Para magdagdag ng bagong feature sa grid:

1. Buksan ang `Other_Features.html`
2. Hanapin ang `<div class="feature-grid">` section
3. Idagdag ang isang bagong feature card:

```html
<div class="feature-card" onclick="window.location.href='YourNewPage.html'">
    <span onclick="window.location.href='YourNewPage.html'">
        PANGALAN NG FEATURE
    </span>
</div>
```

4. I-save ang file
5. Siguraduhing may `YourNewPage.html` na file sa parehong folder

> 💡 **Tip:** Ang `onclick` ay nakalagay sa parehong `div` at `span` para masiguro na kahit saan i-click ang card, gagana ang navigation.

---

## 🗂️ JavaScript sa Page na Ito

Napakasimple ng JavaScript sa Other_Features.html — walang data processing o localStorage operations:

```javascript
// Ito lang ang JS sa page:
loadSidebar("Other_Features.html");
```

Ang `loadSidebar()` function (mula sa `SideBar-NavBar.js`) ay responsable sa:
- Paglo-load ng sidebar navigation links
- Pag-mark ng "Other_Features.html" bilang active page sa sidebar

---

## ❓ FAQ

**Q: Paano ko malalaman kung available ang isang feature?**
A: Kapag may kasamang `.html` file sa Pagess folder ang feature, available ito. Kapag na-click ang card at may error o blank page, posibleng hindi pa tapos ang development ng feature na iyon.

**Q: Pwede bang baguhin ang order ng mga feature cards?**
A: Oo! Ilipat lang ang `<div class="feature-card">` block sa loob ng `feature-grid`. Ang grid ay awtomatikong mag-a-adjust.

**Q: Paano ko aalisin ang isang feature card na hindi ko kailangan?**
A: I-delete o i-comment out lang ang kaukulang `<div class="feature-card">` block. Hindi ito makakaapekto sa ibang features.

**Q: Maaari bang magdagdag ng icon sa bawat feature card?**
A: Oo! Idagdag lang ang isang emoji o `<img>` sa loob ng `<span>`:
```html
<span onclick="...">📄<br>TEMPORARY CARD</span>
```

---

## 🛠️ Tips para sa Developer

### `.page-title` Class
```css
.page-title {
    font-family: 'Oswald', sans-serif;
    color: var(--primarydark-color, #0c457d);
    letter-spacing: 1px;
}
```
Ginagamit para sa mga heading sa loob ng page. Ang `--primarydark-color` ay isang CSS variable mula sa `root.css`.

### Walang Data Dependency
Ang Other_Features.html ay **hindi gumagamit ng localStorage** — pure navigation page ito. Kahit walang data sa system, gagana pa rin ang page.

### External Assets
- `../assets/css/root.css` — CSS variables
- `../assets/css/Toast.css` — Toast notifications (kahit walang toasts sa page na ito)
- `../CSS/admin-style.css` — Navbar at sidebar styles
- `../assets/js/loader.js` — Sidebar loader
- `../assets/js/SideBar-NavBar.js` — Sidebar at navbar functionality
- `../assets/js/Logout.js` — Logout functionality
- `../assets/js/Toast.js` — Toast notification system

### Kung Gusto Mong Mag-Add ng New Feature Pages sa Hinaharap
Para sa consistency, sundin ang parehong structure ng ibang feature pages:
1. Gamitin ang parehong navbar at sidebar HTML
2. I-link ang parehong CSS files
3. Tawagan ang `loadSidebar("YourPage.html")`
4. Idagdag sa `Other_Features.html` grid
