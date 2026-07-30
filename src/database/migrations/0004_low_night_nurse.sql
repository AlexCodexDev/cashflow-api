ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_paymentId_payment_code_fk`;
--> statement-breakpoint
ALTER TABLE `wallet` ADD `paymentCode` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_paymentCode_payment_code_fk` FOREIGN KEY (`paymentCode`) REFERENCES `payment`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet` DROP COLUMN `paymentId`;