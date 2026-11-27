// Lista das 10 rodadas alternando revisão (6º ao 8º ano) e assuntos atuais (9º ano),
// além de alternar entre digitação rápida e escolha nas trilhas.
const perguntas = [
  {
    nivel: "Revisão 6º Ano",
    modo: "digitacao",
    enunciado: "Resolva a expressão numérica respeitando a multiplicação primeiro:",
    expressao: "15 + 4 × 3",
    respostaCorreta: "27",
    explicacao: "Primeiro fazemos 4 × 3 = 12 e depois somamos 15 + 12 = 27."
  },
  {
    nivel: "9º Ano • Raízes",
    modo: "alternativas",
    enunciado: "Calcule a soma das raízes quadradas exatas:",
    expressao: "√49 + √25",
    opcoes: ["12", "14", "74", "35"],
    respostaCorreta: "12",
    explicacao: "√49 é 7 (pois 7×7 = 49) e √25 é 5 (pois 5×5 = 25). Somando: 7 + 5 = 12."
  },
  {
    nivel: "Revisão 7º Ano",
    modo: "digitacao",
    enunciado: "Calcule a operação com números inteiros (atenção aos sinais):",
    expressao: "-8 + 15 - 3",
    respostaCorreta: "4",
    explicacao: "Devo 8 e tenho 15, fico com +7. Tirando 3, sobra 4."
  },
  {
    nivel: "9º Ano • Potências",
    modo: "alternativas",
    enunciado: "Aplique a propriedade de potência de mesma base na multiplicação:",
    expressao: "2³ · 2²",
    opcoes: ["32", "16", "64", "10"],
    respostaCorreta: "32",
    explicacao: "Na multiplicação de mesma base, somamos os expoentes: 2^(3+2) = 2⁵ = 32."
  },
  {
    nivel: "Revisão 7º/8º Ano",
    modo: "digitacao",
    enunciado: "Descubra o valor de x na equação do 1º grau:",
    expressao: "3x - 5 = 16",
    respostaCorreta: "7",
    explicacao: "Passando -5 somando: 3x = 16 + 5 → 3x = 21 → x = 21 ÷ 3 = 7."
  },
  {
    nivel: "9º Ano • Prod. Notáveis",
    modo: "alternativas",
    enunciado: "Desenvolva o quadrado da soma (consulte a pasta de fórmulas se precisar):",
    expressao: "(x + 3)²",
    opcoes: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9", "2x + 6"],
    respostaCorreta: "x² + 6x + 9",
    explicacao: "Pela fórmula (a + b)² = a² + 2ab + b², temos x² + 2·x·3 + 3² = x² + 6x + 9."
  },
  {
    nivel: "Revisão 8º Ano",
    modo: "digitacao",
    enunciado: "Calcule o valor numérico da expressão algébrica para a = 4:",
    expressao: "2a² - 10",
    respostaCorreta: "22",
    explicacao: "Substituindo a por 4: 2 · (4²) - 10 = 2 · 16 - 10 = 32 - 10 = 22."
  },
  {
    nivel: "9º Ano • Prod. Notáveis",
    modo: "alternativas",
    enunciado: "Resolva o produto da soma pela diferença:",
    expressao: "(x + 5)(x - 5)",
    opcoes: ["x² - 25", "x² + 25", "x² - 10x + 25", "2x - 10"],
    respostaCorreta: "x² - 25",
    explicacao: "Pela regra (a + b)(a - b) = a² - b², temos x² - 5² = x² - 25."
  },
  {
    nivel: "Revisão 8º Ano",
    modo: "digitacao",
    enunciado: "Qual é a área de um triângulo com base 10 cm e altura 6 cm?",
    expressao: "Área = (10 × 6) ÷ 2",
    respostaCorreta: "30",
    explicacao: "A área do triângulo é (base × altura) ÷ 2 = 60 ÷ 2 = 30."
  },
  {
    nivel: "9º Ano • Equação 2º Grau",
    modo: "alternativas",
    enunciado: "Calcule o valor do discriminante Delta (Δ = b² - 4ac) para a=1, b=-5, c=6:",
    expressao: "x² - 5x + 6 = 0",
    opcoes: ["1", "49", "-1", "25"],
    respostaCorreta: "1",
    explicacao: "Δ = (-5)² - 4 · 1 · 6 = 25 - 24 = 1."
  }
];

// Estado atual da partida
let indiceAtual = 0;
let acertos = 0;
let tentativaAtual = 1;
let tempoInicio = 0;
let bloqueado = false;

// Referências aos elementos da tela
const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaFim = document.getElementById("tela-fim");

const textoRodada = document.getElementById("texto-rodada");
const textoNivel = document.getElementById("texto-nivel");
const textoAcertos = document.getElementById("texto-acertos");

