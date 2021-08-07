const nodemailer = require('nodemailer')

async function sendEmail (user) {
  const testAcount = await nodemailer.createTestAccount()
  const trasnporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    auth: testAcount
  })
  const info = await trasnporter.sendMail({
    from: 'noreplay@adrianob.com.br',
    to: user.email,
    subject: 'email test',
    text: 'Hello, this is an test email',
    html: '<h1>Hello</h1> <p>this is an test email</p>'
  })

  console.log('URL:' + nodemailer.getTestMessageUrl(info))
}

module.exports = { sendEmail }
