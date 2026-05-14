// --- 1. CONFIGURAÇÃO INICIAL E SELEÇÃO DE ELEMENTOS ---
const ctaForm = document.querySelector('.cta-form'); // Formulário da Landing Page
const formResiduo = document.getElementById('form-residuo'); // Formulário de Cadastro de Material
const corpoTabela = document.getElementById('corpo-tabela'); // Tabela no Painel
const vitrineResiduos = document.getElementById('vitrine-residuos'); // Espaço da Vitrine na Index

// --- 2. FUNÇÃO: INSCRIÇÃO INICIAL (LANDING PAGE) ---
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = ctaForm.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value) {
            const inscritos = JSON.parse(localStorage.getItem('inscritos_ecocircular')) || [];
            inscritos.push({ email: emailInput.value, data: new Date().toISOString() });
            localStorage.setItem('inscritos_ecocircular', JSON.stringify(inscritos));
            
            // Redireciona para a área do usuário
            window.location.href = 'usuario.html';
        }
    });
}

// --- 3. FUNÇÃO: SALVAR MATERIAL NO BANCO ---
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

        let lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
        lista.push(novoRegistro);
        localStorage.setItem('ecocircular_db', JSON.stringify(lista));

        alert("Material cadastrado com sucesso!");
        formResiduo.reset();
        carregarTabela();
        renderizarVitrine();
    });
}

// --- 4. FUNÇÃO: CARREGAR TABELA DE GESTÃO ---
function carregarTabela() {
    if (!corpoTabela) return;
    const lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    corpoTabela.innerHTML = '';

    lista.forEach((item, index) => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.material}</td>
                <td>${item.quantidade} kg</td>
                <td>${item.data}</td>
                td><button onclick="excluirItem(${index})" style="color:red; cursor:pointer;">Excluir</button></td>
        `;
    });
}

// --- 5. FUNÇÃO: EXCLUIR ITEM ---
function excluirItem(index) {
    let lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    lista.splice(index, 1);
    localStorage.setItem('ecocircular_db', JSON.stringify(lista));
    
    carregarTabela();
    renderizarVitrine();
}

// --- 6. FUNÇÃO: RENDERIZAR VITRINE PÚBLICA ---
function renderizarVitrine() {
    if (!vitrineResiduos) return;
    const lista = JSON.parse(localStorage.getItem('ecocircular_db')) || [];
    vitrineResiduos.innerHTML = '';

    lista.forEach((item) => {
        vitrineResiduos.innerHTML += `
            <div class="card-residuo" style="border: 1px solid #2d6a4f; padding: 15px; margin: 10px; border-radius: 8px; background: #f8f9fa;">
                <h3 style="color: #1b4332;">${item.material}</h3>
                <p><strong>Quantidade:</strong> ${item.quantidade} kg</p>
                <p><strong>Empresa:</strong> ${item.nome}</p>
                <button onclick="contatarEmpresa('${item.contato}', '${item.material}')" style="background: #2d6a4f; color: white; border: none; padding: 10px; width: 100%; border-radius: 5px; cursor: pointer;">
                    Tenho Interesse
                </button>
            </div>
        `;
    });
}

// --- 7. FUNÇÃO: CONTATO (WHATSAPP OU EMAIL) ---
function contatarEmpresa(contato, material) {
    const msg = encodeURIComponent(`Olá! Vi o anúncio de ${material} na EcoCircular e tenho interesse.`);
    if (contato.includes('@')) {
        window.location.href = `mailto:${contato}?subject=Interesse em Resíduo&body=${msg}`;
    } else {
        const num = contato.replace(/\D/g, "");
        window.open(`https://wa.me/55${num}?text=${msg}`, '_blank');
    }
}

// --- INICIALIZAÇÃO AO CARREGAR A PÁGINA ---
window.onload = function() {
    carregarTabela();
    renderizarVitrine();
};