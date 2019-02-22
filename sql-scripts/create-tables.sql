CREATE TABLE address (
    id SERIAL,
    street_number INTEGER,
    street_name VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100),
    PRIMARY KEY (id),
    CONSTRAINT check_street_number CHECK (street_number >= 0)
);

CREATE TABLE hotel_chain (
    name VARCHAR(100),
    num_hotels INTEGER,
    main_office_address_id INTEGER,
    PRIMARY KEY (name),
    FOREIGN KEY (main_office_address_id) REFERENCES address(id)
);

CREATE TABLE hotel_chain_phone_number (
    hotel_chain_name VARCHAR(100),
    phone_number INTEGER,
    PRIMARY KEY (hotel_chain_name, phone_number),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(name),
    CONSTRAINT valid_phone_number CHECK (phone_number BETWEEN 1000000000 AND 9999999999)
);

CREATE TABLE hotel_chain_email_address (
    hotel_chain_name VARCHAR(100),
    email_address VARCHAR(100),
    PRIMARY KEY (hotel_chain_name, email_address),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(name),
    CONSTRAINT valid_email CHECK (email_address LIKE '%___@___%.___%')
);

CREATE TABLE hotel (
    id SERIAL,
    hotel_chain_name VARCHAR(100),
    category INTEGER,
    address_id INTEGER,
    manager_id INTEGER,
    UNIQUE (id),
    PRIMARY KEY (id, hotel_chain_name),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(name),
    CONSTRAINT check_category_validity CHECK (category BETWEEN 1 AND 5)
    -- todo: constraint for manager role
);

CREATE TABLE hotel_phone_number (
    hotel_id INTEGER,
    phone_number INTEGER,
    PRIMARY KEY(hotel_id, phone_number),
    FOREIGN KEY (hotel_id) REFERENCES hotel(id),
    CONSTRAINT valid_phone_number CHECK (phone_number BETWEEN 1000000000 AND 9999999999)
);

CREATE TABLE hotel_email_address (
    hotel_id INTEGER,
    email_address VARCHAR(100),
    PRIMARY KEY (hotel_id, email_address),
    FOREIGN KEY (hotel_id) references hotel(id),
    CONSTRAINT valid_email CHECK (email_address LIKE '%___@___%.___%')
  );

CREATE TABLE room (
    hotel_chain_name VARCHAR(100),
    hotel_id INTEGER,
    room_number INTEGER,
    price INTEGER,
    capacity INTEGER,
    scenery VARCHAR(100),
    extendable BOOLEAN,
    UNIQUE (hotel_chain_name, hotel_id, room_number),
    PRIMARY KEY(hotel_chain_name, hotel_id, room_number),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(name),
    FOREIGN KEY (hotel_id) REFERENCES hotel(id),
    CONSTRAINT check_price_validity CHECK (price > 0),
    CONSTRAINT check_room_capacity CHECK (capacity > 0)
);

CREATE TABLE room_amenity (
    hotel_chain_name VARCHAR(100),
    hotel_id INTEGER,
    room_number INTEGER,
    amenity VARCHAR(100),
    PRIMARY KEY(hotel_chain_name, hotel_id, room_number, amenity),
    FOREIGN KEY (hotel_chain_name, hotel_id, room_number) REFERENCES room(hotel_chain_name, hotel_id, room_number)
);

CREATE TABLE room_damage (
    hotel_chain_name VARCHAR(100),
    hotel_id INTEGER,
    room_number INTEGER,
    damage VARCHAR(100),
    PRIMARY KEY(hotel_chain_name, hotel_id, room_number, damage),
    FOREIGN KEY (hotel_chain_name, hotel_id, room_number) REFERENCES room(hotel_chain_name, hotel_id, room_number)
);

CREATE TABLE employee (
    id SERIAL,
    ssn INTEGER,
    sin INTEGER,
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    address_id INTEGER,
    hotel_chain_name VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(name),
    UNIQUE(ssn),
    UNIQUE(sin),
    CONSTRAINT check_ssn CHECK (sin IS NULL OR sin BETWEEN 100000000 AND 999999999),
    CONSTRAINT check_sin CHECK (ssn IS NULL OR ssn BETWEEN 100000000 AND 999999999),
    CONSTRAINT has_sin_or_ssn CHECK (ssn IS NOT NULL OR sin IS NOT NULL)
);

CREATE TABLE employee_role (
    employee_id INTEGER,
    role VARCHAR(100),
    PRIMARY KEY (employee_id, role),
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

CREATE TABLE customer (
    id SERIAL,
    ssn INTEGER,
    sin INTEGER,
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    address_id INTEGER,
    registered_on DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    UNIQUE(ssn),
    UNIQUE(sin),
    CONSTRAINT check_ssn CHECK (sin IS NULL OR sin BETWEEN 100000000 AND 999999999),
    CONSTRAINT check_sin CHECK (ssn IS NULL OR ssn BETWEEN 100000000 AND 999999999),
    CONSTRAINT has_sin_or_ssn CHECK (ssn IS NOT NULL OR sin IS NOT NULL)
);

CREATE TABLE rental (
    id SERIAL,
    customer_id INTEGER,
    employee_id INTEGER,
    hotel_chain_name VARCHAR(100),
    hotel_id INTEGER,
    room_number INTEGER,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    FOREIGN KEY (hotel_chain_name, hotel_id, room_number) REFERENCES room(hotel_chain_name, hotel_id, room_number),
    CONSTRAINT check_date_validity CHECK (start_date IS NOT NULL and end_date IS NOT NULL and end_date > start_date)
);

CREATE TABLE booking (
    id SERIAL,
    customer_id INTEGER,
    hotel_chain_name VARCHAR(100),
    hotel_id INTEGER,
    room_number INTEGER,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (hotel_chain_name, hotel_id, room_number) REFERENCES room(hotel_chain_name, hotel_id, room_number),
    CONSTRAINT check_date_validity CHECK (start_date IS NOT NULL and end_date IS NOT NULL and end_date > start_date)
);