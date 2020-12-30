# P7 OpenClassRooms - Créez un réseau social d’entreprise

Le projet consiste à construire un réseau social interne pour les employés de Groupomania.

Le projet est entièrement hosté en local.

## Lancer le projet 
___

Commencez par cloner le projet :
```
git clone https://github.com/marie-morin/p7-groupomania.git
```

## Base de données
___

### Sequelize

Vérifiez la présence de Sequelize en entrant dans le terminal:
```
sequelize --help
```
* Si l'aide aux commandes Sequelize s'affiche, Sequelize est déjà installé,

* Sinon, installez [Sequelize](https://sequelize.org/ "Sequelize").


### Server

Installez / lancez le server SQL adapté à votre système d'exploitation :
* MAMP (IOS)
* LAMP (Linux)
* WAMP (Windows)


Créez trois nouvelles bases de données :

* groupomania_development
* groupomania_test
* groupomania_production

### Credentials

Le projet utilise les variables d'environnement :

A la racine du dossier Backend, créez un fichier .env.

Ajouter y vos credentials de base de données pour associer votre server Nodejs à votre base de données. Vous trouverez les username, password et port de votre base dans les paramètres du server.
  
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
### Migration

Réalisez une migration pour appliquer les paramètres du projet à vos bases de données :
```
npx sequelize-cli db:migrate
```

### Peupler la base de donnée avec des seeders

Si vous souhaitez tester le projet dans sa globalité, des données de test sont intégrées au projet et peuvent être insérées dans votre base de donnée.

Dans le fichier .env de votre Backend, ajoutez la variables USER_PASSWORD qui vous servira de mot de passe de connexion pour tous les utilisateurs fictifs. Ce mot de passe sera stocké sous forme hashée dans la base de donnée.

```
USER_PASSWORD = "xxxxxxx"
```

Le mot de passe doit respecter le format password indiqué par les regex.
(voir backend/controllers/userControllers.js)

Vous trouvez les emails de connexion des utilisateurs fictifs dans le fichier demo-user.js des seeders.

Lancez la commande suivante pour peupler la base de donnée :

```
npx sequelize-cli db:seed:all
```

Les données de test peuvent être supprimées de la base avec :

```
npx sequelize-cli db:seed:undo:all
```

Les données fictives étant enregistrée en dur dans les fichiers de seeders, elles peuvent entrer en conflit avec d'éventuelles données déjà ajoutées à la base.

Pour éviter ces conflits :

* Assurez-vous que votre base de données soit vide avant de la peupler. Utilisez la commande précédante (npx sequelize-cli db:seed:undo:all) pour vider la base,


* Si vous souhaitez garder les données déjà présentes dans la base, modifiez les données fictives avant de les insérer à la base (backend/seeders), en particulier les id qui doivent être uniques.

Les données de test utilisent des images, stockées dans backend/images. Lors de l'utilisation de l'application, ces images peuvent être supprimées du server (lors de la modification d'un post, d'un photo de profil, ...). Vous trouverez donc un backup des images de test dans backend/images-test.

## Backend
___
Déplacez-vous dans le dossier Backend et installez les dépendances :

```
cd backend
npm install
```


Dans le fichier .env du backend, ajoutez votre token d'authentification, vous permettant les échanges entre les serveurs frontend et backend. La String qui constitue le token doit être complexe pour en renforcer la sécurité.

  ```
  JWT_SECRET_TOKEN = "xxxxxxxxxxxx"
  ```

Vous pouvez lancer le server Nodejs grâce à Nodemon.

```
nodemon serve
```
Le server est accessible à localhost:3000.

## Frontend
___
Déplacez-vous dans le dossier Frontend et installez les dépendances :

```
cd frontend
npm install
```

Le server frontend utilise les variables d'environnement :

A la racine du dossier Frontend, créez un fichier .env.

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