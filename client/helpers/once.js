export const once = (fn, ...bindArgs) => {
  let called = false;

  return function oncedFunc(...callArgs) {
    if (called) {
      return;
    }

    called = true;

    return fn.apply(this, [...bindArgs, ...callArgs]);
  };
};

export default once;
