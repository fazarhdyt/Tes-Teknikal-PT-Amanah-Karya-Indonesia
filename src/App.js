import './App.css';
import Select from 'react-select'
import { useEffect, useState } from 'react';

function App() {
  const [datas, setDatas] = useState([])
  const [userSelect, SetUserSelect] = useState({})
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const getDatas = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const value = await res.json()
      const result = value.map(data => {
        return {
          label: data.title,
          value: data.title,
          body: data.body
        }
      })
      setDatas(result.sort((a, b) => a.label.localeCompare(b.label)))
    }
    getDatas()
  }, [])

  const handleSubmit = () => {
    setIsShow(!isShow)
  }

  const handleChange = (value) => {
    setIsShow(false)
    SetUserSelect(value)
  }

  return (
    <div className="App">
      <Select options={datas} onChange={handleChange}/>
      <button onClick={handleSubmit}>{isShow? "Hide value" : "Show value"}</button>
      {isShow ? (
        <div>
        <h3>{userSelect.value}</h3>
        <p>{userSelect.body}</p>
        </div>
      ) : ""}
    </div>
  );
}

export default App;
