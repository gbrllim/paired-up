//-----------Libraries-----------//
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

//-----------Firebase-----------//
import { database } from "../../firebase/firebase.js";
import {
  onChildAdded,
  ref,
  onChildChanged,
  onChildRemoved,
  off,
} from "firebase/database";

//-----------Components-----------//
import ContextHelper from "../Helpers/ContextHelper";

//Database key for date-list
const REALTIME_DATABASE_KEY_DATE = "date-list";

const NextDate = () => {
  //context helper to pull from database
  const REALTIME_DATABASE_KEY_PAIRKEY = ContextHelper("pairKey");

  //states
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState(null);

  //get date list dates
  useEffect(() => {
    //to view Date list
    const dateListRef = ref(
      database,
      `rooms/${REALTIME_DATABASE_KEY_PAIRKEY}/${REALTIME_DATABASE_KEY_DATE}`,
    );

    const dateListCallback = (data) => {
      setDateList((state) => [...state, { key: data.key, val: data.val() }]);
    };

    onChildAdded(dateListRef, dateListCallback);
    onChildChanged(dateListRef, dateListCallback);
    onChildRemoved(dateListRef, (data) => {
      // Remove the item from the list
      setDateList((state) => state.filter((item) => item.key !== data.key));
    });

    // Clean up the listeners when the component unmounts
    return () => {
      off(dateListRef, dateListCallback);
    };
  }, [REALTIME_DATABASE_KEY_PAIRKEY]);

  ////get the nearest date from dateList////

  // Calculate number of days left
  const calculateDaysLeft = (targetDate) => {
    const currentDate = new Date();
    const registeredDate = new Date(targetDate);
    const timeDifference = registeredDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  // Format date for presentation :)
  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //function to sort date
  const getListByName = () => {
    const listToDisplay = dateList;

    // Sorts by date
    const sortedList = Array.from(listToDisplay).sort((a, b) => {
      const daysLeftA = calculateDaysLeft(a.val.startTime);
      const daysLeftB = calculateDaysLeft(b.val.startTime);
      return daysLeftA - daysLeftB;
    });

    return sortedList;
  };

  useEffect(() => {
    if (dateList.length > 0) {
      // Sort the dateList by the nearest date
      const sortedList = getListByName();

      // Set the date state with the nearest date
      setDate(sortedList[0]);
    }
  }, [dateList]);

  return (
    <NavLink
      to="/dates"
      className="j mt-[90px] flex w-3/4 min-w-[20em] max-w-[30em] flex-row items-center rounded-xl bg-window bg-opacity-80 p-2 text-accent shadow-xl hover:translate-y-[-2px] hover:scale-[1.05] hover:bg-opacity-95"
    >
      {date && (
        <div key={date.key} className="w-full ">
          <h1 className="text-center text-xl font-bold ">Next Date:</h1>
          <h1 className="text-center text-xl font-bold">
            {formattedDate(date.val.startTime)}
          </h1>
          <h1 className="w-full px-2 text-center font-bold">
            {date.val.title}
          </h1>
        </div>
      )}
    </NavLink>
  );
};

export default NextDate;
