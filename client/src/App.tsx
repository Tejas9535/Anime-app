import { Button } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('http://localhost:8080/api/home').then(function (response) {
      // handle success
      setData(response.data)
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])
  

  return (
    <>
      <Button variant="contained">Hello World</Button>
    </>
    
  )
}

export default App
