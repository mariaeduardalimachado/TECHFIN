// TechFin - Login
// Aqui a pessoa entra no sistema com o e-mail e a senha que
// cadastrou. Conferimos os dados salvos no localStorage pela
// página de cadastro e, se estiver tudo certo, abrimos o Dashboard.


// 1. Elementos do HTML
// O formulário do login.html não tem id, então pegamos pela classe
const formLogin = document.querySelector(".formulario-login");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = formLogin.querySelector("button");


// 2. Mensagem de erro na tela
// Parágrafo criado acima do botão Entrar para mostrar os avisos
const mensagemErro = document.createElement("p");
mensagemErro.classList.add("mensagem-erro");
formLogin.insertBefore(mensagemErro, botaoEntrar);

function mostrarErro(texto) {
    mensagemErro.textContent = texto;
}

function limparErro() {
    mensagemErro.textContent = "";
}


// 3. Função do localStorage
// Lê a lista de usuários que o cadastro salvou
function buscarUsuarios() {
    const usuariosSalvos = localStorage.getItem("usuarios");

    if (usuariosSalvos === null) {
        return [];
    }

    return JSON.parse(usuariosSalvos);
}


// 4. Quando a página abre
// Se a pessoa acabou de se cadastrar, o e-mail já vem preenchido
// e o cursor vai direto para a senha
const emailCadastrado = localStorage.getItem("emailCadastrado");

if (emailCadastrado !== null) {
    campoEmail.value = emailCadastrado;
    campoSenha.focus();

    // Apagamos para não preencher de novo da próxima vez
    localStorage.removeItem("emailCadastrado");
}


// 5. Quando a pessoa clica em Entrar
formLogin.addEventListener("submit", function (evento) {

    // Impede a página de recarregar
    evento.preventDefault();
    limparErro();

    // E-mail em minúsculo, do mesmo jeito que foi salvo no cadastro
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    // Procura na lista um usuário com esse e-mail
    const usuarios = buscarUsuarios();

    const usuario = usuarios.find(function (u) {
        return u.email === email;
    });

    // Não achou ninguém com esse e-mail
    if (usuario === undefined) {
        mostrarErro("E-mail não encontrado. Crie sua conta em Cadastre-se.");
        campoEmail.focus();
        return;
    }

    // Achou o e-mail, mas a senha não bate
    if (usuario.senha !== senha) {
        mostrarErro("Senha incorreta. Tente novamente.");
        campoSenha.value = "";
        campoSenha.focus();
        return;
    }

    // Login certo: guardamos quem entrou (só nome e e-mail, sem a senha)
    // para as outras páginas saberem quem está usando o sistema
    const usuarioLogado = {
        nome: usuario.nome,
        email: usuario.email
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // Abre o Dashboard
    window.location.href = "../dashbord/dashbord.html";
});
