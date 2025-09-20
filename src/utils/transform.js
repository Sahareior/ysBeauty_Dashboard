// utils/transform.js
import { formatDateTime } from "./format";

export const transformEventData = (eventData = []) =>
  eventData.map((event, i) => ({
    key: event.id || i + 1,
    id: event.id,
    name: event.event_name,
    startTime: event.start_time_date,
    endTime: event.end_time_date,
    location: event.address,
    status: event.status,
    paid: event.paid,
    description: event.description,
    is_active: event.is_active,
    displayTime: `${formatDateTime(event.start_time_date).date}, ${
      formatDateTime(event.start_time_date).time
    }`,
    displayLocation: event.address || "Not specified",
  }));

export const transformActivitiesData = (activitiesData = []) =>
  activitiesData.map((user, i) => ({
    key: user.id || i + 1,
    id: user.id,
    email: user.email,
    name: user.first_name,
    phone: user.phone,
    joinDate: user.created_at,
    status: user.is_active,
    displayJoinDate: formatDateTime(user.created_at).date,
    displayStatus: user.is_active ? "Active" : "Inactive",
  }));
