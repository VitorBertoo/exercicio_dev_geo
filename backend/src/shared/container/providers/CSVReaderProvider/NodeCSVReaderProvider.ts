import fs from "fs";
import csv from "csv-parser";
import { CSVRow } from "./ICSVReaderProvider";

export class NodeCSVReaderProvider {
  async readCSVFile(filePath: string): Promise<CSVRow[]> {
    let count = 0;
    const maxRows = 200;

    return new Promise((resolve, reject) => {
      const results: CSVRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          // adicionando um limite de linhas para mandar pro front
          // nenhuma pessoa em pleno juizo renderizaria 61k pontos no mapa (eu acho)
          if (count < maxRows)
            // pegando só as informações mais importantes para ter objetos menores
            results.push({
              latitude: data.latitude,
              longitude: data.longitude,
              poi_counts: data.censo_2022_domicilio_particular_poi_counts
            });

          count++;
        })
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  }
}
