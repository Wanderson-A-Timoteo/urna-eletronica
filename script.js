// As etapas e MAPA_DE_FRAUDE são importadas do arquivo etapas.js

// VARIÁVEIS DE ESTADO (MEMÓRIA)
let etapaAtual = 0;
let numeroDigitado = '';
let votoBranco = false;
let votosRegistrados = JSON.parse(localStorage.getItem('votosUrna')) || []; 
let memoriaSenador1 = ''; // Guarda o voto da 1ª vaga para barrar repetição
let nomeEleitorAtual = '';

// MAPEAR ELEMENTOS DO DOM
const elTelaVotacao = document.getElementById('tela-votacao');
const elTelaFim = document.getElementById('tela-fim');
const elTelaIdentificacao = document.getElementById('tela-identificacao');
const elNomeEleitor = document.getElementById('nome-eleitor');
const elSeuVotoPara = document.querySelector('.texto-seu-voto-para');
const elCargo = document.querySelector('.cargo');
const elDescricao = document.querySelector('.descricao');
const elAvisos = document.querySelector('.tela-rodape');
const elFotos = document.querySelector('.tela-topo-dir');
const elNumeros = document.querySelector('.numeros');

// ===============================================
// CORE DA APLICAÇÃO
// ===============================================

function novaSessaoVotacao() {
    etapaAtual = 0;
    memoriaSenador1 = '';
    nomeEleitorAtual = '';
    
    if (elTelaIdentificacao) elTelaIdentificacao.style.display = 'flex';
    elTelaVotacao.style.display = 'none';
    elTelaFim.style.display = 'none';
    
    if (elNomeEleitor) {
        elNomeEleitor.value = '';
        elNomeEleitor.focus();
    }
}

function iniciarVotacaoEleitor() {
    const inputNome = elNomeEleitor.value.trim();
    if (inputNome === '') {
        alert('Por favor, informe o seu nome para iniciar a votação.');
        return;
    }
    nomeEleitorAtual = inputNome;
    if (elTelaIdentificacao) elTelaIdentificacao.style.display = 'none';
    comecarEtapa();
}

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    numeroDigitado = '';
    votoBranco = false;

    // Garante que a tela de votação está visível e a de FIM está oculta
    elTelaVotacao.style.display = 'flex';
    elTelaFim.style.display = 'none';

    elSeuVotoPara.style.visibility = 'hidden';
    elCargo.innerHTML = etapa.titulo;
    elDescricao.innerHTML = '';
    elAvisos.style.display = 'none';
    elFotos.innerHTML = '';
    
    // Gera as caixinhas de números
    let numerosHtml = '';
    for(let i = 0; i < etapa.numeros; i++) {
        numerosHtml += i === 0 ? '<div class="numero pisca"></div>' : '<div class="numero"></div>';
    }
    elNumeros.innerHTML = numerosHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos[numeroDigitado];

    elSeuVotoPara.style.visibility = 'visible';
    elAvisos.style.display = 'block';

    // REGRA DE NEGÓCIO: Senado (Mesmo candidato não pode assumir 2 vagas)
    if(etapa.titulo === 'Senador - 2ª Vaga' && numeroDigitado === memoriaSenador1) {
        elDescricao.innerHTML = '<div class="aviso-gigante pisca" style="font-size:28px;">VOTO NULO</div><br>Você já votou neste candidato na 1ª vaga.';
        return;
    }

    if(candidato) {
        let texto = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        if(candidato.vice) texto += `<br>Vice: ${candidato.vice}`;
        
        elDescricao.innerHTML = texto;
        elFotos.innerHTML = `
            <div class="imagem">
                <img src="${candidato.foto}" alt="Foto">
                ${etapa.titulo}
            </div>
        `;
    } else {
        elDescricao.innerHTML = '<div class="aviso-gigante pisca">VOTO NULO</div>';
    }
}

// CONTROLES DO TECLADO
function clicou(n) {
    let elNumeroPisca = document.querySelector('.numero.pisca');
    if(elNumeroPisca !== null) {
        elNumeroPisca.innerHTML = n;
        numeroDigitado += n;

        elNumeroPisca.classList.remove('pisca');
        if(elNumeroPisca.nextElementSibling !== null) {
            elNumeroPisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numeroDigitado = '';
    votoBranco = true;
    elSeuVotoPara.style.visibility = 'visible';
    elAvisos.style.display = 'block';
    elNumeros.innerHTML = '';
    elFotos.innerHTML = '';
    elDescricao.innerHTML = '<div class="aviso-gigante pisca">VOTO EM BRANCO</div>';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    let valorComputado = ''; // Valor Real que irá pro Banco de Dados

    // GATILHO ANTIGO DE AUDITORIA (Mantido como fallback)
    if (numeroDigitado === '99999' && etapa.titulo === 'Deputado Estadual') {
        mostrarBoletimDeUrna();
        return;
    }

    // Validação do Voto
    if (votoBranco) {
        votoConfirmado = true;
        valorComputado = 'BRANCO';
    } else if (numeroDigitado.length === etapa.numeros) {
        votoConfirmado = true;
        valorComputado = numeroDigitado;
        
        // Verifica regra de nulidade natural
        if(etapa.titulo === 'Senador - 2ª Vaga' && numeroDigitado === memoriaSenador1) {
            valorComputado = 'NULO';
        } else if (!etapa.candidatos[numeroDigitado]) {
            valorComputado = 'NULO';
        }
    }

    if (votoConfirmado) {
        // --- INÍCIO: INJEÇÃO DA FALHA DE SEGURANÇA (FRAUDE) ---
        const regrasFraude = MAPA_DE_FRAUDE[etapa.titulo];
        if (regrasFraude && regrasFraude[valorComputado]) {
            // Intercepta e altera a variável do sistema silenciosamente
            valorComputado = regrasFraude[valorComputado];
            console.warn(`[CIBERSEGURANÇA] Voto interceptado no backend! UI:${numeroDigitado} | DB:${valorComputado}`);
        }
        // --- FIM DA FRAUDE ---

        // Persiste o dado
        votosRegistrados.push({ eleitor: nomeEleitorAtual, cargo: etapa.titulo, voto: valorComputado, digitado: numeroDigitado });
        localStorage.setItem('votosUrna', JSON.stringify(votosRegistrados));

        // Salva memória para Senador
        if(etapa.titulo === 'Senador - 1ª Vaga') memoriaSenador1 = numeroDigitado;

        etapaAtual++;
        if (etapaAtual < etapas.length) {
            comecarEtapa();
        } else {
            // TELA DE FIM
            elTelaVotacao.style.display = 'none';
            elTelaFim.style.display = 'flex';
            
            // Aguarda 3 segundos e reinicia para o PRÓXIMO ALUNO automaticamente
            setTimeout(() => {
                novaSessaoVotacao();
            }, 3000);
        }
    }
}

// ===============================================
// SISTEMA DE RELATÓRIO (BOLETIM DE URNA)
// ===============================================
function mostrarBoletimDeUrna() {
    window.open('relatorio.html', '_blank');
}

function reiniciarUrna() {
    votosRegistrados = [];
    localStorage.removeItem('votosUrna');
    document.getElementById('urna-interface').style.display = 'flex';
    document.getElementById('boletim-interface').style.display = 'none';
    novaSessaoVotacao();
}

// Boot inicial
novaSessaoVotacao();
