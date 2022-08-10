export function limitText(text, limitCharacters, limitLines) {
  const lines = text.split('\n');

  if (lines.length > limitLines) {
    return `${lines
      .slice(0, limitLines)
      .join('\n')
      .substring(0, limitCharacters)}...`;
  }

  if (text.length > limitCharacters) {
    return `${text.substring(0, limitCharacters)}...`;
  }

  return text;
}

export function scrollToRef(ref) {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function getColorCoverUrl(color) {
  return `https://singlecolorimage.com/get/${color.substring(1)}/200x100`;
}

export function randItem(array) {
  return array[randInt(0, array.length - 1)];
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
