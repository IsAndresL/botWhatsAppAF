const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    // Generar y escanear el código QR con tu teléfono
    console.log('Escanea este código QR con tu aplicación de WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Cliente está listo! Escaneaste el QR correctamente.');
});

// Mapa de comandos
const commands = {
    '!help': (msg) => {
        const ayuda = `
        *🤖Comandos disponibles:*
        *!ayuda*
        *!memide* 
        *!dado*
        *!moneda*
        *!apodo* 
        *!suerte*
        \n
        *by: AF*
        `;
        msg.reply(ayuda);
    },
    '!memide': (msg) => {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        msg.reply(`🤖 Te mide: ${randomNum} cm`);
    },
    '!dado': (msg) => {
        const dado = Math.floor(Math.random() * 6) + 1;
        msg.reply(`🤖 Tiraste un dado y salió: ${dado}`);
    },
    '!moneda': (msg) => {
        const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
        msg.reply(`🤖 La moneda cayó: ${resultado}`);
    },
    '!apodo': (msg) => {
        const apodos = [
            "El Destructor de Teclados", "El Mama Burra", "El piñuo",
            "El sopa esquinas", "sin soplo no hay paraiso", "@stiven", 
            "Viloria Store", "El culo e mono", "El Pata e perro",
            "tajadita", "pan viejo", "Eguayabita", "arepero", 
            "la niña emilia", "cuatro onzas", "la frutiño", 
            "el sobaco alegre", "El culo e mono", "el boca e mojarra", 
            "la ballena", "La pajarita", "gelatina sin sabor", 
            "TNT: Tronco e nariz tablúa", "El sopita en botella", 
            "la chucha awá", "la 24 horas", "100 pesos de cebollin", 
            "7 leches", "pichon de paloma", "ñango estrecho", 
            "sopita de menudencia", "la muslita e pollo"
        ];
        const randomApodo = apodos[Math.floor(Math.random() * apodos.length)];
        msg.reply(`🤖 Tu apodo es: ${randomApodo}`);
    },
    '!suerte': (msg) => {
        const numerosDeLaSuerte = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
        msg.reply(`🤖 Tus números de la suerte son: ${numerosDeLaSuerte.join(', ')}`);
    }
};

// Manejo de mensajes
client.on('message', msg => {
    const command = msg.body.toLowerCase();
    
    if (commands[command]) {
        try {
            commands[command](msg);
            console.log(`Comando "${command}" ejecutado correctamente por usuario: ${msg.from}`);
        } catch (error) {
            console.error(`Error ejecutando el comando "${command}":`, error);
            msg.reply('Hubo un error al ejecutar el comando.');
        }
    }
});

// Inicia el cliente
client.initialize();
