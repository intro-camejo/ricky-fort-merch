
function agregarUnProducto(id, urlImagen, nombre, precio){
    let productos = document.getElementById("productos");

    let card = document.createElement("a");
    card.className = "card";
    card.id = id;
    card.href = `detalle.html?id=${id}`;

    let cardImagen = document.createElement("img");
    cardImagen.className = "card-img";
    cardImagen.src = urlImagen;

    let cardLinita = document.createElement("hr");

    let cardNombre = document.createElement("p");
    cardNombre.className = "card-name";
    cardNombre.innerText = nombre;

    let cardPrecio = document.createElement("p");
    cardPrecio.className = "card-price";
    cardPrecio.innerText = `Precio: $${precio}`;

    card.append(cardImagen, cardLinita, cardNombre, cardPrecio);

    productos.appendChild(card);
}

async function cargarProductos(){
    // 1. pedir informacion a la url de bilbo
    let data = await fetch("http://localhost:3000/products/");
    // 2. pasalo a json
    data = await data.json();
    // 3. cargarla en nuestra web
    let productos = data.results;
        productos.forEach(producto => {
            agregarUnProducto(producto.id, producto.image, producto.name, producto.price);
        });
}


const abrirModalDeCarga = () => {
    const dialog = document.getElementById("modalDeCarga");
    dialog.showModal();
}


const form = document.getElementById("formDeCarga");

const postProducto = async (event) => {
 const nombre = event.target.nombre.value
 const precio = event.target.precio.value
 const imagen = event.target.imagen.value

 mostrarLoader();
const data = await fetch("http://localhost:3000/products/", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body : JSON.stringify({ name : nombre, 
          price : precio,
         image : imagen })
  });
  const producto = await data.json()
 ocultarLoader();
  agregarUnProducto(producto.id, producto.image, producto.name, producto.price);
}


form.addEventListener("submit", postProducto);

const mostrarLoader = () => {
    const loader = document.getElementById("loader");
    loader.showModal();
}

const ocultarLoader = () => {
    const loader = document.getElementById("loader");
    loader.close();
}

cargarProductos();
