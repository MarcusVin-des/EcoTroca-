// 1. Referências dos elementos
const corpoTabela = document.getElementById('corpo-tabela');
const formResiduo = document.getElementById('form-residuo');
const vitrine = document.getElementById('grid-vitrine');

// 2. Função para Carregar Dados (Tabela e Vitrine)
function atualizarInterface() {
    const dados = JSON.parse(localStorage.getItem('ecocircular_db')) || [];

    // Preenche a Tabela de Gestão
    if (corpoTabela) {
        corpoTabela.innerHTML = '';
        dados.forEach((item, index) => {
            corpoTabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.material}</td>
                    <td>${item.quantidade} kg</td>
                    <td><button onclick="excluirItem(${index})" style="background:red; color:white; border:none; padding:5px; cursor:pointer; border-radius:4px;">Excluir</button></td>
                </tr>`;
        });
    }

    // Preenche a Vitrine de Cards
    if (vitrine) {
        vitrine.innerHTML = '';
        dados.forEach(item => {
            vitrine.innerHTML += `
                <div class="card">
                    <h3>${item.material}</h3>
                    <p>Empresa: ${item.nome}</p>
                    <p>Qtd: ${item.quantidade}kg</p>
                </div>`;
        });
    }
}

// 3. Função para Excluir
window.excluirItem = function(index) {
    let dados = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    dados.splice(index, 1);
    localStorage.setItem('ecocircular_db', JSON.stringify(dados));
    atualizarInterface();
}

// 4. Evento de Salvar
if (formResiduo) {
    formResiduo.addEventListener('submit', (e) => {
        e.preventDefault();
        const novo = {
            nome: document.getElementById('empresa').value,
            material: document.getElementById('tipo-material').value,
            quantidade: document.getElementById('quantidade').value
        };
        const dados = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
        dados.push(novo);
        localStorage.setItem('ecocircular_db', JSON.stringify(dados));
        formResiduo.reset();
        atualizarInterface();
    });
}

// Inicializa ao carregar
window.onload = atualizarInterface;
function carregarDados() {
    const corpoTabela = document.getElementById('corpo-tabela');
    if (!corpoTabela) return;

    const lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    corpoTabela.innerHTML = '';

    lista.forEach((item, index) => {
        corpoTabela.innerHTML += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px;">${item.nome}</td>
                <td style="padding: 12px;">${item.material}</td>
                <td style="padding: 12px;">${item.quantidade} kg</td>
                <td style="padding: 12px;">${item.data || 'Disponível'}</td>
                <td style="padding: 12px;">
                    <button onclick="excluirItem(${index})" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}