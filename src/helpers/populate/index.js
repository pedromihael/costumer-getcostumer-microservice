import costumers from './costumers.js'
import fetch from 'node-fetch'
  
  (async () => {
    costumers.map(async costumer => {
      const response = await fetch('http://localhost:3013/create-costumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(costumer)
      })

      console.table({ costumer: costumer._id, response: response.status })
    })
  })()