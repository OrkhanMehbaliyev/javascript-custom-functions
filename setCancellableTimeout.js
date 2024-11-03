const setCancellableTimeout = function (callback, delay, ...args) {
  const timeout = setTimeout(callback, delay, ...args);

  return () => clearTimeout(timeout);
};

const cancel = setCancellableTimeout(callback, 1000, 9, 99, 999);

setTimeout(cancel, 500);
// setTimeout(cancel, 1500);

function callback(a, b, c) {
  console.log("Timeout callback returns:", a + b + c);
}
