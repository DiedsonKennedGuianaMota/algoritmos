// ===== CONFIGURAÇÕES =====
const SERVER_URL = 'https://algoritmos-hglz.onrender.com';

// ===== AVATARES (10 OPÇÕES SIMPLES COM EMOJI) =====
const AVATARS = [
  { id: 'robô', icon: '🤖' },
  { id: 'gatinho', icon: '🐱' },
  { id: 'cachorro', icon: '🐶' },
  { id: 'dinossauro', icon: '🦕' },
  { id: 'estrela', icon: '⭐' },
  { id: 'foguete', icon: '🚀' },
  { id: 'controle', icon: '🎮' },
  { id: 'lápis', icon: '✏️' },
  { id: 'livro', icon: '📘' },
  { id: 'coroa', icon: '👑' }
];

// Questões — só repetição simples e aninhada (10+)
let QUESTIONS = [
  {
    tema: "Repetição simples",
    enunciado: "O que é uma repetição simples em um algoritmo?",
    alternativas: [
      "Repetir um conjunto de passos várias vezes.",
      "Fazer um passo apenas uma vez.",
      "Trocar a ordem dos passos.",
      "Parar o algoritmo antes de começar."
    ],
    correta: 0,
    dica: "Pense em \"faça isso 5 vezes seguidas\"."
  },
  {
    tema: "Repetição simples",
    enunciado: "Qual comando em linguagem natural mostra repetição simples?",
    alternativas: [
      "Repita 4 vezes: bater palmas.",
      "Se estiver chovendo, abra o guarda-chuva.",
      "Mostre a mensagem uma vez.",
      "Pare o programa agora."
    ],
    correta: 0,
    dica: "Procure a palavra \"Repita\" com um número."
  },
  {
    tema: "Repetição simples",
    enunciado: "Em um algoritmo: \"Repita 3 vezes: pular para frente\", quantas vezes a ação é feita?",
    alternativas: [
      "1 vez.",
      "2 vezes.",
      "3 vezes.",
      "Nenhuma vez."
    ],
    correta: 2,
    dica: "Olhe para o número que vem depois de \"Repita\"."
  },
  {
    tema: "Repetição simples",
    enunciado: "Qual situação NÃO é um exemplo de repetição simples?",
    alternativas: [
      "Pular 10 vezes seguidas.",
      "Bater palmas 5 vezes.",
      "Beber um gole de água uma vez.",
      "Pintar 8 quadradinhos, um após o outro."
    ],
    correta: 2,
    dica: "Repetição precisa que algo aconteça várias vezes."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "O que é uma repetição aninhada?",
    alternativas: [
      "Uma repetição dentro de outra repetição.",
      "Uma repetição muito rápida.",
      "Uma repetição que nunca para.",
      "Uma repetição sem passos."
    ],
    correta: 0,
    dica: "É como um relógio: para cada hora, vários minutos."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "Qual exemplo mostra repetições aninhadas em linguagem natural?",
    alternativas: [
      "Repita 5 vezes: chutar a bola.",
      "Para cada linha do caderno, escreva seu nome 2 vezes.",
      "Escreva seu nome uma vez.",
      "Apague tudo e comece de novo."
    ],
    correta: 1,
    dica: "Tem uma repetição maior (linhas) e, dentro dela, outra (vezes)."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "Se o algoritmo diz: \"Para cada quadrado da fileira, pinte 3 bolinhas\", o que acontece?",
    alternativas: [
      "Pinta 3 bolinhas no total.",
      "Pinta 3 bolinhas em cada quadrado da fileira.",
      "Pinta só o primeiro quadrado.",
      "Não pinta nada."
    ],
    correta: 1,
    dica: "A repetição de bolinhas está dentro da repetição de quadrados."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "Em um desenho com 4 linhas e 2 colunas de estrelas (repetição aninhada), quantas estrelas serão desenhadas?",
    alternativas: [
      "2 estrelas.",
      "4 estrelas.",
      "6 estrelas.",
      "8 estrelas."
    ],
    correta: 3,
    dica: "4 linhas × 2 colunas = ?"
  },
  {
    tema: "Repetição simples x aninhada",
    enunciado: "Qual frase descreve melhor a diferença entre repetição simples e aninhada?",
    alternativas: [
      "Na simples repetimos uma ação; na aninhada repetimos grupos de ações dentro de outros.",
      "Na simples usamos números; na aninhada não usamos números.",
      "Na simples não repetimos nada; na aninhada repetimos tudo.",
      "São exatamente a mesma coisa."
    ],
    correta: 0,
    dica: "Na aninhada existe uma repetição maior que contém outra dentro."
  },
  {
    tema: "Repetição simples x aninhada",
    enunciado: "Qual opção é um algoritmo com repetição aninhada usando linguagem natural?",
    alternativas: [
      "Repita 10 vezes: bater na porta.",
      "Enquanto tiver folhas, leia o livro.",
      "Para cada aluno da fila, repita 2 vezes: dar um passo à frente.",
      "Mostre a mensagem \"Olá\"."
    ],
    correta: 2,
    dica: "Perceba que existe um \"para cada\" e dentro dele um \"repita\"."
  }
];

