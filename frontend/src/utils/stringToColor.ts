export function stringToHslColor(str: string, s = 65, l = 52): string {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}