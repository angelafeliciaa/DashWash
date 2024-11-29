DROP FUNCTION IF EXISTS get_frequently_used_machines();

CREATE OR REPLACE FUNCTION get_frequently_used_machines()
RETURNS TABLE (
    bid INT,
    bname VARCHAR,
    lid INT,
    usage_count INT
)
LANGUAGE sql
AS $$
SELECT
    rlm.bid,
    cr.bname,
    rlm.lid,
    COUNT(p.cid) AS usage_count
FROM
    ResidenceLaundryMachine rlm
    JOIN Pays p ON rlm.bid = p.bid AND rlm.lid = p.lid
    JOIN CampusResidence cr ON rlm.bid = cr.bid
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
$$;
