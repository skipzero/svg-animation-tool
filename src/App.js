import React, {useState, useRef} from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const refFile  = useRef();
  const refSvg = useRef();


  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = reject;

      reader.readAsText(file)
    })
  }

  function handleSubmit(event) {
    const svgFile = refFile.current.files[0]
    setFileUrl(window.URL.createObjectURL(svgFile));
    processFile(svgFile);
    console.log('REF', refSvg)
  }

  async function processFile(file) {
    try {
      let fileText = await readFileAsync(file)
      setFile(fileText)
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }
  return (<> 
    <MyComponent />
    <h4> File Upload </h4> <input type="file" ref={refFile} onChange={handleSubmit}/>
    <button type = "submit" > Upload </button>
    <textarea value={file} id="file-output"></textarea>
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file}} />
    
    </>
  );
}

function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default App;