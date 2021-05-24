function pegaParametroNameNoUrl(){
    const url = window.location.search

    const urlParametro = new URLSearchParams(url)
    const paisSelecionado = urlParametro.get('name')
    return paisSelecionado
}

async function getPais(paisSelecionado){
    const url = `https://restcountries.eu/rest/v2/name/${paisSelecionado}`
    const response = await fetch(url)
    const data = await response.json()
    return data[0]
}

async function pegaInformacoesSobreOPais()
{
    const paisSelecionado = pegaParametroNameNoUrl()
    const pais = await getPais(paisSelecionado)
    const {name, capital, region, subregion , population, languages, flag} = pais
    const language = languages[0].nativeName
    return {name:name, 
        capital:capital,
        region:region,
        subregion: subregion,
        population:population,
        language:language,
        flag:flag
    }
}

async function atualizaPaginaParaOPaisSelecionado() {
    const pais = await pegaInformacoesSobreOPais()

    const flagElement = document.querySelector('[data-flag-pais-selecionado]')
    flagElement.src = pais.flag
    flagElement.alt = `Bandeira do país: ${pais.name}`

    const nomeElement = document.querySelector('[data-pais-nome]')
    nomeElement.innerHTML += pais.name

    const capitalElement = document.querySelector('[data-pais-capital]')
    capitalElement.innerHTML += pais.capital

    const regiaoElement = document.querySelector('[data-pais-regiao]')
    regiaoElement.innerHTML += pais.region

    const subRegiaoElement = document.querySelector('[data-pais-sub-regiao]')
    subRegiaoElement.innerHTML += pais.subregion

    const populacaoElement = document.querySelector('[data-pais-populacao]')
    populacaoElement.innerHTML += pais.population

    const linguaElement = document.querySelector('[data-pais-lingua]')
    linguaElement.innerHTML += pais.language
}

atualizaPaginaParaOPaisSelecionado()