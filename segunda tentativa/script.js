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

const tamanhoInputInicial = inputMensagem.scrollHeight;

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
    const conteudoResposta = `<p class="material-icons bot-icon">android</p>
        <div class="texto-mensagem">${resposta}</div>`;

    const mensagemBot = criarMensagem(conteudoResposta, "bot-menssagem");
    corpoDoChat.appendChild(mensagemBot);
};


// Adiciona a mensagem do usuário ao corpo do chat
const adicionarMensagemUsuario = (evento) => {
    evento.preventDefault();
    dadosusuario.message = inputMensagem.value.trim();
    inputMensagem.value = "";
    inputMensagem.dispatchEvent(new Event("input"));

    const conteudo = `<div class="texto-mensagem"></div>`;

    const mensagemElemento = criarMensagem(conteudo, "usuario-menssagem");
    mensagemElemento.querySelector(".texto-mensagem").textContent = dadosusuario.message;
    corpoDoChat.appendChild(mensagemElemento);

    setTimeout(() => {
        const conteudo = `<p class="material-icons bot-icon">android</p>
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
        if (evento.shiftKey) {
            // Se pressionado SHIFT + ENTER, cria uma nova linha (não envia a mensagem)
            // Isso pode ser feito apenas adicionando uma quebra de linha
            inputMensagem.value += '\n';
        } else if (window.innerWidth > 768) {
            evento.preventDefault(); // Impede o envio padrão do formulário (caso haja algum)
            adicionarMensagemUsuario(evento); // Envia a mensagem
            console.log(mensagem);
        }
    }
});

inputMensagem.addEventListener("input", () => {
    inputMensagem.style.height = `${tamanhoInputInicial}px`; // Reseta a altura
    inputMensagem.style.height = `${inputMensagem.scrollHeight}px`; // Ajusta para a altura necessária

    // Ajusta o border-radius dependendo do tamanho
    document.querySelector(".chat-form").style.borderRadius = inputMensagem.scrollHeight > tamanhoInputInicial ? "15px" : "32px";
});


enviarMensagemBotao.addEventListener("click", (evento) => adicionarMensagemUsuario(evento));
mostrarChatBot.addEventListener("click", () => document.body.classList.toggle("mostrar-chatBot"));
fecharChatBot.addEventListener("click", () => {
  document.body.classList.remove("mostrar-chatBot");
});

