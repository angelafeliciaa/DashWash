-- DROP FUNCTION get_buildings_with_available_machines();

CREATE OR REPLACE FUNCTION get_buildings_with_available_machines()
RETURNS TABLE (
    Building_Name VARCHAR,
    Status VARCHAR,
    AvailableMachines bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.bname AS Building_Name, 
           r.washing_status AS Status, 
           COUNT(r.lid) AS AvailableMachines
    FROM ResidenceLaundryMachine r
    JOIN CampusResidence c ON c.bid = r.bid
    WHERE r.washing_status = 'Available'
    GROUP BY r.bid, c.bname, r.washing_status
    HAVING COUNT(r.lid) > 0;
END;
$$ LANGUAGE plpgsql;