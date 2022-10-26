import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import prisma from "../../../lib/prisma";
import { decode } from "@utils/jwt-token";

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return user();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function user() {
    try {
      const token = req.headers.authorization;

      var decoded = await decode({
        token,
        secret: serverRuntimeConfig.jwtSecret,
      });

      if (decoded) {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(decoded.sub),
          },
        });

        // return basic user details and token
        return res.status(200).json({
          user: user,
          accessToken: token,
          expiresAt: new Date(decoded.exp ?? "").toLocaleString(),
        });
      }
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  }
}
