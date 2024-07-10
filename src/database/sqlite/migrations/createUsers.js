const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name        VARCHAR NOT NULL,
        email       VARCHAR NOT NULL,
        password    VARCHAR NOT NULL,
        avatar      VARCHAR null,
        updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = createUsers;