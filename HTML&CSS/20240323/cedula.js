const formulario = document.querySelector("#formulario-cedula");
formulario.addEventListener('submit', (e) => ProcesarFormulario(e));

function ProcesarFormulario(evento) {
    evento.preventDefault();

    const numero = document.querySelector("#numero").value;

    if(EsNuloVacioIndefinido(numero)) {
        Mensaje("Debe indicar un número","error");
        return;
    }

    if(EsNoNumerico(numero)) {
        Mensaje("El valor debe ser númerico","error");
        return;
    }

    if(numero.length != 10) {
        Mensaje("El número debe contener 10 dígitos","error");
        return;
    }

    const digito_verificador = ObtenerDigito(numero);
    Mensaje(`El dígito verificador para el número indicado es: ${digito_verificador}`,"exito");
    
}

const Mensaje = (texto,tipo) => {
    const espacio_mensaje = document.querySelector(".espacio-mensajes");
    
    const caja = document.createElement("div");
    const span = document.createElement("span");
    const contenido = document.createElement("p");

    contenido.innerHTML= texto;
    contenido.classList.add("cuerpo-mensaje");
    
    span.innerHTML = 'X';
    span.classList.add("cierre-mensaje");
    span.addEventListener('click',(e) => e.target.parentElement.remove());

    caja.classList.add("caja-mensaje");
    caja.classList.add(tipo);
    caja.append(span);
    caja.append(contenido);

    espacio_mensaje.append(caja);
}

const EsNuloVacioIndefinido = (numero) => { return numero == null || numero == "" || numero == undefined };
const EsNoNumerico = (numero) => { return /[^0-9]/.test(numero) };


const ObtenerDigito = (numero) => {
    const lista_digitos = Array.from(numero);
    const suma_impares = parseInt(lista_digitos[0]) + parseInt(lista_digitos[2]) + parseInt(lista_digitos[4]) + parseInt(lista_digitos[6]) + parseInt(lista_digitos[8]);
    const suma_pares = ValorDigitoPar(lista_digitos[1]) + ValorDigitoPar(lista_digitos[3]) + ValorDigitoPar(lista_digitos[5]) + ValorDigitoPar(lista_digitos[7]) + ValorDigitoPar(lista_digitos[9]);
    const total_pares_impares = suma_impares + suma_pares;
    const modulo_10 = total_pares_impares % 10;
    const numero_final = (modulo_10 == 0) ? 0 : 10 - modulo_10;
    return numero_final;

}

const ValorDigitoPar = (digito) => { return (parseInt(digito) * 2 >= 10) ? (parseInt(digito) * 2) - 9 : (parseInt(digito) * 2) }