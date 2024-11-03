const sleep = function (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const afunc = async function () {
  console.log("salam");
  await sleep(3000);
  console.log("sagol");
};

afunc();
