const { send } = require('micro')
const { ObjectId } = require('mongodb')

const { mongodb } = require('../../database')
const config = require('../../config')
const { uuid } = require('../../utils')
const { register } = require('../../helpers')
const { generateError, verifyToken } = require('../../utils')

const name = 'bookmarks'
const port = 3003
const method = 'get'
const address = `http://127.0.0.1:${port}/${name}`

async function init () {
  try {
    const details = {
      name,
      address,
      port,
      tags: [method], 
      id: uuid(),
      check: {
        ttl: '10s',
        deregister_critical_service_after: '1m'
      }
    }
  
    const result = await register(details)
  
    console.log(`Service registered: ${result}`)
  } catch (error) {
    console.log(error)
  }
}

init()

module.exports = async (request, response) => {
  try {
    const token = await verifyToken(request.headers['x-access-token'])

    try {
      const { db, client } = await mongodb.connect()

      const result = await mongodb.findDocuments(
        db,
        'users',
        {'_id': new ObjectId(token.id)},
        { projection: { _id: 1, bookmarks: 1 } }
      )

      mongodb.close(client)

      send(response, 200, result[0])
    } catch (error) {
      send(response, 500, generateError(error))
    }
  } catch (error) {
    send(response, 401, generateError(error))
  }
}