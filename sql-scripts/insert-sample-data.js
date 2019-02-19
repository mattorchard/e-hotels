const randomData = require("./random-data");
const choose = list => list[Math.floor(Math.random() * list.length)];
const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min));
const randomBoolean = () => Math.random() > 0.5;
const idFromResponse = ({rows}) => rows[0].id;
const formatDate = (date=new Date()) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const insertSampleData = async (pool, numHotelChains=5, numCustomers=5) => {

  const insertAddress = async () => {
    const streetNumber = randomInt(0, 1000);
    const streetName = choose(randomData.streetNames);
    const city = choose(randomData.cities);
    const country = choose(randomData.countries);
    const response = await pool.query("INSERT INTO address VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
      [streetNumber, streetName, city, country]);
    return idFromResponse(response);
  };

  const insertHotelChain = async (numHotels = 5) => {
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO hotel_chain VALUES (DEFAULT, $1, $2) RETURNING id",
      [numHotels, addressId]);
    return idFromResponse(response);
  };

  const insertEmployee = async (hotelChainId, roles = []) => {
    const ssnOrSin = randomInt(100000000, 1000000000);
    const givenName = choose(randomData.givenNames);
    const familyName = choose(randomData.familyNames);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id",
      [ssnOrSin, givenName, familyName, addressId, hotelChainId]);
    const employeeId = idFromResponse(response);
    await Promise.all(roles.map(async role =>
      pool.query("INSERT INTO employee_role VALUES ($1, $2)", [employeeId, role])
    ));
    return employeeId;
  };

  const insertHotel = async (hotelChainId, managerId) => {
    const category = randomInt(1, 6);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO hotel VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
      [hotelChainId, category, addressId, managerId]);
    return idFromResponse(response);
  };

  const insertRoom = async (hotelChainId, hotelId, roomNumber) => {
    const price = randomInt(1, 99) * 10;
    const capacity = randomInt(1, 10);
    const scenery = randomBoolean() ? choose(randomData.scenery) : null;
    const extendable = randomBoolean();
    await pool.query(
      "INSERT INTO room VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING room_number",
      [hotelChainId, hotelId, roomNumber, price, capacity, scenery, extendable]);

    if (randomBoolean()) {
      const damage = choose(randomData.damage);
      await pool.query(
        "INSERT INTO room_damage VALUES ($1, $2, $3, $4)",
        [hotelChainId, hotelId, roomNumber, damage])
    }
    if (randomBoolean()) {
      const amenity = choose(randomData.amenities);
      await pool.query(
        "INSERT INTO room_amenity VALUES ($1, $2, $3, $4)",
        [hotelChainId, hotelId, roomNumber, amenity])
    }
    return roomNumber
  };

  const insertCustomer = async () => {
    const ssnOrSin = randomInt(100000000, 1000000000);
    const givenName = choose(randomData.givenNames);
    const familyName = choose(randomData.familyNames);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO customer VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id",
      [ssnOrSin, givenName, familyName, addressId, formatDate()]);
    return idFromResponse(response);
  };

  const insertEntireHotelChain = async (numExtraEmployees = 5, numHotels = 8, numRooms = 5) => {
    // Hotel chain for the whole mess
    const hotelChainId = await insertHotelChain(numHotels);

    // Non-manager empoloyees
    const employeeIds = await Promise.all(
      new Array(numExtraEmployees).fill(null).map(() =>
        insertEmployee(hotelChainId, [choose(randomData.roles)])));

    // Manager for each hotel
    const managerIds = await Promise.all(
      new Array(numHotels).fill(null).map(() =>
        insertEmployee(hotelChainId, ["Manager"])));

    // Collection of hotels
    const hotelIds = await Promise.all(managerIds.map(managerId =>
      insertHotel(hotelChainId, managerId)));

    // Map index to more appealing room number
    const getRoomNumber = index => (100 * Math.floor(index / 10)) + 100 + (index % 10);

    // Insert rooms for each hotel
    await Promise.all(hotelIds.map((hotelId, hotelIndex) =>
      Promise.all(new Array(numRooms).fill(null).map((_, roomIndex) =>
        insertRoom(
          hotelChainId,
          hotelId,
          getRoomNumber(hotelIndex * numRooms + roomIndex))))));

  };


  await Promise.all(
    new Array(numHotelChains).fill(null).map(() =>
      insertEntireHotelChain()));

  await Promise.all(
    new Array(numCustomers).fill(null).map(() =>
      insertCustomer()));
};

module.exports = insertSampleData;