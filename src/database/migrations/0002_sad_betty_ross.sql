ALTER TABLE `wallet` ADD `payment_id` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_payment_id_payment_code_fk` FOREIGN KEY (`payment_id`) REFERENCES `payment`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet` DROP COLUMN `type`;