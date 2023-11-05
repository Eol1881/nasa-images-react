export function trimImageName(text: string) {
  if (text.length > 34) {
    const words = text.split(' ');
    let trimmedText = '';
    let count = 0;

    for (let i = 0; i < words.length; i += 1) {
      if (trimmedText.length + words[i].length <= 34) {
        trimmedText += words[i] + ' ';
        count += 1;
      } else {
        break;
      }
    }

    if (count < words.length) {
      trimmedText = trimmedText.trim() + '...';
    }

    return trimmedText;
  }

  return text;
}
