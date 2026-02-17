const fixture = require("../utils/fixture");

const userData = fixture.recipeUser();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("recipe_user").del();
  await knex("recipe_user").insert(userData);
};
