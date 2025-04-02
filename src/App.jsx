import { useState, useEffect } from "react";
import "./App.css";
const zipInfoURL = 'https://ctp-zip-code-api.onrender.com/zip/';

function City({searchZip}) {
  if (searchZip){
    return (
      <>
      <h3 className = "wide-block rounded-3 text-center">{searchZip.City}, {searchZip.State}</h3>
      <ul className = "border border-3">
        <li>Entered Zip:  {searchZip.Zipcode}</li>
        <li>City: {searchZip.City}</li>
        <li>State:  {searchZip.State}</li>
        <li>Country:  {searchZip.Country}</li>
        <li>Population:  {searchZip.EstimatedPopulation}</li>
      </ul>
      </>
    );
  }
}

function ZipSearchField({onZipChange, onZipSearch}) {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onZipChange(e.target.value);
    }
  };

  function zipSearch() {
    const zip = document.getElementById('zip').value;
    onZipChange(zip);
    onZipSearch(zip);
  }

  return (
    <>
      <h2>Zip Code:</h2>
      <input 
        id="zip" 
        type="text" 
        onKeyPress={handleEnter} 
        maxLength={5} 
      />
      <button onClick={zipSearch}>Search</button>
    </>
  );
}

function App() {
  const [enteredZip, setEnteredZip] = useState(null);
  const [zipData, setZipData] = useState(null);
  const [zipStatus,setZipStatus] = useState(false);

  // Function to fetch zip data
  const fetchZipData = async (zip) => {
    if (zip) {
      try {
        console.log(zipInfoURL + zip);
        const response = await fetch(zipInfoURL + zip);
        const json = await response.json();

        setZipData(json[0]);
      } catch (error) {
        console.error("Error fetching zip data: ", error);
      }
    }
  };


  useEffect(() => {
    if (enteredZip) {
      fetchZipData(enteredZip);
    }
  }, [enteredZip]); 

  const updateZip = (zip) => {
    setEnteredZip(zip);
  };

  // Log zipData when it changes
  useEffect(() => {
    if (zipData) {
      console.log("Updated zipData:", zipData);
    }
  }, [zipData]); // This will run whenever `zipData` is updated

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={updateZip} onZipSearch={fetchZipData} />
        <div>
          <City searchZip={zipData} />
        </div>
      </div>
    </div>
  );
}

export default App;
