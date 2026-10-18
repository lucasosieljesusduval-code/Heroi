const personagem = {
    nome: "Herói",
    nivel: 1,
    forca: 5,
    defesa: 2,
    magia: 2,
    vida: 10,
    vidaMaxima: 10,
    mana: 10,
    manaMaxima: 10,
    experiencia: 0,
    ouro: 0,
    possuiEspadaSimples: false,
    possuiArmaduraSimples: false,
    possuiTalismaSimples: false,
    chefeFlorestaDerrotado: false,
};

const criaturasFracas = [
    {
        nome: "Peixe com pé fraco",
        vidaMaxima: 15,
        forca: 4,
        defesa: 2,
        magia: 1,
        experiencia: 5,
        nivel: 1,
        ouro: 3,
        imagem: "imagens/Peixe anfíbio realista com patas.png"
    },
    {
        nome: "Coelho-Voador fraco",
        vidaMaxima: 15,
        forca: 4,
        defesa: 2,
        magia: 1,
        experiencia: 5,
        nivel: 1,
        ouro: 3,
        imagem: "imagens/Coelho Demônio em Pleno Voo.png"
    },
    {
        nome: "Urso-Cipó fraco",
        vidaMaxima: 15,
        forca: 5,
        defesa: 2,
        magia: 0,
        experiencia: 5,
        nivel: 1,
        ouro: 3,
        imagem: "imagens/Urso Monstruoso de Vinhas em Fúria.png"
    }
];

const criaturasFortes = [
    {
        nome: "Peixe com pé Forte",
        vidaMaxima: 30,
        forca: 9,
        defesa: 5,
        magia: 3,
        experiencia: 15,
        nivel: 5,
        ouro: 8,
        imagem: "imagens/Monstro Peixe-Lagarto Blindado.png"
    },
    {
        nome: "Coelho Voador Forte",
        vidaMaxima: 30,
        forca: 9,
        defesa: 5,
        magia: 3,
        experiencia: 15,
        nivel: 5,
        ouro: 8,
        imagem: "imagens/Coelho Demônio Alado em Fúria.png"
    },
    {
        nome: "Urso-Cipó Forte",
        vidaMaxima: 30,
        forca: 9,
        defesa: 5,
        magia: 3,
        experiencia: 15,
        nivel: 5,
        ouro: 8,
        imagem: "imagens/Urso Colossal da Floresta Encantada.png"
    },
];

const chefeFinal = {
    nome: "Peixe com Pé — Destruidor da Cidade",
    imagem: "imagens/Monstro Anfíbio Dourado em Fúria.png",
    vidaMaxima: 80,
    forca: 12,
    defesa: 6,
    magia: 4,
    experiencia: 30,
    ouro: 25,
    nivel: 6,
    ehChefe: true
};
    


let inimigoAtual = null;

function atualizarStatus() {
    const xpNecessaria = personagem.nivel * 10;
    const porcentagemXP = (personagem.experiencia / xpNecessaria) * 100;
    document.getElementById("status-nome").textContent = personagem.nome;
    document.getElementById("status-nivel").textContent = personagem.nivel;
    document.getElementById("status-forca").textContent = personagem.forca;
    document.getElementById("status-defesa").textContent = personagem.defesa;
    document.getElementById("status-magia").textContent = personagem.magia;
    document.getElementById("status-vida").textContent = personagem.vida + " / " + personagem.vidaMaxima;
    document.getElementById("status-mana").textContent = personagem.mana + " / " + personagem.manaMaxima;
    document.getElementById("status-experiencia").textContent = personagem.experiencia + " / " + xpNecessaria;
    document.getElementById("vida-atual").textContent =  personagem.vida + " / " + personagem.vidaMaxima; 
    document.getElementById("mana-atual").textContent = personagem.mana + " / " + personagem.manaMaxima;
    document.getElementById("Experiência-Atual").textContent = personagem.experiencia + " / " + xpNecessaria;
    document.getElementById("ouro-atual").textContent = personagem.ouro;
     botaoComprarEspada.disabled = personagem.possuiEspadaSimples;
    botaoComprarEspada.textContent = personagem.possuiEspadaSimples
    ? "Espada adquirida"
    : "Comprar espada";
    botaoComprarArmadura.disabled = personagem.possuiArmaduraSimples;
    botaoComprarArmadura.textContent = personagem.possuiArmaduraSimples
    ? "Armadura adquirida"
    : "Comprar Armadura";
    botaoComprarTalisma.disabled = personagem.possuiTalismaSimples;
    botaoComprarTalisma.textContent = personagem.possuiTalismaSimples
    ? "Talismã adquirido"
    : "Comprar Talismã";
}

