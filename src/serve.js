const handler = require('serve-handler')
const path = require('path')

const public = path.resolve(__dirname, '../reports')

module.exports = async (request, response) => {
  await handler(request, response, {
    public,
  })
}
