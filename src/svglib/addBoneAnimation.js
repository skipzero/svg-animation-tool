import { setOrigin } from './setOrigin'
import { createSVGElement } from './createSVGElement'
//
// Adds a bone animation to a bone.
export function addBoneAnimation (elm, boneAnim) {
  switch (boneAnim.type) {
    case 'rotate': {
      return elm.appendChild(createSVGElement('animateTransform', {
        repeatCount: 'indefinite',
        ...boneAnim,
        attributeName: 'transform'
      }))
    }
    case 'origin': {
      return setOrigin(elm, boneAnim.values)
    }
    // TODO: Add more animation types.
    default:
      console.log('unsupported animation type', boneAnim)
  }
}
