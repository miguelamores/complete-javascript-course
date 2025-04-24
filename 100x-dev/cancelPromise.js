function withTimeout(promise, ms) {
  const timeOutPromise = new Promise((_, reject) =>
    setTimeout(() => reject("Timeout exceeded"), ms)
  );
  return Promise.race([promise, timeOutPromise]);
}

const myPromise = new Promise((resolve) =>
  setTimeout(() => resolve("My resolved promise"), 3000)
);

withTimeout(myPromise, 4000);

function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const abort = setTimeout(() => controller.abort(), ms);

  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(abort)
  );
}

fetchWithTimeout("https://someendpoint.com", 5000)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
