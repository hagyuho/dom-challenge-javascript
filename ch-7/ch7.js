const nonConflictData = [
  {
    startTime: "00:30",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:00",
    endTime: "10:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "19:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
];

function CreateView() {
  const $container = document.querySelector("#container");
  const $timeArea = document.createElement("div");
  const $eventArea = document.createElement("div");
  $eventArea.classList.add("eventArea");
  $container.appendChild($timeArea);
  $container.appendChild($eventArea);

  for (let i = 1; i <= 24; i++) {
    const $timeItem = document.createElement("div");
    $timeItem.classList.add("timeItem");
    $timeItem.textContent = i <= 12 ? i + ":00 AM" : i - 12 + ":00 PM";
    $timeArea.appendChild($timeItem);

    const $eventItem1 = document.createElement("div");
    const $eventItem2 = document.createElement("div");
    $eventItem1.classList.add("eventItem", "line");
    $eventItem2.classList.add("eventItem");

    $eventItem1.dataset.start = i - 0.5;
    $eventItem1.dataset.end = i;

    $eventItem2.dataset.start = i;
    $eventItem2.dataset.end = i + 0.5;

    $eventArea.appendChild($eventItem1);
    $eventArea.appendChild($eventItem2);
  }

  makeSchedule();
}

const makeSchedule = () => {
  const data = nonConflictData;
  for (let i = 0; i < data.length; i++) {
    let start = calculateDate(data[i].startTime);
    let end = calculateDate(data[i].endTime);
  }
};

const calculateDate = (time) => {
  let arr = time.split(":");
  const lastTime = time.split(":")[1] === "00" ? 0 : 0.5;
  return parseInt(arr[0]) + lastTime;
};
