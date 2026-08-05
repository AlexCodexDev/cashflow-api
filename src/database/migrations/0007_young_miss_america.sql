CREATE TABLE `transaction` (
	`code` varchar(50) NOT NULL,
	`categoryCode` varchar(50) NOT NULL,
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
	CONSTRAINT `transaction_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
ALTER TABLE `finance_book_tag` RENAME COLUMN `financeBookCode` TO `transactionCode`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_book_categoryCode_category_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_book_paymentCode_payment_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_book_walletCode_wallet_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_book_contactCode_contact_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book_tag` DROP FOREIGN KEY `finance_book_tag_financeBookCode_finance_book_code_fk`;
--> statement-breakpoint
ALTER TABLE `wallet` MODIFY COLUMN `paymentCode` varchar(50);--> statement-breakpoint
ALTER TABLE `finance_book` ADD `logo` text;--> statement-breakpoint
ALTER TABLE `wallet` ADD `financeBookCode` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` ADD `openingBalance` decimal(12,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` ADD `currentBalance` decimal(12,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_categoryCode_category_code_fk` FOREIGN KEY (`categoryCode`) REFERENCES `category`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_walletCode_wallet_code_fk` FOREIGN KEY (`walletCode`) REFERENCES `wallet`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_contactCode_contact_code_fk` FOREIGN KEY (`contactCode`) REFERENCES `contact`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book_tag` ADD CONSTRAINT `finance_book_tag_transactionCode_transaction_code_fk` FOREIGN KEY (`transactionCode`) REFERENCES `transaction`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_financeBookCode_finance_book_code_fk` FOREIGN KEY (`financeBookCode`) REFERENCES `finance_book`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `categoryCode`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `paymentCode`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `walletCode`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `contactCode`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `amount`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `type`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `icon`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP COLUMN `color`;--> statement-breakpoint
ALTER TABLE `wallet` DROP COLUMN `description`;