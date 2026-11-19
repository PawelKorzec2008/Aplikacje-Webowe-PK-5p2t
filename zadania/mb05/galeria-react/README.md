# Galeria React

Aplikacja galerii umożliwiająca dodawanie, usuwanie, kategoryzowanie i powiększanie zdjęć.

## Funkcjonalności

- filtrowanie zdjęć w galerii
- podstrony dla pojedynczych zdjęć
- formularz dodawania zdjęć
- usuwanie zdjęć
- wybór ulubionych zdjęć
- stany ładowania i błędów
- losowe zdjęcie dnia
- podstrona błędu dla nieistniejących adresów

## Uruchomienie

```bash
npm install
npm run dev
```

Galeria działa pod `http://localhost:5173`.

## Struktura

- `src/components/` — komponenty wielokrotnego użytku (`PhotoCard`,
  `Gallery`, `CategoryBar`, `Layout`, `Footer`, `ZdjecieDnia`)
- `src/pages/` — strony podpięte pod routing (`GaleriaPage`,
  `ZdjeciePage`, `DodajPage`, `NotFoundPage`)
- `src/services/` — warstwa komunikacji z danymi (`zdjecia.js`)
- `src/hooks/` — współdzielona logika ze stanem (`useZdjecia`)
- `public/photos.json` — dane startowe galerii

## Użyte Technologie

React, React Router, Bootstrap, Vite.
