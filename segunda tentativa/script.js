let respostasPorKeyword = [];

// carregag a wordlist
fetch("wordlist.json")
    .then(res=> res.json())
    .then(data => {
        respostasPorKeyword = data;
    })
    .catch(erro => console.error("Erro ao carregar wordlist:", erro));

const corpoDoChat = document.querySelector(".chat-corpo");
const inputMensagem = document.querySelector(".menssagem-input");
const enviarMensagemBotao = document.querySelector("#enviar-mensagem");
const mostrarChatBot = document.querySelector("#mostrar-chatBot");
const fecharChatBot = document.querySelector("#chat-fechar");

const dadosusuario = {
    message: null
}

// Cria um elemento de mensagem formatado
const criarMensagem = (conteudo, ...classe) => {
    const div = document.createElement("div");
    div.classList.add("messagem", ...classe);
    div.innerHTML = conteudo;
    return div;
}


const geraRespostaBot = () => {
    const mensagemUsuario = dadosusuario.message.toLowerCase();
    let resposta = "Hmm... ainda não sei como responder isso 😅";

    for (let item of respostasPorKeyword) {
        if (item.keywords.some(palavra => mensagemUsuario.includes(palavra))) {
            resposta = item.resposta;
            break;
        }
    }

    // Remove a mensagem de "pensando"
    const pensando = document.querySelector(".thinking");
    if (pensando) pensando.remove();

    // Adiciona a resposta do bot
    const conteudoResposta = `<p class="bot-icon">bot</p>
        <div class="texto-mensagem">${resposta}</div>`;

    const mensagemBot = criarMensagem(conteudoResposta, "bot-menssagem");
    corpoDoChat.appendChild(mensagemBot);
};


// Adiciona a mensagem do usuário ao corpo do chat
const adicionarMensagemUsuario = (evento) => {
    evento.preventDefault();
    dadosusuario.message = inputMensagem.value.trim();
    inputMensagem.value = "";

    const conteudo = `<div class="texto-mensagem"></div>`;

    const mensagemElemento = criarMensagem(conteudo, "usuario-menssagem");
    mensagemElemento.querySelector(".texto-mensagem").textContent = dadosusuario.message;
    corpoDoChat.appendChild(mensagemElemento);

    setTimeout(() => {
        const conteudo = `<p class="bot-icon">bot</p>
                <div class="texto-mensagem">
                    <div class="proxima-bot">
                        <div class="ponto-loading"></div>
                        <div class="ponto-loading"></div>
                        <div class="ponto-loading"></div>
                    </div>
                </div>`;

        const botMensagemElemento = criarMensagem(conteudo, "bot-menssagem", "thinking");
        corpoDoChat.appendChild(botMensagemElemento);

        setTimeout(() => {
            geraRespostaBot();
        }, 1000);
    }, 600);
}

// Escuta ao pressionar de tecla no input
inputMensagem.addEventListener("keydown", (evento) => {
    const mensagem = evento.target.value.trim();

    if (evento.key === "Enter" && mensagem) {
        evento.preventDefault();
        adicionarMensagemUsuario(evento);
        console.log(mensagem);
    }
});

enviarMensagemBotao.addEventListener("click", (evento) => adicionarMensagemUsuario(evento));
mostrarChatBot.addEventListener("click", () => document.body.classList.toggle("mostrar-chatBot"));
fecharChatBot.addEventListener("click", () => {
  document.body.classList.remove("mostrar-chatBot");
});

