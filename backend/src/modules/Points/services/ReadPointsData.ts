import { CSVRow, ICSVReaderProvider } from "@shared/container/providers/CSVReaderProvider/ICSVReaderProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import path from "path";

@injectable()
export class ReadPointsData {
  constructor(
    @inject("CSVReaderProvider")
    private readonly csvReaderProvider: ICSVReaderProvider
  ) {}

  async execute(): Promise<CSVRow[]> {
    try {
      const filePath = path.resolve(__dirname, "../infra/db/files/base_jales_separado_virgula.csv");
      const data = await this.csvReaderProvider.readCSVFile(filePath);

      return data;
    } catch (error) {
      console.error(error);
      throw new AppError("Falha ao ler dados");
    }
  }
}
