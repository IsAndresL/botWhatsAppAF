const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
console.log('Bot is starting...');
client.on('qr', (qr) => {
    // Generar y escanear el código QR con tu teléfono
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Cliente está listo!');
});

// Funcionalidad para enviar la lista de comandos
client.on('message', msg => {
    if (msg.body == '!ayuda') {
        const ayuda = `
        *Comandos disponibles:*
        
        *'Hola.'* - El bot responde con un saludo.
        *'Date'* - Muestra la fecha y hora actual.
        *'!saludo'* - Te envía un saludo dependiendo de la hora del día.
        *'!memide'* - Te responde con una medida aleatoria en cm.
        *'!dado'* - Lanza un dado y te muestra el resultado.
        *'!moneda'* - Lanza una moneda y te dice si salió cara o cruz.
        *'!apodo'* - Te asigna un apodo aleatorio.
        *'!suerte'* - Te genera números de la suerte.
        *'!trivia'* - Inicia una trivia y adivina la respuesta correcta.
        `;
        msg.reply(ayuda);
    }
});

// Respuesta a 'Hola.'
client.on('message', msg => {
    if (msg.body == 'Hola.') {
        msg.reply('Hola, ¿cómo estás?🤖');
    }
});

// Fecha actual
client.on('message', msg => {
    if (msg.body == 'Date') {
        msg.reply('La fecha de hoy es: ' + new Date());
    }
});

// Saludo según la hora del día
client.on('message', msg => {
    if (msg.body == '!saludo') {
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
    }
});

// Medida aleatoria
client.on('message', msg => {
    if (msg.body == '!memide') {
        const randomNum = Math.floor(Math.random() * 23) + 1;
        msg.reply(`Te mide: ${randomNum} cm`);
    }
});

// Tirar dado
client.on('message', msg => {
    if (msg.body == '!dado') {
        const dado = Math.floor(Math.random() * 6) + 1;
        msg.reply(`Tiraste un dado y salió: ${dado}`);
    }
});

// Lanzar moneda
client.on('message', msg => {
    if (msg.body == '!moneda') {
        const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
        msg.reply(`La moneda cayó: ${resultado}`);
    }
});

// Apodo aleatorio
client.on('message', msg => {
    if (msg.body == '!apodo') {
        const apodos = [
            "El Destructor de Teclados",
            "La Leyenda del Chat",
            "El Maestro del WhatsApp",
            "El Rey del Humor",
            "La Bestia del Ping-Pong"
        ];
        const randomApodo = apodos[Math.floor(Math.random() * apodos.length)];
        msg.reply(`Tu nuevo apodo es: ${randomApodo}`);
    }
});

// Números de la suerte
client.on('message', msg => {
    if (msg.body == '!suerte') {
        const numerosDeLaSuerte = Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 1);
        msg.reply(`Tus números de la suerte son: ${numerosDeLaSuerte.join(', ')}`);
    }
});
