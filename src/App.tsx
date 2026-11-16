import './App.css'
import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import type { User_interface } from './Models/Interfaces/User.interface'
import type { SubmitEventHandler } from 'react'


export const App = function () {
  const [users, setUsers] = useState<User_interface[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users')
        const data: User_interface[] = await response.json()
        setUsers(data)
      } catch (err: Error | any) {
        throw new Error(err);
      }
    }
    fetchUsers()

  }, [])

  const addUser: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          age: age
        })
      })
      const newUser: User_interface = await response.json()
      setUsers((lastUsers) => [...lastUsers, newUser])
    } catch (err: Error | any) {
      throw new Error(err);
    }
  }
  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h1>Felhasznalok</h1>
      <h2>Felhasznalo felvetele</h2>
      <form onSubmit={addUser}>
        <div className="input-group">
          <label htmlFor='nameInput'>Nev</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='ageInput'>Age</label>
          <input
            type="number"
            name="age"
            id="ageInput"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <button type="submit">Felvitel</button>
      </form>
    </div>
  )
}