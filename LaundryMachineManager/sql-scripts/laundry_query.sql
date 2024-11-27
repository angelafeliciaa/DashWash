
/* 1. INSERT */

/*
Relations needed:
    • You must choose one relation to implement INSERT on.

Input format:
    • The user should be able to specify what values to insert.

Additional notes:
    • The INSERT operation should affect more than one relation. This means the insert
    must occur on a relation with a foreign key.

        o The INSERT operation should be able to handle the case where the foreign
        key value in the tuple being inserted does not exist in the relation that is being
        referred to.

        o This "handling" can either be that the inserted tuple is rejected by the GUI
        with an appropriate error message or that the values that are being referred
        to are inserted.

    • Note the INSERT statements used in the SQL DDL file do not count towards this
    query requirement.
*/

-- Insert user information 
INSERT INTO UserLivesIn (uid, bid, uname, uemail, upassword)
VALUES (:uid, :bid, :uname, :uemail, :upassword); 

-- Register a washing card for the user 
INSERT INTO LoadsWashingCard (cid, uid, balance)
VALUES (:cid, :uid, :balance);

-- Example -- 

INSERT INTO UserLivesIn (uid, bid, uname, uemail, upassword)
VALUES ('1650bab4-6943-441e-a3af-6bd7f79f95d0', 3, 'Wendy Moris', 'wendymoris@gmail.com', 'upassword9');


INSERT INTO LoadsWashingCard (cid, uid, balance)
VALUES ('1650bab4-6943-441e-a3af-6bd7f79f95e0', '1650bab4-6943-441e-a3af-6bd7f79f95d0', 50);





/* 2. UPDATE */

/*
Relations needed:
    • You must choose one relation to implement UPDATE on.

Input format:
    • In this relation, the user should be able to update any number of non-primary key
    attributes.

Additional notes:
    • The relation chosen for the update operation must have at least two non-primary
    key attributes.

    • At least one non-primary key attribute must have either a UNIQUE constraint or be a
    foreign key that references another relation.

    • The application should display the tuples that are available for the relation so the
    user can select which tuple they want to update (based on the key).
*/

--  Load the washing card for the user
UPDATE LoadsWashingCard SET balance = :newBlance
WHERE uid = :uid;

-- Example 
UPDATE LoadsWashingCard SET balance = 100
WHERE uid = '1650bab4-6943-441e-a3af-6bd7f79f95d0';

/* or we can do it with card id 
UPDATE LoadsWashingCard SET balance = :newBlance
WHERE cid = :cid;


-- Example 
UPDATE LoadsWashingCard SET balance = 100
WHERE cid = '1650bab4-6943-441e-a3af-6bd7f79f95e0';
*/




/* 3. DELETE */

/*
Relations needed:
    • You must choose one relation to implement DELETE on.

Input format:
    • The user should be able to choose what values to delete.

Additional notes:
    • Implement a cascade-on-delete situation for this relation (or an alternative that was
    agreed to by the TA if the DB system doesn’t provide this). 
*/


-- Delete user (delete the card meanwhile)
DELETE FROM UserLivesIn
WHERE uid = :uid;


-- Example 
DELETE FROM UserLivesIn
WHERE uid = '1650bab4-6943-441e-a3af-6bd7f79f95cf';




/* 4. SELECTION */

/*
Relations needed:
    • You must choose one relation to implement Selection on.

Input format:
    • The user should be allowed to search for tuples using any number of AND/OR
    clauses and combinations of attributes. Conditions can be based on equality or
    more complex operations (e.g., less than).

Additional notes:
    • There are two main ways to implement the input format:
        1. Using a dynamically generated dropdown of AND/OR options.

        2. By allowing the user to enter a string specifying the conditions. For
        example, if the relation contained attributes firstName and lastName, the
        user could enter an arbitrarily long string like “firstName = ‘Ada’ OR
        firstName = ‘Alan’ OR lastName = ‘Hamilton’ …” Note this string must not
        be directly copied into the WHERE clause in the query. Your string must
        not require that the user knows SQL. You must do your own parsing and
        validation of it. For example, you should accept as input “cats = true
        AND colour = brindled OR colour = snowshoe”
*/

-- Selection 1 
-- View the user by name/email/building/card like a filter 

-- by name 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND u.uname = :uname; 


-- by email 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND u.uemail = :uemail; 


