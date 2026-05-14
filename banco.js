// Nomes das chaves no LocalStorage (O "endereço" dos dados no navegador)
const CHAVE_RESIDUOS = 'ecocircular_materiais';

// Função para renderizar a tabela na tela
function renderizarTabela() {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    if (!tabelaCorpo) return; // Só executa se a tabela existir na página

    tabelaCorpo.innerHTML = '';
    const materiais = JSON.parse(localStorage.getItem(CHAVE_RESIDUOS)) || [];

    materiais.forEach((item, index) => {
        const linha = `
            <tr>
                <td>${item.empresa}</td>
                <td>${item.material}</td>
                <td>${item.quantidade} kg</td>
                <td><span style="color: #2d6a4f; font-weight: bold;">Disponível</span></td>
                <td>
                    <button onclick="removerItem(${index})" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Excluir</button>
                </td>
            </tr>
        `;
        tabelaCorpo.innerHTML += linha;
    });
}

// Função para Salvar Empresa/Resíduo
const formResiduo = document.getElementById('form-residuo');
if (formResiduo) {
    formResiduo.addEventListener('submit', (e) => {
        e.preventDefault();

        const novoItem = {
            empresa: document.getElementById('empresa').value,
            material: document.getElementById('tipo-material').value,
            quantidade: document.getElementById('quantidade').value
        };

        const materiaisAtuais = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
        materiaisAtuais.push(novoItem);
        localStorage.setItem('ecocircular_db', JSON.stringify(materiaisAtuais));

        formResiduo.reset();
        renderizarTabela();
        alert("Cadastrado com sucesso!");
    });
}

// Função para remover item
window.excluirItem = function(index) {
    const materiais = JSON.parse(localStorage.getItem('ecocircular_db'));
    materiais.splice(index, 1);
    localStorage.setItem('ecocircular_db', JSON.stringify(materiais));
    renderizarTabela();
};

// Iniciar a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarTabela);

// Função para mostrar os materiais na página inicial (Vitrine)
function atualizarVitrine() {
    const vitrine = document.getElementById('vitrine-residuos');
    if (!vitrine) return;

    const materiais = JSON.parse(localStorage.getItem('ecocircular_materiais')) || [];
    vitrine.innerHTML = '';

    materiais.forEach((item) => {
        const card = `
            <div style="background: white; padding: 20px; border-radius: 15px; shadow: 0 4px 10px rgba(0,0,0,0.1); border-left: 5px solid #2d6a4f;">
                <h3 style="color: #1b4332; margin: 0;">${item.material}</h3>
                <p style="font-size: 0.9rem; color: #666;">Ofertado por: <strong>${item.empresa}</strong></p>
                <p style="font-weight: bold; color: #2d6a4f;">Quantidade: ${item.quantidade} kg</p>
                <button onclick="abrirNegociacao('${item.empresa}', '${item.material}')" 
                        style="width: 100%; background: #2d6a4f; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    Negociar / Tenho Interesse
                </button>
            </div>
        `;
        vitrine.innerHTML += card;
    });
}

// Simulação de Comunicação
window.abrirNegociacao = function(empresa, material) {
    const mensagem = `Olá ${empresa}, vi seu anúncio no EcoCircular sobre o resíduo de ${material}. Tenho interesse em adquirir esse material para minha linha de produção. Como podemos prosseguir?`;
    
    // Simula uma abertura de chat ou e-mail
    const confirmacao = confirm("Deseja enviar uma proposta para " + empresa + "?\n\nSua mensagem:\n" + mensagem);
    
    if (confirmacao) {
        alert("Proposta enviada com sucesso! A " + empresa + " receberá sua notificação no painel dela.");
    }
}

// Chame a função para carregar a vitrine
document.addEventListener('DOMContentLoaded', atualizarVitrine);

