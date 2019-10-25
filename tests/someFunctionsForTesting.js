module.exports.returnTen = () => 10;
module.exports.resolvingPromise = () => {
  return new Promise((resv, rej) => resv("promise resolved"));
};
module.exports.waitAWhile = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 200);
  });
};
