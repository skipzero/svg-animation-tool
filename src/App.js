import React, {useState, useRef, useEffect} from 'react';
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
  console.log(typeof bones)
  const bonesList = bones.map((bone, index) => {
    console.log('+++', bone.className.baseVal)
    return <li key={index}>{bone.className.baseVal}</li>
  })
  return (<>
    <h4> File Upload </h4> <input type="file" ref={refFile} onChange={handleSubmit}/>
    <button type = "submit" > Upload </button>
    <textarea value={file} id="file-output"></textarea>
    <ul>
      {bonesList}
    </ul>
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file}} />

    </>
  );
}

export default App;