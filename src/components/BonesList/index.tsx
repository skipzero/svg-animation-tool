import { Dispatch } from 'react';
import './BonesList.css';

export interface IBoneListProps {
  list: string[];
  onDispatch: Dispatch<{type: string, payload: any}>;
}

export default function BonesList(props: IBoneListProps ) {
  const { list, onDispatch } = props;
  
  const bonesElement = list.map((boneId) => {
    return <li key={boneId} onClick={() => onDispatch({type: 'bone-click', payload: boneId})}>
      {boneId}
    </li>
  });

  return <ul id="bones-list">
    {bonesElement}
  </ul>
}