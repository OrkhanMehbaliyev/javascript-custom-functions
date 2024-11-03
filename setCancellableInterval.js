const setCancellableInterval = function (callback, delay, ...args) {
  const interval = setInterval(callback, delay, ...args);
  return () => clearInterval(interval);
};

const cancel = setCancellableInterval(callback, 50, "salam", "sagol");

setTimeout(cancel, 1000);

function callback(a, b) {
  console.log(a);
  console.log(b);
}
