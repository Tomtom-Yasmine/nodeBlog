
# nodeBlog

Ce projet est une API en utilisant Node.js, Express. Il permet aux utilisateurs de créer des articles, de les lire et de les commenter.


## Authors

- [@ThomasLvll](https://github.com/ThomasLvll)
- [@Yasuu19](https://github.com/Yasuu19)


## Prérequis

- Une application permettant de tester des requêtes telle que Postman.



## Fonctionnalités

Notre API permet aux utilisateurs de : 
- S'inscrire
- Se connecter
- Créer des articles, les modifier et les supprimer
- Commenter des articles ainsi que modifier et supprimer ses commentaires
- Pour les administrateurs : gérer les utilisateurs, donner le role Admin a un autre utilisateur, modifier et supprimer les utilisateurs. Il peut aussi supprimer des commentaires.
## Utilisation

- Lancer POSTMAN


    
## Routes

Toutes les routes commençant par /api sont protégées par un jeton d'authentification

### SignIn & SignUp

`POST '/signUp'` : Cette route permet à un utilisateur de s'inscrire. Elle retourne les informations de l'utilisateur connecté (sauf le password).

`POST '/signIn'` :  Cette route permet à un utilisateur de se connecter. Elle retourne le token de l'utilisateur.

### User Routes
Toutes les routes  utilisent le middleware enrichUser pour ajouter l'information du rôle de l'utilisateur connecté à la requête.

`GET '/users'` : Cette route permet de récupérer une liste de tous les utilisateurs enregistrés dans la base de données.  

`PUT '/user/:userId/grant'` :
Cette route permet de donner un rôle spécifique à un utilisateur en fonction de son ID. 

`DELETE '/user/:id'` :
Cette route permet de supprimer un utilisateur en fonction de son ID. 

### Post Routes
Toutes les routes (sauf `PUT /api/post`) utilisent le middleware enrichUser pour ajouter l'information du rôle de l'utilisateur connecté à la requête.

`GET /api/posts?[from=?]` : Cette route permet de récupérer la liste de tous les articles de blog ainsi que les commentaires associés. Elle peut prendre un paramètre optionnel from qui est une date au format timestamp qui permet de récupérer uniquement les articles créés après cette date. 

`GET /api/post/:postId` : Cette route permet de récupérer un article de blog en particulier en fonction de son identifiant. 

`PUT /api/post` : Cette route permet de mettre à jour un article de blog en fonction de son identifiant. 

`POST /api/post` : Cette route permet de créer un nouvel article de blog. Elle utilise la fonction createPost pour créer l'article.

`DELETE /api/post/:postId`: Cette route permet de supprimer un article de blog en fonction de son identifiant. 

`GET /post/:id/comments` : Cette route permet de récupérer la liste des commentaires d'un article de blog en fonction de son identifiant. 

`POST /post/:id/comment` : Cette route permet de créer un nouveau commentaire pour un article de blog en fonction de son identifiant.


### Comment Routes

`PUT /comment/:commentId` : Cette route permet de mettre à jour un commentaire en fonction de son identifiant. Seul l'auteur du commentaire peut le modifier.

`DELETE /comment/:commentId` : Cette route permet de supprimer un commentaire en fonction de l'identifiant du commentaire. Seul un admin ou l'auteur du commentaire peut effectuer cette action.

Toutes les routes utilisent le middleware enrichUser pour ajouter l'information du rôle de l'utilisateur connecté à la requête.
## Conclusion

Nous espérons que vous aimerez notre API !
