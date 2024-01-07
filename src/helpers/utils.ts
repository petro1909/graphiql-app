const checkName = (string: string) => {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 33 || string.charCodeAt(i) > 126) {
      alert('Please, use permitted characters for the header name');
    }
  }
};

const checkValue = (string: string) => {
  const isCorrect = /^[\x00-\x7F]*$/.test(string);
  if (!isCorrect) alert('Please, use permitted characters for the header value');
};

const convertHeaders = (string: string) => {
  const usersData: Record<string, string> = {};

  string.split('\n').forEach((el: string) => {
    if (el) {
      const arr = el.split(':');
      const headerName = arr[0];
      const headerValue = arr[1];

      checkName(headerName);
      if (el.indexOf(':') !== -1) {
        checkValue(headerValue);
      }

      usersData[headerName] = headerValue;
    }
  });

  return usersData;
};

export { convertHeaders };
