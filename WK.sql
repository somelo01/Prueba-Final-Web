CREATE TABLE IF NOT EXISTS `WK` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `rango` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `raza` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `cantidad_tropas` int DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `WK` (`id`, `nombre`, `rango`, `raza`,`cantidad_tropas`) VALUES
(1, 'Nico', 'Soldado','Humano', 3),
(2, 'Javier', 'Capitan', 'Humano', 10),
(3, 'Diego', 'Teniente', 'Humano', 20),
(4, 'Javiera', 'Chaman', 'aldari', 25);
COMMIT;