const badgeModo = document.getElementById("badge-modo");
const badgeChances = document.getElementById("badge-chances");
const enunciadoPergunta = document.getElementById("enunciado-pergunta");
const expressaoDestaque = document.getElementById("expressao-destaque");

const areaDigitacao = document.getElementById("area-digitacao");
const campoResposta = document.getElementById("campo-resposta");
const areaAlternativas = document.getElementById("area-alternativas");
const caixaFeedback = document.getElementById("caixa-feedback");

const modalFormulas = document.getElementById("modal-formulas");

// Inicia o jogo
function iniciarJogo() {
  indiceAtual = 0;
  acertos = 0;
  tentativaAtual = 1;
  tempoInicio = Date.now();
  bloqueado = false;

  telaInicio.hidden = true;
  telaFim.hidden = true;
  telaJogo.hidden = false;

  atualizarPlacar();
  carregarPergunta();
  avisarRedimensionamento();
}

// Atualiza os indicadores do topo
function atualizarPlacar() {
  const numeroFase = Math.min(indiceAtual + 1, perguntas.length);
  textoRodada.textContent = `${numeroFase} / ${perguntas.length}`;
  textoAcertos.textContent = String(acertos);
  if (perguntas[indiceAtual]) {
    textoNivel.textContent = perguntas[indiceAtual].nivel;
  }
}

// Monta a rodada atual na tela
function carregarPergunta() {
  const questao = perguntas[indiceAtual];
  tentativaAtual = 1;
  bloqueado = false;

  caixaFeedback.hidden = true;
  caixaFeedback.className = "caixa-feedback";
  document.body.classList.remove("erro-flash");

  atualizarPlacar();
  badgeChances.textContent = "Tentativa 1 de 2";
  enunciadoPergunta.textContent = questao.enunciado;
  expressaoDestaque.textContent = questao.expressao;

  if (questao.modo === "digitacao") {
    badgeModo.textContent = "⌨️ MODO DIGITAÇÃO RÁPIDA";
    areaDigitacao.hidden = false;
    areaAlternativas.hidden = true;
    campoResposta.value = "";
  } else {
    badgeModo.textContent = "🎸 MODO TRILHAS (ESCOLHA)";
    areaDigitacao.hidden = true;
    areaAlternativas.hidden = false;
    renderizarAlternativas(questao.opcoes);
  }

  avisarRedimensionamento();
}

// Cria os botões de alternativas
function renderizarAlternativas(opcoes) {
  areaAlternativas.innerHTML = "";
  opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "btn-alternativa";
    botao.textContent = opcao;
    botao.addEventListener("click", () => verificarResposta(opcao));
    areaAlternativas.appendChild(botao);
  });
}

// Adiciona números ou sinais no visor de digitação
function adicionarCaractere(caractere) {
  if (bloqueado) return;
  if (campoResposta.value.length < 12) {
    campoResposta.value += caractere;
  }
}

// Apaga o último caractere digitado
function apagarCaractere() {
  if (bloqueado) return;
  campoResposta.value = campoResposta.value.slice(0, -1);
}

// Verifica a resposta enviada pelo jogador
function verificarResposta(respostaUsuario) {
  if (bloqueado) return;

  const questao = perguntas[indiceAtual];
  const respostaLimpa = String(respostaUsuario).trim().replace(".", ",");
  const corretaLimpa = String(questao.respostaCorreta).trim().replace(".", ",");

  if (respostaLimpa === "") {
    mostrarFeedback("Digite um número antes de confirmar!", "erro");
    return;
  }

  // Acertou
  if (respostaLimpa === corretaLimpa) {
    bloqueado = true;
    acertos++;
    atualizarPlacar();
    mostrarFeedback(`✅ Mandou bem! ${questao.explicacao}`, "acerto");
    setTimeout(proximaPergunta, 2200);
    return;
  }

  // Errou: pisca a tela em vermelho
  piscarTelaVermelha();

  if (tentativaAtual === 1) {
    // Dá a segunda chance
    tentativaAtual = 2;
    badgeChances.textContent = "Tentativa 2 de 2 (Última chance!)";
    campoResposta.value = "";
    mostrarFeedback("❌ Ops! Confira os sinais ou abra a Pasta de Fórmulas e tente de novo!", "erro");
  } else {
    // Errou a segunda vez: explica e vai para a próxima
    bloqueado = true;
    mostrarFeedback(`❌ Resposta certa: ${questao.respostaCorreta}. ${questao.explicacao}`, "erro");
    setTimeout(proximaPergunta, 3000);
  }
}

// Efeito visual vermelho ao errar
function piscarTelaVermelha() {
  document.body.classList.add("erro-flash");
  setTimeout(() => {
    document.body.classList.remove("erro-flash");
  }, 650);
}

// Exibe a mensagem curta explicando o acerto ou erro
function mostrarFeedback(texto, tipo) {
  caixaFeedback.textContent = texto;
  caixaFeedback.className = `caixa-feedback ${tipo === "acerto" ? "feedback-acerto" : "feedback-erro"}`;
  caixaFeedback.hidden = false;
  avisarRedimensionamento();
}

