//
// Small helper function to create SVG elements
function createSVGElement(tag, attrs) {
	// document.createElement() will *NOT* work here. The Namespace is critical.
	const elm = document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (const [key, value] of Object.entries(attrs)) {
		elm.setAttribute(key, value);
	}
	return elm;
}