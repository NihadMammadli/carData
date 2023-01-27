window.addEventListener('load', getData)
let datas = [];
let editRow;

const initialVal = { name: '', model: '', description: '' }
const carName = document.querySelector('#carName')
const carModel = document.querySelector('#carModel')
const carDesc = document.querySelector('#carDesc')
const carNameEdit = document.querySelector('#carNameEdit')
const carModelEdit = document.querySelector('#carModelEdit')
const carDescEdit = document.querySelector('#carDescEdit')
const tbody = document.querySelector('tbody')
const addNewItem = document.querySelector('#addNewItem')
const editSaveItem = document.querySelector('#editSaveItem')

function getData() {
    fetch('https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars')
        .then(response => response.json())
        .then(data => {
            datas = data
            let list = datas.map((data, i) =>
                `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${data.name}</td>
                    <td>${data.model}</td>
                    <td>${data.description}</td>
                    <td onclick=editItem(${data.id}) data-bs-toggle="modal" data-bs-target="#editModal"> <i class="fa-solid fa-pen-to-square"></i></td>
                    <td onclick=deleteItem(${data.id})><i class="fa-solid fa-delete-left"></i></td>
                    <td>${data.status ? 'Aktiv' : 'Deaktiv'}</td>
                    <td onclick=statusChange(${data.id})>${data.status ? 'Deaktiv et' : 'Aktiv et'}</td>
                </tr>
                `
            ).join(' ')
            tbody.innerHTML = list
        })
}



function statusChange(id) {
    editRow = datas.filter(data => data.id == id)
    if (editRow[0].status) {
        editRow[0].status = false
    } else {
        editRow[0].status = true
    }
    console.log(editRow[0])
    fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editRow[0])
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })

}



function deleteItem(id) {
    fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, { method: 'DELETE' })
        .then(() => window.location.reload());
}



addNewItem.addEventListener('click', createNewItem)



function createNewItem() {
    if (initialVal.name.length !== 0 && initialVal.model.length !== 0 && initialVal.description.length !== 0) {
        fetch('https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(initialVal)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response),
                    window.location.reload()
            })
    }
}

carName.addEventListener('keyup', function (e) {
    initialVal.name = e.target.value
    initialVal.model = initialVal.model
    initialVal.description = initialVal.description
})

carModel.addEventListener('keyup', function (e) {
    initialVal.name = initialVal.name
    initialVal.model = e.target.value
    initialVal.description = initialVal.description
})

carDesc.addEventListener('keyup', function (e) {
    initialVal.name = initialVal.name
    initialVal.model = initialVal.model
    initialVal.description = e.target.value
})



function editItem(id) {
    console.log(id)
    editRow = datas.filter(data => data.id == id)
    carNameEdit.value = editRow[0].name
    carModelEdit.value = editRow[0].model
    carDescEdit.value = editRow[0].description
    editSaveItem.addEventListener('click', function () {
        if (editRow[0].name.length !== 0 && editRow[0].model.length !== 0 && editRow[0].description.length !== 0) {
            fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editRow[0])
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response),
                        window.location.reload()
                })
        }
    })
}

carNameEdit.addEventListener('keyup', function (e) {
    editRow[0].name = e.target.value
    console.log(editRow)
})

carModelEdit.addEventListener('keyup', function (e) {
    editRow[0].model = e.target.value
    console.log(editRow)
})

carDescEdit.addEventListener('keyup', function (e) {
    editRow[0].description = e.target.value
    console.log(editRow[0])
})
