CREATE TABLE people (
    id UUID PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE animals (
    id UUID PRIMARY KEY,
    name TEXT,
    owner_id UUID NOT NULL REFERENCES people
);
