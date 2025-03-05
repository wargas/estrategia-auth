export function bodyEmail(token) {
    return `<table cellpadding="0" cellspacing="0" border="0" align="center" style="font-family: 'Verdana'; max-width: 672px; width: 100%; padding: 24px 48px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
        <td>
            
        </td>
    </tr>

    <!-- Main -->
    <tr>
        <td style="padding-top: 32px;">
            <h2 style="color: #4b5563; font-size: 18px; margin: 0;">Olá!</h2>
           

            

            <p style="margin-top: 16px; line-height: 1.625; color: #6b7280;">
                clique no link abaixo para entrar no Estratégia DARK.
            </p>

            <!-- Button -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px;">
                <tr>
                    <td>
                        <a href="${process.env.URL_AUTH}?acess_token=${token.access_token}&id=${token.session_id}" style="display: inline-block; padding: 8px 24px; font-size: 14px; font-weight: 500; letter-spacing: 0.025em; color: #ffffff; text-transform: capitalize; background-color: #2563eb; border-radius: 8px; text-decoration: none;">Entrar</a>
                    </td>
                </tr>
            </table>

            <p style="margin-top: 32px; color: #6b7280;">
                Obrigado, <br />
                Wargas Teixeira
            </p>
        </td>
    </tr>

    <!-- Footer -->
    `
}