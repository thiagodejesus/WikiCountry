import {getData, paginacao} from './restCountries.js'

// Script para configurar os filtros da página 1

//Verifica se um parametro de região sendo passado no url
function pegaParametroRegionNoUrl(){
  const url = window.location.search

  const urlParametro = new URLSearchParams(url)
  const region = urlParametro.get('region')
  return region
}

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

async function verificaDadosFiltro2(search){
  let filtro2 = []
  const filtro2Container = document.querySelector('[data-filtro2-container]')
  const response = await fetch(`https://restcountries.eu/rest/v2/all`)
  const data = await response.json()


  filtro2 = []
  data.forEach((item)=> {
    let {name, region, capital, languages, callingCodes} = item

    // Pegando língua e código de ligação primários
    let language = languages[0]
    let callingCode = callingCodes[0]

    let pais = {name, region, capital, language, callingCode}
    filtro2.push(pais)
  })

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

  divEscolha.addEventListener('click', () => {
    filtro2Container.classList.remove("active")
    selected.classList.remove("hidden")
  })

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
        opcaoPesquisa = `https://restcountries.eu/rest/v2/capital/${opcao.toLowerCase()}`
        break
      case 'et':
        opcao = opt.language.name
        opcaoPesquisa = `https://restcountries.eu/rest/v2/lang/${opt.language.iso639_1}`
        break
      case 'name':
        opcao = opt.name
        opcaoPesquisa = `https://restcountries.eu/rest/v2/name/${opcao.toLowerCase()}`
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
      
      if (opcaoPesquisa == `https://restcountries.eu/rest/v2/region/${opcao.toLowerCase()}`){
        div.setAttribute(`data-${opcao}`,'')
      }

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

async function ConfigurarBotaoPesquisar() {
  const botaoPesquisar = document.querySelector('[data-pesquisar-resultado]')
  const buscaSelecionada = document.querySelector('[data-selected-filtro2]')
  botaoPesquisar.addEventListener('click', async () => {  
    const pesquisa = buscaSelecionada.id
    let data = await getData(pesquisa)
    paginacao(10, data)
  })
}

function atualizaRegiao(){
  const regiao = pegaParametroRegionNoUrl()
  if (regiao != null){
    document.querySelector('#region').click()
    setTimeout(() => {document.querySelector(`[data-${regiao}]`).click()}, 250)
    setTimeout(() => {document.querySelector(`[data-pesquisar-resultado]`).click()}, 250)
  }

}

function init(){
  adicionaListenerFiltro1()
  ConfigurarBotaoPesquisar()
  atualizaRegiao()
}

init()