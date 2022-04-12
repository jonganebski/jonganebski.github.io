export const ONE_SECOND = 1_000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_MONTH = ONE_DAY * 30;
export const ONE_YEAR = ONE_DAY * 365;

export function epoch({
  years = 0,
  months = 0,
  weeks = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}) {
  return (
    ONE_YEAR * years +
    ONE_MONTH * months +
    ONE_WEEK * weeks +
    ONE_DAY * days +
    ONE_HOUR * hours +
    ONE_MINUTE * minutes +
    ONE_SECOND * seconds
  );
}
