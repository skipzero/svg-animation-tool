import React, {useState, useRef, useEffect, useMemo} from 'react';
import BonesList from './components/BonesList/'
import { getBoneIds } from './utils/getBoneIds';

import './App.css';

export function App() {
  const [file, setFile] = useState<string>();
  // const [bones, setBones] = useState<Element[]>([]);
  const [allBoneIds, setAllBoneIds] = useState<string[]>([]);
  const refFile = useRef<HTMLInputElement>(null);
  const refSvg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {current} = refSvg;
    if (!current) return;
    setAllBoneIds(getBoneIds(current));
  }, [refSvg]);

  // const boneIds = useMemo(() => {
  //   const {current} = refSvg;
  //   if (!current) { return; }
  //   return getBoneIds(current);
  // }, [refSvg.current]);
  // const boneIds = getBoneIds(refSvg.current);
  // console.log('boneIds ', boneIds);

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

  return <>
    <h1>File Upload</h1> 
    <input type="file" ref={refFile} onChange={handleSubmit}/>
    <textarea value={file} id="file-output"></textarea>
    <BonesList list={allBoneIds} />
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file as string}} />
  </>;
}

export default App;