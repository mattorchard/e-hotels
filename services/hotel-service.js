const {responseToRows, nestAddress, nestManager} = require('../services/postgres-service');

const getHotels = async client => {
  const response = await client.query(
    `(SELECT *, (
      SELECT COUNT(room_number) as num_rooms from room where hotel_id = hotel.id
    ) FROM address, employee, hotel
    WHERE address.id = hotel.address_id
    AND employee.id = hotel.manager_id)`);
  return responseToRows(response)
    .map(nestAddress)
    .map(nestManager);
};

module.exports = {getHotels};

