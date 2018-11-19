CREATE TABLE people (
    id UUID PRIMARY KEY,
    firstname TEXT,
    lastname TEXT
);

CREATE TABLE animals (
    id UUID PRIMARY KEY,
    name TEXT,
    ownerid UUID NOT NULL REFERENCES people
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
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team,
    PRIMARY KEY(userid, teamid)
);
