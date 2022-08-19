const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "todo",
});

connection.connect(function (err) {
  if (err) throw err;
});

app.get("/", async (_, res) => {
  try {
    connection.query("SELECT * FROM tasks", (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        return res.send({ message: "Deu ruim na API" }).status(500);
      }
      return res.send(result).status(200);
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/createTask", async (req, res) => {
  const { title } = req.body;
  try {
    connection.query(
      `INSERT INTO tasks (title, done) VALUES ("${title}", false)`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .send({ message: "Algo deu errado na solicitação!" })
            .status(500);
        }
        return res.send(result).status(200);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteTask", async (req, res) => {
  const { id } = req.body;
  try {
    connection.query(`DELETE FROM tasks WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .send({ message: "Algo deu errado na solicitação!" })
          .status(500);
      }
      return res.send(result).status(200);
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/changeStatus", async (req, res) => {
  const { id, done } = req.body;
  try {
    connection.query(
      `UPDATE tasks SET done = ${done} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .send({ message: "Algo deu errado na solicitação!" })
            .status(500);
        } else {
          return res.send(result).status(200);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(3080, () => {
  console.log("Server Ok!...");
});
