const { MongoClient } = require('mongodb');
const express = require("express");

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// DataBase Name
const dbName = 'jornada_backend_13062023';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('herois');

  const app = express();

  // Indicamos que o Express deve considerar o Body
  // das requisições como JSON
  app.use(express.json());

  app.get("/" , function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", function (req, res) {
    res.send("Olá, Mundo!");
  });

   const herois = ["Mulher maravilha", "Homem de ferro", "Homem Formiga"];

  app.get("/herois", async function (req, res) {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  app.post("/herois", function (req, res) {
    // console.log(req.body, typeof req.body)

    const nome = req.body.nome;
    //console.log(nome, typeof nome);

    herois.push(nome);

    res.send("Item criado com sucesso!")
  });

  app.get("/herois/:id", function (req, res) {
    const id = req.params.id;
  
    const item = herois[id - 1];

    res.send(item);
  });

  app.put("/herois/:id", function (req, res) {
    const id = req.params.id;

    const novoNome = req.body.nome;
  
    herois[id - 1] = novoNome;

    res.send("Item atualizado com sucesso!");
  });

  app.delete("/herois/:id", function (req, res) {
    const id = req.params.id;

    delete herois[id - 1];

    res.send("Item deletado com sucesso!");
  });

  app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000")
  });
}

main()
  .catch(console.error)
  .finally(() => client.close());