function verificarNivel() {
    while (personagem.experiencia >= personagem.nivel * 10) {
        personagem.experiencia -= personagem.nivel * 10;
        personagem.nivel++;
        personagem.vidaMaxima += 5;
        personagem.manaMaxima += 5;
        personagem.forca += 2;
        personagem.defesa += 1;
        personagem.magia += 1;
    }
}

function resolverTurno() {
    if(inimigoAtual.vida === 0){
        const diferencaNivel = personagem.nivel - inimigoAtual.nivel;
        let xpGanho = inimigoAtual.experiencia;
        if (diferencaNivel >= 5) {
            xpGanho = 0;
        } else if (diferencaNivel >= 3){
        xpGanho = Math.floor(xpGanho/2);
        }
        personagem.experiencia += xpGanho;
        personagem.ouro += inimigoAtual.ouro;
        verificarNivel();
        atualizarStatus();
        document.getElementById("mensagem-combate").textContent =
    "Você venceu e ganhou " + xpGanho +
    " de XP e " + inimigoAtual.ouro + " de ouro!";
    if (inimigoAtual.ehChefe) {
    personagem.chefeFlorestaDerrotado = true;
    painelEncontro.hidden = true;
    telaApresentacaoChefe.hidden = true;
    telaFinal.hidden = false;
}
        return;
    }
    const danoInimigo = Math.max(
        1,
        inimigoAtual.forca - personagem.defesa
    );
    personagem.vida = Math.max(
        0,
        personagem.vida - danoInimigo
    );
      atualizarStatus();

    document.getElementById("mensagem-combate").textContent =
        personagem.vida === 0
            ? "Você foi derrotado! Volte à cidade para descansar."
            : "A criatura revidou e causou " + danoInimigo + " de dano.";
}

const telaDormitorio = document.getElementById("Dormitório");
const botaoIrDormitorio = document.getElementById("Ir-Dormitório");
const botaoVoltarCidadeProvisoria = document.getElementById("Voltar-Cidade-Provisória");
const telaMenu = document.getElementById("tela-menu");
const telaHistoriaInicial = document.getElementById("História-Inicial");
const botaoIniciarJogo = document.getElementById("Iniciar-Jogo");
const botaoContinuar = document.getElementById("Continuar");
const telaCidadeDestruida = document.getElementById("Cidade-Destruída");
const painelStatus = document.getElementById("status-personagem");
const botaoFecharStatus = document.getElementById("Fechar-Status");
const botaoStatus = document.getElementById("Status");
const telaCidadeProvisoria = document.getElementById("Cidade-Provisória");
const botaoIrCidadeProvisoria = document.getElementById("Ir-Cidade-Provisória");
const botaoVoltarCidadeDestruida = document.getElementById("Voltar-Cidade-Destruída");
const botaodescansar = document.getElementById("Descansar");
const painelRecursos = document.getElementById("painel-recursos");
const telaFloresta = document.getElementById("Floresta");
const botaoIrFloresta = document.getElementById("Ir-Floresta");
const botaoVoltarFloresta = document.getElementById("Voltar-Floresta");
const botaoProcurarCriaturaFraca = document.getElementById("Procurar-Criatura-Fraca");
const botaoProcurarCriaturaForte = document.getElementById("Procurar-Criatura-Forte");
const painelEncontro = document.getElementById("encontro");
const botaoAtacar = document.getElementById("Atacar");
const audioMusica = document.getElementById("audio-musica");
const botaoAlternarMusica = document.getElementById("alternar-musica");
const botaoSalvarJogo = document.getElementById("Salvar-Jogo");
const mensagemSave = document.getElementById("mensagem-save");
const botaoCarregarJogo = document.getElementById("Carregar-Jogo"); 
const botaoApagarSave = document.getElementById("Apagar-Save");
const botaoMortalSlash = document.getElementById("Mortal-Slash");
const telaLoja = document.getElementById("Loja");
const botaoIrLoja = document.getElementById("Ir-Loja");
const botaoVoltarLoja = document.getElementById("Voltar-Loja");
const botaoComprarRefeicao = document.getElementById("Comprar-Refeicao");
const botaoComprarBebida = document.getElementById("Comprar-Bebida");
const botaoComprarEspada = document.getElementById("Comprar-Espada");
const botaoComprarArmadura = document.getElementById("Comprar-Armadura");
const botaoComprarTalisma = document.getElementById("Comprar-Talisma");
const mensagemLoja = document.getElementById("mensagem-loja");
const telaApresentacaoChefe = document.getElementById("apresentacao-chefe");
const botaoEnfrentarChefe = document.getElementById("Enfrentar-Chefe");
const botaoVoltarApresentacaoChefe = document.getElementById("Voltar-Apresentacao-Chefe");
const botaoComecarBatalhaChefe = document.getElementById("Comecar-Batalha-Chefe");
const telaFinal = document.getElementById("final-jogo");
const botaoVoltarFinal = document.getElementById("Voltar-Final");
const aparencias = [
    {
     imagem: "imagens/Herói Aventureiro com Espada Gigante.png",
     descricao: "Aventureiro com espada gigante"
    },
    {
     imagem: "imagens/Guerreira Anime com Machado Gigante.png",
     descricao: "Guerreira anime com machado gigante"
    },
    
]
let aparenciaAtual = 0;

