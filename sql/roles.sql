CREATE TABLE `roles`
(
  `id`         int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created`    datetime     NOT NULL,
  `modified`   datetime     NOT NULL,
  PRIMARY KEY (`id`)
)
