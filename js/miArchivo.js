let acumulado = [];
let arrayL = [];
let llamado = document.getElementById("contenedor");
fetch("BD.json") // llamo al archivo json
    .then((res) => res.json())

.then((data) => {
    data.forEach((prod) => {
        let contenedor = document.createElement("div");
        arrayL = [
            (contenedor.innerHTML = `<div class="fff"><h3> ID: ${prod.id}</h3>
<img class="card__img" src="${prod.img}" alt="">
<p>Producto: ${prod.producto}</p>
<p>Tamanio: ${prod.tamanio}</p>
<p>Precio: $ ${prod.precio}</p>
<button class="btn_carrito" id="btn_carrito-${prod.id}">Agregar Carrito</button></div>`),
        ];

        llamado.append(contenedor);
    });
});

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
    console.log(id)
    fetch("BD.json") // llamo al archivo json
        .then((res) => res.json())

    .then((data) => {
        const product = data.find((p) => p.id == id);

        // Aca quiero hacer un if en el array acumulado, si el producto esta en el carro hacer cantidad +1, sino push
        const busqueda = acumulado.find((el) => el.id == id)
        if (busqueda) {
            /* console.log(acumulado[acumulado.map(el => el.id).indexOf(id)].cantidad) */
            acumulado.forEach((prod) => {
                if (prod.id == id) { prod.cantidad++ }
            });
        } else { acumulado.push(product) }; //Lo envio al Array acumulado



        mostrarCarrito(acumulado);
        enviar = localStorage.setItem("acumulado", JSON.stringify(acumulado));
    });
}

// // boton eliminar
// let biri2 = document.getElementById("ep");
// biri2.innerHTML = "<button>Eliminar Producto</button>";
// biri2.onclick = () => {
//   if (acumulado != 0) {
//     Swal.fire({
//       title: "Esta seguro que desea eliminar el producto?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Eliminar",
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // eliminarelemento();
//         /*         localStorage.clear(); //ojo aca
//          */ mostrarCarrito(acumulado);
//         Swal.fire({
//           title: "Producto Eliminado",
//           icon: "succes",
//           text: "El archivo ha sido eliminado",
//         });
//       }
//     });
//   }
// };
/* // Vaciar carrito
let biri3 = document.getElementById("eliminio");
biri3.innerHTML = ";
biri3.onclick = () => {
  if (acumulado != 0) {
    Swal.fire({
      title: "Desea eliminar todos los articulos de su carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vaciar Carrito",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // eliminarTodo(acumulado);
        // localStorage.clear();
      }
      mostrarCarrito(acumulado);
      Swal.fire({
        tile: "Carrito Vacio",
        icon: "succes",
        text: "Su carrito esta Vacio",
      });
    });
  }
};
 */
/* renderP(arrayLista);
 */

// intento obtener los datos del local para usarlos en la funcion y utilizar la variable "pedirDatos" en reemplazo al array "acumulado"

function mostrarCarrito(e) {
    console.log("Compra finalizada");

    acumulado.forEach((prod) => {
        console.log(prod.id + " - " + prod.producto);
    });
    // local
    // bucle que recorre acumulado y retorna la funcion para renderizar producto seleccionado
    for (i = 0; i < acumulado.length; i++) {
        return renderA(e);
    }

    // variable total para acumular la suma de precios a traves del metodo reduce
    const total = acumulado.reduce((suma, prod) => suma + prod.precio, 0);
    /* localStorage.setItem ("acumule", JSON.stringify(acumulado)); */

    total === 0 ?
        Swal.fire({ text: "El carrito esta vacio", icon: "error" }) :
        console.log("Total: " + "\n" + total);
    contenedorB.innerHTML = "";

    // renderA(e);
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
      <p>Producto: ${prod.producto}</p>
      <p>Tamanio: ${prod.tamanio}</p>
      <p>Precio: $ ${prod.precio}</p>
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="btn_eliminar" id="eliminar-${prod.id}">Eliminardo</button></div>
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
//FUNCION PARA DETECTAR LOS PRODCUTOS EN EL CARRO
function eliminarProduc(e) {
    const btn = e.target;
    const id = btn.id.split("-")[1];
    console.log("ID: " + id)


    /*   let busqueda = acumulado.map(el=> el.id).indexOf(e.target.id)
      acumulado.splice(busqueda, 1) */

    // Esto deberia hacerse con id == id y no un if por cada productor
    acumulado.forEach((prod) => {
        if (prod.id == id) {
            if (prod.cantidad == 1) {
                let busqueda = acumulado.map(el => el.id).indexOf(prod.id)
                acumulado.splice(busqueda, 1)
                console.log("BUSQ " + busqueda)
            } else { prod.cantidad-- }
        }
        enviar = localStorage.setItem("acumulado", JSON.stringify(acumulado));
    })


    /*     if (e.target.id === "eliminar-1") {
            let busqueda = acumulado.map(el => el.producto).indexOf("Detergente Revigal")
            acumulado.splice(busqueda, 1)
        } else if (e.target.id === "eliminar-2") {
            let busqueda = acumulado.map(el => el.producto).indexOf("Cera Revigal")
            acumulado.splice(busqueda, 1)
        } else if (e.target.id === "eliminar-3") {
            let busqueda = acumulado.map(el => el.producto).indexOf("Autopolish")
            acumulado.splice(busqueda, 1)
        } else if (e.target.id === "eliminar-4") {
            let busqueda = acumulado.map(el => el.producto).indexOf("Renovador Revigal")
            acumulado.splice(busqueda, 1) */
    /* } else if (acumulado.length == 0) { contenedorB.innerHTML = ""; } */


    //  BUSCAR METODO ARRAY PARA ELIMINAR UN PRODUCTO
    /*   const iu = acumulado.find((el) => el.producto==="Autopolish");
    const iuda =acumulado.indexOf(iu)
    console.log(iuda)
    acumulado.splice(iuda,1) */
    mostrarCarrito(acumulado)
}

let llamador = document.getElementById("eliminar-2");
/* llamador.onclick(()=>alert("hola"))
 */
// function eliminarelemento() {
//   acumulado.pop();
//   acumulado.length === 0
//     ? Swal.fire({ text: "El carrito esta vacio", icon: "error" })
//     : acumulado.forEach((prod) => {
//         console.log(
//           "Producto eliminado" + "\n" + prod.id + " - " + prod.producto
//         );
//       });
// }

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
    Swal.fire({ text: "Se vacio su carrito", icon: "error" });
    console.log("Su carrito esta vacio");
    location.reload(); //REFRESCA LA PAGINA PARA QUE ACTUALICE
});