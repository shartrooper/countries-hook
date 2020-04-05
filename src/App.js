import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      const getAll = async (country) => {
        const request = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        return request.data;
      };

      const fetchData = async () => {
        try {
          let fetchData = await getAll(name);
          setCountry({...fetchData, found: 'found'});
        }
        catch (error) {
          console.log(error);
          setCountry({});
        }
      }

      fetchData();
    }
  }, [name]);

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country[0].name} </h3>
      <div>capital {country[0].capital} </div>
      <div>population {country[0].population}</div>
      <img src={country[0].flag} height='100' alt={`flag of ${country[0].name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App