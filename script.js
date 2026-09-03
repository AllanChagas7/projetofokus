const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const banner = document.querySelector('.app__image');
const longoBt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPaused = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBticone = document.querySelector(".app__card-primary-butto-icon");
const TemponaTela = document.querySelector('#timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioplay = new Audio('./sons/play.wav');
const audiopausa = new Audio('./sons/pause.mp3');
const audiotempofinalizado = new Audio('./sons/beep.mp3');


let tempoDecorridoemSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 1000
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 900
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    MostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoemSegundos <= 0) {
        audiotempofinalizado.play()
        alert('Tempo Finalizado!')
        zerar() 
        return
    }
    tempoDecorridoemSegundos -= 1
    MostrarTempo()
}

startPaused.addEventListener('click', iniciarouPausar)

function iniciarouPausar() {
    if (intervaloId) {
        audiopausa.play()
        zerar()
        return
    }

    audioplay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBticone.setAttribute('src', `./imagens/pause.png`)
}
function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBticone.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function MostrarTempo() {
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    TemponaTela.innerHTML = `${tempoFormatado}`
}

MostrarTempo()