//
// Sets elm's origin relative to elm's Bounding Box
function setOrigin (elm, value) {
  const bbox = elm.getBBox()
  let origin = value

  switch (value) {
    case 'center':
      origin = `${bbox.x + (bbox.width / 2)}px ${bbox.y + (bbox.height / 2)}px`
      // TODO: add more cases
    default:
			// ignore;
  }
  // SVGElement supports transform-origin as attribute.
  elm.setAttribute('transform-origin', origin)
}
