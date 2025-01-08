import fs from "fs";
import path from "path";

// Define the log file path
const logFilePath = path.join(__dirname, "activity.log");

// Function to log actions
export const logAction = (action: string, details: string) => {
  const logEntry = `[${new Date().toISOString()}] ${action} - ${details}\n`;
  fs.appendFileSync(logFilePath, logEntry); // Append log entry to file
};
