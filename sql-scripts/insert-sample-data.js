const randomData = require("./random-data");
const choose = list => list[Math.floor(Math.random() * list.length)];
const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min));
const randomBoolean = () => Math.random() > 0.5;
const idFromResponse = ({rows}) => rows[0].id;
const formatDate = (date=new Date()) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const randomEmail = () =>
  `${choose(randomData.email.usernames)}@${choose(randomData.email.domains)}.${choose(randomData.email.extensions)}`
const randomSinOrSsn = () => {
  let sin = randomInt(100000000, 1000000000);
  let ssn = randomInt(100000000, 1000000000);
  let chance = Math.random();
  // 49% chance to clear sin number
  // 49% to clear ssn
  // 2% chance to clear neither
  if (chance > 0.51) {
    sin = null;
  } else if (chance > 0.02) {
    ssn = null;
  }
  return {sin, ssn};
};


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

  const insertHotelChain = async (chainName, numHotels = 5) => {
    const addressId = await insertAddress();
    await pool.query(
      "INSERT INTO hotel_chain VALUES ($1, $2, $3) RETURNING name",
      [chainName, numHotels, addressId]);
    for(let i = 0; i < 2; i++) {
      await pool.query(
        "INSERT INTO hotel_chain_phone_number VALUES ($1, $2)",
        [chainName, randomInt(1000000000, 9999999999)]);

      await pool.query(
        "INSERT INTO hotel_chain_email_address VALUES ($1, $2)",
        [chainName, randomEmail()]);
    }
    return chainName;
  };

  const insertEmployee = async (hotelChainName, roles = []) => {
    const {ssn, sin} = randomSinOrSsn();
    const givenName = choose(randomData.givenNames);
    const familyName = choose(randomData.familyNames);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id",
      [ssn, sin, givenName, familyName, addressId, hotelChainName]);
    const employeeId = idFromResponse(response);
    await Promise.all(roles.map(async role =>
      pool.query("INSERT INTO employee_role VALUES ($1, $2)", [employeeId, role])
    ));
    return employeeId;

  };

  const insertHotel = async (hotelChainName, managerId) => {
    const category = randomInt(1, 6);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO hotel VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
      [hotelChainName, category, addressId, managerId]);
    const id = idFromResponse(response);
    for(let i = 0; i < 2; i++) {
      await pool.query(
        "INSERT INTO hotel_phone_number VALUES ($1, $2, $3)",
        [hotelChainName, id, randomInt(1000000000, 9999999999)]);

      await pool.query(
        "INSERT INTO hotel_email_address VALUES ($1, $2, $3)",
        [hotelChainName, id, randomEmail()]);
    }
    return id;
  };

  const insertRoom = async (hotelChainName, hotelId, roomNumber) => {
    const price = randomInt(1, 99) * 10;
    const capacity = randomInt(1, 10);
    const scenery = randomBoolean() ? choose(randomData.scenery) : null;
    const extendable = randomBoolean();
    await pool.query(
      "INSERT INTO room VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING room_number",
      [hotelChainName, hotelId, roomNumber, price, capacity, scenery, extendable]);

    if (randomBoolean()) {
      const damage = choose(randomData.damage);
      await pool.query(
        "INSERT INTO room_damage VALUES ($1, $2, $3, $4)",
        [hotelChainName, hotelId, roomNumber, damage])
    }
    if (randomBoolean()) {
      const amenity = choose(randomData.amenities);
      await pool.query(
        "INSERT INTO room_amenity VALUES ($1, $2, $3, $4)",
        [hotelChainName, hotelId, roomNumber, amenity])
    }
    return roomNumber
  };

  const insertCustomer = async () => {
    const {ssn, sin} = randomSinOrSsn();
    const givenName = choose(randomData.givenNames);
    const familyName = choose(randomData.familyNames);
    const addressId = await insertAddress();
    const response = await pool.query(
      "INSERT INTO customer VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id",
      [ssn, sin, givenName, familyName, addressId, formatDate()]);
    return idFromResponse(response);
  };

  const insertEntireHotelChain = async (chainName, numExtraEmployees=10, numHotels=8, numRooms=5) => {
    // Hotel chain for the whole mess
    const hotelChainName = await insertHotelChain(chainName, numHotels);

    // Non-manager empoloyees
    const employeeIds = await Promise.all(
      new Array(numExtraEmployees).fill(null).map(() =>
        insertEmployee(hotelChainName, [choose(randomData.roles)])));

    // Manager for each hotel
    const managerIds = await Promise.all(
      new Array(numHotels).fill(null).map(() =>
        insertEmployee(hotelChainName, ["Hotel Manager"])));

    // Collection of hotels
    const hotelIds = await Promise.all(managerIds.map(managerId =>
      insertHotel(hotelChainName, managerId)));

    // Map index to more appealing room number
    const getRoomNumber = index => (100 * Math.floor(index / 10)) + 100 + (index % 10);

    // Insert rooms for each hotel
    await Promise.all(hotelIds.map((hotelId, hotelIndex) =>
      Promise.all(new Array(numRooms).fill(null).map((_, roomIndex) =>
        insertRoom(
          hotelChainName,
          hotelId,
          getRoomNumber(hotelIndex * numRooms + roomIndex))))));
  };

  await Promise.all(
    randomData.hotelChains.map(chainName =>
      insertEntireHotelChain(chainName)));

  await Promise.all(
    new Array(numCustomers).fill(null).map(() =>
      insertCustomer()));
};

module.exports = insertSampleData;