// utils/format.js
export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString("en-GB"),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};
