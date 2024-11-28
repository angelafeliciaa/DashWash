-- Drop all tables to reset

DROP TABLE IF EXISTS ReportsFeedback;
DROP TABLE IF EXISTS Pays;
DROP TABLE IF EXISTS Manages;
DROP TABLE IF EXISTS Washer;
DROP TABLE IF EXISTS WashTypeSession;
DROP TABLE IF EXISTS Dryer;
DROP TABLE IF EXISTS DryTypeSession;
DROP TABLE IF EXISTS ResidenceManager;
DROP TABLE IF EXISTS RecordsTransaction;
DROP TABLE IF EXISTS Repairs;
DROP TABLE IF EXISTS Technician;
DROP TABLE IF EXISTS ResidenceLaundryMachine;
DROP TABLE IF EXISTS LoadsWashingCard;
DROP TABLE IF EXISTS UserLivesIn;
DROP TABLE IF EXISTS CampusResidence;

-- CampusResidence Table
CREATE TABLE CampusResidence (
    bid INT PRIMARY KEY,
    bname VARCHAR(20) NOT NULL UNIQUE,
    address VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO CampusResidence (bid, bname, address) VALUES
(1, 'Marine Drive', '5000 Student Union Blvd'),
(2, 'Ponderosa Commons', '5100 Student Union Blvd'),
(3, 'Brock Commons', '5200 Student Union Blvd'),
(4, 'Exchange', '5300 Student Union Blvd'),
(5, 'Thunderbird', '5400 Student Union Blvd');

-- UserLivesIn Table
CREATE TABLE UserLivesIn (
    uid UUID PRIMARY KEY,
    bid INT NOT NULL,
    uname VARCHAR(20) NOT NULL DEFAULT 'User',
    uemail VARCHAR(50) NOT NULL UNIQUE, 
    upassword VARCHAR(50) NOT NULL, 
    FOREIGN KEY (bid) REFERENCES CampusResidence(bid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO UserLivesIn (uID, bid, uname, uemail, upassword) VALUES
('1650bab4-6943-441e-a3af-6bd7f79f95ca', 1, 'John Doe', 'johndoe@gmail.com', 'upassword1'),
('1650bab4-6943-441e-a3af-6bd7f79f95cb', 2, 'Jane Smith', 'janesmith@gmail.com', 'upassword2'),
('1650bab4-6943-441e-a3af-6bd7f79f95cc', 3, 'Bob Johnson', 'bobjohnson@gmail.com', 'upassword3'),
('1650bab4-6943-441e-a3af-6bd7f79f95cd', 4, 'Alice Brown', 'alicebrown@gmail.com', 'upassword4'),
('1650bab4-6943-441e-a3af-6bd7f79f95ce', 5, 'Charlie Davis', 'charliedavis@gmail.com', 'upassword5'),
('1650bab4-6943-441e-a3af-6bd7f79f95c1', 5, 'George White', 'georgewhite@gmail.com', 'upassword6'),
('1650bab4-6943-441e-a3af-6bd7f79f95c2', 5, 'Cindy Moris', 'cindymoris@gmail.com', 'upassword6' ),
('1650bab4-6943-441e-a3af-6bd7f79f95c3', 5, 'Fiona Fores', 'fionafores@gmail.com', 'upassword6'),
('1650bab4-6943-441e-a3af-6bd7f79f95c4', 5, 'Jason Wong', 'jasonwong@gmail.com', 'upassword6'),
('1650bab4-6943-441e-a3af-6bd7f79f95c5', 5, 'Amanda Welson', 'amandawelson@gmail.com', 'upassword6');

-- ResidenceLaundryMachine Table
CREATE TABLE ResidenceLaundryMachine (
    bid INT,
    lid INT,
    brand VARCHAR(15) DEFAULT 'Coinamatic',
    model VARCHAR(20),
    washing_status VARCHAR(20) NOT NULL,
    PRIMARY KEY (bid, lid),
    FOREIGN KEY (bid) REFERENCES CampusResidence(bid) 
	ON UPDATE CASCADE
ON DELETE CASCADE
);

INSERT INTO ResidenceLaundryMachine (bid, lid, brand, model, washing_status) VALUES
(1, 1, 'Coinamatic', 'WM100', 'Available'),
(1, 2, 'Coinamatic', 'DM200', 'In use'),
(2, 1, 'Samsung', 'Commercial', 'Available'),
(2, 2, 'Samsung', 'DryerPro', 'Available'),
(3, 1, 'LG', 'TurboWash', 'Out of order'),
(3, 2, 'LG', 'DryerMax', 'Available'),
(4, 1, 'Coinamatic', 'WM100', 'Available'),
(4, 2, 'Coinamatic', 'DryerPro', 'Available'),
(5, 1, 'Coinamatic', 'WM100', 'Available'),
(5, 2, 'Coinamatic', 'DryerPro', 'Available');


-- ReportsFeedback Table
CREATE TABLE ReportsFeedback (
    fid INT PRIMARY KEY,
    uid UUID NOT NULL,
    bid INT, 
    lid INT, 
    feedbackType VARCHAR(20),
    comments VARCHAR(70) NOT NULL,
    FOREIGN KEY (uid) REFERENCES UserLivesIn(uid),
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO ReportsFeedback (fid, uid, bid, lid, FeedbackType, Comments) VALUES
(1, '1650bab4-6943-441e-a3af-6bd7f79f95ca', 1, 1, 'Complaint', 'Machine not working'),
(2, '1650bab4-6943-441e-a3af-6bd7f79f95cb', 2, 2, 'Suggestion', 'Need more dryers'),
(3, '1650bab4-6943-441e-a3af-6bd7f79f95cc', 3, 1, 'Complaint', 'Not working'),
(4, '1650bab4-6943-441e-a3af-6bd7f79f95cd', 4, 1, 'Complaint', 'Card reader malfunctioning'),
(5, '1650bab4-6943-441e-a3af-6bd7f79f95cd', 4, 2, 'Complaint', 'Out of Order'),
(6, '1650bab4-6943-441e-a3af-6bd7f79f95cc', 3, 2, 'Complaint', 'Not working');

-- LoadsWashingCard Table
CREATE TABLE LoadsWashingCard (
    cid UUID PRIMARY KEY,
    uid UUID NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    FOREIGN KEY (uid) REFERENCES UserLivesIn(uid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO LoadsWashingCard (cid, uid, Balance) VALUES
('1650bab4-6943-441e-a3af-6bd7f79f95da', '1650bab4-6943-441e-a3af-6bd7f79f95ca', 50),
('1650bab4-6943-441e-a3af-6bd7f79f95db', '1650bab4-6943-441e-a3af-6bd7f79f95cb', 15),
('1650bab4-6943-441e-a3af-6bd7f79f95dc', '1650bab4-6943-441e-a3af-6bd7f79f95cc', 30),
('1650bab4-6943-441e-a3af-6bd7f79f95dd', '1650bab4-6943-441e-a3af-6bd7f79f95cd', 10),
('1650bab4-6943-441e-a3af-6bd7f79f95de', '1650bab4-6943-441e-a3af-6bd7f79f95ce', 25),
('1650bab4-6943-441e-a3af-6bd7f79f95d1', '1650bab4-6943-441e-a3af-6bd7f79f95c1', 40),
('1650bab4-6943-441e-a3af-6bd7f79f95d2', '1650bab4-6943-441e-a3af-6bd7f79f95c2', 40),
('1650bab4-6943-441e-a3af-6bd7f79f95d3', '1650bab4-6943-441e-a3af-6bd7f79f95c3', 40),
('1650bab4-6943-441e-a3af-6bd7f79f95d4', '1650bab4-6943-441e-a3af-6bd7f79f95c4', 20),
('1650bab4-6943-441e-a3af-6bd7f79f95d5', '1650bab4-6943-441e-a3af-6bd7f79f95c5', 20);

-- Pays Table
CREATE TABLE Pays (
    cid UUID,
    bid INT,
    lid INT,
    hasfunds BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (cid, bid, lid),
    FOREIGN KEY (cid) REFERENCES LoadsWashingCard(cid)
ON UPDATE CASCADE
ON DELETE CASCADE,
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO Pays (cid, bid, lid, hasfunds) VALUES
('1650bab4-6943-441e-a3af-6bd7f79f95da', 1, 1, TRUE),
('1650bab4-6943-441e-a3af-6bd7f79f95db', 2, 2, TRUE),
('1650bab4-6943-441e-a3af-6bd7f79f95dc', 3, 1, TRUE),
('1650bab4-6943-441e-a3af-6bd7f79f95dd', 4, 1, FALSE),
('1650bab4-6943-441e-a3af-6bd7f79f95de', 5, 1, TRUE), 
('1650bab4-6943-441e-a3af-6bd7f79f95d1', 5, 1, TRUE), 
('1650bab4-6943-441e-a3af-6bd7f79f95d2', 5, 1, TRUE), 
('1650bab4-6943-441e-a3af-6bd7f79f95d3', 5, 1, TRUE), 
('1650bab4-6943-441e-a3af-6bd7f79f95d4', 5, 1, TRUE), 
('1650bab4-6943-441e-a3af-6bd7f79f95d5', 5, 1, TRUE);

-- WashTypeSession Table
CREATE TABLE WashTypeSession (
    washType VARCHAR(20) NOT NULL,
    washSession VARCHAR(20) NOT NULL,
    PRIMARY KEY (washType)
);

INSERT INTO WashTypeSession (washType, washSession) VALUES
('Normal', '40 minutes'),
('Quick Wash', '15 minutes'),
('Delicate', '30 minutes'),
('Long Wash', '50 minutes'),
('Hot Wash', '35 minutes');

-- Washer Table
CREATE TABLE Washer (
    bid INT,
    lid INT,
    washType VARCHAR(20) NOT NULL,
    PRIMARY KEY (bid, lid),
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY (washType) REFERENCES WashTypeSession(washType)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO Washer (bid, lid, washType) VALUES
(1, 1, 'Normal'),
(2, 1, 'Quick Wash'),
(3, 1, 'Delicate'),
(4, 1, 'Delicate'),
(5, 1, 'Normal');

-- DryTypeSession Table
CREATE TABLE DryTypeSession (
    dryType VARCHAR(20) NOT NULL,
    drySession VARCHAR(20) NOT NULL,
    PRIMARY KEY (dryType)
);

INSERT INTO DryTypeSession (dryType, drySession) VALUES
('Normal', '45 minutes'),
('Delicate', '30 minutes'),
('Time Dry', '60 minutes'),
('Quick Dry', '20 minutes'),
('Long Dry', '60 minutes');

-- Dryer Table
CREATE TABLE Dryer (
    bid INT,
    lid INT,
    dryType VARCHAR(20) NOT NULL,
    PRIMARY KEY (bid, lid),
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY (dryType) REFERENCES DryTypeSession(dryType)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO Dryer (bid, lid, dryType) VALUES
(1, 2, 'Normal'),
(2, 2, 'Delicate'),
(3, 2, 'Time Dry'),
(4, 2, 'Quick Dry'),
(5, 2, 'Long Dry');


-- ResidenceManager Table
CREATE TABLE ResidenceManager (
    mid INT PRIMARY KEY,
    mname VARCHAR(20) NOT NULL,
    mphone VARCHAR(15) NOT NULL UNIQUE, 
    memail VARCHAR(30) NOT NULL UNIQUE, 
    mpassword VARCHAR(50) NOT NULL
);

INSERT INTO ResidenceManager (mid, mname, mphone, memail, mpassword) VALUES
(501, 'John Smith', '778-807-9001', 'john.smith@gmail.com', 'mpassword1'),
(502, 'Jane Doe', '778-807-9002', 'jane.doe@gmail.com', 'mpassword2'),
(503, 'Mike Johnson', '778-807-9003', 'mike.johnson@gmail.com', 'mpassword3'),
(504, 'Sarah Brown', '778-807-9004', 'sarah.brown@gmail.com', 'mpassword4'),
(505, 'Chris Lee', '778-807-9005', 'chris.lee@gmail.com', 'mpassword5');

-- Manages Table
CREATE TABLE Manages (
    bid INT,
    lid INT,
    mid INT,
    PRIMARY KEY (bid, lid, mid),
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY (mid) REFERENCES ResidenceManager(mid)
    ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO Manages (bid, lid, mid) VALUES
(1, 1, 501),
(1, 2, 501),
(2, 1, 502),
(3, 1, 503),
(4, 1, 504);

-- RecordsTransaction Table
CREATE TABLE RecordsTransaction (
    tid INT PRIMARY KEY,
    cid UUID NOT NULL,
    day DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (cid) REFERENCES LoadsWashingCard(cid)
	ON UPDATE CASCADE
);

INSERT INTO RecordsTransaction (tid, cid, day, time, price) VALUES
(1, '1650bab4-6943-441e-a3af-6bd7f79f95da', '2024-09-10', '22:30:00', 150),
(2, '1650bab4-6943-441e-a3af-6bd7f79f95db', '2024-09-15', '10:13:30', 300),
(3, '1650bab4-6943-441e-a3af-6bd7f79f95dc', '2024-10-01', '14:09:00', 150),
(4, '1650bab4-6943-441e-a3af-6bd7f79f95dd', '2024-10-05', '11:45:45', 150),
(5, '1650bab4-6943-441e-a3af-6bd7f79f95de', '2024-10-13', '21:10:10', 150),
(6, '1650bab4-6943-441e-a3af-6bd7f79f95d1', '2024-10-18', '12:33:05', 150),
(7, '1650bab4-6943-441e-a3af-6bd7f79f95d2', '2024-10-19', '17:55:31', 150),
(8, '1650bab4-6943-441e-a3af-6bd7f79f95d3', '2024-10-20', '14:10:33', 150),
(9, '1650bab4-6943-441e-a3af-6bd7f79f95d4', '2024-10-21', '19:40:27', 150),
(10, '1650bab4-6943-441e-a3af-6bd7f79f95d5', '2024-10-22', '20:54:08', 150);

-- Technician Table
CREATE TABLE Technician (
    techid INT PRIMARY KEY,
    techname VARCHAR(20) NOT NULL,
    techphone VARCHAR(15) NOT NULL DEFAULT '778-807-9000'
);

INSERT INTO Technician (techid, techname, techphone) VALUES
(201, 'Mike Mike', '778-807-9001'),
(202, 'Sarah Nguyen', '778-807-9002'),
(203, 'Tom Cruise', '778-807-9003'),
(204, 'Lisa Lisa', '778-807-9004'),
(205, 'Taylor Swift', '778-807-9005');

-- Repairs Table
CREATE TABLE Repairs (
    bid INT,
    lid INT,
    techid INT,
    PRIMARY KEY (bid, lid, techid),
    FOREIGN KEY (bid, lid) REFERENCES ResidenceLaundryMachine(bid, lid)
	ON UPDATE CASCADE
	ON DELETE CASCADE,

    FOREIGN KEY (techid) REFERENCES Technician(techid)
	ON UPDATE CASCADE
 	ON DELETE CASCADE
);

INSERT INTO Repairs (bid, lid, techid) VALUES
(1, 1, 201),
(1, 2, 202),
(2, 1, 203),
(3, 1, 204),
(4, 1, 205);
