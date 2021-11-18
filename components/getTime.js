export const time = () => {
  let date = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return (
    hours +
    ":" +
    minutes +
    " " +
    ampm +
    " " +
    date.getDate() +
    "/" +
    monthNames[date.getMonth()]
  );
};

export const greet = () => {
  let date = new Date();
  let hours = date.getHours();

  if (hours < 12) return "Good Morning!";
  else if (hours >= 12 && hours <= 17) return "Good Afternoon!";
  else return "Good Evening!";
};

export const lightDark = () => {
  let date = new Date();
  if (date.getHours() >= 3 && date.getHours() < 19) return true;
  else return false;
};
