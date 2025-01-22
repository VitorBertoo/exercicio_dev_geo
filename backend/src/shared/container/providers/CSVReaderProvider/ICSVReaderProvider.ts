export interface CSVRow {
  [key: string]: string;
}

export interface ICSVReaderProvider {
  readCSVFile(filePath: string): Promise<CSVRow[]>;
}
