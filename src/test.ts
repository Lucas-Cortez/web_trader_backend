import { prisma } from "infra/config/prisma";
import * as crypto from "crypto";
import { BollingerBands } from "technicalindicators";

const algorithm = "aes-256-cbc";
const secretKey = generateRandomKey(); // Mantenha isso seguro!
// const iv = crypto.randomBytes(16);

function generateRandomKey(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Função para criptografar uma chave de API
function encrypt(apiKey: string, secretKey: string): string {
  if (secretKey.length !== 64) {
    throw new Error("A chave secreta deve ter 64 caracteres hexadecimais (32 bytes).");
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(apiKey, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

// Função para descriptografar uma chave de API
function decrypt(encryptedApiKey: string, secretKey: string): string {
  if (secretKey.length !== 64) {
    throw new Error("A chave secreta deve ter 64 caracteres hexadecimais (32 bytes).");
  }

  const [ivString, encryptedString] = encryptedApiKey.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(ivString, "hex"),
  );
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedString, "hex")), decipher.final()]);
  return decrypted.toString();
}

async function exec() {
  // const id = "65518274c27e656c83aea14d";
  // const userId = "653d296a1ea14483e357cd1a";

  // const data = await prisma.user.findMany();
  // console.log(data);

  // const key = "chaveee";

  // await prisma.apiKey.create({ data: { key, userId } });

  // var period = 14;

  // var input = {
  //   period: period,
  //   values: [
  //     48.16, 48.61, 48.75, 48.63, 48.74, 49.03, 49.07, 49.32, 49.91, 50.13, 49.53, 49.5, 49.75, 50.03, 50.31,
  //     50.52, 50.41, 49.34, 49.37, 50.23, 49.24, 49.93, 48.43, 48.18, 46.57, 45.41, 47.77, 47.72, 48.62, 47.85,
  //   ],
  //   stdDev: 2,
  // };

  // const data = BollingerBands.calculate(input);

  // console.log(data.length);

  // Função para criptografar uma chave de API

  // ====================================================================

  // Exemplo de uso
  console.log("Chave aleatória de 32 bytes:", secretKey);

  const apiKeyOriginal = "minhachavedeapisupersecreta";

  // Criptografar a chave de API antes de armazenar no banco de dados
  const apiKeyCriptografada = encrypt(apiKeyOriginal, secretKey);
  console.log("Chave de API original:", apiKeyOriginal);
  console.log("Chave de API criptografada:", apiKeyCriptografada);

  // Descriptografar a chave de API quando precisar usá-la
  const apiKeyDescriptografada = decrypt(apiKeyCriptografada, secretKey);
  console.log("Chave de API descriptografada:", apiKeyDescriptografada);
}

exec();
