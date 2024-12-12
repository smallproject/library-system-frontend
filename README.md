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
- **CSS** (voor styling)
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

---
## Endpoints

Wanneer deze server draait is hij benaderbaar op [http://localhost:3000](http://localhost:3000). Dis is de **basis url**, welke aan te vullen is middels de onderstaande endpoints.

### Registreren
`POST /register`

De keys `username` en `password` zijn vereist in de request body. Andere parameters mogen ook meeverstuurd worden, maar worden verder niet gevalideerd:

```javascript
{
  username: "klaasie",
  password: "123456",
  roles: []
}
```

Het wachtwoord wordt vervolgens versleuteld opgeslagen (met _bcryptjs_). De response bevat de JWT token die **na één uur expireert**.

### Inloggen
`POST /login`

De keys `username` en `password` zijn vereist om mee in te kunnen loggen. In de request body vinden we dus alleen het username en wachtwoord van de gebruiker, er mogen geen andere gegevens meegestuurd worden:

```javascript
{
  username: "klaasnl",
  password: "123456",
}
```

De response bevat de JWT token in de headers.

### Gebruikersdetails opvragen
`GET /api/v1/users/:id`

Alleen een ingelogde gebruiker kan zijn **eigen** gebruikersinformatie opvragen. Geef in het endpoint de `id` van gebruiker mee waarvan je de gegevens wil opvragen (dus bijvoorbeeld `/api/v1/users/1` of `/api/v1/users/2`). In de request body moet de JWT token worden meegestuurd om te checken of de ingelogde gebruiker wel toegang heeft tot deze resource. Gebruikers mogen immers alleen hun **eigen** gegevens opvragen.

```javascript
{
  "Content-Type": "application/json",
  Authorization: "Bearer xxx.xxx.xxx",
}
```

### Afgeschermde data opvragen
`GET /api/v1/private-content`

Alleen ingelogde gebruikers kunnen deze algemene afgeschermde content opvragen. Hierbij is de JWT token vereist in de request body:

```javascript
{
  "Content-Type": "application/json",
  Authorization: "Bearer xxx.xxx.xxx",
}
```

### Andere endpoints
Boeken

```http request
http://localhost:3000/books
http://localhost:3000/books/:id
```

Author

```http request
http://localhost:3000/authors
http://localhost:3000/authors/:id
```
Inventories

```http request
http://localhost:3000/inventories
http://localhost:3000/inventories/:id
```

User Reviews

```http request
http://localhost:3000/userreviews
http://localhost:3000/userreviews/:id
```

Reservations

```http request
http://localhost:3000/reservations
http://localhost:3000/reservations/:id
```

Search

```http request
http://localhost:3000/Search
```