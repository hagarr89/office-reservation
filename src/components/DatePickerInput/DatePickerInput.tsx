import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const DatePickerInput = ({
  date,
  onChangeDate,
  maxDate,
}: {
  date: Dayjs;
  onChangeDate: (value: Dayjs | null) => void;
  maxDate?: Dayjs;
}) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select a date"
          value={date}
          views={["month", "year"]}
          format="MM-YYYY"
          onChange={onChangeDate}
          autoFocus={true}
          defaultValue={date}
          maxDate={maxDate}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerInput;
