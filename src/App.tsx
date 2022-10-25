import {useState, useRef, useEffect, useMemo} from 'react';

import BonesList from './components/BonesList/'
import { getBoneIds } from './utils/getBoneIds';

import './App.css';
import { HighlightBone } from './svglib/highlightBone';

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

  const handleDispatch = (evt: {type: string, payload: any}) => {
    console.log('Handle da Dispatch pa!', evt.payload);
    HighlightBone(refSvg.current, evt.payload);
  }


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
    <BonesList list={allBoneIds} onDispatch={handleDispatch} />
    <div ref={refSvg} dangerouslySetInnerHTML={{__html: file as string}} />
  </>;
}

export default App;