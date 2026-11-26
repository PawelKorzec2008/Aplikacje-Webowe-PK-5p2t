import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const kinoDb = new DatabaseSync(path.join(__dirname, 'kino.db'));
kinoDb.exec(`
  CREATE TABLE IF NOT EXISTS filmy (
    id INTEGER PRIMARY KEY,
    tytul TEXT NOT NULL,
    rezyser TEXT NOT NULL,
    rok INTEGER NOT NULL,
    ocena REAL NOT NULL
  )
`);

const filmyCount = kinoDb.prepare('SELECT COUNT(*) AS liczba FROM filmy').get();
if (filmyCount.liczba === 0) {
  const insertFilm = kinoDb.prepare(
    'INSERT INTO filmy (tytul, rezyser, rok, ocena) VALUES (?, ?, ?, ?)'
  );
  kinoDb.exec('BEGIN');
  insertFilm.run('Skazani na Shawshank', 'Frank Darabont', 1994, 9.3);
  insertFilm.run('Ojciec chrzestny', 'Francis Ford Coppola', 1972, 9.2);
  insertFilm.run('Mroczny rycerz', 'Christopher Nolan', 2008, 9.0);
  insertFilm.run('Forrest Gump', 'Robert Zemeckis', 1994, 8.8);
  kinoDb.exec('COMMIT');
}

kinoDb.prepare('UPDATE filmy SET ocena = ? WHERE id = ?').run(9.5, 2);
const film2 = kinoDb.prepare('SELECT * FROM filmy WHERE id = ?').get(2);
const najlepszeFilmy = kinoDb
  .prepare('SELECT * FROM filmy WHERE ocena >= ?')
  .all(8.0);

console.log('Film o id 2:', film2);
console.log('Filmy z oceną co najmniej 8.0:', najlepszeFilmy);

const bazaDb = new DatabaseSync(path.join(__dirname, 'baza.db'));
bazaDb.exec(`
  CREATE TABLE IF NOT EXISTS zadania (
    id INTEGER PRIMARY KEY,
    tresc TEXT NOT NULL,
    priorytet TEXT NOT NULL DEFAULT 'normalny',
    wykonane INTEGER NOT NULL DEFAULT 0
  )
`);

function idFromParams(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

app.get('/', (req, res) => {
  const zadania = bazaDb.prepare(
    'SELECT * FROM zadania ORDER BY id DESC'
  ).all();
  res.render('zadania', { zadania });
});

app.post('/zadania', (req, res) => {
  const tresc = typeof req.body.tresc === 'string' ? req.body.tresc.trim() : '';
  const priorytet = typeof req.body.priorytet === 'string'
    ? req.body.priorytet.trim()
    : 'normalny';

  if (!tresc) {
    return res.redirect('/');
  }

  bazaDb.prepare(
    'INSERT INTO zadania (tresc, priorytet, wykonane) VALUES (?, ?, 0)'
  ).run(tresc, priorytet);
  res.redirect('/');
});

app.post('/zadania/:id/zrobione', (req, res) => {
  const id = idFromParams(req.params.id);
  if (id !== null) {
    bazaDb.prepare(
      'UPDATE zadania SET wykonane = CASE WHEN wykonane = 1 THEN 0 ELSE 1 END WHERE id = ?'
    ).run(id);
  }
  res.redirect('/');
});

app.post('/zadania/:id/delete', (req, res) => {
  const id = idFromParams(req.params.id);
  if (id !== null) {
    bazaDb.prepare('DELETE FROM zadania WHERE id = ?').run(id);
  }
  res.redirect('/');
});

app.get('/kino', (req, res) => {
  const filmy = kinoDb.prepare('SELECT * FROM filmy ORDER BY id').all();
  res.json({ filmy, filmId2: film2, filmyOcenaOd8: najlepszeFilmy });
});

app.get('/api/zadania', (req, res) => {
  if (req.query.wykonane !== undefined &&
      req.query.wykonane !== '0' &&
      req.query.wykonane !== '1') {
    return res.status(400).json({ error: 'Parametr wykonane musi mieć wartość 0 lub 1' });
  }

  const zadania = req.query.wykonane === undefined
    ? bazaDb.prepare('SELECT * FROM zadania ORDER BY id DESC').all()
    : bazaDb.prepare(
        'SELECT * FROM zadania WHERE wykonane = ? ORDER BY id DESC'
      ).all(Number(req.query.wykonane));

  res.json(zadania);
});

app.get('/api/zadania/:id', (req, res) => {
  const id = idFromParams(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Nieprawidłowe id' });
  }

  const zadanie = bazaDb.prepare(
    'SELECT * FROM zadania WHERE id = ?'
  ).get(id);

  if (!zadanie) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' });
  }
  res.json(zadanie);
});

app.post('/api/zadania', (req, res) => {
  const tresc = typeof req.body.tresc === 'string' ? req.body.tresc.trim() : '';
  const priorytet = typeof req.body.priorytet === 'string'
    ? req.body.priorytet.trim()
    : 'normalny';
  const wykonane = req.body.wykonane === 1 || req.body.wykonane === true ? 1 : 0;

  if (!tresc) {
    return res.status(400).json({ error: 'Pole tresc jest wymagane' });
  }

  const result = bazaDb.prepare(
    'INSERT INTO zadania (tresc, priorytet, wykonane) VALUES (?, ?, ?)'
  ).run(tresc, priorytet, wykonane);
  const zadanie = bazaDb.prepare(
    'SELECT * FROM zadania WHERE id = ?'
  ).get(Number(result.lastInsertRowid));

  res.status(201).json(zadanie);
});

app.patch('/api/zadania/:id', (req, res) => {
  const id = idFromParams(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Nieprawidłowe id' });
  }

  const aktualne = bazaDb.prepare(
    'SELECT * FROM zadania WHERE id = ?'
  ).get(id);
  if (!aktualne) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' });
  }

  const tresc = req.body.tresc === undefined
    ? aktualne.tresc
    : (typeof req.body.tresc === 'string' ? req.body.tresc.trim() : '');
  const priorytet = req.body.priorytet === undefined
    ? aktualne.priorytet
    : (typeof req.body.priorytet === 'string' ? req.body.priorytet.trim() : '');
  const wykonane = req.body.wykonane === undefined
    ? aktualne.wykonane
    : (req.body.wykonane === 1 || req.body.wykonane === true ? 1 : 0);

  if (!tresc || !priorytet) {
    return res.status(400).json({ error: 'tresc i priorytet nie mogą być puste' });
  }

  bazaDb.prepare(
    'UPDATE zadania SET tresc = ?, priorytet = ?, wykonane = ? WHERE id = ?'
  ).run(tresc, priorytet, wykonane, id);

  const zadanie = bazaDb.prepare(
    'SELECT * FROM zadania WHERE id = ?'
  ).get(id);
  res.json(zadanie);
});

app.delete('/api/zadania/:id', (req, res) => {
  const id = idFromParams(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Nieprawidłowe id' });
  }

  const result = bazaDb.prepare(
    'DELETE FROM zadania WHERE id = ?'
  ).run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Serwer działa pod adresem http://localhost:${port}`);
});
