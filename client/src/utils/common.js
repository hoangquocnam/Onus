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

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
