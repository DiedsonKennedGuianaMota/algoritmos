const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// servir os arquivos estáticos do front
app.use(express.static(path.join(__dirname, 'public')));

// "banco" em memória (para produção, usar BD real)
let scores = []; // { name, score, createdAt }

// POST /scores  -> salva score
app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  if(!name || typeof score !== 'number'){
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  scores.push({ name, score, createdAt: Date.now() });
  res.json({ result: 'Score salvo com sucesso.' });
});

// GET /scores   -> top 10 ordenado
app.get('/scores', (req, res) => {
  const top = scores
    .slice()
    .sort((a,b)=>b.score - a.score)
    .slice(0,10);
  res.json({ result: top });
});

// fallback para SPA/HTML simples
app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
  console.log('Servidor de ranking ouvindo na porta', PORT);
});
