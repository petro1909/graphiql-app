const convertStrIntoObj = (string: string, separator: string) => {
  let usersData = {};
  string.split('\n').forEach((el) => {
    const arr = el.split(separator);
    const objFromStr = { [arr[0]]: arr[1] };
    usersData = { ...objFromStr };
  });

  return usersData;
};

export { convertStrIntoObj };
