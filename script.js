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

/**
 * Função responsável por preparar a urna para um novo eleitor.
 * Ela "zera" as variáveis de estado, escondendo as telas de votação e de fim,
 * e exibe a tela inicial de identificação. É como o "reboot" que o mesário faz
 * na urna real após cada pessoa votar.
 */
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

/**
 * Captura o nome digitado pelo eleitor e avança para a primeira tela de votação.
 * Em um cenário real, isso representaria a validação biométrica do mesário. 
 * Para a nossa simulação educacional, serve para atrelarmos e rastrearmos o voto
 * do aluno no boletim de auditoria e provar a fraude nominalmente.
 */
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

/**
 * Inicia a renderização de um novo cargo na tela (ex: Deputado, Governador).
 * Ela limpa o visor da urna, lê as propriedades do cargo atual (título e 
 * quantidade de dígitos) e desenha na tela as caixinhas vazias correspondentes,
 * fazendo a primeira piscar para aguardar a digitação.
 */
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

/**
 * Após o eleitor digitar todos os dígitos necessários para o cargo, esta função
 * procura o número digitado na base de dados de candidatos (etapas.js). 
 * Se achar, exibe a foto e os dados. Se não achar, avisa que o voto será NULO.
 * Aqui também checamos a regra de negócio para impedir repetição de voto para Senador.
 */
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

/**
 * Acionada sempre que um número (0-9) é pressionado no teclado virtual.
 * Ela encontra a caixinha que está piscando, preenche com o número e faz 
 * a próxima piscar. Quando todas preenchem, chama a validação da interface.
 */
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

/**
 * Pula a digitação de números e marca a variável 'votoBranco' como verdadeira.
 * Exibe imediatamente a mensagem "VOTO EM BRANCO" na tela, removendo as caixas.
 */
function branco() {
    numeroDigitado = '';
    votoBranco = true;
    elSeuVotoPara.style.visibility = 'visible';
    elAvisos.style.display = 'block';
    elNumeros.innerHTML = '';
    elFotos.innerHTML = '';
    elDescricao.innerHTML = '<div class="aviso-gigante pisca">VOTO EM BRANCO</div>';
}

/**
 * O famoso botão Laranja. Simplesmente reinicia a etapa (o cargo) atual,
 * esvaziando todas as caixinhas numéricas para que o eleitor digite do zero.
 */
function corrige() {
    comecarEtapa();
}

/**
 * A função mais crítica do sistema. Executada quando o eleitor aperta o botão VERDE.
 * É aqui que o software formaliza e empacota a decisão do eleitor.
 * IMPORTANTE: É EXATAMENTE AQUI, NO BACKEND, QUE OCORRE A FRAUDE SILENCIOSA.
 */
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
        // =======================================================================
        // --- INÍCIO DA ZONA DE INJEÇÃO DA FALHA DE SEGURANÇA (FRAUDE) ---
        // =======================================================================
        // AQUI ESTÁ O "BACKDOOR" (Porta dos fundos maliciosa):
        // 
        // 1. O eleitor já apertou VERDE, olhando para a tela e acreditando 
        //    que votou no candidato exibido. A interface (UI) já fez o seu papel.
        // 2. Porém, antes de salvar o dado na variável persistente (votosRegistrados), 
        //    nós interceptamos a variável interna 'valorComputado'.
        // 3. Consultamos silenciosamente o arquivo de configurações 'MAPA_DE_FRAUDE'.
        const regrasFraude = MAPA_DE_FRAUDE[etapa.titulo];
        if (regrasFraude) {
            
            // TIPO 1 DE FRAUDE: Substituição Direta
            // Se o mapa diz que o candidato X deve virar Y, nós sobrescrevemos a variável.
            if (regrasFraude[valorComputado] && valorComputado !== regrasFraude[valorComputado]) {
                valorComputado = regrasFraude[valorComputado]; // <--- ROUBO DO VOTO
                console.warn(`[CIBERSEGURANÇA] Voto interceptado (Substituição Direta)! UI:${numeroDigitado} | DB:${valorComputado}`);
            
            // TIPO 2 DE FRAUDE: Regra Coringa (Wildcard '*')
            // Essa regra pega TODOS OS VOTOS de um cargo (incluindo nulos e brancos)
            // e os desvia para o candidato fraudador, de forma massiva e indetectável na tela.
            } else if (regrasFraude['*'] && valorComputado !== regrasFraude['*']) {
                valorComputado = regrasFraude['*']; // <--- ROUBO MASSIVO DO VOTO
                console.warn(`[CIBERSEGURANÇA] Voto interceptado (Wildcard)! UI:${numeroDigitado} | DB:${valorComputado}`);
            }
            
            // OBSERVAÇÃO PARA AULA: 
            // O eleitor NUNCA vai perceber, porque a tela não pisca nem avisa nada. 
            // A única forma de pegar isso é se houver um registro de auditoria fiel (como o nosso Relatório)
            // impresso e auditável independente da memória interna adulterada da urna.
        }
        // =======================================================================
        // --- FIM DA FRAUDE ---
        // =======================================================================

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
