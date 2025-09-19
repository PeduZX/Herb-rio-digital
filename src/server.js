const express = require("express");
const cors = require("cors");
const connection = require("./db_config");

// Definir a porta e instanciar o express
const porta = 3000;

// Habilitar o cors e utilização de JSON
const app = express();
app.use(cors());
app.use(express.json());


// Rota GET para listar usuários
app.get("/plantas/listar", (request, response) => {
  const query = "SELECT * FROM plantas";
  connection.query(query, (err, results) => {
    if (results) {
      response.status(200).json({ success: true, message: "Sucesso!", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem sucesso!", data: err });
    }
  });
});


// Rota POST para cadastrar novo usuário
app.post("/plantas/cadastrar", (request, response) => {
  let params = [
         request.body.nomePopular,
        request.body.nomeCientifico,
        request.body.familiaBotanica,
        request.body.origem,
        request.body.usosMedicinais,
        request.body.principioAtivos,
        request.body.parteUtilizada,
        request.body.modoPreparo,
        request.body.contraindicacoes,
        request.body.imagem,
  ];
console.log(params);
  let query =
    "INSERT INTO plantas(nome_popular, nome_cientifico, familia_botanica, origem, usos_medicinais, principios_ativos, parte_utilizada, modo_preparo, contraindicacoes, imagem) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({ success: true, message: "Sucesso", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem sucesso", data: err });
    }
  });
});



// Rota PUT para editar usuário
app.put("/plantas/editar/:id", (request, response) => {
  let params = [request.body.nomePopular, request.body.nomeCientifico, request.body.familiaBotanica, request.body.origem, request.body.usosMedicinais, request.body.principioAtivos, request.body.parteUtilizada, request.body.modoPreparo, request.body.contraindicacoes, request.body.imagem,];
  let query = "UPDATE plantas SET name = ? WHERE id = ?";
  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(200).json({ success: true, message: "Sucesso", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem Sucesso", data: err });
    }
  });
});

// Rota DELETE para excluir usuário
app.delete("/plantas/deletar/:id", (request, response) => {
  let params = [request.params.id];
  let query = "DELETE FROM plantas WHERE id = ?;";
  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(200).json({ success: true, message: "Sucesso", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem Sucesso", data: err });
    }
  });
});


// Iniciar servidor
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000")
})