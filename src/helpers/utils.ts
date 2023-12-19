const convertStrIntoObj = (string: string, separator: string) => {
  string.split('\n').forEach((el) => {
    const arr = el.split(separator);
    const ObjFromStr = { [arr[0]]: arr[1] };

    return ObjFromStr;
  });
};

export { convertStrIntoObj };
