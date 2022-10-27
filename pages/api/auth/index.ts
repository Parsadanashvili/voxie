import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import GenerateOtp from "@utils/generate-otp";

interface ResponseData {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      return auth();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function auth() {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw "User not found";

    const findOtp = await prisma.oTP.findFirst({
      where: {
        email,
      },
    });

    if (findOtp?.id != null) {
      await prisma.oTP.delete({
        where: {
          id: findOtp.id,
        },
      });
    }

    let otp = GenerateOtp(4);

    await prisma.oTP.create({
      data: {
        email,
        otp,
      },
    });

    return res.status(200).json({
      message: "Otp generated successfully",
    });
  }
}
