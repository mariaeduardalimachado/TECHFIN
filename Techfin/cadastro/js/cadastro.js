// TechFin - Cadastro
// Aqui a pessoa cria a conta. Os dados ficam salvos no localStorage
// do navegador, e depois a página de login usa esses dados para
// deixar a pessoa entrar.


// 1. Elementos do HTML
// Pegamos o formulário e os campos pelo id que está no cadastro.html
const formCadastro = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const campoConfirmarSenha = document.getElementById("confirmarSenha");
const botaoCadastrar = formCadastro.querySelector("button");


// 2. Mensagem de erro na tela
// Criamos um parágrafo logo acima do botão Cadastrar para mostrar
// o que está errado, assim a pessoa vê o aviso na própria página
const mensagemErro = document.createElement("p");
mensagemErro.classList.add("mensagem-erro");
formCadastro.insertBefore(mensagemErro, botaoCadastrar);

function mostrarErro(texto) {
    mensagemErro.textContent = texto;
}

function limparErro() {
    mensagemErro.textContent = "";
}


// 3. Funções do localStorage
// O localStorage só guarda texto. Então, para guardar a lista de
// usuários, usamos JSON.stringify (lista vira texto) e, para ler,
// usamos JSON.parse (texto volta a ser lista)
function buscarUsuarios() {
    const usuariosSalvos = localStorage.getItem("usuarios");

    // Se ainda não tem ninguém cadastrado, começamos com a lista vazia
    if (usuariosSalvos === null) {
        return [];
    }

    return JSON.parse(usuariosSalvos);
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// 4. Quando a pessoa clica em Cadastrar
formCadastro.addEventListener("submit", function (evento) {

    // Impede a página de recarregar antes de salvarmos os dados
    evento.preventDefault();
    limparErro();

    // Pegamos o que foi digitado em cada campo.
    // trim() tira os espaços do começo e do fim, e toLowerCase()
    // deixa o e-mail todo em letra minúscula
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const confirmarSenha = campoConfirmarSenha.value;

    // Confere se a senha e a confirmação são iguais
    if (senha !== confirmarSenha) {
        mostrarErro("As senhas não são iguais. Digite novamente.");
        campoConfirmarSenha.value = "";
        campoConfirmarSenha.focus();
        return; // para aqui e não cadastra
    }

    // Confere se já existe uma conta com esse e-mail
    const usuarios = buscarUsuarios();

    const emailJaCadastrado = usuarios.some(function (usuario) {
        return usuario.email === email;
    });

    if (emailJaCadastrado) {
        mostrarErro("Esse e-mail já tem uma conta. Faça login.");
        campoEmail.focus();
        return;
    }

    // Deu tudo certo, então criamos o novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Colocamos o usuário na lista e salvamos no localStorage
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    // Guardamos o e-mail para a página de login já abrir com ele preenchido
    localStorage.setItem("emailCadastrado", email);

    // Avisa que deu certo e, quando a pessoa clicar em OK, abre o login
    alert("Seu cadastro foi feito com sucesso!");
    window.location.href = "../login/login.html";
});
