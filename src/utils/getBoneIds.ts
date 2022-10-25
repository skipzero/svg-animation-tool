
/**
 * Returns a list of Bone Ids found in the root element.
 * bones follow the format "bone-"
 * @param elmRoot 
 * @returns 
 */
export function getBoneIds(elmRoot: HTMLElement | null): string[] {
  if (!elmRoot) { return []; }
  const allBoneElms = elmRoot.querySelectorAll('[class*="bone-"]');
  const ids = [] as string[];
  for (const elm of Array.from(allBoneElms)) {
    const classList = Array.from(elm.classList);
    const boneId = classList.filter(klass => klass.match('bone-'));
    ids.push(boneId[0]);
  }
  return ids;
}