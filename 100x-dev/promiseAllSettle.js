globalThis.Promise.allSettled = function (promises) {
  return promises.reduce((acc, promise) => {
    return acc.then((results) => {
      return Promise.resolve(promise)
        .then((result) => {
          return [...results, { status: "fulfilled", value: result }];
        })
        .catch((err) => {
          return [...results, { status: "rejected", reason: err }];
        });
    });
  }, Promise.resolve([]));
};

globalThis.Promise.allSettled = function promiseAllSettledRecursive(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  const [first, ...rest] = promises;
  return Promise.resolve(first)
    .then((firstResult) => {
      return promiseAllSettledRecursive(rest).then((results) => {
        return [{ status: "fulfilled", value: firstResult }, ...results];
      });
    })
    .catch((err) => {
      return promiseAllSettledRecursive(rest).then((results) => {
        return [{ status: "rejected", reason: err }, ...results];
      });
    });
};

globalThis.Promise.allSettled = function (promises) {
  const results = promises.map((promise) =>
    Promise.resolve(promise)
      .then((res) => ({ status: "fulfilled2", value: res }))
      .catch((err) => ({ status: "rejected2", reason: err }))
  );
  return Promise.all(results);
};

// Promise all
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 1 rejected"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 2 resolved"), 100);
});

Promise.allSettled([p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error("rejected: ", err));

// [
//   {
//     status: "rejected",
//     reason: "Promise 1 resolved",
//   },
//   {
//     status: "fulfilled",
//     value: "Promise 2 resolved",
//   },
// ];
