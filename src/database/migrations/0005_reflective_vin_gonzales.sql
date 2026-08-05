CREATE TABLE `finance_fook` (
	`code` varchar(50) NOT NULL,
	`categoryCode` varchar(50) NOT NULL,
	`paymentCode` varchar(50) NOT NULL,
	`walletCode` varchar(50) NOT NULL,
	`contactCode` varchar(50),
	`name` varchar(100) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`type` enum('INCOME','EXPENSE') NOT NULL,
	`icon` varchar(50),
	`color` varchar(20),
	`description` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	CONSTRAINT `finance_fook_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `finance_book_tag` (
	`code` varchar(50) NOT NULL,
	`financeBookCode` varchar(50) NOT NULL,
	`tagCode` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp,
	CONSTRAINT `finance_book_tag_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
ALTER TABLE `finance_fook` ADD CONSTRAINT `finance_fook_categoryCode_category_code_fk` FOREIGN KEY (`categoryCode`) REFERENCES `category`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_fook` ADD CONSTRAINT `finance_fook_paymentCode_payment_code_fk` FOREIGN KEY (`paymentCode`) REFERENCES `payment`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_fook` ADD CONSTRAINT `finance_fook_walletCode_wallet_code_fk` FOREIGN KEY (`walletCode`) REFERENCES `wallet`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_fook` ADD CONSTRAINT `finance_fook_contactCode_contact_code_fk` FOREIGN KEY (`contactCode`) REFERENCES `contact`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book_tag` ADD CONSTRAINT `finance_book_tag_financeBookCode_finance_fook_code_fk` FOREIGN KEY (`financeBookCode`) REFERENCES `finance_fook`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book_tag` ADD CONSTRAINT `finance_book_tag_tagCode_tag_code_fk` FOREIGN KEY (`tagCode`) REFERENCES `tag`(`code`) ON DELETE no action ON UPDATE no action;