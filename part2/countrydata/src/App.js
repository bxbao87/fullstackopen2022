import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Result from './components/Result'

const App = () => {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  // console.log("use effect")
  useEffect(()=>{
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        // console.log("get data")

        setData(response.data)
      })
      .catch(error => {
        // console.log("no data receive", error)
      })
  }, [])

  if (!data) {
    // console.log("data null")
    return null
  }

  const onQueryChange = (event) => {
    setQuery(event.target.value)
    setResults(data.filter(datum => datum.name.common.toLowerCase().includes(event.target.value)))
  }

  const handleShowClick = (result) => {
    setResults([result])
  }

  // console.log("load data")

  return (
    <div className="App">
      <SearchBar query={query} onChange={onQueryChange} />
      <Result results={results} onShowClick={handleShowClick} />
    </div>
  );
}

export default App;
