# 🌤️ Mini-Station Météo

Une application web simple et élégante pour consulter la météo en temps réel de n'importe quelle ville dans le monde.

> ⚠️ **Projet en cours d'amélioration** - Cette mini-station météo est fonctionnelle mais plusieurs améliorations sont prévues pour enrichir l'expérience utilisateur.

## 📋 Description

Cette mini-station météo permet d'obtenir instantanément les conditions météorologiques actuelles d'une ville en utilisant des API publiques gratuites. L'interface épurée affiche la température, les conditions climatiques, l'humidité, la vitesse du vent et les coordonnées GPS.

## ✨ Fonctionnalités

- 🔍 Recherche de ville par nom
- 🌡️ Affichage de la température actuelle et ressentie
- 🌈 Description des conditions météorologiques
- 💨 Vitesse du vent en km/h
- 💧 Taux d'humidité
- 📍 Coordonnées GPS de la localisation
- ⌨️ Support de la touche Entrée pour la recherche
- 🎨 Interface responsive et moderne

## 🛠️ Technologies utilisées

- **HTML5** - Structure de la page
- **CSS3** - Design et animations
- **JavaScript (ES6+)** - Logique applicative et appels API
- **[Nominatim API](https://nominatim.openstreetmap.org/)** - Géocodage (conversion ville → coordonnées GPS)
- **[Open-Meteo API](https://open-meteo.com/)** - Données météorologiques en temps réel

## 🚀 Installation et utilisation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-username/mini-station-meteo.git
```

2. Ouvrez le fichier `index.html` dans votre navigateur web

3. Entrez le nom d'une ville et cliquez sur "OK" ou appuyez sur Entrée

C'est tout ! Aucune installation de dépendances n'est nécessaire.

## 📁 Structure du projet

```
mini-station-meteo/
│
├── index.html          # Structure HTML de l'application
├── style.css           # Styles et design
├── script.js           # Logique JavaScript et appels API
└── README.md           # Documentation
```

## 🌐 APIs utilisées

### Nominatim (OpenStreetMap)
- Convertit le nom d'une ville en coordonnées géographiques
- Endpoint : `https://nominatim.openstreetmap.org/search`

### Open-Meteo
- Fournit les données météorologiques actuelles
- Endpoint : `https://api.open-meteo.com/v1/forecast`
- Données récupérées : température, humidité, vitesse du vent, code météo, température ressentie

## 💡 Exemples d'utilisation

Essayez de rechercher :
- Paris
- Tokyo
- New York
- Londres
- Sydney

## 🚧 Améliorations prévues

### Interface utilisateur
- [ ] Icônes météo dynamiques selon les conditions
- [ ] Thème sombre/clair avec bouton de bascule
- [ ] Animations lors du changement de ville

### Fonctionnalités
- [ ] Géolocalisation automatique de l'utilisateur
- [ ] Prévisions sur 7 jours
- [ ] Historique des villes récemment consultées
- [ ] Système de favoris pour sauvegarder des villes


N'hésitez pas à suggérer d'autres améliorations via les issues GitHub !

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

Ce projet est un projet éducatif libre d'utilisation.

## 👤 Auteur

Projet réalisé dans le cadre d'un exercice de développement web chez Ada Tech School

---

⭐ N'hésitez pas à mettre une étoile si ce projet vous a été utile !
