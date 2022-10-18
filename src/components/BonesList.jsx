import React from 'react';
import './BonesList.css';

export default function BonesList(bones) {
  console.log('list', Array.from(bones))
  const bonesElement = bones.list.map((bone, index) => {
    return <li key={index}>{bone.className.baseVal}</li>
  });

  return (
  <>
    <ul id="bones-list">
      {bonesElement}
    </ul>
  </>)
}