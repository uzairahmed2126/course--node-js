import { add, sub } from "./server.js";
import os from "os"
const machinName  = os.platform;
console.log(machinName())
console.log(add(5, 5));
console.log(sub(5, 2));
