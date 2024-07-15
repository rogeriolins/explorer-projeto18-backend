// Gerar um hash da senha atraves do pacote BCryptJS
const knex = require("../database/knex");

// const sqliteConnection = require("../database/sqlite");

class NotesController {

 async delete(request, response) {
  const { id } =- request.params;

  await knex("notes").delete({ id })

 }

 async create ( request, response ) {
   const { title, description, tags, links } = request.body;
   const { user_id } = request.params;

   const [ note_id ] = await knex("notes").insert({
        title,
        description,
        user_id
   })

   const linkInsert = links.map(link => {
    return {
        note_id,
        url: link
    }
   });

   await knex("links").insert( linkInsert );

   const tagsInsert = tags.map(name => {
    return {
        note_id,
        name,
        user_id
    }
   });

   await knex("tags").insert(tagsInsert);

   response.status(200).json("Notes, Links and Tags inserted.");

 }

 async show (request, response) {
  const { id } = request.params;

  const note = await knex("notes").where({ id }).first();
  const tags = await knex("tags").where( { note_id: id } ).orderBy("name");
  const links = await knex("links").where( { note_id: id } ).orderBy("created_at");

  return response.status(200).json({
    ...note,
    tags,
    links
  });

 }

}

module.exports = NotesController;