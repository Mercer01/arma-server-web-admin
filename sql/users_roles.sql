CREATE TABLE `users_roles`
(
  `id`         int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `role_id`  varchar(100) NOT NULL,
  `created`    datetime     NOT NULL,
  `modified`   datetime     NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)

)
