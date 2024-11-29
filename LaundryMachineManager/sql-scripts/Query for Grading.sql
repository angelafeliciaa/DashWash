/* 1. INSERT */

-- Register a user to a campus residence building 

INSERT INTO userlivesin (uid, bid, uname, uemail, upassword)
VALUES (:uid, :building, :name, :email, :password)

-- Register a washing card for the user 

INSERT INTO loadswashingcard (cid, uid, balance)
VALUES (:cid, :uid, :balance)



/* 2. UPDATE */

-- Load the washing card by the user ID 

UPDATE loadswashingcard
SET balance = :newBalance
WHERE uid = :uid;



/* 3. DELETE */

-- Remove the washing card from the system by the user ID

DELETE FROM loadswashingcard
WHERE uid = :uid;

-- Kick this user out from the residence by the user ID 

DELETE FROM userlivesin
WHERE uid = :uid;



/* 4. SELECTION */

-- View the specific laundry information by the building id 

SELECT *
FROM residencelaundrymachine
WHERE bid = :bid;

-- View the specific transaction information by the card id 

SELECT *
FROM recordstransaction
WHERE cid = :cid;

-- View the user's information if they log in successfully 

SELECT *
FROM userlivesin
WHERE uemail = :uemail
AND upassword = :upassword;



/* 5. Projection */

-- View the card ID by the user ID

SELECT cid
FROM loadswashingcard
WHERE uid = :uid;

-- View the card balance by the user ID 

SELECT balance
FROM loadswashingcard
WHERE uid = :uid;



/* 6. Join */

-- View the information of all laundry machines by building 

SELECT 
    r.lid, 
    c.bname, 
    r.brand, 
    r.model, 
    c.address, 
    r.washing_status
FROM 
    residencelaundrymachine r, 
    campusresidence c
WHERE 
    r.bid = c.bid;


-- View the washer machines by the specific building 

SELECT 
    r.lid, 
    r.brand, 
    r.model, 
    r.washing_status, 
    w.lid AS washer_lid, 
    w.washtype
FROM 
    residencelaundrymachine r, 
    washer w
WHERE 
    r.bid = w.bid 
    AND r.lid = w.lid 
    AND r.bid = :input_bid;

-- View the dryer machines by the specific building 

SELECT 
    r.lid, 
    r.brand, 
    r.model, 
    r.washing_status, 
    d.lid AS dryer_lid, 
    d.dryType AS dry
FROM 
    residencelaundrymachine r, 
    dryer d
WHERE 
    r.bid = d.bid 
    AND r.lid = d.lid 
    AND r.bid = :input_bid;



/* 7. Aggregation with GROUP BY */

-- View the number of the laundry machines by the buildings 

SELECT 
  c.bid, 
  c.bname, 
  c.address, 
  COUNT(r.lid) AS machine_count
FROM 
  CampusResidence c, 
  ResidenceLaundryMachine r
WHERE 
  c.bid = r.bid
GROUP BY 
  c.bid, 
  c.bname, 
  c.address;



/* 8. Aggregation with HAVING */

-- View the buildings which have one or more available laundry machines 

SELECT 
    c.bname AS Building_Name, 
    r.washing_status AS Status, 
    COUNT(r.lid) AS AvailableMachines
FROM 
    ResidenceLaundryMachine r, CampusResidence c
WHERE 
    r.washing_status = 'Available' 
    AND c.bid = r.bid 
GROUP BY 
    r.bid, c.bname, r.washing_status
HAVING 
    COUNT(r.lid) > 0;



/* 9. Nested aggregation with GROUP BY */

-- View the laundry machines which are most frequently used 
-- Frequently used means this laundry machine using times 
-- are more than all laundry machines' average using times 


SELECT
    rlm.bid,
    cr.bname,
    rlm.lid,
    COUNT(p.cid) AS usage_count
FROM
    ResidenceLaundryMachine rlm, 
    Pays p, 
    CampusResidence cr
WHERE
    rlm.bid = p.bid AND rlm.lid = p.lid
    AND rlm.bid = cr.bid
GROUP BY
    rlm.bid,
    cr.bname,
    rlm.lid
HAVING
    COUNT(p.cid) > (
        SELECT AVG(machine_usage_count)
        FROM (
            SELECT
                COUNT(*) AS machine_usage_count
            FROM
                Pays
            GROUP BY
                bid,
                lid
        ) AS machine_usage_counts
    )



/* 10. Division */

-- View the users who have filed feedback for every laundry machine in their building

SELECT 
    u.uid,
    u.uname, 
    u.uemail, 
    u.bid,
    c.bname AS bname,
    c.address AS address,
    lwc.cid
FROM 
    UserLivesIn u, 
    CampusResidence c, 
    LoadsWashingCard lwc
WHERE 
    u.bid = c.bid
    AND u.uid = lwc.uid
    AND NOT EXISTS (
        SELECT 1
        FROM ResidenceLaundryMachine r
        WHERE r.bid = u.bid
        AND NOT EXISTS (
            SELECT 1
            FROM ReportsFeedback rf
            WHERE rf.uid = u.uid
            AND rf.bid = r.bid
            AND rf.lid = r.lid
        )
    );
