const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let scores = [];

app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  scores.push({ name, score, createdAt: Date.now() });
  res.json({ result: 'Score salvo com sucesso.' });
});

app.get('/scores', (req, res) => {
  const top = scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json({ result: top });
});

const PORT = process.env.PORT || 10000; // Render define PORT
app.listen(PORT, () => {
  console.log('Servidor de ranking ouvindo na porta', PORT);
});
