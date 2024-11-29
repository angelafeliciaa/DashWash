CREATE OR REPLACE FUNCTION get_machines_with_washers_new(input_bid INT)
RETURNS TABLE(
    lid INT,
    brand VARCHAR,
    model VARCHAR,
    washing_status VARCHAR,
    washer_lid INT,
    washtype VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.lid,
        r.brand,
        r.model,
        r.washing_status,
        w.lid AS washer_lid,
        w.washtype
    FROM
        residencelaundrymachine r
    INNER JOIN
        washer w
    ON
        r.bid = w.bid AND r.lid = w.lid 
    WHERE
        r.bid = input_bid;
END;
$$ LANGUAGE plpgsql;