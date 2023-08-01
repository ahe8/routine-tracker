export const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getFormattedDate() {
  const today = new Date();
  let month = MONTH[today.getMonth()];
  const yyyy = today.getFullYear();
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;

  let formattedToday = dd + " " + month + " " + yyyy;

  return formattedToday;
}
