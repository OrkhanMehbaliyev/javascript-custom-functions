function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Example function with callback as last argument
// The callback has the signature `(err, value) => any`
function foo(url, options, callback) {
  fetch(url, options)
    .then((data) => data.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

const promisifiedFoo = promisify(foo);

async function test() {
  const data = await promisifiedFoo(
    "https://jsonplaceholder.typicode.com/todos/1",
    null,
    (err, value) => {
      console.log(value);
    }
  );
}

test();