-- by building 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND c.bname = :bname; 


-- by card 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND l.cid = :cid;  

-- by anything 
-- not sure about if this works 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid 
      AND u.uid = l.uid 
      AND (u.uname = :uname 
      AND u.uemail = :uemail
      AND c.bname = :bname
      AND l.cid = :cid);


-- Example 

-- by name 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND u.uname = 'John Doe'; 

-- by email 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND u.uemail = 'johndoe@gmail.com'; 

-- by building 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND c.bname = 'Marine Drive'; 

-- by card 
SELECT u.uid AS UID, 
       u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name, 
       c.address AS Building_Address, 
       l.cid AS Card_Number 
FROM LoadsWashingCard l, UserLivesIn u, CampusResidence c  
WHERE u.bid = c.bid AND u.uid = l.uid 
      AND l.cid = '1650bab4-6943-441e-a3af-6bd7f79f95da';  


-- Selection 2 
-- View the laundry machines has been complaint or suggested 
SELECT r.uid AS UID, 
       c.bname AS Building_Name, 
       r.lid AS Laundry_Machine_ID, 
       r.feedbackType AS Feedback_Type, 
       r.comments AS Comments
FROM ReportsFeedback r, CampusResidence c
WHERE r.bid = c.bid 
      AND r.feedbackType = :feedback;

-- Example 
SELECT r.uid AS UID, 
       c.bname AS Building_Name, 
       r.lid AS Laundry_Machine_ID, 
       r.feedbackType AS Feedback_Type, 
       r.comments AS Comments
FROM reportsFeedback r, CampusResidence c
WHERE r.bid = c.bid 
      AND r.feedbackType = 'Complaint';




/* 5. Projection */

/*
Relations needed:
    • You must choose one relation to implement Projection on.

Input format:
    • The user can choose any number of attributes to view from this relation. 
    Non-selected attributes must not appear in the result.
*/

-- Projection 1
-- View the managers' contact information
SELECT mname AS Name, mphone AS Phone, memail AS Email  
FROM residencemanager

-- Projection 2 (not using this one)
-- view the model or status of laundry machines
-- user will select one that they want to view 
--   that sounds not hardcoded anymore???
-- We might need to ask TA for this one 
-- never mind, our join query is too similar to this 

SELECT c.bname AS Building_Name,  r.lid AS Laundry_Machine_ID, r.model AS Laundry_Machine_Model 
FROM ResidenceLaundryMachine r, CampusResidence c
WHERE r.bid = c.bid;

SELECT c.bname AS Building_Name,  r.lid AS Laundry_Machine_ID, r.washing_status AS Laundry_Status
FROM ResidenceLaundryMachine r, CampusResidence c
WHERE r.bid = c.bid;

/* 6. Join */
/*
Relations needed:
    • You must implement one query of this category.
    • This query must join at least two relations of your choice.

Input format:
    • The user must provide at least one value to qualify in the WHERE clause (e.g., join
    the Customer and the Transaction relation to find the names and phone numbers of
    all customers who have purchased a specific item).
*/

-- View the information about all laundry machines in all buildings 

-- washers
SELECT c.bname AS Building_Name, 
       'Washer' AS MachineType,
       r.lid AS Laundry_Machine_ID,  
       r.washing_status AS Status, 
       w.washType AS Wash_Type, 
       ws.washSession AS Session_Duration, 
       r.brand AS Laundry_Machine_Brand, 
       r.model AS Laundry_Machine_Model
FROM CampusResidence c, ResidenceLaundryMachine r, Washer w, WashTypeSession ws
WHERE   c.bid = r.bid 
    AND r.bid = w.bid 
    AND r.lid = w.lid
    AND w.washType = ws.washType

-- and 
UNION ALL

-- dryers

SELECT c.bname AS Building_Name, 
       'Dryer' AS MachineType, 
       r.lid AS Laundry_Machine_ID, 
       r.washing_status AS Status, 
       d.dryType AS Wash_Type, 
       ds.drySession AS Session_Duration, 
       r.brand AS Laundry_Machine_Brand, 
       r.model AS Laundry_Machine_Model
FROM CampusResidence c, ResidenceLaundryMachine r, Dryer d, DryTypeSession ds
WHERE   c.bid = r.bid 
    AND r.bid = d.bid 
    AND r.lid = d.lid
    AND d.dryType = ds.dryType