const imagemAventureiro = document.getElementById("imagem-aventureiro");
const botaoMudarAparencia = document.getElementById("Mudar-Aparência");

botaoIniciarJogo.addEventListener("click", () => {
    if (localStorage.getItem("o-heroi-save") !== null ){
        const confirmou = confirm(
           "Já existe um progresso salvo. Iniciar uma nova partida? " +
        "O save anterior será mantido até você salvar novamente."
        );
        if (!confirmou){
            return;
        }
    }
    telaMenu.hidden = true;
    telaHistoriaInicial.hidden = false;
}   );

botaoContinuar.addEventListener("click", () => {
    telaHistoriaInicial.hidden = true;
    telaCidadeDestruida.hidden = false;
    atualizarStatus();
    painelRecursos.hidden = false;
    // Aqui você pode adicionar a lógica para iniciar o jogo ou ir para a próxima tela
});

botaoMudarAparencia.addEventListener("click", () => {
    aparenciaAtual = aparenciaAtual + 1;

    if (aparenciaAtual >= aparencias.length) {
        aparenciaAtual = 0;
    }

    imagemAventureiro.src = aparencias[aparenciaAtual].imagem;
    imagemAventureiro.alt = aparencias[aparenciaAtual].descricao;
});

botaoStatus.addEventListener("click", () => {
    painelStatus.hidden = false;
    atualizarStatus();
});

botaoFecharStatus.addEventListener("click", () => {
    painelStatus.hidden = true;
});

botaoIrCidadeProvisoria.addEventListener("click", () => {
    telaCidadeDestruida.hidden = true;
    telaCidadeProvisoria.hidden = false;
});

botaoVoltarCidadeDestruida.addEventListener("click", () => {
    telaCidadeProvisoria.hidden = true;
    telaCidadeDestruida.hidden = false;
});

botaoIrDormitorio.addEventListener("click", () => {
    telaCidadeProvisoria.hidden = true;
    telaDormitorio.hidden = false;
});

botaoVoltarCidadeProvisoria.addEventListener("click", () => {
    telaDormitorio.hidden = true;
    telaCidadeProvisoria.hidden = false;
    document.getElementById("mensagem-descanso").textContent = "";
});

botaodescansar.addEventListener("click", () => {
    personagem.vida = personagem.vidaMaxima;
    personagem.mana = personagem.manaMaxima;
    atualizarStatus();
    document.getElementById("mensagem-descanso").textContent =
    "Você descansou. Vida e Mana foram recuperadas!";
});

botaoIrFloresta.addEventListener("click", () => {
    telaCidadeDestruida.hidden = true;
    telaFloresta.hidden = false;
});

botaoVoltarFloresta.addEventListener("click", () => {
    telaFloresta.hidden = true;
    telaCidadeDestruida.hidden = false;
    inimigoAtual = null;
    painelEncontro.hidden = true;
    document.getElementById("mensagem-combate").textContent = "";
});

