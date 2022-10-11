import React, {useState, useRef, useEffect} from 'react';
import BonesList from './components/BonesList.jsx'
import './App.css';

function App() {
  const [file, setFile] = useState();
  const [bones, setBones] = useState([]);
  const refFile  = useRef();
  const refSvg = useRef();

  useEffect(() => {
    console.log('useEffect', file, refSvg)
    const {current} = refSvg;
    if (!current) return;
    if (!file) return;
    const newBones= current.querySelectorAll('.bone')
    setBones(Array.from(newBones));
    

  }, [file, refSvg])

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
    <h1> File Upload </h1> 
    <div className="inputbox">
      <input type="file" accept=".svg" id="svg-upload" ref={refFile} onChange={handleSubmit}/>
    </div>
    <button type="submit"> Upload </button>
    <textarea value={file} id="file-output"></textarea>
    <ul>
      <BonesList list={bones} />
    </ul>
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file}} />

    </>
  );
}

export default App;