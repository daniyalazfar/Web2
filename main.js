let cartoes = [];
let pos = 0;
let frente = true;
let nivelZoom = 1;

const bd = {
    "Fisica": [
        { f: "O que é a Óptica do Olho Humano?", v: "É o estudo de como a luz entra no olho e forma imagens na retina." },
        { f: "O que são Anomalias da Visão?", v: "Defeitos como miopia e daltonismo, corrigidos com lentes." },
        { f: "O que é a Dispersão luminosa por refração?", v: "Quando a luz branca entra num prisma e se separa nas cores do arco-íris." },
        { f: "Para que servem instrumentos ópticos?", v: "Lupas e óculos desviam a luz para ampliar imagens ou corrigir a visão." },
        { f: "O que é Dispersão luminosa por difração?", v: "A luz contorna obstáculos, criando padrões de cores (ex: reflexo num CD)." }
    ],
    "Programacao": [
        { f: "O que é o nosso projeto?", v: "Flashcards feitos com HTML, CSS e JS." },
        { f: "Como funciona a Acessibilidade de Tamanho?", v: "Botões no JS que aumentam fontes e o tamanho do cartão." },
        { f: "Como funciona a Acessibilidade de Cores?", v: "Mudamos a 'class' do site para aplicar cores para daltônicos." },
        { f: "O que é 'Build and deployment'?", v: "Colocar o código hospedado na internet." },
        { f: "Qual a importância da Programação?", v: "Automatiza tarefas e cria ferramentas de acessibilidade." }
    ],
    "Robotica": [
        { f: "O que é o Disco de Newton?", v: "Disco colorido que, ao girar rápido, mistura as cores e fica branco." },
        { f: "Como funciona o LED RGB?", v: "Luzes Vermelha, Verde e Azul que se somam formando outras cores." },
        { f: "O que é o Sensor LDR?", v: "Detecta a luz. Se escurecer, podemos programar para acender um LED." },
        { f: "O que é o efeito Fade in e Fade out?", v: "Acender e apagar um LED aos poucos usando a placa Arduino." },
        { f: "Como a acessibilidade entra na Robótica?", v: "Podemos usar luzes para criar avisos visuais para surdos." }
    ],
    "Sociedade": [
        { f: "Qual o país mais visitado do mundo?", v: "A França, recebendo mais de 80 milhões de turistas por ano." },
        { f: "Qual o animal que mais causa mortes humanas?", v: "O mosquito, pois transmite doenças graves." },
        { f: "Quanto tempo a luz do Sol demora para chegar à Terra?", v: "Aproximadamente 8 minutos." },
        { f: "Qual o idioma mais falado do mundo como língua nativa?", v: "O Mandarim, falado na China." },
        { f: "Quem inventou o avião?", v: "No Brasil, Santos Dumont. Nos EUA, os Irmãos Wright." }
    ],
    "Dificeis": [
        { f: "O que é o Paradoxo de Fermi?", v: "A contradição entre a alta probabilidade de vida alienígena e a falta de provas." },
        { f: "Qual a diferença entre Fissão e Fusão nuclear?", v: "Fissão quebra átomos pesados; Fusão une átomos leves (como ocorre no Sol)." },
        { f: "O que é a Teoria das Cordas na física?", v: "Teoria que sugere que as partículas não são pontinhos, mas minúsculas cordas vibrantes." },
        { f: "O que afirma o Teorema da Incompletude de Gödel?", v: "Que na matemática sempre existirão verdades que não podem ser provadas." },
        { f: "O que é a Epistemologia?", v: "É o ramo da filosofia que estuda a origem, a natureza e os limites do conhecimento." }
    ]
};

function mudarCor(classe) { 
    document.body.className = classe; 
}

function escolherTema(tema) {
    if (!bd[tema]) return;
    cartoes = bd[tema]; 
    pos = 0; 
    frente = true;
    document.getElementById("menu").style.display = "none";
    document.getElementById("estudo").style.display = "block";
    atualizar();
}

function atualizar() {
    if (cartoes.length === 0) return;
    document.getElementById("titulo-cartao").innerText = frente ? "Pergunta" : "Resposta";
    document.getElementById("texto-cartao").innerText = frente ? cartoes[pos].f : cartoes[pos].v;
    document.getElementById("contador").innerText = (pos + 1) + " de " + cartoes.length;
}

function virar() { 
    frente = !frente; 
    atualizar(); 
}

function mudarCartao(passo) {
    let novaPos = pos + passo;
    if (novaPos >= 0 && novaPos < cartoes.length) {
        pos = novaPos; 
        frente = true; 
        atualizar();
    }
}

function mudarTamanho(valor) {
    nivelZoom += valor;
    if (nivelZoom < 0.6) nivelZoom = 0.6;
    if (nivelZoom > 1.8) nivelZoom = 1.8;
    document.body.style.transform = "scale(" + nivelZoom + ")";
    document.body.style.transformOrigin = "top center";
}

function voltarMenu() {
    document.getElementById("estudo").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function lerTexto() {
    window.speechSynthesis.cancel();
    let texto = document.getElementById("texto-cartao").innerText;
    if (!texto) return;
    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR"; 
    window.speechSynthesis.speak(fala);
}