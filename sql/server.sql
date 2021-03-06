CREATE table `server` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `admin_password` varchar(100),
    `allowed_file_patching` boolean,
    `auto_start` server.auto_start,
    `battle_eye` boolean DEFAULT false,
    `file_patching` boolean DEFAULT false,
    `forcedDifficulty` varchar(100),
    `max_players` int(100),
    `missions` server.missions,
    `mods` varchar(1000),
    `motd` varchar(1000),
    `number_of_headless_clients` int(10),
    `parameters` varchar(100),
    `password` varchar(50),
    `persistent` boolean DEFAULT true,
    `port` int(4),
    `title` varchar(50),
    `von boolean` DEFAULT false,
    `verify_signatures` boolean,
    `created`    datetime     NOT NULL,
    `modified`   datetime     NOT NULL,
    PRIMARY KEY(`id`)
)