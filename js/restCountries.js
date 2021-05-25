// Pega todos os países da Api
async function getData(url = "https://restcountries.eu/rest/v2/all"){
    const response = await fetch(url)
    const data = await response.json()
    return data
    
}

// Sistema de paginação e criação dos elementos nas páginas
async function paginacao(itensPorPagina, data){
    let porPagina = itensPorPagina
    const state = {
        pagina: 1,
        porPagina: porPagina,
        totalPaginas: Math.ceil(data.length / porPagina),
        maxButtons: 5
    }

    // Botões para passar de página
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

        // Pega informações do país na lista e cria o elemento no html
        create(item){
            const {name, alpha3Code, borders, flag} = item
            const li = document.createElement('li')
            const a = document.createElement('a')
            let url
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')){
                url = `html/pais.html?code=${alpha3Code}`
            } else {
                url = `pais.html?code=${alpha3Code}`
            }
            
            borders.forEach((o)=>{
                url += `;${o}`
            })
            a.href = url
            const img = document.createElement('img')
            a.appendChild(img)
            li.appendChild(a)
            img.src = flag
            img.alt = `Bandeira do país: ${name}`
            li.classList.add('pais')
            document.querySelector('[data-lista-paises]').appendChild(li)
        },

        // Atualiza ao passar de página
        update() {
            document.querySelector('[data-lista-paises]').innerHTML = ''
            
            let pagina = state.pagina - 1
            let inicio = pagina * state.porPagina
            let fim = inicio + state.porPagina
            const itensPaginados = data.slice(inicio, fim)

            itensPaginados.forEach(lista.create)
        }
    }

    // Cálculo e configuração dos botões a serem exibidos
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
}


// Se certifica que o script só rodará se estiver na página index.html
// Botei isso pois ele estava rodando na página pais quando eu importava uma função
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')){
    paginacao(10, await getData())
}

export {getData, paginacao};
