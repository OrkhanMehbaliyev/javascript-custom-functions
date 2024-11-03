const jobList = [];

const getAllJobIds = async () => {
  try {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json"
    );
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
const getRandomNumber = () => Math.floor(Math.random() * 31);
const fetchJobs = async (amount, jobIdList) => {
  const promiseArray = [];
  for (let i = 0; i < amount; i++) {
    const randNum = getRandomNumber();
    const randId = jobIdList[randNum];
    promiseArray.push(
      fetch(`https://hacker-news.firebaseio.com/v0/item/${randId}.json`)
    );
  }
  try {
    const responseArray = await Promise.all(promiseArray);
    const dataArray = Promise.all(responseArray.map((el) => el.json()));
    return dataArray;
  } catch (err) {
    throw new Error(err.message);
  }
};

const renderJobs = (jobsList) => {
  const container = document.querySelector(".container");
  jobsList.forEach((el) => {
    const jobItem = document.createElement("div");
    jobItem.classList.add("item");

    const title = document.createElement("h1");
    if (el.url) {
      const link = document.createElement("a");
      link.href = el.url;
      link.textContent = el.title;
      title.appendChild(link);
    } else {
      title.textContent = el.title;
    }

    const poster = document.createElement("p");
    poster.textContent = `Posted by: ${el.by}`;

    const date = document.createElement("p");
    date.textContent = `Date posted: ${new Date(
      el.time * 1000
    ).toLocaleDateString()}`;

    jobItem.appendChild(title);
    jobItem.appendChild(poster);
    jobItem.appendChild(date);
    container.appendChild(jobItem);
  });
};

const handleClick = async (e) => {
  try {
    const jobIdList = await getAllJobIds();
    const jobsList = await fetchJobs(6, jobIdList);
    renderJobs(jobsList);
  } catch (err) {
    throw new Error(err.message);
  }
};

async function main() {
  try {
    const button = document.querySelector("button");
    const jobArrayList = await getAllJobIds();
    const dataArray = await fetchJobs(6, jobArrayList);
    renderJobs(dataArray);
    button.addEventListener("click", handleClick);
  } catch (err) {
    throw new Error(err.message);
  }
}
main();