botaoProcurarCriaturaFraca.addEventListener("click", () => {
    if (inimigoAtual !== null && inimigoAtual.vida > 0) {
    document.getElementById("mensagem-combate").textContent =
        "Termine esta batalha ou volte à cidade para abandoná-la.";
    return;
}
    const indiceSorteado = Math.floor(
        Math.random() * criaturasFracas.length
    );

    const criaturaFraca = criaturasFracas[indiceSorteado];

    inimigoAtual = {
        imagem: criaturaFraca.imagem,
        nome: criaturaFraca.nome,
        vida: criaturaFraca.vidaMaxima,
        vidaMaxima: criaturaFraca.vidaMaxima,
        forca: criaturaFraca.forca,
        defesa: criaturaFraca.defesa,
        magia: criaturaFraca.magia,
        experiencia: criaturaFraca.experiencia,
        ouro: criaturaFraca.ouro,
        nivel: criaturaFraca.nivel
    };

    

    document.getElementById("nome-inimigo").textContent = inimigoAtual.nome;
    document.getElementById("vida-inimigo").textContent = inimigoAtual.vida;
    document.getElementById("imagem-inimigo").src = inimigoAtual.imagem;
    document.getElementById("imagem-inimigo").alt = inimigoAtual.nome;
    document.getElementById("mensagem-combate").textContent = "";
    
    painelEncontro.hidden = false;
});

botaoProcurarCriaturaForte.addEventListener("click", () => {
    if (inimigoAtual !== null && inimigoAtual.vida > 0) {
    document.getElementById("mensagem-combate").textContent =
        "Termine esta batalha ou volte à cidade para abandoná-la.";
    return;
}
    const indiceSorteado = Math.floor(
        Math.random() * criaturasFortes.length
    );

    const criaturaForte = criaturasFortes[indiceSorteado];

    inimigoAtual = {
    imagem: criaturaForte.imagem,
    nome: criaturaForte.nome,
    vida: criaturaForte.vidaMaxima,
    vidaMaxima: criaturaForte.vidaMaxima,
    forca: criaturaForte.forca,
    defesa: criaturaForte.defesa,
    magia: criaturaForte.magia,
    experiencia: criaturaForte.experiencia,
    ouro: criaturaForte.ouro,
    nivel: criaturaForte.nivel
};

    

    document.getElementById("nome-inimigo").textContent = inimigoAtual.nome;
    document.getElementById("vida-inimigo").textContent = inimigoAtual.vida;
    document.getElementById("imagem-inimigo").src = inimigoAtual.imagem;
    document.getElementById("imagem-inimigo").alt = inimigoAtual.nome;
    document.getElementById("mensagem-combate").textContent = "";
    
    painelEncontro.hidden = false;
});

botaoAtacar.addEventListener("click", () => {
    if (
        inimigoAtual === null ||
        inimigoAtual.vida <= 0 ||
        personagem.vida <= 0
    ) {
        return;
    }

    const danoHeroi = Math.max(
    1,
    personagem.forca - inimigoAtual.defesa
);

    inimigoAtual.vida = Math.max(
        0,
        inimigoAtual.vida - danoHeroi
    );

    document.getElementById("vida-inimigo").textContent =
        inimigoAtual.vida;

    resolverTurno();
});

botaoAlternarMusica.addEventListener("click", async () =>{
    if (audioMusica.paused) {
        try {
            await audioMusica.play();
            botaoAlternarMusica.textContent = "Pausar Música";
            document.getElementById("nome-musica").textContent = "Peacefull Ville - Bobjt";

        } catch {
            document.getElementById("nome-musica").textContent = "Não foi possível reproduzir musica";
        }
    }  else{
        audioMusica.pause();
        botaoAlternarMusica.textContent = "Ligar música";
    }
});

botaoSalvarJogo.addEventListener("click", () => {
    const dadosSave = {
        versao: 1,
        personagem: personagem,
        aparenciaAtual: aparenciaAtual
    };

    try {
        localStorage.setItem(
            "o-heroi-save", JSON.stringify(dadosSave)
        );
        botaoCarregarJogo.disabled = false;
        botaoApagarSave.disabled = false;
        mensagemSave.textContent = "Progresso Salvo";
    } catch  {
        mensagemSave.textContent = "Não foi possível salvar neste navegador";
    }
});

try {
    const existeSave = localStorage.getItem("o-heroi-save") !== null;

    botaoCarregarJogo.disabled = !existeSave;
    botaoApagarSave.disabled = !existeSave;
} catch {
    botaoCarregarJogo.disabled = true;
    botaoApagarSave.disabled = true;
}

