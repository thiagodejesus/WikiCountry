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

  switch (search){

    case 'region':
      filtro2 = []
      apagaFilhos(filtro2Container)
      data.forEach((item)=> {
        let {region} = item
    
        if (filtro2.indexOf(region) == -1) {
          filtro2.push(region)
        }
      })
      criaOptions(filtro2)
      break

    case 'capital':
      filtro2 = []
      apagaFilhos(filtro2Container)
      data.forEach((item)=> {
        let {capital} = item

        filtro2.push(capital)
      })
      criaOptions(filtro2)
      break

    case 'et':
      filtro2 = []
      apagaFilhos(filtro2Container)
      data.forEach((item)=> {
        let {languages} = item
        if (filtro2.indexOf(languages[0].name) == -1) {
          filtro2.push(languages[0].name)
        }
      })
      criaOptions(filtro2)
      break
    
    case 'name':
      filtro2 = []
      apagaFilhos(filtro2Container)
      data.forEach((item)=> {
        let {name} = item

        filtro2.push(name)
      })
      criaOptions(filtro2)
      break

    case 'callingcode':
      filtro2 = []
      apagaFilhos(filtro2Container)
      data.forEach((item)=> {
        let {callingCodes} = item
        if (filtro2.indexOf(callingCodes[0]) == -1) {
          filtro2.push(callingCodes[0])
        }
      })
      criaOptions(filtro2)
      break

    case 'escolha':
      filtro2 = []
      apagaFilhos(filtro2Container)

  }

  
}

function criaOptions(lista){
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

  lista.forEach((opt) => {
    const div = document.createElement('div')
    div.classList.add('option')
    div.id = opt

    const label = document.createElement('label')
    label.innerText = opt

    div.appendChild(label)
    filtro2Container.appendChild(div)
    
    div.addEventListener("click", () => {
      selected.innerHTML = `<p>${div.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
      filtro2Container.classList.remove("active");
      selected.classList.remove("hidden")
    });
    
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