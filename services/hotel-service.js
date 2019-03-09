const {responseToRows, nestAddress, nestManager} = require('../services/postgres-service');

const getHotels = async client => {
  const response = await client.query(
    `SELECT *, (
      SELECT COUNT(room_number) AS num_rooms FROM room WHERE room.hotel_id = hotel.id
    ) FROM address, employee, hotel, capacity_by_hotel
    WHERE address.id = hotel.address_id
    AND employee.id = hotel.manager_id
    AND capacity_by_hotel.hotel_chain_name = hotel.hotel_chain_name
    AND capacity_by_hotel.hotel_id = hotel.id`);
  return responseToRows(response)
    .map(nestAddress)
    .map(nestManager);
};

module.exports = {getHotels};