function atualizarVitrine() {
    const vitrine = document.getElementById('vitrine');
    
    // 1. Limpa a vitrine antes de colocar novos itens
    vitrine.innerHTML = ''; 

    // 2. Pega os materiais que você salvou no LocalStorage
    const materiais = JSON.parse(localStorage.getItem('banco_residuos')) || [];

    // 3. Cria o HTML de cada card
    materiais.forEach((item) => {
        const card = `
            <div class="card-residuo" style="border: 1px solid #ddd; padding: 15px; border-radius: 10px; margin: 10px;">
                <h3>${item.material}</h3>
                <p><strong>Empresa:</strong> ${item.empresa}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade} kg</p>
                
                <button onclick="abrirNegociacao('${item.empresa}', '${item.material}')"
                    style="width: 100%; background: #2d6a4f; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">
                    Negociar / Tenho Interesse
                </button>
            </div>
        `;
        vitrine.innerHTML += card;
    });
}

// Função que dispara o alerta de negociação
window.abrirNegociacao = function(empresa, material) {
    const mensagem = `Olá ${empresa}, vi seu anúncio no EcoCircular sobre o resíduo de ${material}. Tenho interesse!`;
    
    const confirmacao = confirm("Deseja enviar uma proposta para " + empresa + "?\n\nSua mensagem:\n" + mensagem);
    
    if (confirmacao) {
        alert("Proposta enviada com sucesso! A " + empresa + " receberá sua notificação.");
    }
};

// Faz a vitrine carregar assim que a página abrir
document.addEventListener('DOMContentLoaded', atualizarVitrine);

// Função para carregar a vitrine
function atualizarVitrine() {
    const vitrine = document.getElementById('vitrine');
    if (!vitrine) return; // Segurança caso a div não exista na página

    vitrine.innerHTML = ''; // Limpa o espaço branco
    const materiais = JSON.parse(localStorage.getItem('banco_residuos')) || [];

    materiais.forEach((item) => {
        const card = `
            <div class="card-residuo" style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-bottom: 15px;">
                <h3 style="color: #2d6a4f; margin-top: 0;">${item.material}</h3>
                <p><strong>Indústria:</strong> ${item.empresa}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade} kg</p>
                <button onclick="abrirNegociacao('${item.empresa}', '${item.material}')" 
                        style="background: #2d6a4f; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%;">
                    Tenho Interesse
                </button>
            </div>
        `;
        vitrine.innerHTML += card;
    });
}

// Chame essa função no final do seu script de salvamento (Submit)
// Exemplo:
// form.addEventListener('submit', (e) => {
//    ... código de salvar ...
//    atualizarVitrine(); 
// });

// E também quando a página carrega
document.addEventListener('DOMContentLoaded', atualizarVitrine);

// Função de Salvar com Validação
const salvarDados = (evento) => {
    evento.preventDefault();

    const qtdInput = document.getElementById('quantidade');
    const quantidade = parseFloat(qtdInput.value);

    // Validação: Impede zero ou números negativos
    if (quantidade <= 0 || isNaN(quantidade)) {
        alert("⚠️ Por favor, insira uma quantidade válida acima de zero.");
        qtdInput.focus();
        return;
    }

    const novaEmpresa = {
        empresa: document.getElementById('empresa').value,
        material: document.getElementById('tipo-material').value,
        quantidade: quantidade,
        id: Date.now()
    };

    const dadosAtuais = JSON.parse(localStorage.getItem('banco_residuos')) || [];
    dadosAtuais.push(novaEmpresa);
    localStorage.setItem('banco_residuos', JSON.stringify(dadosAtuais));

    document.getElementById('form-residuo').reset();
    carregarDados(); // Atualiza a tabela
    atualizarVitrine(); // Atualiza a vitrine de cards
    alert("✅ Material cadastrado com sucesso!");
};

// Função de Remover com Confirmação
window.removerItem = function(index) {
    const materiais = JSON.parse(localStorage.getItem('banco_residuos'));
    const materialNome = materiais[index].material;

    // Feedback Visual de Exclusão
    if (confirm(`Tem certeza que deseja excluir o registro de "${materialNome}"?`)) {
        materiais.splice(index, 1);
        localStorage.setItem('banco_residuos', JSON.stringify(materiais));
        carregarDados();
        atualizarVitrine();
    }
};