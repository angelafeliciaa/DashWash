-- Division Query to get users who have filed feedback for all laundry machines in their building

DROP FUNCTION IF EXISTS get_users_with_full_feedback();

CREATE OR REPLACE FUNCTION get_users_with_full_feedback()
RETURNS TABLE (
    uid UUID,
    uname VARCHAR(20),
    uemail VARCHAR(50),
    bid INT,
    bname VARCHAR(20),
    address VARCHAR(50),
    cid UUID
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.uid,
        u.uname, 
        u.uemail, 
        u.bid,
        c.bname AS bname,
        c.address AS address,
        lwc.cid
    FROM UserLivesIn u
    JOIN CampusResidence c ON u.bid = c.bid
    LEFT JOIN LoadsWashingCard lwc ON u.uid = lwc.uid
    WHERE NOT EXISTS (
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
END;
$$ LANGUAGE plpgsql;