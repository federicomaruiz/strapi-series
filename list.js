const form = document.getElementById('form')
const btClear = document.getElementById('clear')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const busqueda = document.getElementById('busqueda')

    search(busqueda.value)
})

btClear.addEventListener("click", () => {

    const busqueda = document.getElementById('busqueda')
    busqueda.value = ""
    printData(seriesTemporal)
})

async function search(busqueda) {
    try {
        let response = await fetch(`http://localhost:1337/api/series`);

        if (busqueda != "") {
            response = await fetch(`http://localhost:1337/api/series?filters[name][$containsi]=${busqueda}`);
        }

        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const series = await response.json();

        if (busqueda == "") {
            seriesTemporal = series.data
        }

        printData(series.data);
        console.log(series.data)
    } catch (error) {
        console.log(error)
    }
}

function printData(data) {
    const lista = document.getElementById("lista")
    lista.innerHTML = ""
    for (const serie of data) {
        const a = document.createElement("a")
        const img = document.createElement("img")
        const pName = document.createElement("p")
        const pType = document.createElement("p")

        const name = serie.attributes.name
        const type = serie.attributes.type
        const image = serie.attributes.image

        img.src = image

        pName.textContent = name
        pType.textContent = type

        a.href = `detail.html?id=${serie.id}`

        if (image != null) {
            lista.appendChild(img)
        }
        a.appendChild(pName)
        a.appendChild(pType)



        lista.appendChild(a)
    }
}
search("")