export function getContractRes(func) {
  return new Promise((resolve, reject) => {
    func.call((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
