import { prisma } from "infra/config/prisma";
import { z } from "zod";

async function exec() {
  const data = await prisma.strategy.createMany({
    data: [
      {
        tag: "bollinger_bands",
        name: "Bollinger Bands",
        title: "Bandas de Bollinger (BB)",
        description:
          "É uma estratégia de análise na qual são utilizadas duas bandas que se ajustam à volatilidade do mercado. A compra ocorre quando o preço atinge a banda inferior, e a venda quando o preço atinge a banda superior.",
      },
      {
        tag: "relative_strength_index",
        name: "Relative Strength Index",
        title: "Indíce de Força Relativa (IFR)",
        description:
          "É uma estratégia na qual é utilizado um indicador para identificar oportunidades de compra quando o ativo está sobrevendido (abaixo de 30) e de venda quando está sobrecomprado (acima de 70). Isso ajuda a tomar decisões de negociação com base na força e direção da tendência do mercado.",
      },
    ],
  });
}

exec();
