# **Library System Frontend**

Een frontend-project voor een bibliotheeksysteem, gebouwd met React en Vite. Deze applicatie biedt een gebruikersinterface om boeken te zoeken, recensies te bekijken, en reserveringen te beheren.

---

## **Inhoud**
1. [Beschrijving](#beschrijving)
2. [Technologieën](#technologieën)
3. [Functies](#functies)
4. [Installatie](#installatie)
5. [Gebruik](#gebruik)
6. [Structuur van de projectmap](#structuur-van-de-projectmap)
7. [Link naar GitHub Repository](#link-naar-github-repository)

---

## **Beschrijving**
Dit project is het frontend-gedeelte van een bibliotheeksysteem. Het biedt een intuïtieve gebruikerservaring met functies zoals:
- Bladeren door beschikbare boeken.
- Inloggen en registreren.
- Toevoegen en bekijken van recensies.
- Beheren van boekreserveringen.

---

## **Technologieën**
- **React 18**
- **Vite** (voor snelle ontwikkeling en bundeling)
- **React Router** (voor navigatie)
- **Axios** (voor API-aanroepen)
- **Tailwind CSS** (voor styling)
- **React Hook Form** (voor formulierbeheer)

---

## **Functies**
- **Boekoverzicht**: Bekijk en zoek boeken met verschillende filters (titel, auteur, genre).
- **Recensies**: Schrijf en bekijk recensies van gebruikers.
- **Authenticatie**: Inloggen, registreren en autorisatie voor verschillende gebruikersrollen.
- **Reserveringen**: Reserveer boeken en controleer de beschikbaarheid.
- **Responsive design**: Gebruiksvriendelijk op desktop, tablet.

---

## **Installatie**

### Vereisten:
- Node.js 16+
- NPM 8+

### Stappen:
1. **Clone de repository:**
   ```bash
   git clone <repository-link>
   cd library-system-frontend
2. **Afhankelijkheden installeren:**  
   ```bash
   npm install

3. **Applicatie starten (ontwikkelmodus):**  
   ```bash
   npm run dev

4. **Toegang tot de applicatie:**  
     Open je browser en ga naar http://localhost:5173.


5.  **Applicatie bouwen (voor productie):**  
    ```bash
    npm run build
---


# Gebruik
- Verbind de frontend met de backend-API via de VITE_API_URL in de .env-bestand.
- Pas het thema en de stijl aan met behulp van CSS-configuraties.
- Test functionaliteiten zoals zoeken, reserveren en recensies bekijken

---


# Structuur van de projectmap
    ```bash
        library-system-frontend/
        │
        ├── public/               # Statische bestanden
        ├── src/
        │   ├── components/       # Herbruikbare React-componenten
        │   ├── pages/            # Pagina's (bijv. Login, Boekoverzicht)
        │   ├── hooks/            # Aangepaste hooks (bijv. API-aanroepen)
        │   ├── styles/           # CSS/Tailwind configuraties
        │   ├── App.jsx           # Hoofdingang van de applicatie
        │   └── main.jsx          # Vite root bestand
        │
        ├── .env                  # Omgevingsvariabelen
        ├── package.json          # Projectafhankelijkheden
        └── README.md             # Documentatie


---

# Link naar GitHub Repository  
Library System Frontend Repository  
https://github.com/smallproject/library-system-frontend