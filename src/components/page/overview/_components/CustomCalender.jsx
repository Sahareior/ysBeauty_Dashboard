import React, { useState } from "react";
import { Calendar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const CustomCalendar = () => {
  const [value, setValue] = useState(dayjs("2021-09-19"));

  const onChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white p-4 rounded-xl  w-full overflow-hidden">
      <h3 className="text-sm font-medium mb-2">Filter By</h3>
      <Calendar
        fullscreen={false}
        
        value={value}
        onChange={onChange}
        className=" overflow-hidden"
        headerRender={({ value }) => {
          const month = value.format("MMMM");
          const year = value.format("YYYY");

          return (
            <div className="flex justify-between overflow-hidden items-center px-2 mb-2">
              <button
                onClick={() => setValue(value.clone().subtract(1, "month"))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <LeftOutlined />
              </button>
              <span className="text-gray-600 font-medium">
                {month} {year}
              </span>
              <button
                onClick={() => setValue(value.clone().add(1, "month"))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <RightOutlined />
              </button>
            </div>
          );
        }}
        dateCellRender={(date) => {
          // ✅ highlight only one cell, don’t duplicate numbers
          const isSelected = date.isSame(dayjs("2021-09-19"), "day");
          return isSelected ? (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold">
              {date.date()}
            </div>
          ) : null; // return null for other days
        }}
      />
    </div>
  );
};

export default CustomCalendar;
