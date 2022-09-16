import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState();
  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'https://localhost:3000/uploadFile'
    const formData = new FormData();
    formData.appenmd('file', file)
    formData.appenmd('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',

      },
    };
    axios.post(url, formData, config).then(res => {
      console.log(res.data)
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>File Upload</h4>
      <input type="file" onChange={handleChange}/>
      <button typ="submit">Upload</button>
    </form>
  );
}

export default App;