botaoCarregarJogo.addEventListener("click", () => {
    try {
        const textoSave = localStorage.getItem("o-heroi-save");

        if (textoSave === null) {
            return;
        }

        const dadosSave = JSON.parse(textoSave);

        if (
            dadosSave?.versao !== 1 ||
            !dadosSave.personagem ||
            !Number.isInteger(dadosSave.aparenciaAtual) ||
            !aparencias[dadosSave.aparenciaAtual]
        ) {
            throw new Error("Save incompatível");
        }

        // NOVO: conferir os números antes de aplicá-los.
        const atributosNumericos = [
            "nivel", "forca", "defesa", "magia",
            "vida", "vidaMaxima", "mana", "manaMaxima",
            "experiencia", "ouro"
        ];

        for (const atributo of atributosNumericos) {
            const valor = dadosSave.personagem[atributo];

            if (!Number.isInteger(valor) || valor < 0) {
                throw new Error("Atributo inválido: " + atributo);
            }
        }

        const salvo = dadosSave.personagem;

        if (
            salvo.nivel < 1 ||
            salvo.vidaMaxima < 1 ||
            salvo.vida > salvo.vidaMaxima ||
            salvo.mana > salvo.manaMaxima
        ) {
            throw new Error("Atributos incompatíveis");
        }

        // Só aplica os dados depois das verificações.
        Object.assign(personagem, dadosSave.personagem);
        aparenciaAtual = dadosSave.aparenciaAtual;

        imagemAventureiro.src = aparencias[aparenciaAtual].imagem;
        imagemAventureiro.alt = aparencias[aparenciaAtual].descricao;

        atualizarStatus();

        telaMenu.hidden = true;
        telaHistoriaInicial.hidden = true;
        telaCidadeDestruida.hidden = false;
        painelRecursos.hidden = false;

        mensagemSave.textContent = "Progresso carregado!";
    } catch {
        alert("Não foi possível carregar o jogo");
    }
});

botaoApagarSave.addEventListener("click", () => {
    const confirmou = confirm(
        "Apagar o progresso salvo? Essa ação não pode ser desfeita!"
    );
    if (!confirmou) {
        return;
    }
    try {
        localStorage.removeItem("o-heroi-save");
        botaoCarregarJogo.disabled = true;
        botaoApagarSave.disabled = true;

        alert("Progresso salvo apagado.");
    } catch {
        alert("Não foi possível apagar o save");
    }
})

botaoMortalSlash.addEventListener("click", () => {
    if (
        inimigoAtual === null ||
        inimigoAtual.vida <= 0 ||
        personagem.vida <= 0
    ) {
        return;
    }
    if (personagem.mana < 3) {
            document.getElementById("mensagem-combate").textContent = "Mana Insuficiente! Mortal Slash exige 3 de mana";
            return;
        }
    personagem.mana -= 3;

    const dano =Math.max(
        1,
        personagem.forca + personagem.magia - inimigoAtual.defesa
    );
    inimigoAtual.vida =Math.max(
        0,
        inimigoAtual.vida - dano
    );
    document.getElementById("vida-inimigo").textContent = inimigoAtual.vida;
   resolverTurno();
});

botaoIrLoja.addEventListener("click", () => {
    telaCidadeProvisoria.hidden = true;
    telaLoja.hidden = false;
});

botaoVoltarLoja.addEventListener("click", () => {
    telaLoja.hidden = true;
    telaCidadeProvisoria.hidden = false;
});

botaoComprarRefeicao.addEventListener("click", () => {
    if (personagem.vida >= personagem.vidaMaxima) {
        mensagemLoja.textContent = "Sua Vida já está cheia.";
        return;
    }

    if (personagem.ouro < 3) {
        mensagemLoja.textContent = "Você precisa de 3 de ouro.";
        return;
    }

    const vidaAntes = personagem.vida;

    personagem.ouro -= 3;
    personagem.vida = Math.min(
        personagem.vidaMaxima,
        personagem.vida + 5
    );

    atualizarStatus();

    mensagemLoja.textContent =
        "Você gastou 3 de ouro e recuperou " +
        (personagem.vida - vidaAntes) + " de Vida.";
});

