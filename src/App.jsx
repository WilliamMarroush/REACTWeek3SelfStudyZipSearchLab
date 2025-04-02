import { useState } from "react";
import "./App.css";

function City({searchZip}) {
  return(
    <>
      <p> Entered Zip: {searchZip} </p>
    </>
  );
}

function ZipSearchField({onZipChange}) {
  const handleChange = (e) =>{
    onZipChange(e.target.value);
  }
  const handleEnter = (e) =>{
    if (e.key === 'Enter'){
      onZipChange(e.target.value);
    }
  };
  return (
  <>
    <h2>Zip Code:</h2>
    <input id = "zip" type="text"
    onKeyPress = {handleEnter}
    maxLength={5}
    />
    <button
    onClick ={()=> onZipChange(document.getElementById('zip').value)}
    >Search</button>
  </>
  );
}

function App() {
  const [enteredZip, setEnteredZip] = useState(null);
  const updateZip = (zip)=>{
    setEnteredZip(zip);
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={updateZip} />
        <div>
          <City searchZip = {enteredZip}/>
        </div>
      </div>
    </div>
  );
}

export default App;
