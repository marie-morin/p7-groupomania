-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  Dim 01 nov. 2020 à 17:33
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `groupomania_development`
--

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL,
  `usersLiked` varchar(255) DEFAULT NULL,
  `usersDisliked` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL,
  `usersLiked` varchar(255) DEFAULT NULL,
  `usersDisliked` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`id`, `userId`, `title`, `content`, `likes`, `dislikes`, `usersLiked`, `usersDisliked`, `createdAt`, `updatedAt`) VALUES
(3, 25, 'Je suis un super Titre', 'Je suis un contenu qui essai de passer', NULL, NULL, NULL, NULL, '2020-10-16 09:09:31', '2020-10-16 09:09:31'),
(4, 25, 'Je suis contente', 'J\'ai réussi un truc', NULL, NULL, NULL, NULL, '2020-10-16 09:13:16', '2020-10-16 09:13:16'),
(5, 25, 'Je fais un test', 'Je verifier que l\'affichage de mon champ est correct', NULL, NULL, NULL, NULL, '2020-10-16 09:14:48', '2020-10-16 09:14:48'),
(6, 25, 'J\'écris un post', 'Le contenu du post', NULL, NULL, NULL, NULL, '2020-10-16 17:29:58', '2020-10-16 17:29:58');

-- --------------------------------------------------------

--
-- Structure de la table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20201002074834-create-user.js'),
('20201002074843-create-post.js'),
('20201002074849-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `firstname`, `lastname`, `username`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(25, 'isabelle@gmail.com', '$2b$10$DTG2yRvC.gxwxQTxC8i2K.VLI6Ta17Tgmx6MwXqT4e/JEJLsFt9T.', 'Isabelle', 'Morin', 'Isabelle Morin', 'Je suis une maman !', 0, '2020-10-15 13:20:49', '2020-10-15 13:20:49'),
(27, 'thomas@gmail.com', '$2b$10$FlXYsMXC42DdisEtdvUzgeDzRIH3HmLCpXSM/O9tf/JIFi2OQbBau', 'Thomas', 'Claireau', 'Thomas Claireau', 'Je suis un chouette type', 0, '2020-10-15 13:28:10', '2020-10-15 13:28:10'),
(28, 'marie@gmail.com', '$2b$10$sxWKfWGQLp5c6NsNhl0zmuQ2luyhF8dha3/CtYDr.dK.v/PelzEjy', 'Marie', 'Morin', 'Marie Morin', 'Je suis une fille', 0, '2020-11-01 11:33:17', '2020-11-01 11:33:17'),
(29, 'neva@gmail.com', '$2b$10$s.VCWjgN98Bw0d5KQ1KhhuwP491XzKxqIPIbfk2NCTq9xQuJhGQyS', 'Neva', 'Claireau', 'Neva Claireau', 'Je suis une chatte', 0, '2020-11-01 11:35:44', '2020-11-01 11:35:44');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);