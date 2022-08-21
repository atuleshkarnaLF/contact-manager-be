import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").notNullable().unique();
    table.string("phone").unique();
    table.text("photograph");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("contacts");
}
