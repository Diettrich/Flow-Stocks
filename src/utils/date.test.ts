import { formatDate } from './date.utils';

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const dateString = '2022-01-01T00:00:00.000Z';
    const expectedFormattedDate = '01/01/2022';

    const formattedDate = formatDate(dateString);

    expect(formattedDate).toEqual(expectedFormattedDate);
  });

  it('handles single-digit day and month values correctly', () => {
    const dateString = '2022-02-02T00:00:00.000Z';
    const expectedFormattedDate = '02/02/2022';

    const formattedDate = formatDate(dateString);

    expect(formattedDate).toEqual(expectedFormattedDate);
  });
});
