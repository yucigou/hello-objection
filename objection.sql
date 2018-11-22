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
    email TEXT UNIQUE NOT NULL,
    password TEXT
);

CREATE TABLE team (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role TEXT NOT NULL
);

-- users_team --
CREATE TABLE usersteam (
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team,
    PRIMARY KEY(userid, teamid)
);

CREATE TABLE manuscript (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL
);

-- users_team_manuscript --
CREATE TABLE usersteammanuscript (
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team, 
    manuscriptid UUID REFERENCES manuscript,
    PRIMARY KEY(userid, teamid, manuscriptid)
);

CREATE TABLE organization (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL
);

-- oranization_manuscript_team_users --
CREATE TABLE omtu (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    userid UUID NOT NULL REFERENCES users,
    teamid UUID NOT NULL REFERENCES team,
    manuscriptid UUID REFERENCES manuscript,
    organizationid UUID REFERENCES organization,
    UNIQUE (userid, teamid, manuscriptid, organizationid)
);

CREATE UNIQUE INDEX omtu_m_uni_idx ON omtu (manuscriptid) WHERE organizationid IS NULL;
CREATE UNIQUE INDEX dist_o_uni_idx ON omtu (organizationid) WHERE manuscriptid IS NULL;
