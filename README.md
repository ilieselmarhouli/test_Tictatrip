# API Justify Text

Une API REST qui justifie un texte passé en paramètre, avec authentification par token et rate limiting.

---

## Objectif

Implémenter et déployer une API REST qui justifie un texte passé en paramètre.

---

## Fonctionnalités

- Justification de texte à 80 caractères par ligne 
- Endpoint `/api/justify` pour POST un texte et récupérer le texte justifié  
- Authentification par token unique via `/api/token`  
- Rate limit : 80 000 mots par token et par jour (erreur 402 si dépassé)  
- Déployé sur Render : [https://test-tictatrip.onrender.com](https://test-tictatrip.onrender.com)  
- Code en Node.js / TypeScript  
- Aucune bibliothèque externe pour la justification  

---

## Installation locale

1. Cloner le repo :  
bash
git clone https://github.com/ton-username/test-tictatrip.git
cd test-tictatrip

Installer les dépendances :

npm install

Compiler le TypeScript:

npx tsc

## Utilisation :

URL : /api/token
Méthode : POST
Exemple avec curl :

curl -X POST https://test-tictatrip.onrender.com/api/token \
-H "Content-Type: application/json" \
-d '{"email":"test@exemple.com"}'


Réponse :

{
  "token": "ton-token-unique"
}

2. Justifier un texte

URL : /api/justify
Méthode : POST
Headers : Authorization: Bearer <ton-token>
Content-Type : text/plain
Body : ton texte à justifier

Exemple avec curl :

curl -X POST https://test-tictatrip.onrender.com/api/justify \
-H "Authorization: Bearer koszaphr86n" \
-H "Content-Type: text/plain" \
--data "Voici un texte un peu plus long pour vérifier que la justification fonctionne correctement et que chaque ligne fait bien quatre-vingts caractères exactement comme prévu."



Résultat :
Le texte justifié à 80 caractères par ligne.

Erreur si quota dépassé :

curl -X POST https://test-tictatrip.onrender.com/api/justify \
-H "Authorization: Bearer ton-token-unique" \
-H "Content-Type: text/plain" \
--data-binary @longtext.txt

{
  "error": "402 Payment Required - quota exceeded"
}
