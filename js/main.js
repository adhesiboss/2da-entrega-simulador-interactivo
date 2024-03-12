// Array para almacenar los usuarios
let usuarios = [];

// Función para agregar un usuario al array
function agregarUsuario(nombre, apellido, monto, cuotas, primerMes) {
    usuarios.push({ nombre, apellido, monto, cuotas, primerMes });
}

// Función para calcular el pago mensual en cuotas para un usuario específico
function calcularPagoCuotasUsuario(usuario) {
    let { monto, cuotas } = usuario;
    // Verificar que el número de cuotas sea válido
    if (cuotas <= 0 || cuotas % 1 !== 0) {
        return "El número de cuotas debe ser un entero positivo.";
    }

    // Calcular el pago mensual aproximado
    let pagoMensual = Math.ceil(monto / cuotas);

    // Verificar si el pago mensual es menor que el monto prestado
    if (pagoMensual * cuotas < monto) {
        let intereses = monto - (pagoMensual * cuotas);
        pagoMensual += intereses / cuotas;
    }

    return pagoMensual;
}

// Función para mostrar el plan de pagos para un usuario específico
function mostrarPlanPagosUsuario(usuario) {
    let { nombre, apellido, monto, cuotas, primerMes } = usuario;
    // Calcular el pago mensual
    let pagoMensual = calcularPagoCuotasUsuario(usuario);

    // Calcular intereses adicionales
    let intereses = monto - (pagoMensual * cuotas);

    // Meses del año
    let meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    // Mostrar el plan de pagos
    let planPagos = `Plan de pagos para ${nombre} ${apellido}:\n`;
    let mesActual = meses.indexOf(primerMes.toLowerCase());
    for (let i = 1; i <= cuotas; i++) {
        let cuota = pagoMensual;
        if (i === cuotas) {
            cuota += intereses;
        }
        planPagos += `Cuota ${i}: ${meses[mesActual % 12]} - $${cuota.toFixed(2)}\n`;
        mesActual++;
    }

    return planPagos;
}

// Obtener el número de usuarios que se desea agregar
let numUsuarios = Number(prompt("Ingrese el número de usuarios que desea agregar:"));

// Agregar cada usuario
for (let i = 0; i < numUsuarios; i++) {
    let nombreUsuario = prompt(`Ingrese el nombre del usuario ${i + 1}:`);
    let apellidoUsuario = prompt(`Ingrese el apellido del usuario ${i + 1}:`);
    let montoPrestamo;
    do {
        montoPrestamo = prompt(`Ingrese el monto del préstamo para ${nombreUsuario} ${apellidoUsuario} ($):`);
        montoPrestamo = parseFloat(montoPrestamo); // Convertir a número decimal
    } while (isNaN(montoPrestamo) || montoPrestamo <= 0); // Repetir si no es un número válido o es negativo

    let numeroCuotas;
    do {
        numeroCuotas = Number(prompt(`Ingrese el número de cuotas para ${nombreUsuario} ${apellidoUsuario} (Máximo 36 cuotas):`));
        if (numeroCuotas > 36) {
            alert("El número de cuotas no puede ser mayor a 36. Por favor, ingrese un número válido.");
        }
    } while (isNaN(numeroCuotas) || numeroCuotas <= 0 || numeroCuotas > 36); // Repetir si no es un número válido, es negativo o supera el límite

    
    let primerMes;
    do {
        primerMes = prompt(`Ingrese el mes inicial para ${nombreUsuario} ${apellidoUsuario} (Ejemplo: Enero, Febrero, etc.):`);
    } while (!isNaN(primerMes));

    agregarUsuario(nombreUsuario, apellidoUsuario, montoPrestamo, numeroCuotas, primerMes);
}

// Mostrar el plan de pagos para cada usuario
usuarios.forEach((usuario) => {
    alert(`Préstamo Aprobado.\nTodos los datos han sido ingresados correctamente.\n\nMonto prestado: $${usuario.monto.toFixed(2)}\n\n` + mostrarPlanPagosUsuario(usuario));

});
