# Projet Angular de Gestion de Documents Utilisateur

## I. Description du projet

Le projet Angular proposé vise à développer une application de gestion de documents utilisateur avec des fonctionnalités distinctes pour la gestion des utilisateurs et des documents. L'application doit prendre en compte les rôles des utilisateurs (admin ou user) :

- **Admin** : gère les comptes utilisateur.
- **User** : gère des documents et des dossiers.

L'application Angular gère uniquement les informations des documents et des dossiers qui sont stockés dans une base de données. Les principales caractéristiques de l'application incluent la gestion des informations associées aux documents et aux dossiers, telles que le chemin d'accès, le type, la taille en octets, et l'identifiant du propriétaire du document. L'accent est mis sur la manipulation des données relatives aux documents et aux dossiers sans inclure les données des documents.

## II. Fonctionnalités

### Authentification et Autorisation

- Mise en place d'un système d'authentification pour permettre aux utilisateurs de se connecter à l'application.
- Attribution des rôles (administrateur ou utilisateur standard) lors de l'inscription.

### Gestion des Users

- **Admin** :
  - Modification (activation, désactivation) et suppression d'utilisateurs.

### Gestion des Documents par les utilisateurs

- Ajout de nouveaux documents avec leurs informations.
- Modification des détails des documents existants.
- Suppression de documents après confirmation.
- Affichage de la liste des documents.

### Gestion des Dossiers

- Création de dossiers pour organiser les documents.
- Attribution de documents à des dossiers spécifiques.
- Modification des détails des dossiers, y compris leur contenu.

### Gestion des Erreurs

- Implémentation de messages d'erreur informatifs en cas d'opérations infructueuses.
- Gestion des exceptions et des erreurs côté client pour assurer une expérience utilisateur fluide.

---

## III. Instructions pour Débuter

### Prérequis

- Node.js 
- Angular CLI 
- MongoDB

### Installation

1. Installez les dépendances pour le backend :
    ```bash
    cd server
    npm install
    ```

2. Installez les dépendances pour le frontend :
    ```bash
    cd client
    npm install
    ```

### Lancement de l'application

1. Démarrez le serveur backend Node.js :
    ```bash
    cd server
    node server.mjs
    ```

2. Démarrez le serveur de développement Angular :
    ```bash
    cd client
    ng serve
    ```

3. Ouvrez votre navigateur et accédez à `http://localhost:4200`.

