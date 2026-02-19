/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("favorites").del();
  await knex("favorites").insert([
    { user_id: 1, recipe_id: 2, created_at: "2026-02-08 12:12:12" },
    { user_id: 2, recipe_id: 3, created_at: "2026-02-10 13:13:13" },
    { user_id: 1, recipe_id: 5, created_at: "2026-02-12 14:44:22" },
  ]);
};
