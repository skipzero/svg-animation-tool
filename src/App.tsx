import React, {useState, useRef, useEffect} from 'react';
import BonesList from './components/BonesList/'
import './App.css';

export function App() {
  const [file, setFile] = useState<string>();
  const [bones, setBones] = useState<Element[]>([]);
  const refFile = useRef<HTMLInputElement>(null);
  const refSvg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const {current} = refSvg;
    if (!current) return;
    if (!file) return;
    const newBones= (current as HTMLElement).querySelectorAll('.bone')
    const bonesFilter = Array.from(newBones).filter((bone) => {
      const boneClass = bone.classList

      console.log('filter', bone.classList[1], boneClass[1]);
      return bone.classList[1];
    });
    console.log('bonesFiltre', bonesFilter)
    setBones(bonesFilter);
  }, [file, refSvg]);

  function readFileAsync(file: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = reject;

      reader.readAsText(file)
    })
  }

  function handleSubmit() {
    const svgFile = refFile?.current?.files![0];
    processFile(svgFile);
    console.log('REF', refSvg)
  }

  async function processFile(file: any) {
    try {
      let fileText = await readFileAsync(file)
      setFile(fileText as string)
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }
  // console.log(typeof bones)
  // const bonesList = bones.map((bone, index) => {
  //   console.log('+++', bone.className.baseVal)
  //   return <li key={index}>{bone.className.baseVal}</li>
  // })
  return (<>
    <h4> File Upload </h4> <input type="file" ref={refFile} onChange={handleSubmit}/>
    <button type = "submit" > Upload </button>
    <textarea value={file} id="file-output"></textarea>
      <BonesList list={bones} />
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file as string}} />

    </>
  );
}

export default App;