import React, {useState, useRef} from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState();
  const refFile = useRef();

  function handleSubmit(event) {
    const svgFile = refFile.current.files[0]
    const fileUrl = window.URL.createObjectURL(svgFile);
    setFile(fileUrl);

  }
  return (<> 
    <h4> File Upload </h4> <input type="file" ref={refFile} onChange={handleSubmit}/>
    <button type = "submit" > Upload </button>
    <input value={file}></input>
    <img src={file}></img>
    </>
  );
}

export default App;