botaoComprarBebida.addEventListener("click", () => {
    if (personagem.mana >= personagem.manaMaxima) {
        mensagemLoja.textContent = "Sua Mana já está cheia.";
        return;
    }

    if (personagem.ouro < 3) {
        mensagemLoja.textContent = "Você precisa de 3 de ouro.";
        return;
    }

    const manaAntes = personagem.mana;

    personagem.ouro -= 3;
    personagem.mana = Math.min(
        personagem.manaMaxima,
        personagem.mana + 5
    );

    atualizarStatus();

    mensagemLoja.textContent =
        "Você gastou 3 de ouro e recuperou " +
        (personagem.mana - manaAntes) + " de mana.";
});

botaoComprarEspada.addEventListener("click", () => {
    if ( personagem.possuiEspadaSimples ) {
        mensagemLoja.textContent = "Você já possui essa espada.";
        return;
    }

    if (personagem.ouro < 15) {
        mensagemLoja.textContent = "Você precisa de 15 de ouro.";
        return;
    }

    personagem.ouro -= 15;
    personagem.forca += 2;
    personagem.possuiEspadaSimples = true;
    
    atualizarStatus();
    
   
    mensagemLoja.textContent =
        "Espada equipada! Sua Força aumentou em 2.";
}); 

botaoComprarArmadura.addEventListener("click", () => {
    if ( personagem.possuiArmaduraSimples ) {
        mensagemLoja.textContent = "Você já possui essa Armadura.";
        return;
    }

    if (personagem.ouro < 20) {
        mensagemLoja.textContent = "Você precisa de 20 de ouro.";
        return;
    }

    personagem.ouro -= 20;
    personagem.defesa += 2;
    personagem.possuiArmaduraSimples = true;
    
    atualizarStatus();
    
   
    mensagemLoja.textContent =
        "Armadura equipada! Sua Defesa aumentou em 2.";
}); 

botaoComprarTalisma.addEventListener("click", () => {
    if ( personagem.possuiTalismaSimples ) {
        mensagemLoja.textContent = "Você já possui esse talismã.";
        return;
    }

    if (personagem.ouro < 12) {
        mensagemLoja.textContent = "Você precisa de 12 de ouro.";
        return;
    }

    personagem.ouro -= 12;
    personagem.magia += 2;
    personagem.defesa += 1;
    personagem.possuiTalismaSimples = true;
    
    atualizarStatus();
    
   
    mensagemLoja.textContent =
        "Talismã equipado! Sua Magia aumentou em 2 e defesa em 1.";
}); 

botaoEnfrentarChefe.addEventListener("click", () => {
    if (inimigoAtual !== null && inimigoAtual.vida > 0) {
    document.getElementById("mensagem-combate").textContent =
        "Termine esta batalha ou volte à cidade para abandoná-la.";
    return;
}
    inimigoAtual = null;
    painelEncontro.hidden = true;
    telaFloresta.hidden = true;
    telaApresentacaoChefe.hidden = false;
});

botaoVoltarApresentacaoChefe.addEventListener("click", () => {
    inimigoAtual = null;
    painelEncontro.hidden = true;
    document.getElementById("mensagem-combate").textContent = "";

    telaFloresta.appendChild(painelEncontro);

    telaApresentacaoChefe.hidden = true;
    telaFloresta.hidden = false;
});

botaoComecarBatalhaChefe.addEventListener("click", () => {
    inimigoAtual = {
        ...chefeFinal,
        vida: chefeFinal.vidaMaxima
    };

    document.getElementById("nome-inimigo").textContent =
        inimigoAtual.nome;

    document.getElementById("vida-inimigo").textContent =
        inimigoAtual.vida;

    document.getElementById("imagem-inimigo").src =
        inimigoAtual.imagem;

    document.getElementById("imagem-inimigo").alt =
        inimigoAtual.nome;

    document.getElementById("mensagem-combate").textContent = "";

    telaApresentacaoChefe.appendChild(painelEncontro);

    telaApresentacaoChefe.hidden = false;
    telaFloresta.hidden = true;
    painelEncontro.hidden = false;
});

botaoVoltarFinal.addEventListener("click", () => {
    inimigoAtual = null;
    painelEncontro.hidden = true;
    document.getElementById("mensagem-combate").textContent = "";

    telaFloresta.appendChild(painelEncontro);

    telaFinal.hidden = true;
    telaFloresta.hidden = false;
});