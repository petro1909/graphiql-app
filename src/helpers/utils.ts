const isNameValid = (string: string) => {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 33 || string.charCodeAt(i) > 126) {
      return false;
    }
  }

  return true;
};

const isValueValid = (string: string) => {
  const isCorrect = /^[\x00-\x7F]*$/.test(string);

  return isCorrect;
};

const convertHeaders = (string: string) => {
  const usersHeaders: Record<string, string> = {};
  let isValid = true;
  string.split('\n').forEach((el: string) => {
    if (el) {
      const arr = el.split(':');
      const headerName = arr[0];
      const headerValue = arr[1];

      isValid = isNameValid(headerName);
      if (el.indexOf(':') !== -1) {
        isValid = isValueValid(headerValue);
      }

      usersHeaders[headerName] = headerValue;
    }
  });

  return { usersHeaders, isInvalid: !isValid };
};

export { convertHeaders };
