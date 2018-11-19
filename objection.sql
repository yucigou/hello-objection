CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE people (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    firstname TEXT,
    lastname TEXT
);

CREATE TABLE animals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT,
    ownerid UUID NOT NULL REFERENCES people
);

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE team (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role TEXT NOT NULL
);

CREATE TABLE usersteam (                         
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team,
    PRIMARY KEY(userid, teamid)
);                                               

CREATE TABLE manuscript (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	title TEXT NOT NULL
);

CREATE TABLE usersteammanuscript (
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team, 
	manuscriptid UUID REFERENCES manuscript,
    PRIMARY KEY(userid, teamid, manuscriptid)	
);
