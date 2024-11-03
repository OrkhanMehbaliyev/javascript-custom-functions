const debounce = function (callback, wait) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};

const obj = {
  value: 0,
  increment(number) {
    this.value += number;
    console.log(this.value);
  },
};

obj.debouncedIncrement = debounce(obj.increment, 1000);

obj.debouncedIncrement(1);

setTimeout(() => {
  obj.debouncedIncrement(10);
}, 700);

setTimeout(() => {
  obj.debouncedIncrement(20);
}, 800);

setTimeout(() => {
  obj.debouncedIncrement(30);
}, 900);
