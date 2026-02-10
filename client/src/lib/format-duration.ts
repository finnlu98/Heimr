import moment from "moment";

export function formatDuration(ms: number): string {
  const duration = moment.duration(ms);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  if (hours <= 0) return `${minutes} min`;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}