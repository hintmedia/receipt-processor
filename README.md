# Receipt Processor

A tiny serverless function currently in use at [hint.io](http://hint.io) for converting emailed receipts into `.pdf` format and uploading them to google drive.

**Problem**: At Hint we keep all of our receipts in a single location in PDF format. Paper receipts are easy (we use Readdle's "Scanner Pro" app), but email receipts require conversion to PDF, then uploading to google drive. This was a manual process that nobody enjoyed.

**Solution**: We've automated the process with this serverless function. Anyone on our team can forward a receipt to a designated email address and it'll automagically be uploaded to our shared receipts folder in google drive.

## How it works

1. An [Amazon SES rule](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rules.html) uploads all emails received at a designated address to an [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html).
1. A [lambda function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) is triggered on S3 object creation, renders the email in pdf format, then uploads it to google drive.

## Can I use this?

Absolutely! Feel free to use it as-is, or adapt it for your needs. We use Google Drive at Hint, but swapping that out for dropbox or similar would be pretty simple. Have questions? Feel free to open an issue.

## Setup instructions

1. Create a [service account](https://cloud.google.com/iam/docs/understanding-service-accounts) which will be used to upload PDF's to google drive.
1. Duplicate [env.sample.yml](env.sample.yml) as `env.yml` and add service account details, destination google drive folder id, and your preferred s3 bucket name (can be anything).
1. Deploy the function to AWS. This project was built using the serverless framework. You can read up on that here: https://serverless.com.
1. Setup an [SES rule](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rules.html) that'll store emails in the S3 bucket created when you deployed the function in the previous step.
1. Profit!

## License
Receipt Processor is released under the [MIT License](MIT-LICENSE).