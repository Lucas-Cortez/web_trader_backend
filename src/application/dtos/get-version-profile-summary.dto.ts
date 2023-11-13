import { Dto } from "core/contracts/dto";
import { Request } from "express";
import { z } from "zod";

const getVersionProfileSummarySchema = z.object({
  userId: z.string(),
  profileId: z.string(),
  version: z.coerce.number(),
});

export class GetVersionProfileSummaryDto extends Dto {
  constructor(
    public readonly profileId: string,
    public readonly version: number,
    public readonly userId: string,
  ) {
    super();
  }

  public static parse(request: Request) {
    const { user } = request;
    const { profileId, version } = request.params;

    super.validate({
      getVersionProfileSummary: getVersionProfileSummarySchema.safeParse({
        profileId,
        version,
        userId: user?.id,
      }),
    });

    return new GetVersionProfileSummaryDto(profileId, Number(version), user?.id || "");
  }
}
