const conteudoPrincipal = document.getElementById('conteudo-principal');
const paginasSecoes = document.querySelectorAll('.pagina-secao');
const botoesVoltar = document.querySelectorAll('.voltar-inicio');

function mostrarPagina(idPagina) {
    conteudoPrincipal.style.display = 'none';
    paginasSecoes.forEach(p => p.style.display = 'none');
    document.getElementById(idPagina).style.display = 'block';
    window.scrollTo(0, 0);
}

function voltarInicio() {
    paginasSecoes.forEach(p => p.style.display = 'none');
    conteudoPrincipal.style.display = 'block';
    window.scrollTo(0, 0);
}

document.getElementById('nav-loja').addEventListener('click', e => {e.preventDefault(); mostrarPagina('pagina-loja')});
document.getElementById('nav-categorias').addEventListener('click', e => {e.preventDefault(); mostrarPagina('pagina-categorias')});
document.getElementById('nav-atendimento').addEventListener('click', e => {e.preventDefault(); mostrarPagina('pagina-atendimento')});
document.getElementById('nav-institucional').addEventListener('click', e => {e.preventDefault(); mostrarPagina('pagina-institucional')});

document.getElementById('nav-pedidos').addEventListener('click', e => {
    e.preventDefault();
    const usuario = localStorage.getItem('usuarioGameHub');
    if (!usuario) { alert('⚠️ Você precisa estar logado!'); modalConta.style.display = 'block'; }
    else mostrarPagina('pagina-pedidos');
});

document.getElementById('nav-rastrear').addEventListener('click', e => {e.preventDefault(); mostrarPagina('pagina-rastrear')});

document.getElementById('link-pedidos').addEventListener('click', e => {e.preventDefault(); modalConta.style.display='none'; mostrarPagina('pagina-pedidos')});
document.getElementById('link-rastrear').addEventListener('click', e => {e.preventDefault(); modalConta.style.display='none'; mostrarPagina('pagina-rastrear')});

botoesVoltar.forEach(btn => btn.addEventListener('click', voltarInicio));

document.querySelectorAll('[data-categoria]').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        const cat = el.dataset.categoria;
        filtrarProdutos(cat);
        mostrarPagina('pagina-loja');
    });
});

function filtrarProdutos(cat) {
    const container = document.getElementById('produtos-loja');
    container.innerHTML = '';
    document.querySelectorAll('.card-produto').forEach(p => {
        if (p.dataset.categoria === cat) container.appendChild(p.cloneNode(true));
    });
}

document.getElementById('botao-rastrear').addEventListener('click', () => {
    const cod = document.getElementById('codigo-rastreio').value.trim();
    const res = document.getElementById('resultado-rastreio');
    res.innerHTML = cod ? `<p style="color:green">✅ Pedido encontrado! Previsão: 5 dias úteis.</p>` : `<p style="color:red">❌ Digite um código válido.</p>`;
});

let carrinho = [], qtdCarrinho = 0;
const botoesComprar = document.querySelectorAll('.botao-comprar');
const qtdEl = document.getElementById('qtd-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnCarrinho = document.getElementById('botao-carrinho');
const itensEl = document.getElementById('itens-carrinho');
const totalEl = document.getElementById('valor-total');

botoesComprar.forEach(btn => {
    btn.addEventListener('click', () => {
        carrinho.push({nome: btn.dataset.nome, preco: parseFloat(btn.dataset.preco)});
        qtdCarrinho++; qtdEl.textContent = qtdCarrinho;
        atualizarCarrinho(); alert('✅ Adicionado ao carrinho!');
    });
});

function atualizarCarrinho() {
    itensEl.innerHTML = ''; let total = 0;
    carrinho.forEach(i => {
        total += i.preco;
        const div = document.createElement('div');
        div.className = 'item-carrinho';
        div.innerHTML = `<span>${i.nome}</span><span>R$ ${i.preco.toFixed(2).replace('.',',')}</span>`;
        itensEl.appendChild(div);
    });
    totalEl.textContent = total.toFixed(2).replace('.',',');
}

btnCarrinho.addEventListener('click', e => {e.preventDefault(); atualizarCarrinho(); modalCarrinho.style.display='block'});

const modalConta = document.getElementById('modal-conta');
const btnConta = document.getElementById('botao-minha-conta');
const formCad = document.getElementById('form-cadastro');
const areaLogado = document.getElementById('area-usuario-logado');
const areaLogin = document.getElementById('area-login-cadastro');
const nomeEl = document.getElementById('nome-usuario');
const btnSair = document.getElementById('sair-conta');

btnConta.addEventListener('click', e => {e.preventDefault(); modalConta.style.display='block'; verificarUsuario()});

document.querySelectorAll('.fechar').forEach(f => {
    f.addEventListener('click', () => {modalCarrinho.style.display='none'; modalConta.style.display='none'})
});

window.addEventListener('click', e => {
    if (e.target === modalCarrinho) modalCarrinho.style.display='none';
    if (e.target === modalConta) modalConta.style.display='none';
});

formCad.addEventListener('submit', e => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('nome-cadastro').value,
        email: document.getElementById('email-cadastro').value,
        cpf: document.getElementById('cpf-cadastro').value,
        telefone: document.getElementById('telefone-cadastro').value,
        senha: document.getElementById('senha-cadastro').value
    };
    localStorage.setItem('usuarioGameHub', JSON.stringify(dados));
    alert('✅ Conta criada! Bem-vindo(a), ' + dados.nome);
    formCad.reset(); verificarUsuario();
});

function verificarUsuario() {
    const usuario = localStorage.getItem('usuarioGameHub');
    if (usuario) {
        const u = JSON.parse(usuario);
        nomeEl.textContent = u.nome;
        areaLogado.style.display = 'block'; areaLogin.style.display = 'none';
    } else {
        areaLogado.style.display = 'none'; areaLogin.style.display = 'block';
    }
}

btnSair.addEventListener('click', () => {
    localStorage.removeItem('usuarioGameHub'); verificarUsuario(); alert('👋 Você saiu.');
});

document.getElementById('calcular-cep').addEventListener('click', () => {
    const cep = document.getElementById('cep-cliente').value.replace(/\D/g, '');
    const res = document.getElementById('resultado-cep');
    res.innerHTML = cep.length === 8 ? `<p style="color:green">✅ Entrega: R$15,90 | 3-5 dias</p>` : `<p style="color:red">❌ CEP inválido</p>`;
});

document.getElementById('botao-pesquisar').addEventListener('click', () => {
    const val = document.getElementById('campo-pesquisa').value.trim();
    if(val) alert(`🔍 Pesquisou por: ${val}`);
    else alert('Digite algo!');
});

document.getElementById('finalizar-compra').addEventListener('click', () => {
    if(carrinho.length === 0) return alert('🛒 Carrinho vazio!');
    if(!localStorage.getItem('usuarioGameHub')) {
        alert('⚠️ Cadastre-se para comprar!');
        modalCarrinho.style.display='none'; modalConta.style.display='block';
        return;
    }
    alert('🎉 Compra finalizada!');
    carrinho=[]; qtdCarrinho=0; qtdEl.textContent='0'; modalCarrinho.style.display='none';
});