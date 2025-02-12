const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    // Generar y escanear el código QR con tu teléfono
    console.log('Escanea este código QR con tu aplicación de WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Cliente está listo! Escaneaste el QR correctamente.');
});

// Funcionalidad para enviar la lista de comandos
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!ayuda') {
        const ayuda = `
        *Comandos disponibles:*
        
        *'Hola'* - El bot responde con un saludo.
        *'Date'* - Muestra la fecha y hora actual.
        *'!saludo'* - Te envía un saludo dependiendo de la hora del día.
        *'!memide'* - Te responde con una medida aleatoria en cm.
        *'!dado'* - Lanza un dado y te muestra el resultado.
        *'!moneda'* - Lanza una moneda y te dice si salió cara o cruz.
        *'!apodo'* - Te asigna un apodo aleatorio.
        *'!suerte'* - Te genera números de la suerte.
        `;
        msg.reply(ayuda);
        console.log('Comando !ayuda recibido');
    }
});

// Respuesta a 'Hola'
client.on('message', msg => {
    if (msg.body.toLowerCase() == 'hola') {
        msg.reply('Hola, ¿cómo estás?🤖');
        console.log('Comando "Hola" recibido y respondido');
    }
});

// Fecha actual
client.on('message', msg => {
    if (msg.body.toLowerCase() == 'date') {
        msg.reply('La fecha de hoy es: ' + new Date());
        console.log('Comando "Date" recibido y respondido con la fecha actual');
    }
});

// Saludo según la hora del día
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!saludo') {
        const hora = new Date().getHours();
        let saludo;
        if (hora < 12) {
            saludo = '¡Buenos días!';
        } else if (hora < 18) {
            saludo = '¡Buenas tardes!';
        } else {
            saludo = '¡Buenas noches!';
        }
        msg.reply(saludo);
        console.log('Comando "!saludo" recibido y respondido con el saludo apropiado');
    }
});

// Medida aleatoria
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!memide') {
        const randomNum = Math.floor(Math.random() * 23) + 1;
        msg.reply(`Te mide: ${randomNum} cm`);
        console.log(`Comando "!memide" recibido, medida generada: ${randomNum} cm`);
    }
});

// Tirar dado
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!dado') {
        const dado = Math.floor(Math.random() * 6) + 1;
        msg.reply(`Tiraste un dado y salió: ${dado}`);
        console.log(`Comando "!dado" recibido, resultado del dado: ${dado}`);
    }
});

// Lanzar moneda
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!moneda') {
        const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
        msg.reply(`La moneda cayó: ${resultado}`);
        console.log(`Comando "!moneda" recibido, resultado: ${resultado}`);
    }
});

// Apodo aleatorio
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!apodo') {
        const apodos = [
            "El Destructor de Teclados",
            "La Leyenda del Chat",
            "El Maestro del WhatsApp",
            "El Rey del Humor",
            "La Bestia del Ping-Pong"
        ];
        const randomApodo = apodos[Math.floor(Math.random() * apodos.length)];
        msg.reply(`Tu nuevo apodo es: ${randomApodo}`);
        console.log(`Comando "!apodo" recibido, apodo generado: ${randomApodo}`);
    }
});

// Números de la suerte
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!suerte') {
        const numerosDeLaSuerte = Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 1);
        msg.reply(`Tus números de la suerte son: ${numerosDeLaSuerte.join(', ')}`);
        console.log(`Comando "!suerte" recibido, números generados: ${numerosDeLaSuerte.join(', ')}`);
    }
});

// Inicia el cliente
client.initialize();
