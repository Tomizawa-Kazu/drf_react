import React, { useState, useEffect } from 'react'
//import axios from 'axios'
const ApiFetch = () => {

  const [posts, setPosts] = useState([])
  const [id, setId] = useState(1)
  const [clicked, setClicked] = useState(false)

  const handlerClick = () => {
    setClicked(!clicked)
  }

  useEffect(() => {
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then(res => {
    //     setPosts(res.data)
    //   })

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [clicked])

  return (
    <div>
      <ul>
        <input type="text" value={id} onChange={evt => setId(evt.target.value)} />
        <br />
        <button type="button" onClick={handlerClick}>Get Post</button>
        <br />
        {posts.title}
        {/* {
          posts.map(posts => <li key={posts.id}> {posts.title}</li>)
        } */}
      </ul>
    </div>
  )
}

export default ApiFetch