# P7 OpenClassRooms - Créez un réseau social d’entreprise

Le projet consiste à construire un réseau social interne pour les employés de Groupomania.

Le projet est entièrement hosté en local.

## Lancer le projet 
___

Commencez par clone le projet :
```
git clone https://github.com/marie-morin/p7-groupomania.git
```

## Base de données
___
Verifier la présence de sequelize en entrant dans terminal sequelize --help
si help s'affiche ok
sinon installer sequelize en suivant les infos du lien vers cli sequlize

Lancer un server mamp lamp ou wamp en fonction du système d'exploitation

sur server, creer trois nouvelle base de donnée (dev test prod)

terminl : sequlize  db:migrate pour structure les base de données
sequelize bd:seed:all pour peuplé les base de donnée d'utilisateur fictifs (sinon supprimer dans le server les image correspnondatn poutr partir de zero.

Si deja ajouter des données dans bdd :
* si on veux pas les enlever : seed:undo all pour vidé la base et repeuplé
* si on tint à garder ses données et juste rajouter, aller dans seeder et modifier les id des instances pour quelle ne rentre pas en conflit avec les données deja dans la base
* Credentials des users sont dans le fichier seed (pas dans la base car mot de passe stokcer en hashé dans la base)
+ ajouter le mot de passe des seeders dans les .env
+ comment creer un admin
+ les seeders, à quoi il s servent et comment les installer si on pue les utiliser
## Frontend
___
Déplacer vous dans le dossier Frontend et installez les dépendances du projet :

```
cd frontend
npm install
```

Le server frontend utilise les variables d'environnement :

A la racine du dossier Frontend, créez un fichier .env qui contiendra les variables d'environnement nécessaire au projet.

Vous devez y inscrire l'URL global pour les requêtes vers le back

```
VUE_APP_LOCALHOST_URL = "http://localhost:3000/api/"
```

Vous pouvez lancer le server Vuejs grâce aux commandes :
```
npm run serve // pour le developpement
```
ou

```
npm run build // pour la production
```

Le server est accessible à localhost:8080.




## Backend
___
Déplacer vous dans le dossier Backend et installez les dépendances du projet :

```
cd backend
npm install
```

Le server backend utilise les variables d'environnement :

A la racine du dossier Backend, créez un fichier .env qui contiendra les variables d'environnement nécessaire au projet.

Vous devez y inscrire :
* Votre token d'authentification, vous permettant les échanges entre les serveurs frontend et backend. La String qui constitue le token doit être complexe pour en renforcer la sécurité.
  ```
  JWT_SECRET_TOKEN = "xxxxxxxxxxxx"
  ```
* Vos credentials de base de données pour associer votre server Nodejs à votre base de données. Vous trouverez les username, password et port de votre server dans les paramètres de ce dernier.
  ``` javascript
  DB_USER = "xxxx" // root
  DB_PASS = "xxxx" // root
  DB_HOST = "127.0.0.1"
  DB_PORT = "xxxx" // 3306
  DB_DIALECT = "mysql"
  DB_NAME_DEV = "xxxx" // groupomania_development
  DB_NAME_TEST = "xxxx" // groupomania_development
  DB_NAME_PROD = "xxxx" // groupomania_development
  ```
Vous pouvez lancer le server Nodejs grâce à Nodemon.

```
nodemon serve
```
Le server est accessible à localhost:3000 .