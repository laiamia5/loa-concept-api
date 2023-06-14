const nodemailer = require('nodemailer')

enviarMail_aLoa = async (asunto, mensaje, email) => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'loaconcept@gmail.com',
            pass: 'jsovpuucyxnoerma'
        }
    }

    const mensajeArmado = {
        from: email,
        to: 'loaconcept@gmail.com',
        subject: asunto ,
        text: mensaje
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensajeArmado)

    console.log(info)
}

enviarMail_aClientas = async (asunto, mensaje, clientaEmail) => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'loaconcept@gmail.com',
            pass: 'jsovpuucyxnoerma'
        }
    }

    const mensajeArmado = {
        from: 'loaconcept@gmail.com',
        to: clientaEmail,
        subject: asunto,
        html: `
       
            <div style="background-color: #FFF3FC">
                <div>golaaaaaa<div>
                <hr/>
                <strong>strongggggg </strong>
                <p>parrafoooooooooo con letras blancas se supone</p>
                
            </div>
        `
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensajeArmado)

    console.log(info)
}


module.exports = {enviarMail_aLoa, enviarMail_aClientas }