
/**
 * Highlights the bone.
*/
export function HighlightBone(elmSVG, boneID) {
	const elmBone = elmSVG.querySelector(boneID);
	console.log('Going to Highlight bone', boneID, 'on SVG', elmSVG, '\n', elmBone);	
}

export function UnhighlightBone(elmSVG, boneID) {
	const elmBone = elmSVG.querySelector(boneID);
	console.log('Going to UN-Highlight bone', boneID, 'on SVG', elmSVG, '\n', elmBone);	
	
}