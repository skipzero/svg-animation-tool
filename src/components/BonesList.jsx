import React from 'react';


export default function BonesList(bones) {
  console.log('list', Array.from(bones))
  return bones.list.map((bone, index) => {
    return <li key={index}>{bone.className.baseVal}</li>
  });
}