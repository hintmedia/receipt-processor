const getObject = require('./getObject')
const uploadPdf = require('./uploadPdf')
const simpleParser = require('mailparser').simpleParser
const wkhtmltopdf = require('wkhtmltopdf')
const R = require('ramda')

const throwError = R.ifElse(
  err => R.isNil(err),
  _ => _,
  err => { throw new Error(err) }
)

const getMail = R.pipe(
  ({ name, key }) => getObject(name, key),
  stream => simpleParser(stream) // Returns a promise
)

const createAndUploadPDF = R.pipe(
  mail => ({
    mail,
    stream: wkhtmltopdf(mail.html, {}, throwError)
  }),
  ({ mail, stream }) => uploadPdf(stream, `${mail.date}-${mail.subject}`)
)

const handleStream = async args => {
  const mail = await getMail(args)
  createAndUploadPDF(mail)
}

module.exports = handleStream
