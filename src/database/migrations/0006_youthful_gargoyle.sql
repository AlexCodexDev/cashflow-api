RENAME TABLE `finance_fook` TO `finance_book`;--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_fook_categoryCode_category_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_fook_paymentCode_payment_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_fook_walletCode_wallet_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP FOREIGN KEY `finance_fook_contactCode_contact_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book_tag` DROP FOREIGN KEY `finance_book_tag_financeBookCode_finance_fook_code_fk`;
--> statement-breakpoint
ALTER TABLE `finance_book` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `finance_book` ADD PRIMARY KEY(`code`);--> statement-breakpoint
ALTER TABLE `finance_book` ADD CONSTRAINT `finance_book_categoryCode_category_code_fk` FOREIGN KEY (`categoryCode`) REFERENCES `category`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book` ADD CONSTRAINT `finance_book_paymentCode_payment_code_fk` FOREIGN KEY (`paymentCode`) REFERENCES `payment`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book` ADD CONSTRAINT `finance_book_walletCode_wallet_code_fk` FOREIGN KEY (`walletCode`) REFERENCES `wallet`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book` ADD CONSTRAINT `finance_book_contactCode_contact_code_fk` FOREIGN KEY (`contactCode`) REFERENCES `contact`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `finance_book_tag` ADD CONSTRAINT `finance_book_tag_financeBookCode_finance_book_code_fk` FOREIGN KEY (`financeBookCode`) REFERENCES `finance_book`(`code`) ON DELETE no action ON UPDATE no action;