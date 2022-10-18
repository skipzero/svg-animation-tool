import { addBoneAnimation } from './addBoneAnimation';
//
// Loads the animation on child bones of elmRoot
// Use this function to load an animation object on a bone.
function loadAnimation(elmRoot, animation) {
	Object
		.keys(animation)
		.map(sel => ({
			sel, 
			elm: elmRoot.querySelector(sel),
			anims: animation[sel],
		}))
		.forEach(bone => 
			bone.anims.forEach(boneAnim => 
				addBoneAnimation(bone.elm, boneAnim)));
}