//import logo from './logo.svg';
import React ,{ useEffect, useState } from 'react';

import './App.css';
import Countries from './COMPONENT/Countries';
import Country from './COMPONENT/Country';
import Search from './COMPONENT/Search';



const url = "https://restcountries.com/v3.1/all";

function App() {

  const [countries, setCountries] = useState([]);
  const [isLoadding, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountry, setFilteredCountry] = useState(countries);


  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountry(data);
      setIsLoading(false);
      setError(null);
      //console.log(countries);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }

  }

  useEffect(() => {
    fetchData(url);
  }, []);


  const handleRemoveCountry = (name) => {
    const filter = filteredCountry.filter((Country) => Country.name.common !== name);
    setFilteredCountry(filter);
    //alert(name);
  }

  const handleSearchText = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });

    setFilteredCountry(newCountries);

  }


  return (
    <div>
      <h1 className="title">Data Get From API ("https://restcountries.com/v3.1/all")</h1>
      <Search getSearchText={handleSearchText} />
      {isLoadding && <h2>Data is Loadding...</h2>}
      {error && <h3>{error.message}</h3>}
      {countries && <Countries countries={filteredCountry} onRemoveCountry={handleRemoveCountry} />}
    </div>
  );
}

export default App;
