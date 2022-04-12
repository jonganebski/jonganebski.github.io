import { useMyI18n } from '~/plugins/i18n';
import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_MONTH, ONE_WEEK, ONE_YEAR } from './utils';

export function useTimeAgo() {
  const { t } = useMyI18n();

  function timeAgo(dateStr: string) {
    const agoEpoch = Date.now() - new Date(dateStr).getTime();
    const years = Math.floor(agoEpoch / ONE_YEAR);
    if (years) return t('years_ago', { years }, { plural: years });

    const months = Math.floor(agoEpoch / ONE_MONTH);
    if (months) return t('months_ago', { months }, { plural: months });

    const weeks = Math.floor(agoEpoch / ONE_WEEK);
    if (weeks) return t('weeks_ago', { weeks }, { plural: weeks });

    const days = Math.floor(agoEpoch / ONE_DAY);
    if (days) return t('days_ago', { days }, { plural: days });

    const hours = Math.floor(agoEpoch / ONE_HOUR);
    if (hours) return t('hours_ago', { hours }, { plural: hours });

    const minutes = Math.floor(agoEpoch / ONE_MINUTE);
    if (minutes) return t('minutes_ago', { minutes }, { plural: minutes });

    return t('just_now');
  }

  return { timeAgo };
}
