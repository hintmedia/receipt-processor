const handleStream = require('./lib/handleStream')
const R = require('ramda')

const setPathEnvVar = _ => process.env['PATH'] = `${process.env['PATH']}:${process.env['LAMBDA_TASK_ROOT']}`

const parseArgsAndHandleStream = R.pipe(
  record => ({
    name: R.path(['s3', 'bucket', 'name'], record),
    key: R.path(['s3', 'object', 'key'], record)
  }),
  handleStream
)

const processEvent = (event, context, callback) => {
  setPathEnvVar()
  event.Records.forEach(parseArgsAndHandleStream)
  callback(null)
}

module.exports.processEvent = processEvent