/* 7. Aggregation with GROUP BY */
/*
Relations needed:
    • You must implement one query of this category using relation(s) of your choice.

Input format:
    • You must provide an interface (e.g., button, dropdown, etc.) for the user to execute
    the query.

Additional notes:
    • The query must use aggregation (e.g., min, max, average, or count).
*/

-- Count the total transactions of the laundry per day
SELECT r.day AS Date, COUNT(r.tid) AS TotalTransactions
FROM RecordsTransaction r
GROUP BY r.day
ORDER BY r.day;



/* 8. Aggregation with HAVING */
/*
Relations needed:
    • You must implement one query of this category using relation(s) of your choice.

Input format:
    • You must provide an interface (e.g., button, dropdown, etc.) for the user to execute
    the query.

Additional notes:
    • The query must include a HAVING clause.
*/

-- View the buildings which have two or more available laundry machines
-- not sure if "r.washing_status AS Status " necessary 
SELECT c.bname AS Building_Name, 
       r.washing_status AS Status, 
       COUNT(r.lid) AS AvailableMachines
FROM ResidenceLaundryMachine r, CampusResidence c
WHERE r.washing_status = 'Available' AND c.bid = r.bid 
GROUP BY r.bid, c.bname, r.washing_status
HAVING COUNT(r.lid) > 1;




/* 9. Nested aggregation with GROUP BY */
/*
Relations needed:
    • You must implement one query of this category using relation(s) of your choice.

Input format:
    • You must provide an interface (e.g., button, dropdown, etc.) for the user to execute
    the query.

Additional notes:
    • The query must find some aggregated value for each group.
    • It is fine to use a view to get the desired behaviour.
    • Examples of nested aggregation:

            SELECT S.rating
            FROM Sailors S
            WHERE AVG(S.age) <= ALL ( SELECT AVG(s2.age)
                                      FROM Sailors s2
                                      GROUP BY rating );
            SELECT S.rating, AVG (S.age) as avgage
            FROM Sailors S
            GROUP BY S.rating
            HAVING 1 < ( SELECT COUNT(*)
                        FROM SAILORS S2
                        WHERE S.rating = S2.rating );
*/

-- view the total transactions by buildings 
-- it doesn't work and annoying 
-- not using it
-- forget about it 
SELECT c.bname AS ResidenceName, 
       SUM(payment.TotalTransactions) AS Total_Transactions, 
       SUM(payment.TotalPayments) AS Total_Payments
FROM CampusResidence c, 
    (SELECT u.bid, COUNT(r.tid) AS TotalTransactions, SUM(r.price) AS TotalPayments
     FROM UserLivesIn u, LoadsWashingCard l, RecordsTransaction r
     WHERE u.uid = l.uid AND l.cid = l.cid
     GROUP BY u.bid) 
     AS payment
WHERE c.bid = payment.bid
GROUP BY c.bname
ORDER BY c.bname;


-- View the most active building 

-- count the number of active users with washing cards in each building and 
-- identify those buildings 
-- where the active user count exceeds the average
-- sounds weird but I have no clues about nested aggregation
SELECT c.bname AS Building_Name, 
       COUNT(DISTINCT u.uid) AS active_user_count
FROM CampusResidence c, UserLivesIn u, LoadsWashingCard l
WHERE c.bid = u.bid AND u.uid = l.uid
GROUP BY c.bid
HAVING COUNT(DISTINCT u.uid) > (
  SELECT AVG(user_count)
  FROM (
    SELECT COUNT(DISTINCT u2.uid) AS user_count
    FROM CampusResidence c2, UserLivesIn u2, LoadsWashingCard l2
    WHERE c2.bid = u2.bid
      AND u2.uid = l2.uid
    GROUP BY c2.bid
  ) AS AvgUserCountPerBuilding
)



/* 10. Division */
/*
Relations needed:
    • You must implement one query of this category using relation(s) of your choice.

Input format:
    • You must provide an interface (e.g., button, dropdown, etc.) for the user to execute
    the query.

Additional notes:
    • The query must do division.
*/

-- View the user who reported the feedback for every machine in their building
SELECT u.uname AS Name, 
       u.uemail AS Email, 
       c.bname AS Building_Name
FROM UserLivesIn u, CampusResidence c
WHERE u.bid = c.bid
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




