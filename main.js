const Calculo = function (proyecto, nombreMadera, pieza, cantidad, largo, ancho, grosor, pies) {
    this.proyecto = proyecto;
    this.nombreMadera = nombreMadera;
    this.pieza = pieza;
    this.cantidad = cantidad;
    this.largo = largo;
    this.ancho = ancho;
    this.grosor = grosor;
    this.pies = pies;
}

let calculos = JSON.parse(localStorage.getItem("dataCalculo")) || [];

let calculo;

btnCalcular = document.getElementById ("btnCalcular").addEventListener("click", ()=> {
event.preventDefault();
let proyecto = document.getElementById ("Proyecto").value.toUpperCase().trim();
let nombreMadera = document.getElementById ("Madera").value.toUpperCase().trim();
let pieza = document.getElementById ("Pieza").value.toUpperCase().trim();
let cantidad = parseInt(document.getElementById("Cantidad").value);
let largo = parseInt(document.getElementById ("Largo").value);
let ancho = parseInt(document.getElementById ("Ancho").value);
let grosor = parseInt(document.getElementById ("Grosor").value);
let pies = parseInt((cantidad * (largo/30) * (ancho/2.54) * (grosor/30)).toFixed(2));
let resultado = document.getElementById("Pies").value = pies;

calculo = new Calculo (proyecto, nombreMadera, pieza, cantidad, largo, ancho, grosor, pies);

if(proyecto!==null && nombreMadera!==null && pieza!==null && proyecto!=="" && nombreMadera!=="" && pieza!=="" && !isNaN(cantidad) && !isNaN(largo) && !isNaN(ancho) && !isNaN(grosor)){
    calculos.push(calculo);
    console.table (calculos);
    agregarFila()
} else {
    
// Sweet Alert Warning
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

Toast.fire({
    icon: 'warning',
    title: 'Por favor, completá todos los campos e ingresá valores válidos.'
})}
})

let cuerpoTabla = document.getElementById ("cuerpoTabla");

function agregarFila() {
    let contenidoFila = '<td>' + calculo.proyecto + '</td>' + '<td>' + calculo.nombreMadera + '</td>' + '<td>' + calculo.pieza + '</td>'+ '<td>' + calculo.pies + '</td>';
    let crearFila = document.createElement("tr");
    crearFila.innerHTML = contenidoFila;
    cuerpoTabla.appendChild(crearFila);
}

// Almacenar y Borrar Calculos

function almacenarCalculo() {
    let calculosJSON = JSON.stringify(calculos);
    localStorage.setItem("dataCalculo", calculosJSON);
}

let btnGuardar = document.getElementById("btnGuardar").addEventListener("click", ()=> {
    let filas = cuerpoTabla.childNodes;
    if (filas.length>1) {
    almacenarCalculo()
    
    // Sweet Alert Success

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Resumen guardado'
    })}
});

let btnBorrar = document.getElementById("btnBorrar").addEventListener("click", () => {

    Swal.fire({
        text: '¿Estás seguro de borrar todos los calculos guardados?',
        showCancelButton: true,
        confirmButtonColor: '#d5bdaf',
        cancelButtonColor: '#d5bdaf',
        confirmButtonText: 'Si!',
        cancelButtonText:'No!',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear("dataCalculo");
            resultadoBusqueda.textContent = "";
            Swal.fire({
            text:'Calculos Borrados!',
            timer:1400,
            showConfirmButton:false,
        })
        }
    })
})

// Buscar Maderas

let btnBuscar = document.getElementById ("btnBuscar").addEventListener("click", ()=> {
    let maderaBuscada = document.getElementById("maderaBuscada").value.toUpperCase();
    let sumaPies = 0;
    // let resultadoBusqueda = document.getElementById("resultadoBusqueda");

    let maderaEncontrada = calculos.filter((i) => i.nombreMadera == maderaBuscada);

    if (localStorage.getItem("dataCalculo") === null || maderaBuscada == null || maderaBuscada == "" ) { 
        const Toast3 = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: false,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast3.fire({
            icon: 'warning',
            title: 'Por favor, guardá la información e/o ingresá el nombre de la madera buscada.'
        })
        }
    
    else {maderaEncontrada.forEach((madera)=>{
        sumaPies += madera.pies;
        resultadoBusqueda(maderaBuscada,sumaPies)})}
    })
            
function resultadoBusqueda(maderaBuscada,sumaPies) {
    let resultadoBusqueda = document.getElementById("resultadoBusqueda");
    resultadoBusqueda.innerHTML = `En total necesitás ${sumaPies} pies de ${maderaBuscada}.`;
};

function errorBusqueda (maderaBuscada) {
    let resultadoBusqueda = document.getElementById("resultadoBusqueda");
    resultadoBusqueda.innerHTML = `No se ha encontrado la madera ${maderaBuscada}`;
}

// Lista Desplegable Maderas

const documento = document;

documento.addEventListener("DOMContentLoad",listaDesplegable())

function listaDesplegable () {
    fetch("maderas.json")
    .then((response) => response.json())
    .then(info => {
        const maderas = info.maderas;

        const select = document.getElementById("Madera");

        maderas.forEach(madera => {
            const crearOption = document.createElement("option");
            crearOption.value = madera.nombre;
            crearOption.text = madera.nombre;
            select.appendChild(crearOption);
        });      
    })
    .catch(error => {
        
    // Sweet Alert Error

    const Toast2 = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast2.fire({
        icon: 'error',
        title: 'Error en la carga de la lista de maderas.'
    }) 
    })}