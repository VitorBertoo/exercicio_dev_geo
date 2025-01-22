import fs from "fs";
import csv from "csv-parser";
import { CSVRow } from "./ICSVReaderProvider";

export class NodeCSVReaderProvider {
  async readCSVFile(filePath: string): Promise<CSVRow[]> {
    return new Promise((resolve, reject) => {
      const results: CSVRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  }
}
