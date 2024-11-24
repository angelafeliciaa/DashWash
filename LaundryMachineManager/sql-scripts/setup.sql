-- Drop all tables to reset
DROP TABLE IF EXISTS CampusResidence;
DROP TABLE IF EXISTS UserLivesIn;
DROP TABLE IF EXISTS ReportsFeedback;
DROP TABLE IF EXISTS LoadsWashingCard;
DROP TABLE IF EXISTS Pays;
DROP TABLE IF EXISTS ResidenceLaundryMachine;
DROP TABLE IF EXISTS Manages;
DROP TABLE IF EXISTS Washer;
DROP TABLE IF EXISTS WashTypeSession;
DROP TABLE IF EXISTS Dryer;
DROP TABLE IF EXISTS DryTypeSession;
DROP TABLE IF EXISTS ResidenceManager;
DROP TABLE IF EXISTS RecordsTransaction;
DROP TABLE IF EXISTS Repairs;
DROP TABLE IF EXISTS Technician;

-- CampusResidence Table
CREATE TABLE CampusResidence (
    bid INT PRIMARY KEY,
    bname VARCHAR(20) NOT NULL UNIQUE,
    address VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO CampusResidence (bid, bname, address) VALUES
(1, 'Nicola', '5000 Student Union Blvd'),
(2, 'Nicole', '5100 Student Union Blvd'),
(3, 'Nicoli', '5200 Student Union Blvd'),
(4, 'Nicolo', '5300 Student Union Blvd'),
(5, 'Nicolu', '5400 Student Union Blvd');

-- UserLivesIn Table
CREATE TABLE UserLivesIn (
    uid INT PRIMARY KEY,
    bid INT NOT NULL,
    uname VARCHAR(20) NOT NULL DEFAULT 'User',
    FOREIGN KEY (bid) REFERENCES CampusResidence(bid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO UserLivesIn (uID, bid, uname) VALUES
(1001, 1, 'John Doe'),
(1002, 2, 'Jane Smith'),
(1003, 3, 'Bob Johnson'),
(1004, 4, 'Alice Brown'),
(1005, 5, 'Charlie Davis');


-- ReportsFeedback Table
CREATE TABLE ReportsFeedback (
    fid INT PRIMARY KEY,
    uid INT NOT NULL,
    feedbackType VARCHAR(20),
    comments VARCHAR(70) NOT NULL,
    FOREIGN KEY (uid) REFERENCES UserLivesIn(uid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO ReportsFeedback (fid, uid, FeedbackType, Comments) VALUES
(1, 1001, 'Complaint', 'Machine not working'),
(2, 1002, 'Suggestion', 'Need more dryers'),
(3, 1003, 'Compliment', 'Great service'),
(4, 1004, 'Complaint', 'Card reader malfunctioning'),
(5, 1005, 'Suggestion', 'Extend laundry hours');

-- LoadsWashingCard Table
CREATE TABLE LoadsWashingCard (
    cid INT PRIMARY KEY,
    uid INT NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    FOREIGN KEY (uid) REFERENCES UserLivesIn(uid)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO LoadsWashingCard (cid, uid, Balance) VALUES
(101, 1001, 20),
(102, 1002, 15),
(103, 1003, 30),
(104, 1004, 10),
(105, 1005, 25);

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

-- Pays Table
CREATE TABLE Pays (
    cid INT,
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
(101, 1, 1, TRUE),
(102, 1, 2, TRUE),
(103, 2, 1, TRUE),
(104, 3, 1, FALSE),
(105, 4, 1, TRUE); 

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
    memail VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO ResidenceManager (mid, mname, mphone, memail) VALUES
(501, 'John Smith', '778-807-9001', 'john.smith@gmail.com'),
(502, 'Jane Doe', '778-807-9002', 'jane.doe@gmail.com'),
(503, 'Mike Johnson', '778-807-9003', 'mike.johnson@gmail.com'),
(504, 'Sarah Brown', '778-807-9004', 'sarah.brown@gmail.com'),
(505, 'Chris Lee', '778-807-9005', 'chris.lee@gmail.com');

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
    cid INT NOT NULL,
    day DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (cid) REFERENCES LoadsWashingCard(cid)
	ON UPDATE CASCADE
);

INSERT INTO RecordsTransaction (tid, cid, day, time, price) VALUES
(1, 101, '2024-09-10', '22:30:00', 150),
(2, 102, '2024-09-15', '10:13:30', 300),
(3, 103, '2024-10-01', '14:09:00', 150),
(4, 104, '2024-10-05', '11:45:45', 150),
(5, 105, '2024-10-13', '21:10:10', 150);

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