// ===== ESTADO DO JOGO =====
let current = -1;
let score = 0;
let hits = 0;
let combo = 0;
let firstAnswers = [];
let playerName = "";
let playerAvatar = AVATARS[0]; // padrão
let shuffledQuestions = [];

// ===== DOM =====
const qtotal = document.getElementById('qtotal');
const qnum = document.getElementById('qnum');
const qtitle = document.getElementById('qtitle');
const answersBox = document.getElementById('answers');
const startBtn = document.getElementById('startBtn');
const reviewBtn = document.getElementById('reviewBtn');
const rankBtn = document.getElementById('rankBtn');
const startBox = document.getElementById('startBox');
const scoreEl = document.getElementById('score');
const hitsEl = document.getElementById('hits');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const progressbar = document.getElementById('progressbar');
const comboEl = document.getElementById('combo');
const playerNameInput = document.getElementById('playerName');
const playerNameLabel = document.getElementById('playerNameLabel');
const contrastBtn = document.getElementById('toggle-contrast');
const fbBackdrop = document.getElementById('fb-backdrop');
const fbModal = document.getElementById('fb-modal');
const fbContent = document.getElementById('fb-content');
const fbClose = document.getElementById('fb-close');
const repBackdrop = document.getElementById('rep-backdrop');
const repModal = document.getElementById('rep-modal');
const repContent = document.getElementById('rep-content');
const repClose = document.getElementById('rep-close');
const repDownload = document.getElementById('rep-download');
const rankBackdrop = document.getElementById('rank-backdrop');
const rankModal = document.getElementById('rank-modal');
const rankContent = document.getElementById('rank-content');
const rankClose = document.getElementById('rank-close');

// ===== ACESSIBILIDADE: ALTO CONTRASTE =====
contrastBtn.addEventListener('click', ()=>{
  const active = document.body.classList.toggle('ac-high-contrast');
  contrastBtn.setAttribute('aria-pressed', String(active));
  localStorage.setItem('quiz_high_contrast', active ? '1':'0');
});
if(localStorage.getItem('quiz_high_contrast')==='1'){
  document.body.classList.add('ac-high-contrast');
  contrastBtn.setAttribute('aria-pressed','true');
}

// ===== INIT =====
qtotal.textContent = QUESTIONS.length;
updateProgress(0);
comboEl.textContent = 'x0';
buildAvatarSelector();   // monta seleção de avatares no início

startBtn.addEventListener('click', startGame);
reviewBtn.addEventListener('click', showLastReport);
rankBtn.addEventListener('click', loadRanking);
nextBtn.addEventListener('click', nextQuestion);
skipBtn.addEventListener('click', ()=>{
  revealFeedback(false, "Questão pulada. Dica: releia o enunciado com atenção.");
  toNextReady();
});

fbClose.addEventListener('click', ()=> closeModal(fbBackdrop, fbModal));
fbBackdrop.addEventListener('click', (e)=> { if(e.target===fbBackdrop) closeModal(fbBackdrop, fbModal); });
repClose.addEventListener('click', ()=> closeModal(repBackdrop, repModal));
repBackdrop.addEventListener('click', (e)=> { if(e.target===repBackdrop) closeModal(repBackdrop, repModal); });
rankClose.addEventListener('click', ()=> closeModal(rankBackdrop, rankModal));
rankBackdrop.addEventListener('click', (e)=> { if(e.target===rankBackdrop) closeModal(rankBackdrop, rankModal); });

