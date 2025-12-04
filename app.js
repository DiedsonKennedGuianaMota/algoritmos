// ===== CONFIGURAÇÕES =====
const SERVER_URL = 'http://localhost:3000'; // ajuste se hospedar em outro domínio

// Questões — 4º ano
const QUESTIONS = [
  {
    tema: "Introdução a algoritmos",
    enunciado: "O que é um algoritmo?",
    alternativas: [
      "Um conjunto de passos para resolver um problema.",
      "Um jogo de computador.",
      "Uma peça do computador.",
      "Uma cor de tela."
    ],
    correta: 0,
    dica: "Pense em uma receita de bolo: são passos na ordem certa."
  },
  {
    tema: "Introdução a algoritmos",
    enunciado: "Qual exemplo mostra um algoritmo no dia a dia?",
    alternativas: [
      "Desenhar sem pensar.",
      "Escovar os dentes seguindo etapas.",
      "Chutar uma bola aleatoriamente.",
      "Dormir sem horário."
    ],
    correta: 1,
    dica: "Tem começo, meio e fim em ordem."
  },
  {
    tema: "Repetição simples",
    enunciado: "Repetição simples significa...",
    alternativas: [
      "Fazer um passo uma única vez.",
      "Fazer um conjunto de passos várias vezes.",
      "Fazer passos fora de ordem.",
      "Parar antes de começar."
    ],
    correta: 1,
    dica: "Como bater palmas 5 vezes seguidas."
  },
  {
    tema: "Repetição simples",
    enunciado: "Qual comando representa repetir 3 vezes?",
    alternativas: [
      "Repita 3 vezes: pular.",
      "Se chover, pular.",
      "Mostrar: pular uma vez.",
      "Parar pular."
    ],
    correta: 0,
    dica: "Procure a palavra 'Repita' com um número."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "O que é uma repetição aninhada?",
    alternativas: [
      "Uma repetição dentro de outra repetição.",
      "Uma repetição muito grande.",
      "Uma repetição que nunca acaba.",
      "Uma repetição sem passos."
    ],
    correta: 0,
    dica: "Como um relógio: minutos dentro das horas."
  },
  {
    tema: "Repetições aninhadas",
    enunciado: "Qual situação tem repetições aninhadas?",
    alternativas: [
      "Cantar 1 música 3 vezes.",
      "Para cada linha, bater palmas 2 vezes.",
      "Beber água uma vez.",
      "Pular sem contar."
    ],
    correta: 1,
    dica: "Há uma repetição externa (linhas) e uma interna (palmas)."
  },
  {
    tema: "Fluxo e ordem",
    enunciado: "Por que a ordem dos passos é importante?",
    alternativas: [
      "Porque deixa o desenho mais bonito.",
      "Para que o resultado saia certo.",
      "Para terminar mais rápido sempre.",
      "Para ter mais cores."
    ],
    correta: 1,
    dica: "Trocar a ordem pode estragar a receita."
  },
  {
    tema: "Depuração (debug)",
    enunciado: "Se algo deu errado no algoritmo, o que fazer primeiro?",
    alternativas: [
      "Parar e nunca mais tentar.",
      "Checar os passos e corrigir onde errou.",
      "Apagar tudo sem olhar.",
      "Pedir para o amigo fazer."
    ],
    correta: 1,
    dica: "Releia com calma e teste passo a passo."
  }
];

// ===== ESTADO DO JOGO =====
let current = -1;
let score = 0;
let hits = 0;
let combo = 0;
let firstAnswers = [];
let playerName = "";

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

// Modais
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

// ===== FUNÇÕES DO JOGO =====
function startGame(){
  const name = playerNameInput.value.trim();
  if(!name){
    alert("Digite seu nome ou apelido para jogar.");
    playerNameInput.focus();
    return;
  }
  playerName = name;
  playerNameLabel.textContent = playerName;

  score = 0;
  hits = 0;
  combo = 0;
  firstAnswers = [];
  scoreEl.textContent = '0';
  hitsEl.textContent = '0';
  comboEl.textContent = 'x0';
  current = -1;

  startBox.style.display = 'none';
  nextQuestion();
}

function nextQuestion(){
  current++;
  if(current >= QUESTIONS.length){
    endGame();
    return;
  }
  qnum.textContent = String(current+1);
  updateProgress(current / QUESTIONS.length);

  const q = QUESTIONS[current];
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
  const total = QUESTIONS.length;
  const report = {
    player: playerName,
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

  // Enviar score para o servidor de ranking
  sendScoreToServer(playerName, score);

  // Reset visual para jogar de novo
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
