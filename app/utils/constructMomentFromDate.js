import moment from 'moment';

const constructMomentFromDate = dateString => {
  if (moment.isMoment(dateString)) {
    return dateString;
  }

  return moment(dateString);
};

export default constructMomentFromDate;
