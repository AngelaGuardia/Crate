// NOTE: 2. This is where the server is started
// App Imports
import { PORT, NODE_ENV } from '../config/env'

// Start server
// QUESTION: Does this 'default fuction' mean it gets the name of the directory and the file in cammel case? That's how it is being called in the index.js file
export default function (server) {
  console.info('SETUP - Starting server..')

  server.listen(PORT, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on http://localhost:${ PORT } [${ NODE_ENV }]`)
    }
  })
}

// QUESTION: Why do we need an almost identical file in the web directory?
