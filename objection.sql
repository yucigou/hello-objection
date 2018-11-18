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

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE team (
    id UUID PRIMARY KEY,
    role TEXT NOT NULL
);

CREATE TABLE users_team (
    user_id UUID NOT NULL REFERENCES users,
    team_id UUID NOT NULL REFERENCES team,
    PRIMARY KEY(user_id, team_id)
);
