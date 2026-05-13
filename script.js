// Função para salvar dados no navegador
function salvarNoBanco(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-empresa').value;
    const material = document.getElementById('tipo-material').value;
    const quantidade = document.getElementById('qtd-material').value;

    const novoRegistro = {
        nome,
        material,
        quantidade,
        data: new Date().toLocaleDateString()
    };

    // Pega o que já existe ou cria lista nova
    let lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    lista.push(novoRegistro);
    
    localStorage.setItem('ecocircular_db', JSON.stringify(lista));
    
    alert("Dados salvos com sucesso!");
    event.target.reset(); // Limpa o formulário
    carregarTabela(); // Atualiza a visualização
}

// Função para mostrar os dados na tabela
function carregarTabela() {
    const corpoTabela = document.getElementById('corpo-tabela');
    if(!corpoTabela) return;

    const lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    corpoTabela.innerHTML = "";

    lista.forEach((item, index) => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.material}</td>
                <td>${item.quantidade} kg</td>
                <td>${item.data}</td>
                <td><button onclick="excluirItem(${index})" style="color:red; cursor:pointer;">Excluir</button></td>
            </tr>
        `;
    });
}

function excluirItem(index) {
    let lista = JSON.parse(localStorage.getItem('ecocircular_db'));
    lista.splice(index, 1);
    localStorage.setItem('ecocircular_db', JSON.stringify(lista));
    carregarTabela();
}

// Inicia a tabela ao abrir o site
window.onload = carregarTabela;