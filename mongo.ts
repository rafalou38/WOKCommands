import mongoose, { Connection } from 'mongoose'
import WOKCommands from '.'

const results: {
  [name: number]: string
} = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}

const mongo = async (mongoPath: string, instance: WOKCommands) => {
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  const state = results[mongoose.connection.readyState] || 'Unknown'

  instance.emit('databaseConnected', mongoose.connection, state)
}

export const getMongoConnection = (): Connection => {
  return mongoose.connection
}

export default mongo
