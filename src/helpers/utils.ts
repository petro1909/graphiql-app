const convertStrIntoObj = (string: string, separator: string) => {
  const usersData: Record<string, string> = {};

  string.split('\n').forEach((el) => {
    const arr = el.split(separator);
    usersData[arr[0]] = arr[1];
  });

  return usersData;
};

export { convertStrIntoObj };
