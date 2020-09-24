import { logger } from "../util/logger";
import knex from "knex";
import fs from "fs";
import path from "path";

logger.info({
    msg: "db host",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
});

try {
    //@ts-ignore
    knex.QueryBuilder.extend("paginate", function paginate(
        perPage = 50,
        page = 1,
        isLengthAware = false
    ) {
        // ... validations
        // Validate argument type
        if (isNaN(perPage)) {
            throw new Error("Paginator error: perPage must be a number.");
        }

        if (isNaN(page)) {
            throw new Error("Paginator error: page must be an number.");
        }

        if (typeof isLengthAware != "boolean") {
            throw new Error(
                "Paginator error: isLengthAware must be a boolean."
            );
        }

        // Don't allow negative pages
        if (page < 1) {
            page = 1;
        }

        const offset = (page - 1) * perPage;
        // This will paginate the data itself
        this.offset(offset).limit(perPage);
        //@ts-ignore
        return this.client.transaction(
            async (trx) => {
                let paginator = {};
                //@ts-ignore
                const result = await this.transacting(trx);

                if (isLengthAware) {
                    //@ts-ignore
                    const countQuery = await this.clone()
                        .clearSelect()
                        .clearOrder()
                        .clearHaving()
                        .modify((qb) => {
                            //@ts-ignore
                            qb._clearGrouping("group");
                        })
                        .count("* as total")
                        .offset(0)
                        .first()
                        .transacting(trx);
                    const total = countQuery.total;

                    paginator = {
                        ...paginator,
                        total: total,
                        last_page: Math.ceil(total / perPage),
                    };
                }

                // Add pagination data to paginator object
                paginator = {
                    ...paginator,
                    per_page: perPage,
                    current_page: page,
                    from: offset,
                    //@ts-ignore
                    to: offset + result.length,
                    data: result,
                };

                return paginator;
            },
            {},
            null
        );
    });
} catch (e) {
    logger.error("paginator already loaded");
}

const pg = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT),
        ssl: {
            rejectUnauthorized: process.env.NODE_ENV !== "development",
            ca: `${process.env.POSTGRES_SSL_CERT}`
                .trim()
                .replace(/\\s/g, " ")
                .replace(/\\n/g, "\n"),
        },
    },
    pool: {
        min: parseInt(`${process.env.POSTGRES_POOL_MIN || 2}`),
        max: parseInt(`${process.env.POSTGRES_POOL_MAX || 3}`),
    },
});
// paginator(pg);
export default pg as knex | any;
