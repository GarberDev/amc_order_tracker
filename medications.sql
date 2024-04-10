CREATE TABLE medications (
    id SERIAL PRIMARY KEY,
    medication_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    date_entered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_ordered TIMESTAMP WITH TIME ZONE,
    date_received TIMESTAMP WITH TIME ZONE,
    person_entered VARCHAR(50),
    person_ordered VARCHAR(50),
    person_received VARCHAR(50),
    medication_status ENUM('to_be_ordered', 'on_order', 'received') NOT NULL,
    backordered BOOLEAN NOT NULL DEFAULT false
);
