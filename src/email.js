import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: '465',
    auth: {
        user: 'admin@deltex.com.br',
        pass: 'Wrgs2703!'
    }
});

/**
 * 
 * @param {string} to 
 * @param {string} body 
 */
export async function sendEmail(to, body) {
    const info = await transporter.sendMail({
        from: '"Admin" <admin@deltex.com.br>',
        to, 
        subject: 'Autenticação',
        html: body
    })
}