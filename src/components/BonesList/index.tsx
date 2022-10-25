import React from 'react';
import './BonesList.css';

export interface IBoneListProps {
  list: string[];
}

export default function BonesList(props: IBoneListProps ) {
  const { list } = props;

  const bonesElement = list.map((boneId) => {
    return <li key={boneId}>{boneId}</li>
  });

  return <ul id="bones-list">
    {bonesElement}
  </ul>
}