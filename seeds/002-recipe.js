const fixture = require("../utils/fixture");

const recipeData = fixture.recipeData();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("recipe").del();
  await knex("recipe").insert(recipeData);
};
