// export function trimText(text: string) {
//   let words = text.split(' ');

//   if (words.length > 15) {
//     words = words.slice(0, 15);
//   }

//   return words.join(' ');
// }

export function trimImageName(text: string) {
  if (text.length > 34) {
    const words = text.split(' ');
    let trimmedText = '';
    let count = 0;

    for (let i = 0; i < words.length; i++) {
      if (trimmedText.length + words[i].length <= 34) {
        trimmedText += words[i] + ' ';
        count++;
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
