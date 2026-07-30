ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_payment_id_payment_code_fk`;
--> statement-breakpoint
ALTER TABLE `wallet` ADD `paymentId` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_paymentId_payment_code_fk` FOREIGN KEY (`paymentId`) REFERENCES `payment`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet` DROP COLUMN `payment_id`;