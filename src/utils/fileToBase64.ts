export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');
        resolve(base64String);
      } else {
        reject(new Error('FileReader result is not a string'));
      }
    };
    reader.onerror = () => {
      reject(new Error('FileReader encountered an error'));
    };
    reader.readAsDataURL(file);
  });
};
