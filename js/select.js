let selected = document.querySelector("[data-selected-filtro1]");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
  selected.classList.toggle("hidden")
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = `<p>${o.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
    optionsContainer.classList.remove("active");
    selected.classList.remove("hidden")
    verificaDadosFiltro2(o.id)
  });
});

let filtro2 = []
export default async function verificaDadosFiltro2(search){
  const response = await fetch(`https://restcountries.eu/rest/v2/all`)
  const data = await response.json()
  console.log(data)
  switch (search){
    case 'region':
      filtro2 = []
      data.forEach((item)=> {
        let {region} = item
    
        if (filtro2.indexOf(region) == -1) {
          filtro2.push(region)
        }
      })
      break

    case 'capital':
      filtro2 = []
      data.forEach((item)=> {
        let {capital} = item

        filtro2.push(capital)
      })
      break

    case 'et':
      filtro2 = []
      data.forEach((item)=> {
        let {languages} = item
        if (filtro2.indexOf(languages[0].name) == -1) {
          filtro2.push(languages[0].name)
        }
      })
      break
    
    case 'name':
      filtro2 = []
      data.forEach((item)=> {
        let {name} = item

        filtro2.push(name)
      })
      break

    case 'callingcode':
      filtro2 = []
      data.forEach((item)=> {
        let {callingCodes} = item
        if (filtro2.indexOf(callingCodes[0]) == -1) {
          filtro2.push(callingCodes[0])
        }
      })
      break
  }
  criaOptions(filtro2)
}

function criaOptions(lista){
  selected = document.querySelector('[data-selected-filtro2]')
  document.querySelector('[data-filtro2]').classList.remove('hidden')
  const filtro2Container = document.querySelector('[data-filtro2-container]')
  let divEscolha = document.createElement('div')
  divEscolha.classList.add('option')
  divEscolha.id = 'escolha'
  let labelEscolha = document.createElement('label')
  labelEscolha.innerText = 'Escolha uma opção'
  divEscolha.appendChild(labelEscolha)
  filtro2Container.appendChild(divEscolha)

  selected.addEventListener("click", () => {
    filtro2Container.classList.toggle("active");
    selected.classList.toggle("hidden")
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