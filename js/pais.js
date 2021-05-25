import {paginacao} from "./restCountries.js"

function pegaParametroNameNoUrl(){
    const url = window.location.search

    const urlParametro = new URLSearchParams(url)
    const paisSelecionado = urlParametro.get('code')
    return paisSelecionado
}

async function getPais(paisSelecionado){
    const url = `https://restcountries.eu/rest/v2/alpha?codes=${paisSelecionado}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function pegaInformacoesSobreOPais()
{
    const paisSelecionado = pegaParametroNameNoUrl()
    let data = await getPais(paisSelecionado)
    let pais = data[0]
    const {name, capital, region, subregion , population, languages, flag} = pais
    const language = languages[0].nativeName
    return {name:name, 
        capital: capital,
        region: region,
        subregion: subregion,
        population: population,
        language: language,
        flag: flag,
        border: data.slice(1)
    }
}

async function atualizaPaginaParaOPaisSelecionado() {
    const pais = await pegaInformacoesSobreOPais()

    const title = document.querySelector('title')
    title.innerText = pais.name

    const favicon = document.querySelector('#favicon')
    favicon.href = pais.flag

    const flagElement = document.querySelector('[data-flag-pais-selecionado]')
    flagElement.src = pais.flag
    flagElement.alt = `Bandeira do país: ${pais.name}`

    const nomeElement = document.querySelector('[data-pais-nome]')
    nomeElement.innerHTML += pais.name

    const capitalElement = document.querySelector('[data-pais-capital]')
    capitalElement.innerHTML += pais.capital

    const regiaoElement = document.querySelector('[data-pais-regiao]')
    regiaoElement.innerHTML += `<a href="../index.html?region=${pais.region.toLowerCase()}">${pais.region}</a>`

    const subRegiaoElement = document.querySelector('[data-pais-sub-regiao]')
    subRegiaoElement.innerHTML += pais.subregion

    const populacaoElement = document.querySelector('[data-pais-populacao]')
    populacaoElement.innerHTML += pais.population

    const linguaElement = document.querySelector('[data-pais-lingua]')
    linguaElement.innerHTML += pais.language
    if (pais.border.length > 0){
        criaPaisesBordas(pais.border)
    } else {
        const h2 = document.createElement('h2')
        h2.innerText = "Esse país não faz fronteira com nenhum outro pois é uma ilha."
        h2.style.margin = 'auto'
        document.querySelector('[data-lista-paises]').appendChild(h2)
    }
}

function criaPaisesBordas(bordas){
    const data = bordas
    paginacao(12, data)
}



atualizaPaginaParaOPaisSelecionado()