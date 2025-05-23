CREATE DATABASE  IF NOT EXISTS `hopeconnect` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hopeconnect`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: hopeconnect
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign_donations`
--

DROP TABLE IF EXISTS campaign_donations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE campaign_donations (
  id int NOT NULL AUTO_INCREMENT,
  campaign_id int DEFAULT NULL,
  user_id int DEFAULT NULL,
  amount decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY campaign_id (campaign_id),
  KEY user_id (user_id),
  CONSTRAINT campaign_donations_ibfk_1 FOREIGN KEY (campaign_id) REFERENCES emergency_campaigns (campaign_id),
  CONSTRAINT campaign_donations_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_donations`
--

LOCK TABLES campaign_donations WRITE;
/*!40000 ALTER TABLE campaign_donations DISABLE KEYS */;
INSERT INTO campaign_donations VALUES (7,1,3,100.50),(8,2,2,50.00),(9,1,3,200.75),(10,4,5,500.00);
/*!40000 ALTER TABLE campaign_donations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS deliveries;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE deliveries (
  delivery_id int NOT NULL AUTO_INCREMENT,
  donation_id int DEFAULT NULL,
  `status` enum('pending','in_transit','done') DEFAULT NULL,
  assigned_to varchar(255) DEFAULT NULL,
  location varchar(255) DEFAULT NULL,
  PRIMARY KEY (delivery_id),
  KEY donation_id (donation_id),
  CONSTRAINT deliveries_ibfk_1 FOREIGN KEY (donation_id) REFERENCES donations (donation_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES deliveries WRITE;
/*!40000 ALTER TABLE deliveries DISABLE KEYS */;
INSERT INTO deliveries VALUES (1,1,'pending','John Doe','123 Main St, City, Country'),(2,2,'in_transit','Jane Smith','456 Oak St, City, Country'),(3,3,'done','Alex Brown','789 Pine St, City, Country');
/*!40000 ALTER TABLE deliveries ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_tracking`
--

DROP TABLE IF EXISTS donation_tracking;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE donation_tracking (
  tracking_id int NOT NULL AUTO_INCREMENT,
  donation_id int NOT NULL,
  `status` varchar(50) NOT NULL,
  update_message text NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tracking_id),
  KEY fk_donation_tracking_donation_id (donation_id),
  CONSTRAINT fk_donation_tracking_donation_id FOREIGN KEY (donation_id) REFERENCES donations (donation_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_tracking`
--

LOCK TABLES donation_tracking WRITE;
/*!40000 ALTER TABLE donation_tracking DISABLE KEYS */;
/*!40000 ALTER TABLE donation_tracking ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS donations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE donations (
  donation_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  orphanage_id int DEFAULT NULL,
  `type` enum('money','clothes','food','toys','books','medical','equipment','other') DEFAULT NULL,
  category enum('general','education','healthcare','housing','emergency','food','clothing','medical','other') DEFAULT NULL,
  amount decimal(10,2) DEFAULT NULL,
  details text,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (donation_id),
  KEY user_id (user_id),
  KEY orphanage_id (orphanage_id),
  CONSTRAINT donations_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT donations_ibfk_2 FOREIGN KEY (orphanage_id) REFERENCES orphanages (orphanage_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES donations WRITE;
/*!40000 ALTER TABLE donations DISABLE KEYS */;
INSERT INTO donations VALUES (1,1,1,'money','general',100.00,'Donation for general needs at Hope Orphanage','2025-05-09 17:54:13'),(2,2,2,'clothes','clothing',NULL,'Clothes donated for children at Sunshine Home','2025-05-09 17:54:13'),(3,3,3,'books','education',NULL,'Books donated for educational purposes at Future Care Center','2025-05-09 17:54:13');
/*!40000 ALTER TABLE donations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergency_campaigns`
--

DROP TABLE IF EXISTS emergency_campaigns;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE emergency_campaigns (
  campaign_id int NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  `description` text,
  `status` tinyint(1) DEFAULT NULL,
  start_date date DEFAULT NULL,
  location varchar(255) DEFAULT NULL,
  PRIMARY KEY (campaign_id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_campaigns`
--

LOCK TABLES emergency_campaigns WRITE;
/*!40000 ALTER TABLE emergency_campaigns DISABLE KEYS */;
INSERT INTO emergency_campaigns VALUES (1,'Fundraising for Education','Campaign to raise funds for education in orphanages',1,'2025-06-01','Nablus, West Bank'),(2,'Medical Aid for Children','Campaign to provide medical supplies for orphanages',1,'2025-05-15','Nablus, West Bank'),(3,'Food Distribution','Campaign to distribute food to orphanages in need',0,'2025-07-10','Nablus, West Bank'),(4,'Medical Emergency - Gaza','We need immediate supplies for child care units.',1,'2025-05-13','Tulkarm, West Bank'),(5,'teaching Emergency - Gaza','We need immediate supplies for child care units.',1,'2025-05-14','Tulkarm, West Bank'),(6,'Food Crisis in Jenin','We need urgent support for orphanages in Jenin.',1,'2025-05-14','Jenin, Palestine'),(7,'Emergency Winter Support','We need warm blankets and jackets in Nablus area.',1,'2025-05-14','منتجع حياة نابلس, Tunis, رفيديا البلد, نابلس, منطقة أ, الضفة الغربية, +970, Palestinian Territory'),(8,'Emergency Winter Support','We need warm blankets and jackets in Nablus area.',1,'2025-05-14','Palestine, Zeita - Illar, علار, منطقة أ, الضفة الغربية, 113, Palestinian Territory'),(10,'Emergency Winter Support','We need warm blankets and jackets in palestine area.',1,'2025-05-14',NULL),(11,'Emergency Winter Support','We need warm blankets and jackets in palestine area.',1,'2025-05-14',NULL);
/*!40000 ALTER TABLE emergency_campaigns ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS matches;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE matches (
  match_id int NOT NULL AUTO_INCREMENT,
  request_id int DEFAULT NULL,
  volunteer_id int DEFAULT NULL,
  PRIMARY KEY (match_id),
  KEY request_id (request_id),
  KEY volunteer_id (volunteer_id),
  CONSTRAINT matches_ibfk_1 FOREIGN KEY (request_id) REFERENCES requests (request_id),
  CONSTRAINT matches_ibfk_2 FOREIGN KEY (volunteer_id) REFERENCES users (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES matches WRITE;
/*!40000 ALTER TABLE matches DISABLE KEYS */;
INSERT INTO matches VALUES (1,1,1),(2,2,2),(3,3,3),(4,1,1),(7,5,2);
/*!40000 ALTER TABLE matches ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orphanages`
--

DROP TABLE IF EXISTS orphanages;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE orphanages (
  orphanage_id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  verified tinyint(1) DEFAULT NULL,
  address text,
  contact_email varchar(100) DEFAULT NULL,
  manager_id int DEFAULT NULL,
  PRIMARY KEY (orphanage_id),
  KEY fk_orphanage_manager (manager_id),
  CONSTRAINT fk_orphanage_manager FOREIGN KEY (manager_id) REFERENCES users (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orphanages`
--

LOCK TABLES orphanages WRITE;
/*!40000 ALTER TABLE orphanages DISABLE KEYS */;
INSERT INTO orphanages VALUES (1,'Hope Orphanage',1,'123 Hope St, Cityville','s12113094@stu.najah.edu',NULL),(2,'Sunshine Home',0,'456 Sunshine Ave, Brighttown','s12113094@stu.najah.edu',NULL),(3,'Future Care Center',1,'789 Future Rd, Dreamcity','support@futurecare.org',NULL);
/*!40000 ALTER TABLE orphanages ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orphans`
--

DROP TABLE IF EXISTS orphans;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE orphans (
  orphan_id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  age int DEFAULT NULL,
  education text,
  health text,
  orphanage_id int DEFAULT NULL,
  profile_img varchar(255) DEFAULT NULL,
  PRIMARY KEY (orphan_id),
  KEY orphanage_id (orphanage_id),
  CONSTRAINT orphans_ibfk_1 FOREIGN KEY (orphanage_id) REFERENCES orphanages (orphanage_id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orphans`
--

LOCK TABLES orphans WRITE;
/*!40000 ALTER TABLE orphans DISABLE KEYS */;
INSERT INTO orphans VALUES (1,'Emma Williams',7,'Kindergarten','Good health, no issues',1,'emma.jpg'),(2,'Liam Johnson',12,'Primary School','Needs medical checkup',2,'liam.jpg'),(3,'Sophia Brown',9,'Elementary School','Asthma, needs care',3,'sophia.jpg'),(4,'mariam',12,'Grad4','Healthy',2,NULL),(5,'noor',8,'Not Studieng','Healthy',1,NULL),(6,'Ali',10,'Grade4','Healthy',3,NULL),(7,'Alia',10,'Grade4','Healthy',2,'1746966496453-p6.jpg');
/*!40000 ALTER TABLE orphans ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orphanupdates`
--

DROP TABLE IF EXISTS orphanupdates;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE orphanupdates (
  update_id int NOT NULL AUTO_INCREMENT,
  orphan_id int NOT NULL,
  `type` enum('medical','education','general') NOT NULL,
  `description` text NOT NULL,
  media_url varchar(255) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (update_id),
  KEY orphan_id (orphan_id),
  CONSTRAINT orphanupdates_ibfk_1 FOREIGN KEY (orphan_id) REFERENCES orphans (orphan_id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orphanupdates`
--

LOCK TABLES orphanupdates WRITE;
/*!40000 ALTER TABLE orphanupdates DISABLE KEYS */;
INSERT INTO orphanupdates 
VALUES (
  1, 
  1, 
  'education', 
  'Child started school again', 
  'C:\\Users\\97059\\Desktop\\All Semesters\\2''nd semester 2024-2025\\Advanced software\\Project_hopeconnect\\uploads\\p1.jpg', 
  '2025-05-11 11:32:37'
);
/*!40000 ALTER TABLE orphanupdates ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transactions`
--

DROP TABLE IF EXISTS payment_transactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE payment_transactions (
  transaction_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  donation_id int DEFAULT NULL,
  amount decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') NOT NULL,
  gateway_response text,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (transaction_id),
  KEY user_id (user_id),
  KEY donation_id (donation_id),
  CONSTRAINT payment_transactions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT payment_transactions_ibfk_2 FOREIGN KEY (donation_id) REFERENCES donations (donation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transactions`
--

LOCK TABLES payment_transactions WRITE;
/*!40000 ALTER TABLE payment_transactions DISABLE KEYS */;
/*!40000 ALTER TABLE payment_transactions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS requests;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE requests (
  request_id int NOT NULL AUTO_INCREMENT,
  orphanage_id int DEFAULT NULL,
  service_type enum('teaching','medical','counseling','administration','maintenance','other') DEFAULT NULL,
  `description` text,
  needed_date date DEFAULT NULL,
  number_of_orphanages int DEFAULT NULL,
  PRIMARY KEY (request_id),
  KEY orphanage_id (orphanage_id),
  CONSTRAINT requests_ibfk_1 FOREIGN KEY (orphanage_id) REFERENCES orphanages (orphanage_id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES requests WRITE;
/*!40000 ALTER TABLE requests DISABLE KEYS */;
INSERT INTO requests VALUES (1,1,'teaching','Request for teaching staff to help with English and Math','2025-06-15',3),(2,2,'medical','Request for medical supplies for children','2025-05-20',2),(3,3,'counseling','Request for counselors to assist with trauma recovery','2025-07-10',4),(4,1,'teaching','We need volunteers to help with teaching math to orphans.','2025-05-20',1),(5,2,'medical','We need volunteers to help with firstaidkit for orphans.','2025-05-14',12);
/*!40000 ALTER TABLE requests ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS reviews;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE reviews (
  review_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  orphanage_id int DEFAULT NULL,
  rating int DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (review_id),
  KEY user_id (user_id),
  KEY orphanage_id (orphanage_id),
  CONSTRAINT reviews_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT reviews_ibfk_2 FOREIGN KEY (orphanage_id) REFERENCES orphanages (orphanage_id),
  CONSTRAINT reviews_chk_1 CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES reviews WRITE;
/*!40000 ALTER TABLE reviews DISABLE KEYS */;
INSERT INTO reviews VALUES (1,1,2,5,'This orphanage provides excellent care for the children.'),(2,3,1,4,'Good facilities and caring staff, but more activities are needed.'),(3,2,3,3,'The orphanage is decent, but the children need more educational support.');
/*!40000 ALTER TABLE reviews ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsorships`
--

DROP TABLE IF EXISTS sponsorships;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE sponsorships (
  sponsorship_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  orphan_id int DEFAULT NULL,
  `type` enum('monthly','one-time') DEFAULT NULL,
  amount decimal(10,2) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  PRIMARY KEY (sponsorship_id),
  KEY user_id (user_id),
  KEY orphan_id (orphan_id),
  CONSTRAINT sponsorships_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT sponsorships_ibfk_2 FOREIGN KEY (orphan_id) REFERENCES orphans (orphan_id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsorships`
--

LOCK TABLES sponsorships WRITE;
/*!40000 ALTER TABLE sponsorships DISABLE KEYS */;
INSERT INTO sponsorships VALUES (1,1,1,'monthly',50.00,'2025-01-01',NULL),(2,2,2,'one-time',100.00,'2025-03-15','2025-04-15'),(3,3,3,'monthly',30.00,'2025-02-01',NULL),(7,7,4,'monthly',400.00,'2025-05-11',NULL),(8,5,1,'one-time',400.00,'2025-05-11',NULL);
/*!40000 ALTER TABLE sponsorships ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','donor','volunteer','orphanageManager','sponsor','driver') DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users VALUES (1,'John Doe','john.doe@example.com','hashed_password_1','admin','2025-05-09 17:44:14'),(2,'Alice Smith','s12113094@stu.najah.edu','hashed_password_2','donor','2025-05-09 17:44:14'),(3,'Bob Johnson','bob.johnson@example.com','hashed_password_3','volunteer','2025-05-09 17:44:14'),(4,'Raghad THawabi','Raghad.tha@example.com','$2b$10$uJ4fq9Ow.iiqVqURTm10hehCUy4QCfVhD6UH3wo9S4mLfHUgWOVuW','donor','2025-05-10 12:20:46'),(5,' Hala','Hala.doe@example.com','$2b$10$77PxWZORZKoxppIyEEJyU.YfhmAVyhGpNUIm0FALMSD6End4uGVEa','sponsor','2025-05-10 12:45:13'),(6,' Fraha','Farah.doe@example.com','$2b$10$p88JzYOyHGlwhsds825jPexyB76dzsPb9L4.8IXYipxXHBebvJ6RC','donor','2025-05-10 14:27:51'),(7,' rere','rere.doe@example.com','$2b$10$KZY08z3Ccia2IcTMa1XG1.qxTlodXN2Q8zuDVYm1R1sYmFSViq8VW','sponsor','2025-05-11 10:31:05'),(8,' waleed','waleed.doe@example.com','$2b$10$7g/1lDQePiPuJxWKKnpJxOoTTBb2/L6J66ZV7Z.rt7AkB/Q57QfO2','admin','2025-05-11 11:29:37'),(9,' zain','zain.doe@example.com','$2b$10$V.YZLfXVMNL.yr6fn8jreebE8QaacoIkvvBQeCN5x6SMk49usXWUq','volunteer','2025-05-11 20:36:47'),(10,' reem','reem.doe@example.com','$2b$10$bWIB9jjLI8AeBEj/ywjOPO3QaJdfIUwUFlJdB3J7aHdRKL3GOVJ3y','orphanageManager','2025-05-12 08:55:16'),(11,' rola','rola.doe@example.com','$2b$10$L1YYHzhz11sCo9ZLax1.ie1GG9ErnhcCVYuelXMjbBU2uQDhaByoS','orphanageManager','2025-05-12 11:49:30');
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS volunteers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE volunteers (
  volunteer_id int NOT NULL,
  service_type enum('teaching','medical','counseling','administration','maintenance','other') DEFAULT NULL,
  availability enum('weekdays','weekends','evenings','mornings','flexible','on-call','other') DEFAULT NULL,
  PRIMARY KEY (volunteer_id),
  CONSTRAINT volunteers_ibfk_1 FOREIGN KEY (volunteer_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteers`
--

LOCK TABLES volunteers WRITE;
/*!40000 ALTER TABLE volunteers DISABLE KEYS */;
INSERT INTO volunteers VALUES (1,'teaching','weekends'),(2,'medical','weekdays'),(3,'counseling','evenings'),(9,'teaching','weekdays');
/*!40000 ALTER TABLE volunteers ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hopeconnect'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16 13:42:56


CREATE TABLE delivery_tracking (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  delivery_id INT,
  status ENUM('pending','in_transit','done') NOT NULL,
  location VARCHAR(255),
  current_lat DOUBLE,
  current_lng DOUBLE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (delivery_id) REFERENCES deliveries(delivery_id)
);

CREATE TABLE drivers (
  driver_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  is_available BOOLEAN DEFAULT TRUE
);


ALTER TABLE deliveries 
  ADD COLUMN lat DECIMAL(10, 8) DEFAULT NULL,
  ADD COLUMN lng DECIMAL(11, 8) DEFAULT NULL,
ADD COLUMN delivery_time DATETIME DEFAULT NULL,
  ADD COLUMN driver_id INT DEFAULT NULL,
  ADD FOREIGN KEY (driver_id) REFERENCES drivers(driver_id);

CREATE TABLE delivery_log (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  delivery_id INT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  status ENUM('pending','in_transit','done'),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (delivery_id) REFERENCES deliveries(delivery_id)
);
