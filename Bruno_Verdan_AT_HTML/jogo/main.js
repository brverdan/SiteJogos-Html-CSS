const tabuleiro = document.querySelector("#tabuleiro");
const imagens = [ 
    'juann.jpg',
    'thiago.jpg',
    'cunha.jpg',
    'eu.jpg',
    'lucas.jpg',
    'viny.jpg',
    'sucodeareia.jpg',
    'filipe.jpg'
];

let cartaHTML = '';

imagens.forEach(img => {
    cartaHTML += `   
    <div class="memory-card flip" data-carta="${img}">
        <img class="front-face" src="img/${img}">
        <img class="back-face" src="img/yoshi.png">
    </div>
    <div class="memory-card flip" data-carta="${img}">
        <img class="front-face" src="img/${img}">
        <img class="back-face" src="img/yoshi.png">
    </div>`
});
document.getElementById("restart").hidden = true
tabuleiro.innerHTML = cartaHTML 

function reset() {
    location.reload(document.getElementById("tabuleiro"))
}

function iniciar(){
    document.getElementById("restart").hidden = false
    document.getElementById("iniciar").hidden = true
    const cartas = document.querySelectorAll('.memory-card')
    let primeiraCarta, segundaCarta
    let prenderCarta = false
    let cont = 0
    let record = 0

    setTimeout(() => {
        cartas.forEach(carta => carta.classList.remove("flip"))
    }, 3000)

    let inicio = new Date()

    function virarCarta() {
        if(prenderCarta) return false
        this.classList.add("flip")
        if(!primeiraCarta){
            primeiraCarta = this
            primeiraCarta.removeEventListener('click', virarCarta)
            return false
        }
        segundaCarta = this;
        checagem()
    }

    function checagem() {
        let igual = primeiraCarta.dataset.carta === segundaCarta.dataset.carta
        if (igual == true) {
            cont += 1
            console.log(cont)
            limparCartas(igual)
            if(cont === 8) {
                let fim = new Date()
                diferenca = Math.round(((fim - inicio) / 1000))
                if(localStorage.getItem("record") > diferenca || localStorage.getItem("record") === null) {
                    localStorage.setItem("record", `${diferenca}`);
                } 
                window.alert(`VOCÊ GANHOU!! Seu tempo foi de: ${diferenca} segundos.`)
            }
        } else {
            desvirarCarta()
        }
    }

    function desvirarCarta() {
        prenderCarta = true
        setTimeout(() => {  
            primeiraCarta.classList.remove("flip");
            segundaCarta.classList.remove("flip");
            primeiraCarta.addEventListener('click', virarCarta)
            limparCartas()
        }, 1500)
    }

    (function embaralhar() {
        cartas.forEach(carta => {
            let aleatorio = Math.floor(Math.random() * 16)
            carta.style.order = aleatorio
        })
    })()

    function limparCartas(igual = false) {
        if(igual) {
            primeiraCarta.removeEventListener('click', virarCarta)
            segundaCarta.removeEventListener('click', virarCarta)
        }
        [primeiraCarta, segundaCarta, prenderCarta] = [null, null, false]
    }

    cartas.forEach(carta => carta.addEventListener('click', virarCarta))
}

function tempo() {
    if(localStorage.getItem("record") === null) {
        alert("Nenhum tempo registrado!")
    } else {
        alert("O melhor tempo foi de : " + localStorage.getItem("record") + " segundos!")
    }
}