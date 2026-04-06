// crear las reseñas 

function crearResenas(reseñas) {
  const contenedor = document.createElement("div");
  contenedor.className = "resenas";

  if (reseñas.length === 0) {
    const sinResenas = document.createElement("p");
    sinResenas.className = "sin-resenas";
    sinResenas.textContent = "No hay reseñas para este producto.";
    contenedor.appendChild(sinResenas);
  } else {
    reseñas.forEach(function (r) {
      const item = document.createElement("div");
      item.className = "resena";

      const header = document.createElement("div");
      header.className = "resena-header";

      const usuario = document.createElement("span");
      usuario.className = "resena-usuario";
      usuario.textContent = r.usuario;

      const fecha = document.createElement("span");
      fecha.className = "resena-fecha";
      fecha.textContent = r.fecha;

      header.appendChild(usuario);
      header.appendChild(fecha);

      const texto = document.createElement("p");
      texto.className = "resena-texto";
      texto.textContent = "\"" + r.texto + "\"";

      item.appendChild(header);
      item.appendChild(texto);
      contenedor.appendChild(item);
    });
  }

  return contenedor;
}

// creo la card del producto

function crearProducto(producto) {
  const card = document.createElement("div");
  card.className = "producto";

  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;

  const nombre = document.createElement("h2");
  nombre.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("span");
  precio.className = "precio";
  precio.textContent = "$" + producto.precio.toFixed(2);

  const acciones = document.createElement("div");
  acciones.className = "producto-actions";

  const btnCarrito = document.createElement("button");
  btnCarrito.className = "btn-carrito";
  btnCarrito.textContent = "Agregar al Carrito";
  btnCarrito.addEventListener("click", function () {
    btnCarrito.textContent = "Agregado ";
    btnCarrito.disabled = true;
  });

  const btnResenas = document.createElement("button");
  btnResenas.className = "btn-resenas";
  btnResenas.textContent = "Mostrar Reseñas";

  const seccionResenas = crearResenas(producto.reseñas);

  btnResenas.addEventListener("click", function () {
    const visible = seccionResenas.classList.toggle("visible");
    btnResenas.classList.toggle("activo", visible);
    btnResenas.textContent = visible ? "Ocultar Reseñas" : "Mostrar Reseñas";
  });

  acciones.appendChild(btnCarrito);
  acciones.appendChild(btnResenas);

  card.appendChild(img);
  card.appendChild(nombre);
  card.appendChild(descripcion);
  card.appendChild(precio);
  card.appendChild(acciones);
  card.appendChild(seccionResenas);

  return card;
}

// render del catalogo
function renderizarCatalogo(productos) {
  const catalogo = document.getElementById("catalogo");
  productos.forEach(function (producto) {
    catalogo.appendChild(crearProducto(producto));
  });
}


// Cargo el jsaon con fetch

fetch("productos.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (productos) {
    renderizarCatalogo(productos);
  })
  .catch(function (error) {
    console.error("Error al cargar los productos:", error);
  });