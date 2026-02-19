/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorites", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("recipe_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("user_id").references("recipe_user.id").onDelete("CASCADE");
    table.foreign("recipe_id").references("recipe.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favorites");
};
