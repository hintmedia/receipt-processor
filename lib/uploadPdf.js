const { google } = require('googleapis')
const drive = google.drive('v3')

const jwtClient = new google.auth.JWT(
  process.env.google_client_email,
  null,
  process.env.google_private_key,
  ['https://www.googleapis.com/auth/drive'],
  process.env.google_email_to_impersonate
)

const uploadFile = (pdfStream, filename) =>
  drive.files.create({
    auth: jwtClient,
    resource: {
      name: filename,
      mimeType: 'application/pdf',
      parents: [process.env.receipt_folder_id]
    },
    media: {
      mimeType: 'application/pdf',
      body: pdfStream
    }
  })

const uploadPdf = async (pdfStream, filename) => {
  await jwtClient.authorize()
  uploadFile(pdfStream, filename)
}

module.exports = uploadPdf