document.addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && !nextBtn.disabled){
    nextQuestion();
  }
});

// ===== SELEÇÃO DE AVATAR =====
function buildAvatarSelector(){
  const container = document.createElement('div');
  container.style.marginTop = '10px';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '6px';
  container.setAttribute('aria-label','Escolha de avatar');

  AVATARS.forEach((av, index)=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = av.icon;
    btn.className = 'pill';
    btn.style.fontSize = '1.1rem';
    btn.dataset.avatarId = av.id;
    if(index === 0) btn.classList.add('primary');
    btn.addEventListener('click', ()=>{
      playerAvatar = av;
      document.querySelectorAll('[data-avatar-id]').forEach(b=>b.classList.remove('primary'));
      btn.classList.add('primary');
      updatePlayerLabel();
    });
    container.appendChild(btn);
  });

  startBox.appendChild(container);
}

function updatePlayerLabel(){
  if(playerName){
    playerNameLabel.textContent = `${playerAvatar.icon} ${playerName}`;
  }else{
    playerNameLabel.textContent = `${playerAvatar.icon} —`;
  }
}

// ===== FUNÇÕES DO JOGO =====
function startGame(){
  const name = playerNameInput.value.trim();
  if(!name){
    alert("Digite seu nome ou apelido para jogar.");
    playerNameInput.focus();
    return;
  }
  playerName = name;
  updatePlayerLabel();

  score = 0;
  hits = 0;
  combo = 0;
  firstAnswers = [];
  scoreEl.textContent = '0';
  hitsEl.textContent = '0';
  comboEl.textContent = 'x0';
  current = -1;

  // embaralhar perguntas e também alternativas de cada uma
  shuffledQuestions = shuffle(QUESTIONS).map(q => ({
    ...q,
    alternativas: shuffle(q.alternativas.slice())
  }));

  qtotal.textContent = shuffledQuestions.length;
  startBox.style.display = 'none';
  nextQuestion();
}

function nextQuestion(){
  current++;
  if(current >= shuffledQuestions.length){
    endGame();
    return;
  }
  qnum.textContent = String(current+1);
  updateProgress(current / shuffledQuestions.length);

  const q = shuffledQuestions[current];
  qtitle.textContent = `(${q.tema}) ${q.enunciado}`;
  renderAnswers(q);

  nextBtn.disabled = true;
  skipBtn.disabled = false;
}

function renderAnswers(q){
  answersBox.innerHTML = '';
  q.alternativas.forEach((txt, idx)=>{
    const b = document.createElement('button');
    b.className = 'btn';
    b.type = 'button';
    b.setAttribute('data-idx', idx);
    b.textContent = txt;
    b.addEventListener('click', ()=> handleAnswer(q, idx, b));
    answersBox.appendChild(b);
  });
}

function handleAnswer(q, idx, btnEl){
  if(!firstAnswers[current]){
    firstAnswers[current] = {
      question: q.enunciado,
      theme: q.tema,
      chosenIndex: idx,
      chosenText: q.alternativas[idx],
      correctIndex: q.correta,
      correct: idx === q.correta
    };
  }
  const isCorrect = (idx === q.correta);
  Array.from(answersBox.children).forEach(el=> el.disabled = true);

  if(isCorrect){
    combo += 1;
    const base = 100;
    const bonus = combo > 1 ? combo * 20 : 0;
    score += base + bonus;
    hits += 1;
    scoreEl.textContent = String(score);
    hitsEl.textContent = String(hits);
    comboEl.textContent = 'x' + combo;
    btnEl.classList.add('correct');
    revealFeedback(true, `Acertou! +${base} pontos e bônus de combo +${bonus} (x${combo}).`);
    toNextReady();
  }else{
    combo = 0;
    comboEl.textContent = 'x0';
    btnEl.classList.add('wrong');
    revealFeedback(false, `Ops, ainda não. Dica: ${q.dica}`);
    btnEl.disabled = true;
    Array.from(answersBox.children).forEach(el=>{
      if(!el.classList.contains('wrong')) el.disabled = false;
    });
  }
}

function toNextReady(){
  skipBtn.disabled = true;
  nextBtn.disabled = false;
}

function updateProgress(ratio){
  progressbar.style.width = Math.round(ratio*100) + '%';
}

