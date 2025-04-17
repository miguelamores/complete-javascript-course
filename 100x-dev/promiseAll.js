globalThis.Promise.all = function (promises) {
  return promises.reduce((acc, promise) => {
    return acc.then((results) => {
      return Promise.resolve(promise).then((result) => {
        return [...results, result];
      });
    });
  }, Promise.resolve([]));
};

globalThis.Promise.all = function promiseAllRecursive(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  const [first, ...rest] = promises;
  return Promise.resolve(first).then((firstResult) => {
    return promiseAllRecursive(rest).then((results) => {
      return [firstResult, ...results];
    });
  });
};

// console.log(globalThis.Promise.all);

// Promise all
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 1 resolved"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 2 resolved"), 100);
});

Promise.all([p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));
