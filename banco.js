// 1. Função para SALVAR os dados
document.getElementById('meuFormulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    // Coleta os valores dos campos
    const novoDado = {
        empresa: document.getElementById('nomeEmpresa').value,
        material: document.getElementById('tipoMaterial').value,
        peso: document.getElementById('quantidade').value,
        data: new Date().toLocaleDateString()
    };

    // Pega o que já existe no "banco" ou cria uma lista vazia
    let listaDados = JSON.parse(localStorage.getItem('bancoEcoCircular')) || [];

    // Adiciona o novo cadastro à lista
    listaDados.push(novoDado);

    // Salva a lista atualizada de volta no LocalStorage
    localStorage.setItem('bancoEcoCircular', JSON.stringify(listaDados));

    alert('Dados enviados para o banco com sucesso!');
    this.reset(); // Limpa o formulário
});

// 2. Função para RECUPERAR e mostrar os dados (Exemplo no console)
function listarDados() {
    const dados = JSON.parse(localStorage.getItem('bancoEcoCircular'));
    console.log("Registros no Banco de Dados Local:", dados);
}
// Função para desenhar a tabela na tela
function renderizarTabela() {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const dadosCadastrados = JSON.parse(localStorage.getItem('banco_ecocircular')) || [];

    tabelaCorpo.innerHTML = ""; // Limpa antes de carregar

    dadosCadastrados.forEach((registro, index) => {
        const linha = `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 15px;">${registro.empresa}</td>
                <td style="padding: 15px;">${registro.material}</td>
                <td style="padding: 15px;">${registro.quantidade}</td>
                <td style="padding: 15px;">${registro.data}</td>
                <td style="padding: 15px; text-align: center;">
                    <button onclick="excluirRegistro(${index})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Excluir</button>
                </td>
            </tr>
        `;
        tabelaCorpo.innerHTML += linha;
    });
}

// Função capturada pelo formulário (ajuste o ID do seu formulário aqui)
document.getElementById('seu-formulario-id').addEventListener('submit', function(e) {
    e.preventDefault();

    const novoItem = {
        empresa: document.getElementById('nome-input').value,
        material: document.getElementById('material-select').value,
        quantidade: document.getElementById('quantidade-input').value,
        data: new Date().toLocaleDateString()
    };

    const listaAtual = JSON.parse(localStorage.getItem('banco_ecocircular')) || [];
    listaAtual.push(novoItem);
    localStorage.setItem('banco_ecocircular', JSON.stringify(listaAtual));

    renderizarTabela(); // Atualiza a tabela na hora
    this.reset(); // Limpa os campos
});

// Inicializa a tabela ao abrir o site
window.onload = renderizarTabela;