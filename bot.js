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
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!help') {
        const ayuda = `
        *🤖Comandos disponibles:*
        *!ayuda*
        *!memide* 
        *!dado*
        *!moneda*
        *!apodo* 
        *!suerte*
        *!everyone*
        \n
        *by: AF* 🤖
        `;
        msg.reply(ayuda);
        console.log('Comando !ayuda recibido');
    }
});


// Medida aleatoria
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!memide') {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        msg.reply(`🤖 Te mide: ${randomNum} cm`);
        console.log(`Comando "!memide" recibido, medida generada: ${randomNum} cm`);
    }
});

// Tirar dado
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!dado') {
        const dado = Math.floor(Math.random() * 6) + 1;
        msg.reply(`🤖 Tiraste un dado y salió: ${dado}`);
        console.log(`Comando "!dado" recibido, resultado del dado: ${dado}`);
    }
});

// Lanzar moneda
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!moneda') {
        const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
        msg.reply(`🤖 La moneda cayó: ${resultado}`);
        console.log(`Comando "!moneda" recibido, resultado: ${resultado}`);
    }
});

// Apodo aleatorio
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!apodo') {
        const apodos = [
            "El Destructor de Teclados",
            "El Mama Burra",
            "El piñuo",
            "El sopa esquinas *",
            "sin soplo no hay paraiso",
            "@stiven",
            "Viloria Store",
            "El culo e mono",
            "El Pata e perro",
            "tajadita",
            "pan viejo",
            "Eguayabita",
            "arepero",
            "la niña emilia",
            "cuatro onzas",
            "la frutiño",
            "el sobaco alegre",
            "El culo e mono",
            "el boca e mojarra",
            "la ballena",
            "La pajarita",
            "gelatina sin sabor",
            "TNT: Tronco e nariz tablúa",
            "El sopita en botella",
            "la chucha awá",
            "la 24 horas",
            "100 pesos de cebollin",
            "7 leches",
            "pichon de paloma",
            "ñango estrecho",
            "sopita de menudencia ",
            "la muslita e pollo",
        ];
        const randomApodo = apodos[Math.floor(Math.random() * apodos.length)];
        msg.reply(`🤖 Tu apodo es: ${randomApodo}`);
        console.log(`Comando "!apodo" recibido, apodo generado: ${randomApodo}`);
    }
});

// Números de la suerte
client.on('message', msg => {
    if (msg.body.toLowerCase() == '!suerte') {
        const numerosDeLaSuerte = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
        msg.reply(`🤖 Tus números de la suerte son: ${numerosDeLaSuerte.join(', ')}`);
        console.log(`Comando "!suerte" recibido, números generados: ${numerosDeLaSuerte.join(', ')}`);
    }
});

client.on('message', async msg => {
    const chat = await msg.getChat(); // Obtenemos el chat del mensaje

    // Verificamos si es un grupo
    if (chat.isGroup) {
        if (msg.body.toLowerCase() == '!everyone') {
            const mentions = [];
            let text = '';
            // Recorrer todos los participantes del grupo
            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
                text += `@${participant.id.user} `; // Esto crea el mensaje con las menciones
            }
            await chat.sendMessage(text, { mentions });
            console.log('Comando "!everyone" ejecutado en grupo');
        }
    } else {
        msg.reply('Este comando solo funciona en grupos.');
    }
});


// Inicia el cliente
client.initialize();