// Avança para a próxima rodada ou encerra o jogo
function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
  } else {
    finalizarJogo();
  }
}

// Calcula medalha por porcentagem e envia resultado ao portal
function finalizarJogo() {
  telaJogo.hidden = true;
  telaFim.hidden = false;

  const total = perguntas.length;
  const porcentagem = Math.round((acertos / total) * 100);
  const tempoMs = Date.now() - tempoInicio;
  const segundos = Math.max(1, Math.round(tempoMs / 1000));

  let medalha = "🎯";
  let titulo = "BOM TREINO!";
  let mensagem = "Você completou o desafio! Continue praticando para passar dos 50%.";

  if (porcentagem >= 80) {
    medalha = "🏆";
    titulo = "MESTRE DO CÓDIGO!";
    mensagem = "Incrível! Você dominou tanto a revisão quanto os desafios do 9º ano.";
  } else if (porcentagem >= 50) {
    medalha = "🥈";
    titulo = "FASE DESBLOQUEADA!";
    mensagem = "Mandou bem! Você atingiu 50% ou mais de acertos e garantiu sua pontuação.";
  }

  document.getElementById("medalha-final").textContent = medalha;
  document.getElementById("titulo-final").textContent = titulo;
  document.getElementById("resumo-final").textContent = mensagem;
  document.getElementById("final-acertos").textContent = `${acertos}/${total}`;
  document.getElementById("final-porcentagem").textContent = `${porcentagem}%`;
  document.getElementById("final-tempo").textContent = `${segundos}s`;

  // Contrato com o portal: avisa que o jogo terminou
  window.parent.postMessage(
    {
      type: "vrgame:finish",
      score: acertos * 10,
      maxScore: total * 10,
      timeMs: tempoMs,
      detail: { jogo: "game-cartoon" }
    },
    "*"
  );

  avisarRedimensionamento();
}

// Suporte ao teclado físico (incluindo teclado numérico do lado direito)
document.addEventListener("keydown", (evento) => {
  if (!modalFormulas.hidden) {
    if (evento.key === "Escape") modalFormulas.hidden = true;
    return;
  }

  if (telaJogo.hidden || bloqueado) return;
  const questao = perguntas[indiceAtual];
  if (questao.modo !== "digitacao") return;

  if (/^[0-9+\-,]$/.test(evento.key)) {
    evento.preventDefault();
    adicionarCaractere(evento.key);
  } else if (evento.key === ".") {
    evento.preventDefault();
    adicionarCaractere(",");
  } else if (evento.key === "Backspace") {
    evento.preventDefault();
    apagarCaractere();
  } else if (evento.key === "Enter") {
    evento.preventDefault();
    verificarResposta(campoResposta.value);
  }
});

// Eventos dos botões da tela
document.getElementById("btn-iniciar").addEventListener("click", iniciarJogo);
document.getElementById("btn-reiniciar").addEventListener("click", iniciarJogo);

document.querySelectorAll(".btn-tecla[data-valor]").forEach((botao) => {
  botao.addEventListener("click", () => {
    adicionarCaractere(botao.getAttribute("data-valor"));
  });
});

document.getElementById("btn-apagar").addEventListener("click", apagarCaractere);
document.getElementById("btn-confirmar").addEventListener("click", () => {
  verificarResposta(campoResposta.value);
});

// Pasta de fórmulas
document.getElementById("btn-formulas").addEventListener("click", () => {
  modalFormulas.hidden = false;
});
document.getElementById("btn-fechar-formulas").addEventListener("click", () => {
  modalFormulas.hidden = true;
});
modalFormulas.addEventListener("click", (evento) => {
  if (evento.target === modalFormulas) {
    modalFormulas.hidden = true;
  }
});

// Alternância de tema claro/escuro
function aplicarTema(tema) {
  if (tema === "light" || tema === "claro") {
    document.body.classList.add("tema-claro");
  } else {
    document.body.classList.remove("tema-claro");
  }
}

document.getElementById("btn-tema").addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");
});

// ==========================================
// CONTRATO DE INTEGRAÇÃO COM O PORTAL
// ==========================================
function avisarRedimensionamento() {
  const altura = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
}

window.addEventListener("message", (evento) => {
  const dados = evento.data;
  if (!dados || typeof dados !== "object") return;

  if (dados.type === "vrgame:theme") {
    aplicarTema(dados.theme || dados.value);
  }

  if (dados.type === "vrgame:fullscreen") {
    if (dados.fullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (!dados.fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }
});

window.addEventListener("resize", avisarRedimensionamento);

window.addEventListener("load", () => {
  window.parent.postMessage({ type: "vrgame:ready" }, "*");
  avisarRedimensionamento();
});