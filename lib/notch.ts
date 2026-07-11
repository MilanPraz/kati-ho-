// Reusable "receipt notch" background image — creates the jagged/perforated
// paper-ticket edge that is the signature visual motif across the app.
export const notchStyle = (fill: string, tooth = 16, height = 14) => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${tooth}' height='${height}'%3E%3Cpath d='M0 0 L${
    tooth / 2
  } ${height} L${tooth} 0 Z' fill='${fill}'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat-x" as const,
  backgroundSize: `${tooth}px ${height}px`,
});
