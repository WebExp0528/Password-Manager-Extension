exports.up = async function (knex, Promise) {
    await knex.schema.createTable("users", (t) => {
        t.increments("id").unsigned().primary();
        t.string("first_name");
        t.string("last_name");
        t.string("email").notNullable();
        t.string("password").notNullable();
        t.string("token", 1024);
        t.string("icon_url");
        t.string("forget_pwd_code", 1024);
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
        t.comment("Users");
    });
};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTableIfExists("users");
};
