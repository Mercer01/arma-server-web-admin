CREATE TABLE `role_permissions`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(100) NOT NULL,
  `see_dashboard` boolean DEFAULT False,
  `see_security` boolean DEFAULT false,
  `see_user` boolean DEFAULT false,
  `create_user` boolean DEFAULT false,
  `update_user` boolean DEFAULT false,
  `delete_user` boolean DEFAULT false,
  `see_role` boolean DEFAULT false,
  `create_role` boolean DEFAULT false,
  `update_role` boolean DEFAULT false,
  `delete_role` boolean DEFAULT false,
  `see_permission` boolean DEFAULT false,
  `create_permission` boolean DEFAULT false,
  `update_permission` boolean DEFAULT false,
  `delete_permission` boolean DEFAULT false,
  `see_server` boolean DEFAULT false,
  `create_server` boolean DEFAULT false,
  `update_server` boolean DEFAULT false,
  `delete_server` boolean DEFAULT false,
  `manage_server` boolean DEFAULT false,
  `config_server_server` boolean DEFAULT false,
  `config_server_difficulty` boolean DEFAULT false,
  `service_server` boolean DEFAULT false,
  `mission_upload` boolean DEFAULT false,
  `see_all_servers` boolean DEFAULT false,
  `delete_mission` boolean DEFAULT false,
  `edit_profile` boolean DEFAULT false,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);