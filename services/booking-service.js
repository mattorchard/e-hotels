const roomInUse = async(pool, hotelChainName, hotelId, roomNumber, startDate, endDate) => {
  const response = await pool.query(
    `(SELECT room_number FROM rental
    WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
    AND (
      $4 BETWEEN start_date AND end_date
      OR $5 BETWEEN start_date AND end_date
      OR start_date BETWEEN $4 AND $5
      OR end_date BETWEEN $4 AND $5
    )) UNION
    (SELECT room_number FROM booking
    WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
    AND (
      $4 BETWEEN start_date AND end_date
      OR $5 BETWEEN start_date AND end_date
      OR start_date BETWEEN $4 AND $5
      OR end_date BETWEEN $4 AND $5
    ))`, [hotelChainName, hotelId, roomNumber, startDate, endDate]);
  return response.rows.length > 0;
};

module.exports = {roomInUse};