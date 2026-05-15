// --- CONFIGURAÇÃO GLOBAL ---
const DB_KEY = 'ecocircular_db';

// --- SELEÇÃO DE ELEMENTOS COM TRAVA DE SEGURANÇA ---
const corpoTabela = document.getElementById('corpo-tabela');
const formResiduo = document.getElementById('form-residuo');
const vitrine = document.getElementById('grid-vitrine');
const ctaForm = document.querySelector('.cta-form');

// --- FUNÇÃO DE INICIALIZAÇÃO ---
window.onload = () => {
    renderizarTudo();
};

// --- 1. FUNÇÃO PARA CARREGAR E EXIBIR DADOS ---
function renderizarTudo() {
    const dados = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    // Se estiver na página de Gestão (tabela)
    if (corpoTabela) {
        corpoTabela.innerHTML = '';
        dados.forEach((item, index) => {
            corpoTabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.material}</td>
                    <td>${item.quantidade} kg</td>
                    <td>${item.data}</td>
                    <td>
                        <button onclick="excluirItem(${index})" style="background:#ff4d4d; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                            Excluir
                        </button>
                    </td>
                </tr>`;
        });
    }

    // Se estiver na página de Vitrine (cards)
    if (vitrine) {
        vitrine.innerHTML = '';
        dados.forEach((item) => {
            vitrine.innerHTML += `
                <div class="card-residuo" style="border:1px solid #ddd; padding:15px; border-radius:8px; margin-bottom:10px;">
                    <h3>${item.material}</h3>
                    <p><strong>Empresa:</strong> ${item.nome}</p>
                    <p><strong>Qtd:</strong> ${item.quantidade} kg</p>
                    <button onclick="contatar('${item.contato}', '${item.material}')" style="background:#2d6a4f; color:white; width:100%; border:none; padding:10px; border-radius:5px; cursor:pointer;">
                        Tenho Interesse
                    </button>
                </div>`;
        });
    }
}

// --- 2. FUNÇÃO PARA SALVAR NOVO MATERIAL ---
if (formResiduo) {
    formResiduo.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const novoItem = {
            nome: document.getElementById('empresa').value,
            material: document.getElementById('tipo-material').value,
            quantidade: document.getElementById('quantidade').value,
            contato: document.getElementById('contato-empresa').value,
            data: new Date().toLocaleDateString()
        };

        const lista = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        lista.push(novoItem);
        localStorage.setItem(DB_KEY, JSON.stringify(lista));

        formResiduo.reset();
        alert("Cadastrado com sucesso!");
        renderizarTudo();
    });
}

// --- 3. FUNÇÃO PARA EXCLUIR (GLOBAL) ---
window.excluirItem = function(index) {
    let lista = JSON.parse(localStorage.getItem(DB_KEY)) || [];
    lista.splice(index, 1);
    localStorage.setItem(DB_KEY, JSON.stringify(lista));
    renderizarTudo();
};

// --- 4. REDIRECIONAMENTO DA PÁGINA INICIAL ---
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'usuario.html';
    });
}

// --- 5. FUNÇÃO DE CONTATO ---
window.contatar = function(contato, material) {
    const msg = encodeURIComponent(`Olá! Vi seu anúncio de ${material} na EcoCircular.`);
    if (contato.includes('@')) {
        window.location.href = `mailto:${contato}?subject=Interesse&body=${msg}`;
    } else {
        const num = contato.replace(/\D/g, "");
        window.open(`https://wa.me/55${num}?text=${msg}`, '_blank');
    }
};