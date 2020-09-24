// Update with your config settings.
let dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: process.env.DEV_POSTGRES_HOST,
            database: process.env.DEV_POSTGRES_DB,
            user: process.env.DEV_POSTGRES_USER,
            password: process.env.DEV_POSTGRES_PASSWORD,
            port: process.env.DEV_POSTGRES_PORT,
        },
        migrations: {
            tableName: "knex_migrations",
            disableMigrationsListValidation: false,
        },
    },
};
