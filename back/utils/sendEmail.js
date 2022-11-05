const nodemailer = require('nodemailer')

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8742ab9ef507cf",
            pass: "054aced695cea1"
        }
    });

    const mensaje = {
        from: "JhonShop Store <noreply@jhonshop.com>",
        to: options.email,
        subject: options.subject,
        text:options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports = sendEmail;