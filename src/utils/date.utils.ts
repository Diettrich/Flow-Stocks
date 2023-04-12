import { Month } from '@/types';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const dayString = day < 10 ? `0${day}` : day.toString();
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : month.toString();
  const year = date.getFullYear();
  return `${dayString}/${monthString}/${year}`;
}

export function getMonth(timestamp: Date): Month {
  const monthNumber: number = timestamp.getMonth();
  switch (monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      throw new Error('Invalid month number');
  }
}
