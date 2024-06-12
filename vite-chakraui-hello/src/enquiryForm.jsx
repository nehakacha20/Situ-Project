import React, { useState, useEffect } from 'react';
import { ChakraProvider, FormControl, FormLabel, FormHelperText, Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays, addYears } from 'date-fns';

const DatePickerComponent = ({ bookedRanges, onDatesChange }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate) {
      calculateNumberOfNights(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    calculateNumberOfNights(checkInDate, date);
    if (checkInDate) {
      onDatesChange({ checkInDate, checkOutDate: date, numberOfNights });
    }
  };

  const calculateNumberOfNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(checkOut, checkIn);
      setNumberOfNights(nights);
      onDatesChange({ checkInDate, checkOutDate: checkOut, numberOfNights: nights });
    }
  };

  useEffect(() => {
    onDatesChange({ checkInDate, checkOutDate, numberOfNights });
  }, [checkInDate, checkOutDate, numberOfNights]);

  return (
    <ChakraProvider>
      <FormControl>
        <FormLabel htmlFor='checkInDate'>Check-in Date</FormLabel>
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
          <DatePicker
            id='checkInDate'
            selected={checkInDate}
            onChange={handleCheckInChange}
            minDate={new Date()}
            maxDate={addYears(new Date(), 1)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            dateFormat='dd/MM/yyyy'
            excludeDateIntervals={bookedRanges}
          />
        </Box>
        <FormHelperText>Please select the check-in date</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='checkOutDate'>Check-out Date</FormLabel>
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
          <DatePicker
            id='checkOutDate'
            selected={checkOutDate}
            onChange={handleCheckOutChange}
            minDate={checkInDate}
            maxDate={addYears(new Date(), 1)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            disabled={!checkInDate}
            dateFormat='dd/MM/yyyy'
            excludeDateIntervals={bookedRanges}
          />
        </Box>
        <FormHelperText>Please select the check-out date</FormHelperText>
      </FormControl>
      {numberOfNights > 0 && (
        <p>Number of nights: {numberOfNights}</p>
      )}
    </ChakraProvider>
  );
};

export default DatePickerComponent;
