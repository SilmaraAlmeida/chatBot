const corpoDoChat = document.querySelector(".chat-corpo");
const inputMensagem = document.querySelector(".menssagem-input");
const enviarMensagemBotao = document.querySelector("#enviar-mensagem");

const dadosusuario = {
    message: null
}

// Cria um elemento de mensagem formatado
const criarMensagem = (conteudo, classe) => {
    const div = document.createElement("div");
    div.classList.add("messagem", classe);
    div.innerHTML = conteudo;
    return div;
}

// Adiciona a mensagem do usuário ao corpo do chat
const adicionarMensagemUsuario = (evento) => {
    evento.preventDefault();
    dadosusuario.message = mensagemInout.value.trim();

    const conteudo = `<div class="texto-mensagem">${dadosusuario.message}</div>`;
    const mensagemElemento = criarMensagem(conteudo, "usuario-menssagem");
    corpoDoChat.appendChild(mensagemElemento);
}

// Escuta o pressionar de tecla no input
inputMensagem.addEventListener("keydown", (evento) => {
    const mensagem = evento.target.value.trim();

    if (evento.key === "Enter" && mensagem) {
        evento.preventDefault();
        adicionarMensagemUsuario(evento);
        evento.target.value = "";
        console.log(mensagem);
    }
});

enviarMensagemBotao.addEventListener("click", (evento) => adicionarMensagemUsuario(evento));
