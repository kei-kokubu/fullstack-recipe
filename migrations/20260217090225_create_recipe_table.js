/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recipe", function (table) {
    table.increments("id").primary();
    table.string("title", 64).notNullable();
    table.string("description", 200).notNullable();
    table.text("ingredients").notNullable();
    table.text("instructions").notNullable();
    table.string("genre", 25);
    table.integer("servenumber").notNullable();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("recipe_user.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipe");
};
