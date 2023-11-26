import { prisma } from "infra/config/prisma";
import info from "../exchangeInfo.json";
import fs from "fs";

async function exec() {
  // const id = "65518274c27e656c83aea14d";
  // const userId = "653d296a1ea14483e357cd1a";
  // const data = await prisma.user.findMany();
  // console.log(data);
  // const key = "chaveee";
  // await prisma.apiKey.create({ data: { key, userId } });
  // const opa: string[] = [];
  // const symbols = info.symbols.forEach((symbol) => {
  //   opa.push(symbol.symbol);
  //   // const sym = symbol.symbol as string;
  //   // // if (sym.includes("BRL")) opa.push(sym);
  // });
  // const sorted = opa.sort();
  // console.log(sorted);
  // escreverArrayEmArquivo("coins.json", sorted);
}

// function escreverArrayEmArquivo(nomeArquivo: string, array: any[]) {
//   // Converta o array para uma string formatada
//   // const conteudo = array.join("\n");

//   // Escreva a string no arquivo
//   fs.writeFile(nomeArquivo, JSON.stringify(array), "utf8", (err) => {
//     if (err) {
//       console.error("Erro ao escrever no arquivo:", err);
//     } else {
//       console.log(`Conteúdo do array foi escrito no arquivo ${nomeArquivo} com sucesso.`);
//     }
//   });
// }

exec();
