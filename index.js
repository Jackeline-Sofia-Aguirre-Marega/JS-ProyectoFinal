
/*
class Producto{
    constructor(id, nombre, precio, descripcion, cantidad){
        this.id= id;
        this.nombre= nombre;
        this.precio= precio;
        this.descripcion= descripcion;
        this.cantidad= cantidad;
    }
};

const producto1= new Producto(1, "mesa", 200000, "mesa ratona lapacho", 5);
const producto2= new Producto(2, "banco", 150000, "banco de lapacho", 3);
const producto3= new Producto(3, "sillas", 250000, "sillas de paraiso", 5);
*/

//ARRAY DE MERCADERIA//

const pedirInfo = async () => {
    const res = await fetch("./data.json");
    const data = await res.json();
    const mercaderia = await data;


//Localstorage//

const convertirJson= JSON.stringify(mercaderia);
console.log(convertirJson);

localStorage.setItem("mercaderia", convertirJson);

// RECUPERACION LOCALSTORAGE //

const recuperacion= JSON.parse(localStorage.getItem("mercaderia"));

// EVENTOS //

const bloqueProductos= document.querySelector(".bloqueProductos");

mercaderia.forEach((producto) => {
    const divproducto= document.createElement("div");
    divproducto.classList.add('card');
    divproducto.innerHTML= `
    
    
    <div class="cardBloque">
        <div class="card-body">
            <img src="img/${producto.img}.jpg" class="card-img-top img-fluid py-3">
            <h3 class="card-title"> ${producto.nombre} </h3>
            <p class="card-text"> ${producto.descripcion} </p>
            <p class="card-text"> $${producto.precio} </p>
            <button id="boton${producto.id}" class="btn btn-dark"> Agregar al carrito </button>  
        </div>
    </div>
    `;

    bloqueProductos.appendChild(divproducto);

    const agregar= document.getElementById(`boton${producto.id}`);
    agregar.addEventListener("click", ()=>{
        AgregarAlCarrito(producto.id);
    });
});

const carrito = [];

const AgregarAlCarrito = (id) => {
    const producto = mercaderia.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
            color: "white"
        },
        onClick: function(){} // Callback after click
    }).showToast();
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        carrito.push(producto);
    }
    actualizarCarrito();
}; 

const contenedorCarrito = document.querySelector("#carrito");

function actualizarCarrito(){
    let aux = '';
    carrito.forEach((producto) => {
        aux += `
        <div class="cardList">
            <div>
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-text">$${producto.precio}</p>
                <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-danger"> Eliminar </button>
            </div>
        </div>
        `;
    });
    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
    sumarCompra();
};

eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto)=> producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#C41919",
            color: "white"
        },
        onClick: function(){} // Callback after click
    }).showToast();
    actualizarCarrito();
};

const totalCompra = document.querySelector("#totalCompra"); 

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.cantidad;
    })
    totalCompra.innerHTML = total;
}

const SelecComprar = document.querySelector("#comprar");
const comprarBoton = document.querySelector("div");
comprarBoton.innerHTML = `
<button class="btn btn-primary">Comprar</button>
`;
SelecComprar.appendChild(comprarBoton);

comprarBoton.addEventListener("click", () => {
    Swal.fire({
        title: 'Querés realizar la compra?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Quiero comprar!'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Comprado!',
            'Su compra fue realizada con éxito',
            'success'
        )
        }
    });
    carrito.splice(0, carrito.length);
    actualizarCarrito();
});

const ValorTotalCompra = document.querySelector("#ValorTotal");

const sumarCompra = () =>{
    let ValorTotal = 0;
    carrito.forEach((producto) =>{
        ValorTotal += producto.precio * producto.cantidad;
    });
    ValorTotalCompra.innerHTML = ValorTotal;
}


}
pedirInfo();

