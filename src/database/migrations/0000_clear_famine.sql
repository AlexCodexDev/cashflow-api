CREATE TABLE `category` (
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`icon` varchar(50),
	`color` varchar(10),
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `category_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `contact` (
	`code` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(255),
	`address` text,
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `contact_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`icon` varchar(50),
	`color` varchar(10),
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `payment_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`color` varchar(10),
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `tag_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`code` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`birthDate` timestamp,
	`phone` varchar(20) NOT NULL,
	`gender` enum('NONE','MAN','WOMAN') DEFAULT 'NONE',
	`role` enum('USER','ADMIN') DEFAULT 'USER',
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `users_code` PRIMARY KEY(`code`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `wallet` (
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`type` enum('CASH','BANK','E_WALLET') DEFAULT 'CASH',
	`description` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `wallet_code` PRIMARY KEY(`code`)
);
