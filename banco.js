// --- CONFIGURAÇÃO E ELEMENTOS ---
const dbKey = 'ecocircular_db';
const corpoTabela = document.getElementById('corpo-tabela');
const vitrineResiduos = document.getElementById('grid-vitrine'); // ID conforme sua foto
const formResiduo = document.getElementById('form-residuo');

// --- FUNÇÃO: SALVAR ---
if (formResiduo) {
    formResiduo.addEventListener('submit', function(e) {
        e.preventDefault();

        const novoRegistro = {
            nome: document.getElementById('empresa').value,
            material: document.getElementById('tipo-material').value,
            quantidade: document.getElementById('quantidade').value,
            contato: document.getElementById('contato-empresa').value,
            data: new Date().toLocaleDateString()
        };

        const lista = JSON.parse(localStorage.getItem(dbKey)) || [];
        lista.push(novoRegistro);
        localStorage.setItem(dbKey, JSON.stringify(lista));

        formResiduo.reset();
        alert("Cadastrado com sucesso!");
        carregarDados(); // Atualiza tudo
    });
}

// --- FUNÇÃO: CARREGAR (TABELA E VITRINE) ---
function carregarDados() {
    const lista = JSON.parse(localStorage.getItem(dbKey)) || [];

    // Atualiza Tabela (Painel de Gestão)
    if (corpoTabela) {
        corpoTabela.innerHTML = '';
        lista.forEach((item, index) => {
            corpoTabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.material}</td>
                    <td>${item.quantidade} kg</td>
                    <td>Disponível</td>
                    <td><button onclick="excluirItem(${index})" style="background:#ff4d4d; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">Excluir</button></td>
                </tr>
            `;
        });
    }

    // Atualiza Vitrine (Cards)
    if (vitrineResiduos) {
        vitrineResiduos.innerHTML = '';
        lista.forEach((item) => {
            vitrineResiduos.innerHTML += `
                <div class="card-residuo" style="border:1px solid #ddd; padding:15px; border-radius:8px; margin-bottom:10px;">
                    <h3>${item.material}</h3>
                    <p><strong>Empresa:</strong> ${item.nome}</p>
                    <p><strong>Qtd:</strong> ${item.quantidade} kg</p>
                    <button onclick="contatar('${item.contato}', '${item.material}')" style="background:#2d6a4f; color:white; width:100%; padding:10px; border:none; border-radius:5px; cursor:pointer;">Tenho Interesse</button>
                </div>
            `;
        });
    }
}

// --- FUNÇÃO: EXCLUIR ---
function excluirItem(index) {
    let lista = JSON.parse(localStorage.getItem(dbKey)) || [];
    lista.splice(index, 1);
    localStorage.setItem(dbKey, JSON.stringify(lista));
    carregarDados(); // Recarrega a tela na hora
}

// --- FUNÇÃO: CONTATO ---
function contatar(contato, material) {
    const msg = encodeURIComponent(`Olá! Vi seu anúncio de ${material} na EcoCircular.`);
    if (contato.includes('@')) {
        window.location.href = `mailto:${contato}?subject=Interesse&body=${msg}`;
    } else {
        const num = contato.replace(/\D/g, "");
        window.open(`https://wa.me/55${num}?text=${msg}`, '_blank');
    }
}

// Executa ao abrir a página
window.onload = carregarDados;