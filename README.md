## BeatStore — Fullstack MERN E-Commerce (Stripe Integrated)

BeatStore est une application e-commerce fullstack permettant la vente de beats musicaux avec authentification, gestion panier, wishlist et paiement sécurisé via Stripe.

🔗 Live Demo : [https://beatstore-ft.netlify.app](https://beatstore-ft.netlify.app)
🔗 Backend API : [https://beatstore-backend.onrender.com](https://beatstore-backend.onrender.com)

---

## 🚀 Stack Technique

### Frontend

* React (Vite)
* React Router
* Context API
* TailwindCSS
* Axios

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT Authentication
* Stripe Checkout + Webhooks

### Déploiement

* Frontend : Netlify
* Backend : Render
* Paiement : Stripe (mode test)

---

## ✨ Fonctionnalités

* Authentification (Register / Login)
* Gestion panier dynamique
* Wishlist live counter
* Dashboard utilisateur
* Dashboard admin
* Paiement sécurisé Stripe
* Webhook Stripe pour validation commande
* Page 404 personnalisée
* Responsive design
* Déploiement production ready

---

## 💳 Stripe Integration

* Création session checkout
* Redirection success / cancel
* Webhook sécurisé
* Vérification signature Stripe
* Synchronisation panier après paiement

---

## 🛠 Installation locale

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Variables d’environnement

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000
```

---

## 📦 Architecture

```
beatstore/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── context/
    └── services/
```

---

## 🎯 Objectif du projet

Ce projet a été développé pour :

* Approfondir la stack MERN
* Implémenter Stripe en production
* Comprendre les webhooks
* Maîtriser le déploiement fullstack
* Construire un projet portfolio solide