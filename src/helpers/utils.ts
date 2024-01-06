const convertHeaders = (string: string) => {
  const usersData: Record<string, string> = {};

  string.split('\n').forEach((el: string) => {
    if (el) {
      const arr = el.split(':');
      const headerName = arr[0];

      for (let i = 0; i < headerName.length; i++) {
        if (headerName.charCodeAt(i) < 33 || headerName.charCodeAt(i) > 126) {
          alert('Please, use permitted characters for the header name');
        }
      }

      usersData[headerName] = arr[1];
    }
  });

  return usersData;
};

export { convertHeaders };
