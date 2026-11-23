// TechFin - Sobre
// A página Sobre pode ser aberta por quem ainda não entrou na conta
// ou por quem já está logado. Se a pessoa estiver logada, mostramos
// uma saudação e trocamos os links do final da página.


// 1. Elementos do HTML
// Seguindo a ordem do sobre.html: cabeçalho, links do final e rodapé
const cabecalho = document.querySelector(".cabecalho");
const links = document.querySelectorAll(".links-voltar a");
const linkLogin = links[0];      // Voltar para Login
const linkCadastro = links[1];   // Criar uma conta
const textoRodape = document.querySelector(".rodape p");


// 2. Tem alguém logado?
// O login salva a pessoa em "usuarioLogado". Se não tiver nada, vem null
const usuarioSalvo = localStorage.getItem("usuarioLogado");


// 3. Se tiver alguém logado, mudamos a página
if (usuarioSalvo !== null) {
    const usuarioLogado = JSON.parse(usuarioSalvo);

    // Pegamos só o primeiro nome para a saudação
    const primeiroNome = usuarioLogado.nome.split(" ")[0];

    // Criamos um parágrafo de boas vindas no final do cabeçalho
    const boasVindas = document.createElement("p");
    boasVindas.textContent = "Olá, " + primeiroNome + "! Você está conectado(a).";
    cabecalho.appendChild(boasVindas);

    // Quem já entrou não precisa voltar para o login, então o
    // primeiro link leva para o Dashboard
    linkLogin.textContent = "Ir para o Dashboard";
    linkLogin.href = "../dashbord/dashbord.html";

    // E o segundo link vira o botão de sair da conta
    linkCadastro.textContent = "Sair da conta";
    linkCadastro.href = "../login/login.html";

    // Ao sair, apagamos só quem está logado. As contas cadastradas
    // continuam salvas para a pessoa entrar de novo depois
    linkCadastro.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogado");
    });
}


// 4. Ano no rodapé
// new Date().getFullYear() pega o ano atual, então o rodapé
// sempre fica atualizado
const anoAtual = new Date().getFullYear();
textoRodape.textContent = "TechFin © " + anoAtual + " | Tecnologia para seu controle financeiro";
