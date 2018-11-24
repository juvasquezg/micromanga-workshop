const { send } = require('micro')
const { ObjectId } = require('mongodb')

const { mongodb } = require('../../database')
const config = require('../../config')
const { uuid } = require('../../utils')
const { register } = require('../../helpers')
const { generateError, verifyToken } = require('../../utils')

const name = 'bookmarks'
const port = 3004
const method = 'post'
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
  console.log(`executing: POST /bookmarks`)

  try {
    const token = await verifyToken(request.headers['x-access-token'])

    try {
      const { db, client } = await mongodb.connect()

      const result = await mongodb.findDocuments(
        db,
        'users',
        {
          '_id': new ObjectId(token.id),
          'bookmarks': { ...request.body }
        },
      )

      if (result.length > 0) {
        response.code(400).send({ message: 'That bookmarks already exists.'})

        return
      }

      const value = {
        bookmarks: request.body
      }
    
      mongodb.updateDocument(
        db,
        'users',
        {'_id': new ObjectId(token.id)},
        { $push: value }
      )

      mongodb.close(client)

      const message = 'Bookmarks saved successfully'

      response.code(201).send({ message })
    } catch (error) {
      response.code(500).send(generateError(error))
    }
  } catch (error) {
    response.code(401).send(generateError(error))
  }
}