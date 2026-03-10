CREATE TABLE `blockedTimes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL,
	`reason` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blockedTimes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `owner` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `owner_id` PRIMARY KEY(`id`),
	CONSTRAINT `owner_username_unique` UNIQUE(`username`)
);
