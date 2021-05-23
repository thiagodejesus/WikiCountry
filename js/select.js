import getData from './restCountries.js'

function adicionaListenerFiltro1(){

  const selected = document.querySelector("[data-selected-filtro1]");
  const optionsContainer = document.querySelector("[data-filtro1-container]");
  const optionsList = document.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active")
    selected.classList.toggle("hidden")
  });

  optionsList.forEach(o => {
    o.addEventListener("click", () => {
      selected.innerHTML = `<p>${o.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
      optionsContainer.classList.remove("active")
      selected.classList.remove("hidden")
      verificaDadosFiltro2(o.id)
    });
  });
}

adicionaListenerFiltro1()


async function verificaDadosFiltro2(search){
  let filtro2 = []
  const filtro2Container = document.querySelector('[data-filtro2-container]')
  const response = await fetch(`https://restcountries.eu/rest/v2/all`)
  const data = await response.json()

  console.log(data)

  filtro2 = []
  data.forEach((item)=> {
    let {name, region, capital, languages, callingCodes} = item

    // Pegando língua e código de ligação primários
    let language = languages[0]
    let callingCode = callingCodes[0]

    let pais = {name, region, capital, language, callingCode}
    filtro2.push(pais)
  })

    console.log(filtro2)
    apagaFilhos(filtro2Container)
    criaOptions(filtro2, search)

    

}

function criaOptions(lista, search){
  document.querySelector('[data-filtro2]').classList.remove('hidden')
  
  let selected = document.querySelector('[data-selected-filtro2]')
  const filtro2Container = document.querySelector('[data-filtro2-container]')

  let divEscolha = document.createElement('div')
  divEscolha.classList.add('option')
  divEscolha.id = 'escolha'

  let labelEscolha = document.createElement('label')
  labelEscolha.innerText = 'Escolha uma opção'

  divEscolha.appendChild(labelEscolha)
  filtro2Container.appendChild(divEscolha)

  selected.addEventListener("click", () => {
    filtro2Container.classList.add("active");
    selected.classList.add("hidden")
  });

  const adicionados = []
  lista.forEach((opt) => {
    let opcao = opt
    let opcaoPesquisa
    switch(search){
      case 'region':
        opcao = opt.region
        opcaoPesquisa = `https://restcountries.eu/rest/v2/region/${opcao.toLowerCase()}`
        break
      case 'capital':
        opcao = opt.capital
        opcaoPesquisa = `https://restcountries.eu/rest/v2/capital/${opcao.toLowerCase().replace(/\s/g, "")}`
        break
      case 'et':
        opcao = opt.language.name
        opcaoPesquisa = `https://restcountries.eu/rest/v2/lang/${opt.language.iso639_1}`
        break
      case 'name':
        opcao = opt.name
        opcaoPesquisa = `https://restcountries.eu/rest/v2/name/${opcao.toLowerCase().replace(/\s/g, "")}`
        break
      case 'callingcode':
        opcao = opt.callingCode
        opcaoPesquisa = `https://restcountries.eu/rest/v2/callingcode/${opcao.toLowerCase()}`
        break
      case 'escolha':
        opcao = ''
        break
    }

    if (adicionados.indexOf(opcao) == -1 && opcao != ''){
      const div = document.createElement('div')
      div.classList.add('option')
      div.id = opcaoPesquisa

      const label = document.createElement('label')
      label.innerText = opcao

      div.appendChild(label)
      filtro2Container.appendChild(div)
      
      div.addEventListener("click", () => {
        selected.innerHTML = `<p>${div.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
        selected.id = opcaoPesquisa
        filtro2Container.classList.remove("active")
        selected.classList.remove("hidden")
      });
      adicionados.push(opcao)
    }
  })
}

function apagaFilhos(element){
  for (let c = element.childElementCount; c > 0; c--) {element.lastChild.remove()}
}

/* Forma alternativa a ser trabalhada
const filtro1 = {
  selecionado: document.querySelector("[data-selected-filtro1]"),
  optionsContainer: document.querySelector(".options-container"),
  optionsList: document.querySelectorAll(".option"),

  adicionaListenerSelecionado(){
    this.selecionado.addEventListener("click", () => {
      this.optionsContainer.classList.toggle("active");
      this.selecionado.classList.toggle("hidden")
    })
  },

  adicionaListenerOpcoes(){
    this.optionsList.forEach(o => {
      o.addEventListener("click", () => {
        this.selecionado.innerHTML = `<p>${o.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
        this.optionsContainer.classList.remove("active");
        this.selecionado.classList.remove("hidden")
        verificaDadosFiltro2(o.id)
      });
    });
  },

  init(){
    this.adicionaListenerSelecionado()
    this.adicionaListenerOpcoes()
  }

}

const filtro2 = {

}

filtro1.init() */

function ConfigurarBotaoPesquisar() {
  const botaoPesquisar = document.querySelector('[data-pesquisar-resultado]')
  const buscaSelecionada = document.querySelector('[data-selected-filtro2]')
  botaoPesquisar.addEventListener('click', () => {  
    const pesquisa = buscaSelecionada.id
    console.log('fui clicado')
    getData(pesquisa)
  })
}

ConfigurarBotaoPesquisar()