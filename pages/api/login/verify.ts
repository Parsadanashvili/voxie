import { Session } from "./../../../contexts/types";
const jwt = require("jsonwebtoken");
import getConfig from "next/config";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
const { serverRuntimeConfig } = getConfig();

interface ResponseData extends Session {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      return verify();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function verify() {
    const { email, otp }: { email: string; otp: string } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw "Otp not found";

    const findOtp = await prisma.oTP.findFirst({
      where: {
        email,
        otp,
      },
    });

    if (!findOtp) throw "Otp not found";

    await prisma.oTP.delete({
      where: { email },
    });

    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    const today = new Date();
    const afterOneWeek = new Date().setDate(today.getDate() + 7);

    // return basic user details and token
    return res.status(200).json({
      user: user,
      accessToken: token,
      expiresAt: new Date(afterOneWeek).toLocaleString(),
    });
  }
}
