const textName = document.getElementById("name")
const textType = document.getElementById("type")
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const btDelete = document.getElementById("btDelete")
const btSave = document.getElementById("btSave")
const btCreate = document.getElementById("btCreate")
const img = document.getElementById("img")
const url = document.getElementById("url")

if (id == null) {
    btSave.style.display = 'none';
    btDelete.style.display = 'none';
} else {
    btCreate.style.display = 'none';
    getSerie()
}

async function getSerie() {
    try {
        const response = await fetch(`http://localhost:1337/api/series/${id}`);
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const serie = await response.json();
        printData(serie.data);
    } catch (error) {
        console.log(error)
    }

}

function printData(data) {
    console.log(data.attributes.name)
    textName.value = data.attributes.name
    textType.value = data.attributes.type
    img.src = data.attributes.image
    url.value = data.attributes.image
}

btSave.addEventListener("click", async () => {

    await saveData(getSerieObject(), true)
    goBack()
})

function getSerieObject() {
    const data = JSON.stringify({
        data: {
            name: textName.value,
            type: textType.value,
            image: url.value
        }
    })
    return data
}

btDelete.addEventListener("click", async () => {
    await deleteSerie()
    goBack()
})

async function deleteSerie() {
    try {
        const response = await fetch(`http://localhost:1337/api/series/${id}`, {
            method: "DELETE",
            headers: {

            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

btCreate.addEventListener("click", async () => {

    await saveData(getSerieObject(), false)
    goBack()
})

async function saveData(serie, isUpdating) {
    let requestUrl
    let method

    if (isUpdating) {
        requestUrl = `http://localhost:1337/api/series/${id}`
        method = "PUT"
    } else {
        method = "POST"
        requestUrl = `http://localhost:1337/api/series`
    }

    try {
        const response = await fetch(requestUrl, {
            method: method,
            body: serie, headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

function goBack() {
    window.location.href = "list.html"
}