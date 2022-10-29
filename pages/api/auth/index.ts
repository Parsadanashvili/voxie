import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import mailer from "../../../lib/mailer";
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

    if (!user) {
      await prisma.user.create({
        data: {
          email,
        },
      });
    }

    const findOtp = await prisma.oTP.findFirst({
      where: {
        email,
      },
    });

    let otp = GenerateOtp(4);

    if (findOtp?.id != null) {
      await prisma.oTP.update({
        where: {
          email,
        },
        data: {
          otp,
        },
      });
    } else {
      await prisma.oTP.create({
        data: {
          email,
          otp,
        },
      });
    }

    mailer.send({
      from: process.env.MAIL_FROM as string,
      to: email,
      subject: `One time password - ${otp}`,
      text: `Your one time password is - ${otp}`,
      html: `<div>Your one time password is - ${otp}</div>`,
    });

    return res.status(200).json({
      message: "Otp generated successfully",
    });
  }
}
