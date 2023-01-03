import React, { useState, useEffect } from 'react'
import axios from 'axios'


const API_URL = 'http://localhost:8005'

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editedTask, setEditedTask] = useState({ id: '', title: '' })
  const [id, setId] = useState(1)

  useEffect(() => {
    axios.get(API_URL + '/api/tasks/', {
      headers: {
        'Authorization': 'Token a8c43ef6a562f011dc59b699538b82313874c056'
      }
    })
      .then(res => { setTasks(res.data) })
  }, [])

  const getTask = () => {
    axios.get(API_URL + `/api/tasks/${id}/`, {
      headers: {
        'Authorization': 'Token a8c43ef6a562f011dc59b699538b82313874c056'
      }
    })
      .then(res => { setSelectedTask(res.data) })
  }

  const deleteTask = (id) => {
    axios.delete(API_URL + `/api/tasks/${id}/`, {
      headers: {
        'Authorization': 'Token a8c43ef6a562f011dc59b699538b82313874c056'
      },
    })
      .then((res) => {
        setTasks(tasks.filter(task => task.id !== id))
        setSelectedTask([])
        if (editedTask.id === id) {
          setEditedTask({ id: '', title: '' })
        }
      })
  }

  const newTask = (task) => {

    const data = {
      title: task.title
    }

    axios.post(API_URL + `/api/tasks/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token a8c43ef6a562f011dc59b699538b82313874c056'
      }
    })
      .then(res => {
        setTasks([...tasks, res.data])
        setEditedTask({ id: '', title: '' })
      })
  }

  const editTask = (task) => {

    axios.put(API_URL + `/api/tasks/${task.id}/`, task, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token a8c43ef6a562f011dc59b699538b82313874c056'
      }
    })
      .then(res => {
        setTasks(tasks.map(task => task.id === editedTask.id ? res.data : task))
        setEditedTask({ id: '', title: '' })
      })
  }

  const handleInputChange = () => evt => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value })
  }

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>タイトル：{task.title} ID：{task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen"></i>
            </button>
          </li>)
        }
      </ul>

      Set id <br />
      <input type='text' value={id} onChange={evt => { setId(evt.target.value) }} />
      <br />
      <button type='button' onClick={() => getTask()}>Get Task</button>
      {/* <button type='button' onClick={() => deleteTask()}>Delete Task</button> */}
      <h3>タイトル：{selectedTask.title} ID：{selectedTask.id}</h3>

      <input type="text" name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New task ?" required />

      {editedTask.id ?
        (<button onClick={() => editTask(editedTask)}>Update</button>) :
        (<button onClick={() => newTask(editedTask)}>Create</button>)
      }
    </div>
  )
}

export default DrfApiFetch