-- DROP FUNCTION IF EXISTS public.get_machines_with_dryers(integer);
CREATE OR REPLACE FUNCTION get_machines_with_dryers_new(input_bid INT)
RETURNS TABLE(
    lid INT,
    brand VARCHAR,
    model VARCHAR,
    washing_status VARCHAR,
    dryer_lid INT,
    dryType VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.lid,
        r.brand,
        r.model,
        r.washing_status, 
        d.lid AS dryer_lid,
        d.dryType AS dry
    FROM
        residencelaundrymachine r
    INNER JOIN
        dryer d
    ON
        r.bid = d.bid AND r.lid = d.lid
    WHERE
        r.bid = input_bid; 
END;
$$ LANGUAGE plpgsql;