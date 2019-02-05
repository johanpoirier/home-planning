CREATE DATABASE IF NOT EXISTS `planning`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `planning`;

CREATE TABLE IF NOT EXISTS `member` (
  `id` smallint(6) NOT NULL auto_increment,
  `email` varchar(255) collate utf8_bin NOT NULL,
  `name` varchar(255) collate utf8_bin NOT NULL,
  `avatar` blob NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `task` (
  `id` smallint(6) NOT NULL auto_increment,
  `name` varchar(100) collate utf8_bin NOT NULL,
  `description` varchar(255) collate utf8_bin NOT NULL,
  `period` tinyint(3) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `plannedTask` (
  `id` int(11) NOT NULL auto_increment,
  `date` date NOT NULL,
  `memberId` smallint(6) NOT NULL,
  `taskId` smallint(6) NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY  (`id`),
  FOREIGN KEY (memberId)
          REFERENCES member(id)
          ON DELETE CASCADE,
  FOREIGN KEY (taskId)
          REFERENCES task(id)
          ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;

ALTER TABLE `plannedTask` ADD INDEX( `date`);

INSERT INTO `member` (`id`, `email`, `name`) VALUES (1, 'noah@planning.fr', 'Noah');
INSERT INTO `member` (`id`, `email`, `name`) VALUES (2, 'ely@planning.fr', 'Ely');
INSERT INTO `member` (`id`, `email`, `name`) VALUES (3, 'ian@planning.fr', 'Ian');

INSERT INTO `task` (`id`, `name`, `description`, `period`) VALUES (1, 'Mettre le couvert', '', 2);
INSERT INTO `task` (`id`, `name`, `description`, `period`) VALUES (2, 'Ranger les marchepieds', '', 0);
INSERT INTO `task` (`id`, `name`, `description`, `period`) VALUES (3, 'Pyjama', '', 2);

INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (1, '2019-02-01', 1, 1);
INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (2, '2019-02-02', 2, 1);
INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (3, '2019-02-03', 3, 1);
INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (4, '2019-02-04', 1, 1);
INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (5, '2019-02-05', 1, 1);
INSERT INTO `plannedTask` (`id`, `date`, `memberId`, `taskId`) VALUES (6, '2019-02-06', 1, 1);


CREATE USER 'planning'@'%' IDENTIFIED BY 'planning';
GRANT ALL ON planning.* TO 'planning'@'%';
