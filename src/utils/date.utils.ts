export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const dayString = day < 10 ? `0${day}` : day.toString();
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : month.toString();
  const year = date.getFullYear();
  return `${dayString}/${monthString}/${year}`;
}
