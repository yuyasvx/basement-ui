export function convertDurationToMillis(rawValue: string, fallbackValue = 0) {
  const lowercase = toLowerCase(rawValue);
  if (lowercase.endsWith('ms')) {
    const num = Number(lowercase.replace('ms', ''));
    return isNaN(num) ? fallbackValue : num;
  }
  if (lowercase.endsWith('s')) {
    const num = Number(lowercase.replace('s', ''));
    return isNaN(num) ? fallbackValue : num * 1000;
  }
  if (Number(lowercase) === 0) {
    return 0;
  }
  return fallbackValue;
}

function toLowerCase(str: string) {
  if ('I'.toLowerCase() !== 'i') {
    return str.replace(/[A-Z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) | 32);
    });
  } else {
    return str.toLowerCase();
  }
}
