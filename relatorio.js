// relatorio.js - Script exclusivo para a página de relatório

function carregarRelatorio() {
    const conteudoBoletim = document.getElementById('boletim-conteudo');
    const votosRegistrados = JSON.parse(localStorage.getItem('votosUrna')) || [];

    if (votosRegistrados.length === 0) {
        conteudoBoletim.innerHTML = '<p style="text-align: center; color: gray; margin-top: 20px;">Nenhum voto registrado ainda.</p>';
        return;
    }

    let html = '';

    etapas.forEach(etapa => {
        html += `<div class="cargo-relatorio"><h3>${etapa.titulo}</h3>`;
        
        let votosDesteCargo = votosRegistrados.filter(v => v.cargo === etapa.titulo);
        let contagem = { 'BRANCO': 0, 'NULO': 0 };
        
        // Inicializa candidatos com 0
        Object.keys(etapa.candidatos).forEach(num => contagem[num] = 0);

        // Soma os votos registrados globalmente
        votosDesteCargo.forEach(registro => {
            if (contagem[registro.voto] !== undefined) contagem[registro.voto]++;
            else contagem['NULO']++; 
        });

        // Renderiza
        Object.keys(etapa.candidatos).forEach(num => {
            let cand = etapa.candidatos[num];
            html += `<div class="candidato-relatorio">
                        <span>${num} - ${cand.nome} (${cand.partido})</span>
                        <span>${contagem[num]} votos</span>
                     </div>`;
        });

        html += `<div class="candidato-relatorio" style="margin-top:10px; color: gray;">
                    <span>BRANCOS</span><span>${contagem['BRANCO']} votos</span>
                 </div>`;
        html += `<div class="candidato-relatorio" style="color: gray;">
                    <span>NULOS</span><span>${contagem['NULO']} votos</span>
                 </div></div>`;
    });

    // --- Nova Seção: Auditoria por Eleitor ---
    html += `<h3 style="text-align:center; margin-top:30px; border-top: 2px dashed #000; padding-top:20px;">AUDITORIA POR ELEITOR</h3>`;
    
    // Agrupa votos por eleitor
    let votosPorEleitor = {};
    votosRegistrados.forEach(v => {
        let chave = v.eleitor || 'Desconhecido';
        if (!votosPorEleitor[chave]) votosPorEleitor[chave] = [];
        votosPorEleitor[chave].push(v);
    });

    Object.keys(votosPorEleitor).forEach(eleitor => {
        html += `<div class="cargo-relatorio" style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
                    <h4 style="margin-bottom: 5px; text-transform:uppercase;">ELEITOR: ${eleitor}</h4>`;
        votosPorEleitor[eleitor].forEach(v => {
            let nomeCand = "NULO/BRANCO";
            let etapa = etapas.find(e => e.titulo === v.cargo);
            if (etapa && etapa.candidatos[v.voto]) {
                nomeCand = etapa.candidatos[v.voto].nome;
            } else if (v.voto === 'BRANCO') {
                nomeCand = 'BRANCO';
            }
            html += `<div style="font-size: 13px; margin-bottom: 3px;">
                        <b>${v.cargo}</b>: Gravado como <b>${v.voto}</b> (${nomeCand})
                     </div>`;
        });
        html += `</div>`;
    });

    conteudoBoletim.innerHTML = html;
}

function limparVotos() {
    if (confirm("Tem certeza que deseja apagar TODOS os votos registrados? Essa ação não pode ser desfeita.")) {
        localStorage.removeItem('votosUrna');
        carregarRelatorio();
    }
}

// Inicializa a renderização
carregarRelatorio();
