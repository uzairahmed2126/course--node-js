import fs from "fs";
fs.writeFile(
  "./file creator/data.txt",
  "Hello Uzair! Welcome to Node.js File System.",
  (err, data) => {
    if (err) {
      console.log("Error writing file", err);
    }
    console.log("File written successfully!", data);

    fs.readFile("./file creator/data.txt", "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file", err);
      }
      console.log(data);
    });
    const logEntry = `${new Date().toISOString()}: Application started\n`;

    fs.appendFile("./file creator/data.txt", logEntry, (err) => {
      if (err) {
        console.log("❌ Error appending file:", err);
      } else {
        console.log("✅ Log entry appended successfully!");
      }
    });
  }
);
