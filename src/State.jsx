import { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [country, setCountry] = useState(''); // Selected country
  const [countries, setCountries] = useState([]); // List of countries
  const [state, setState] = useState(''); // Selected state
  const [states, setStates] = useState([]); // List of states
  const [city, setCity] = useState(''); // Selected city
  const [cities, setCities] = useState([]); // List of cities

  // Fetch the list of countries on initial render
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data); // Assuming the API returns an array of country names
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states for the selected country
  useEffect(() => {
    if (country) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
          const data = await response.json();
          setStates(data); // Assuming the API returns an array of states
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };
      fetchStates();
    } else {
      setStates([]); // Clear states when no country is selected
    }
  }, [country]);

  // Fetch cities for the selected state and country
  useEffect(() => {
    if (state) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
          const data = await response.json();
          setCities(data); // Assuming the API returns an array of cities
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    } else {
      setCities([]); // Clear cities when no state is selected
    }
  }, [state]);

  return (
    <>
      <h1>Select Location</h1>

      {/* Country Dropdown */}
      <select onChange={(e) => setCountry(e.target.value)} value={country}>
        <option value="">Select Country</option>
        {countries.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      {/* State Dropdown - visible only if a country is selected */}
      {
        <select onChange={(e) => setState(e.target.value)} value={state}>
          <option value="">Select State</option>
          {states.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      }

      {/* City Dropdown - visible only if a state is selected */}
      
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">Select City</option>
          {cities.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      

      {city && (
        <p>{`You selected ${city}, ${state}, ${country}`}</p>
      )}

    </>
  );
};

export default LocationSelector;
