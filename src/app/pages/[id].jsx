import React from 'react'
import { useDispatchx } from 'react-redux'
import axios from 'axios'

function Index() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    axios.get(
      "http://127.0.0.1:8000/api/cats"
    ).then(response => {
      dispatch(get_cats_tree(response))
    }).catch(error => {
      console.log("ERR: ", error)
    })
  }, [])
  return (
    <div>Index</div>
  )
}

export default Index