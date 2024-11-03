const throttle = function (callback, wait) {
  let isFinished = true;

  return function (...args) {
    if (isFinished) {
      isFinished = false;
      callback.apply(this, args);
      setTimeout(() => {
        isFinished = true;
      }, wait);
    }
  };
};

function saySomething(smth) {
  console.log("You said", smth);
}

const throttledSaySomething = throttle(saySomething, 700);

throttledSaySomething("1");
setTimeout(() => throttledSaySomething("2"), 300);
setTimeout(() => throttledSaySomething("3"), 600);
setTimeout(() => throttledSaySomething("4"), 900);
setTimeout(() => throttledSaySomething("5"), 1000);
setTimeout(() => throttledSaySomething("6"), 1800);
