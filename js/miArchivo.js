let acumulado = [];
let arrayL = [];
let llamado = document.getElementById("contenedor");
fetch("./BD.json") // llamo al archivo json
    .then((res) => res.json())

.then((data) => {
    data.forEach((prod) => {
        let contenedor = document.createElement("div");
        arrayL = [
            (contenedor.innerHTML = `<div class="fff">
<img class="card__img" src="${prod.img}" alt="">
<p> ${prod.producto} ${prod.tamanio} </p>
<p> $${prod.precio}</p>

<button class="btn_carrito" id="btn_carrito-${prod.id}">Agregar Carrito</button></div>`),
        ];

        llamado.append(contenedor);
    });
});

const mcarrito = document.getElementById("mcarrito")
mcarrito.onclick = mostrarTotal()

let btns = "";
setTimeout(() => {
    // hago un setTimeout para esperar que renderice el html
    btns = document.getElementsByClassName("btn_carrito"); //llamo a todos los botones con la clase btn_carrito
    for (const btn of btns) {
        //UN For Of, para recorrer todos los botones
        btn.onclick = agregarCarro; //Para agregar la funcion agregarCarro, al intereactuar con un click

    }
}, 2000);

function agregarCarro(e) {
    const btn = e.target;
    // console.log(btn)
    // console.log(btn.id)
    //   console.log(btn.id.split('-'))
    const id = btn.id.split("-")[1]; //Identifica el numero de ID de cada boton
    fetch("BD.json") // llamo al archivo json
        .then((res) => res.json())

    .then((data) => {
        const product = data.find((p) => p.id == id);

        // Aca quiero hacer un if en el array acumulado, si el producto esta en el carro hacer cantidad +1, sino push
        const busqueda = acumulado.find((el) => el.id == id)
        if (busqueda) {
            /* console.log(acumulado[acumulado.map(el => el.id).indexOf(id)].cantidad) */
            acumulado.forEach((prod) => {
                if (prod.id == id) {
                    prod.cantidad++;
                    Toastify({
                        text: "+1",
                        duration: 3000
                    }).showToast()
                }
            });
        } else {
            acumulado.push(product);
            Toastify({
                text: "Producto agregado!",
                duration: 3000
            }).showToast()
        }; //Lo envio al Array acumulado




        mostrarCarrito(acumulado);
        mostrarTotal()
        enviar = localStorage.setItem("acumulado", JSON.stringify(acumulado));
    });
}

function mostrarCarrito(e) {
    console.log("Compra finalizada");

    acumulado.forEach((prod) => {
        console.log(prod.id + " - " + prod.producto);
    });
    // bucle que recorre acumulado y retorna la funcion para renderizar producto seleccionado
    for (i = 0; i < acumulado.length; i++) {
        return renderA(e);
    }

    // variable total para acumular la suma de precios a traves del metodo reduce
    const total = acumulado.reduce((suma, prod) => suma + (prod.precio * prod.cantidad), 0);


    total === 0 ?
        Swal.fire({ text: "El carrito esta vacio", icon: "success" }) :
        console.log("Total: " + "\n" + total);
    contenedorB.innerHTML = "";


}

let llama = "";
//declaro variable que obtiene un id del codigo HTML
let llamadoB = document.getElementById("contenedorB");
let contenedorB = document.createElement("div");
contenedorB.className = "cB";
// ciclo con para renderizar elementos HTML del boton mostrar carrito

const renderA = (a) => {
    /* contenedorB.innerHTML=""; */
    contenedorB.innerHTML = "";
    //recorrer el array acumulado
    for (const prod of a) {
        let html = "";
        //declara este codigo HTML al hacer click
        html = `
      <div class="idP"><h3> ID: ${prod.id}</h3>
      <img class="imgP" src="${prod.img}" alt="">
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="btn_eliminar" id="eliminar-${prod.id}">Eliminar Producto</button>
      </div></div>
     `;
        contenedorB.innerHTML += html;
        llamadoB.appendChild(contenedorB);
    }

    llama = document.getElementsByClassName("btn_eliminar"); //llamo a todos los botones con la clase btn_carrito
    for (const b of llama) {
        //UN For Of, para recorrer todos los botones
        b.onclick = eliminarProduc;
    }



};

// Funcion mostrar total

function mostrarTotal() {

    const totalisimo = acumulado.reduce((suma, prod) => suma + (prod.precio * prod.cantidad), 0);
    let llamarTotal = document.getElementById("totalCarrito")

    llamarTotal.innerHTML = `<p>Total de su compra es $${totalisimo}</p>`

}

//FUNCION PARA DETECTAR LOS PRODCUTOS EN EL CARRO
function eliminarProduc(e) {
    const btn = e.target;
    const id = btn.id.split("-")[1];
    console.log("ID: " + id)

    acumulado.forEach((prod) => {
        if (prod.id == id) {
            if (prod.cantidad == 1) {
                let busqueda = acumulado.map(el => el.id).indexOf(prod.id)
                acumulado.splice(busqueda, 1)
            } else { prod.cantidad-- }
        }
        enviar = localStorage.setItem("acumulado", JSON.stringify(acumulado));
    })

    Toastify({
        text: "Producto eliminado!",
        duration: 3000
    }).showToast()

    mostrarTotal()
    mostrarCarrito(acumulado)

}

let llamador = document.getElementById("eliminar-2");


//EVENTO CUANDO CARGA LA PAGINA
window.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("acumulado"));
    renderA(cart);
    acumulado = cart
});

//VACIAR TODO EL CARRITO
let vaciarTodo = document.getElementById("eliminio");
vaciarTodo.addEventListener("click", () => {
    localStorage.clear();
    acumulado = []
    mostrarCarrito()
    mostrarTotal()
    Swal.fire({ text: "El carrito esta vacio", icon: "success" })
    console.log("Su carrito esta vacio");
    //REFRESCA LA PAGINA PARA QUE ACTUALICE
});