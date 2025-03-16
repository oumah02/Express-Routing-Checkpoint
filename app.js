const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier les heures de travail
function checkWorkHours(req, res, next) {
  const currentDay = new Date().getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const currentHour = new Date().getHours(); // Heure actuelle
  
  // Vérifie si on est du lundi au vendredi, de 9h à 17h
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Si dans les horaires de travail, continuer
  } else {
    res.send('L\'application est uniquement disponible pendant les heures de travail (lundi à vendredi, 9h à 17h).');
  }
}

// Utiliser le middleware pour toutes les routes
app.use(checkWorkHours);

// Définir le moteur de template comme EJS
app.set('view engine', 'ejs');

// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'views'));

// Définir le répertoire public pour les fichiers CSS
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour chaque page
app.get('/', (req, res) => {
  res.render('index', { title: 'Page d\'accueil' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Nous contacter' });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en cours d\'exécution sur http://localhost:3000');
});
