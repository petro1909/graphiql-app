const msgEN: string = 'Please, use permitted characters';
const msgRU: string = 'Пожалуйста, используйте разрешенные символы';

const checkName = (string: string, language: string) => {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 33 || string.charCodeAt(i) > 126) {
      language === 'EN' ? alert(msgEN) : alert(msgRU);
    }
  }
};

const checkValue = (string: string, language: string) => {
  const isCorrect = /^[\x00-\x7F]*$/.test(string);
  if (!isCorrect) language === 'EN' ? alert(msgEN) : alert(msgRU);
};

const convertHeaders = (string: string, language: string) => {
  const usersData: Record<string, string> = {};
  string.split('\n').forEach((el: string) => {
    if (el) {
      const arr = el.split(':');
      const headerName = arr[0];
      const headerValue = arr[1];

      checkName(headerName, language);
      if (el.indexOf(':') !== -1) {
        checkValue(headerValue, language);
      }

      usersData[headerName] = headerValue;
    }
  });

  return usersData;
};

export { convertHeaders };
