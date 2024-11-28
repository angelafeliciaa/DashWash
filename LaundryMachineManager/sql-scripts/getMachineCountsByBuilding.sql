DROP FUNCTION IF EXISTS get_machine_counts_by_building();

CREATE OR REPLACE FUNCTION get_machine_counts_by_building()
RETURNS TABLE (
  bid INT,
  bname VARCHAR,
  address VARCHAR,
  machine_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.bid, c.bname, c.address, COUNT(r.lid) AS machine_count
  FROM CampusResidence c
  JOIN ResidenceLaundryMachine r ON c.bid = r.bid
  GROUP BY c.bid, c.bname, c.address;
END;
$$ LANGUAGE plpgsql;
