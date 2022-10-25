import {useState, useRef, useEffect, useMemo} from 'react';

import BonesList from './components/BonesList/'
import { getBoneIds } from './utils/getBoneIds';

import './App.css';

export function App() {
  const [file, setFile] = useState<string>();
  const [allBoneIds, setAllBoneIds] = useState<string[]>([]);
  const refFile = useRef<HTMLInputElement>(null);
  const refSvg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {current} = refSvg;
    if (!current) return;
    setAllBoneIds(getBoneIds(current));
  }, [file, refSvg]);


  function readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = reject;

      reader.readAsText(file)
    });
  }

  async function handleSubmit() {
    try {
      const svgFile = refFile?.current?.files![0];
      if (!svgFile) { return; }
      let fileText = await readFileAsync(svgFile as File);
      setFile(fileText as string)
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  return <>
    <h1>File Upload</h1> 
    <input type="file" ref={refFile} onChange={handleSubmit}/>
    <BonesList list={allBoneIds} />
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file as string}} />
  </>;
}

export default App;