const nodemailer = require('nodemailer')

const configEmailProduction = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA
  },
  secure: true,
  port: process.env.EMAIL_PORT
}

const configEmailTest = (testAcount) => ({
  host: 'smtp.ethereal.email',
  auth: testAcount
})

async function createConfiguration () {
  if (process.env.NODE_ENV === 'production') {
    return configEmailProduction
  } else {
    const testAcount = await nodemailer.createTestAccount()
    return configEmailTest(testAcount)
  }
}

class Email {
  async sendEmail () {
    const configEmail = await createConfiguration()
    const trasnporter = nodemailer.createTransport(configEmail)
    const info = await trasnporter.sendMail(this)
    if (process.env.NODE_ENV !== 'production') {
      console.log('URL:' + nodemailer.getTestMessageUrl(info))
    }
  }
}

class EmailVerify extends Email {
  constructor (user, target) {
    super()
    this.from = '"Shareflix API Challenge" <adriano@adrianob.com.br>'
    this.to = user.email
    this.subject = 'Shareflix email verification'
    this.text = `Hello, you need to verify your e-mail here: ${target}`
    this.html = `<h1>Hello</h1>, you need to verify your e-mail here: <a href="${target}">${target}</a>`
  }
}

module.exports = { EmailVerify }
