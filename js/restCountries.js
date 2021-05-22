const regiao = `https://restcountries.eu/rest/v2/region/{region}`
const cidadeCapital = `https://restcountries.eu/rest/v2/capital/{capital}`
const idioma = `https://restcountries.eu/rest/v2/lang/{et}`
const pais = `https://restcountries.eu/rest/v2/currency/{currency}`
const codigoLigacao = `https://restcountries.eu/rest/v2/callingcode/{callingcode}`
const all = "https://restcountries.eu/rest/v2/all"
const paises = document.querySelector('.lista-paises')

async function getData(){
    const response = await fetch("https://restcountries.eu/rest/v2/all")
    const data = await response.json()


    let porPagina = 10
    const state = {
        pagina: 1,
        porPagina: porPagina,
        totalPaginas: Math.ceil(data.length / porPagina),
        maxButtons: 5
    }

    const controls = {
        proxima() {
            state.pagina++
            const lastPage = state.pagina > state.totalPaginas 
            if (lastPage) {
                state.pagina--
            }
        },
        anterior(){ 
            state.pagina--
            if(state.pagina < 1) {
                state.pagina++
            }
        },
        goTo(page){
            if (page < 1) {
                state.pagina = 1
            }
            state.pagina = +page
            if (page > state.totalPaginas){
                state.pagina = state.totalPaginas
            }

        }, 
        createListeners(){
            document.querySelector('[data-proximo]').addEventListener('click', () => {
                controls.proxima()
                update()
            })
            document.querySelector('[data-anterior]').addEventListener('click', () => {
                controls.anterior()
                update()
            })
        }
    }

    const lista = {
        create(item){
            const {flag} = item
            const li = document.createElement('li')
            const a = document.createElement('a')
            const img = document.createElement('img')
            a.appendChild(img)
            li.appendChild(a)
            img.src = flag
            li.classList.add('pais')
            paises.appendChild(li)
        },
        update() {
            document.querySelector('[data-lista-paises]').innerHTML = ''

            let pagina = state.pagina - 1
            let inicio = pagina * state.porPagina
            let fim = inicio + state.porPagina
            const itensPaginados = data.slice(inicio, fim)

            itensPaginados.forEach(lista.create)
        }
    }

    const buttons = {
        create(number){
            const button = document.createElement('div')
            button.innerHTML = number;
            if (state.pagina == number){
                button.classList.add('ativo')
            }
            button.classList.add('numeros-buttons')
            button.addEventListener('click', (event) => {
                const page = event.target.innerText
                controls.goTo(page)
                update()
            })
            document.querySelector('[data-numeros]').appendChild(button)
        },
        update(){
            document.querySelector('[data-numeros]').innerHTML = ''
            const { maxLeft, maxRight } = buttons.calculaBotoesVisiveis()
            for(let page = maxLeft; page <= maxRight; page++){
                buttons.create(page)
            }
        },
        calculaBotoesVisiveis(){
            const {maxButtons} = state
            let maxLeft = (state.pagina - Math.floor(maxButtons/2))
            let maxRight = (state.pagina + Math.floor(maxButtons/2))

            if (maxLeft < 1) {
                maxLeft = 1
                maxRight = maxButtons
            }
            if (maxRight > state.totalPaginas){
                maxLeft = state.totalPaginas - (maxButtons - 1)
                maxRight = state.totalPaginas

                if (maxLeft < 1) {maxLeft = 1}
            }
            return {maxLeft, maxRight}
        }
    }

    function update(){
        lista.update()
        buttons.update()
    }

    function init(){
        update()
        controls.createListeners()
    }

    init()
    /*const flag = data.forEach((item) => {
        const {flag} = item
        criaElemento(flag)
    })*/
}

getData()
