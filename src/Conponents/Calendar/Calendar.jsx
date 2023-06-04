import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar = ({value, handleDateChange}) => {
  return (
    <DateRange
      rangeColors={['#f43f5e']}
      ranges={[value]}
      onchange={handleDateChange}
      date={value.startDate}
      direction='vertical'
      showDateDisplay={false}
      minDate={value.startDate}
      maxDate={value.endDate}
    />
  )
}

export default Calendar;