// ===== FEEDBACK E RELATÓRIO =====
function revealFeedback(correct, text){
  fbContent.innerHTML = `
    <p class="${correct?'ok':'bad'}" style="margin:0 0 8px;font-weight:700">
      ${correct?'Resposta correta!':'Resposta incorreta'}
    </p>
    <p class="${correct?'ok':'hint'}" style="margin:0">${text}</p>
  `;
  openModal(fbBackdrop, fbModal);
}

function endGame(){
  updateProgress(1);
  const total = shuffledQuestions.length;
  const report = {
    player: `${playerAvatar.icon} ${playerName}`,
    when: new Date().toISOString(),
    totalQuestions: total,
    score,
    hits,
    errors: total - hits,
    firstAnswers
  };

  localStorage.setItem('quiz_report_last', JSON.stringify(report));
  renderReport(report);
  openModal(repBackdrop, repModal);
  sendScoreToServer(`${playerAvatar.icon} ${playerName}`, score);

  startBox.style.display = '';
  qtitle.textContent = 'Parabéns! Você terminou. Veja seu relatório ou jogue novamente.';
  answersBox.innerHTML = '';
  nextBtn.disabled = true;
  skipBtn.disabled = true;
}

function renderReport(rep){
  const items = (rep.firstAnswers || []).map((fa, i)=>`
    <li>
      <strong>Q${i+1} (${fa.theme}):</strong> ${fa.question}<br/>
      Sua 1ª resposta: “${fa.chosenText}” — ${fa.correct ? '<span class="ok">Correta</span>' : '<span class="bad">Incorreta</span>'}.
    </li>
  `).join('');
  repContent.innerHTML = `
    <p><strong>Jogador:</strong> ${rep.player || '—'}</p>
    <p><strong>Pontuação:</strong> ${rep.score} | <strong>Acertos:</strong> ${rep.hits}/${rep.totalQuestions} | <strong>Erros:</strong> ${rep.errors}</p>
    <p>Resumo das respostas iniciais do aluno em cada questão:</p>
    <ol class="list">${items}</ol>
  `;
  repDownload.onclick = ()=>{
    const blob = new Blob([JSON.stringify(rep,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'relatorio_quiz_algoritmos.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
}

function showLastReport(){
  const raw = localStorage.getItem('quiz_report_last');
  if(!raw){
    repContent.innerHTML = '<p>Sem relatório salvo ainda. Jogue uma rodada primeiro.</p>';
  }else{
    const rep = JSON.parse(raw);
    renderReport(rep);
  }
  openModal(repBackdrop, repModal);
}

// ===== MODAIS =====
function openModal(backdrop, modal){
  backdrop.style.display = 'flex';
  requestAnimationFrame(()=> modal.classList.add('show'));
  backdrop.setAttribute('aria-hidden','false');
}
function closeModal(backdrop, modal){
  modal.classList.remove('show');
  setTimeout(()=>{
    backdrop.style.display = 'none';
    backdrop.setAttribute('aria-hidden','true');
  }, 200);
}

// ===== RANKING (CLIENTE) =====
async function sendScoreToServer(name, score){
  try{
    await fetch(`${SERVER_URL}/scores`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ name, score })
    });
  }catch(e){
    console.error('Erro ao enviar score', e);
  }
}

async function loadRanking(){
  try{
    const resp = await fetch(`${SERVER_URL}/scores`);
    const data = await resp.json();
    const top = data.result || [];

    if(top.length === 0){
      rankContent.innerHTML = '<p>Ainda não há pontuações no ranking.</p>';
    }else{
      const rows = top.map((item, i)=>`
        <tr>
          <td>${i+1}º</td>
          <td>${item.name}</td>
          <td>${item.score}</td>
        </tr>
      `).join('');
      rankContent.innerHTML = `
        <p>Top ${top.length} jogadores:</p>
        <table class="rank-table">
          <thead>
            <tr><th>Posição</th><th>Nome</th><th>Pontos</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }
    openModal(rankBackdrop, rankModal);
  }catch(e){
    console.error('Erro ao carregar ranking', e);
    rankContent.innerHTML = '<p>Não foi possível carregar o ranking agora.</p>';
    openModal(rankBackdrop, rankModal);
  }
}

// ===== UTIL: EMBARALHAR =====
function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
