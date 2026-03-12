import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
  );
});

const port = process.env.PORT ?? 3000;

app.listen(port, () =>
  console.log(
    "Example app listening on port " + port + "!\n" + process.env.MESSAGE,
  ),
);

export default app;