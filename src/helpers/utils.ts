const checkName = (string: string, errorMsg: string) => {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 33 || string.charCodeAt(i) > 126) {
      alert(errorMsg);
    }
  }
};

const checkValue = (string: string, errorMsg: string) => {
  const isCorrect = /^[\x00-\x7F]*$/.test(string);
  if (!isCorrect) alert(errorMsg);
};

const convertHeaders = (string: string, errorMsg: string) => {
  const usersData: Record<string, string> = {};

  string.split('\n').forEach((el: string) => {
    if (el) {
      const arr = el.split(':');
      const headerName = arr[0];
      const headerValue = arr[1];

      checkName(headerName, errorMsg);
      if (el.indexOf(':') !== -1) {
        checkValue(headerValue, errorMsg);
      }

      usersData[headerName] = headerValue;
    }
  });

  return usersData;
};

export { convertHeaders };
