import moment from 'moment';

/**
 * Date Range validator helper
 */

export const isValidDateRange = (startDateObject, endDateObject) => {
  const startDate = moment(startDateObject)
    .hour(0)
    .minute(0)
    .second(0);

  const endDate = moment(endDateObject)
    .hour(0)
    .minute(0)
    .second(0);

  return startDate.isSameOrBefore(endDate);
};

export default isValidDateRange;
