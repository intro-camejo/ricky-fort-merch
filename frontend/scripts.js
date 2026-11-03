
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

    // card.appendChild(cardImagen);
    // card.appendChild(cardLinita);
    // card.appendChild(cardNombre);
    // card.appendChild(cardPrecio);
    card.append(cardImagen, cardLinita, cardNombre, cardPrecio);

    productos.appendChild(card);
}

async function cargarProductos(){
    // 1. pedir informacion a la url de bilbo
    let data = await fetch("https://intro.bilbao.ar/products/");
    // 2. pasalo a json
    data = await data.json();
    // 3. cargarla en nuestra web
    let productos = data.results;
        productos.forEach(producto => {
            agregarUnProducto(producto.id, producto.image, producto.name, producto.price);
        });
}

cargarProductos();
