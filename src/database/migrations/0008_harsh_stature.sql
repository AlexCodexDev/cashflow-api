RENAME TABLE `finance_book_tag` TO `transaction_tag`;--> statement-breakpoint
ALTER TABLE `transaction_tag` DROP FOREIGN KEY `finance_book_tag_transactionCode_transaction_code_fk`;
--> statement-breakpoint
ALTER TABLE `transaction_tag` DROP FOREIGN KEY `finance_book_tag_tagCode_tag_code_fk`;
--> statement-breakpoint
ALTER TABLE `transaction_tag` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `transaction_tag` ADD PRIMARY KEY(`code`);--> statement-breakpoint
ALTER TABLE `finance_book` ADD `deletedAt` timestamp;--> statement-breakpoint
ALTER TABLE `transaction_tag` ADD CONSTRAINT `transaction_tag_transactionCode_transaction_code_fk` FOREIGN KEY (`transactionCode`) REFERENCES `transaction`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction_tag` ADD CONSTRAINT `transaction_tag_tagCode_tag_code_fk` FOREIGN KEY (`tagCode`) REFERENCES `tag`(`code`) ON DELETE no action ON UPDATE no action;