CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-------------DB Schema-------------

CREATE TABLE organization (
    id UUID PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    name TEXT NOT NULL
);

CREATE TABLE journal (
    id UUID PRIMARY KEY,
    -- organization_id UUID NOT NULL REFERENCES organization,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    journal_title TEXT NOT NULL,
    "meta,publisher_name" TEXT
);

CREATE TABLE manuscript (
    id UUID PRIMARY KEY,
    journal_id UUID REFERENCES journal,
    organization_id UUID NOT NULL REFERENCES organization,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    -- points to "previous" (i.e. older) version of manuscript
    -- first version has previous_version = null
    -- id of current version does not change
    created_by TEXT NOT NULL,
    -- previous_version UUID REFERENCES manuscript,
    status TEXT NOT NULL,
    form_state TEXT,
    decision TEXT,
    "meta,title" TEXT,
    "meta,article_type" TEXT,
    "meta,article_ids" JSONB[],
    "meta,abstract" TEXT,
    "meta,subjects" TEXT[],
    "meta,publication_dates" JSONB[],
    "meta,notes" JSONB[],
    pdf_deposit_id TEXT,
    pdf_deposit_state TEXT
);

CREATE INDEX pdfState_idx ON manuscript (pdf_deposit_state);

CREATE TABLE file (
    id UUID PRIMARY KEY,
    manuscript_id UUID NOT NULL REFERENCES manuscript,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    deleted TIMESTAMP WITH TIME ZONE,
    type TEXT,
    label TEXT,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT,
    size INTEGER
);

-- user is a reserved word so we use users instead
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    default_identity TEXT
);

CREATE TABLE review (
    id UUID PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    comments JSONB[],
    recommendation TEXT,
    open BOOLEAN,
    user_id UUID NOT NULL REFERENCES users,
    manuscript_id UUID NOT NULL REFERENCES manuscript
);

CREATE TABLE audit_log (
    id UUID PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    user_id UUID REFERENCES users,
    action TEXT NOT NULL,
    object_id UUID,
    object_type TEXT,
    manuscript_id UUID NOT NULL REFERENCES manuscript
);

CREATE TABLE team (
    id UUID,
    role TEXT PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    object_id UUID NOT NULL,
    object_type TEXT NOT NULL
);

CREATE TABLE manuscript_team_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    manuscript_id UUID REFERENCES manuscript,
    user_id UUID NOT NULL REFERENCES users,
    team_role TEXT NOT NULL REFERENCES team(role),
    UNIQUE (manuscript_id, user_id, team_role)
);

CREATE UNIQUE INDEX mtu_m_uni_idx ON manuscript_team_users (user_id, team_role) WHERE manuscript_id IS NULL;

CREATE TABLE identity (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    type TEXT NOT NULL, -- e.g. local, orcid
    identifier TEXT, -- e.g. orcid ID
    display_name TEXT, -- used in the UI
    username TEXT UNIQUE, -- used for login
    email TEXT UNIQUE, -- used for contacting user
    password_hash TEXT,
    meta JSONB -- anything else, e.g. password, oauth tokens
);

ALTER TABLE journal
  ADD COLUMN "meta,issn" JSONB[],
  ADD COLUMN "meta,nlmta" TEXT,
  ADD COLUMN "meta,pmc_status" BOOLEAN,
  ADD COLUMN "meta,pubmed_status" BOOLEAN;

ALTER TABLE manuscript
  ADD COLUMN "meta,volume" TEXT,
  ADD COLUMN "meta,issue" TEXT,
  ADD COLUMN "meta,location" JSONB,
  ADD COLUMN "meta,fundingGroup" JSONB[],
  ADD COLUMN "meta,releaseDelay" TEXT,
  ADD COLUMN "meta,unmatchedJournal" TEXT,
  ADD COLUMN emsid SERIAL;

ALTER SEQUENCE manuscript_emsid_seq RESTART WITH 80000;

-- annotation --

CREATE TABLE annotation
(
  id uuid DEFAULT uuid_generate_v4 () NOT NULL,
  quote varchar,
  comment varchar,
  ranges json,
  created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted TIMESTAMP WITH TIME ZONE,
  user_id UUID NOT NULL REFERENCES users,
  review_id UUID NOT NULL REFERENCES review,
  CONSTRAINT annotation_pkey PRIMARY KEY (id)
);

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON annotations
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp();