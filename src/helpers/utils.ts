const convertStrIntoObj = (string: string, separator: string) => {
  //let usersData = {};
  return string.split('\n').map((el) => {
    const arr = el.split(separator);
    const objFromStr = { [arr[0]]: arr[1] };

    return objFromStr;
  });

  /* console.log('usersData ', usersData)
  return usersData; */
};

export { convertStrIntoObj };
