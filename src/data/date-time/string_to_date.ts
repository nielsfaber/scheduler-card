


export function stringToDate(timeString: string) {
  const parts = timeString.split(':').map(Number);
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...parts);
}