const jwt = require("jsonwebtoken");
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import prisma from "../../../lib/prisma";

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return user();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function user() {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      var decoded = jwt.verify(token, serverRuntimeConfig.jwtSecret);

      const user = await prisma.user.findFirst({
        where: {
          id: decoded.sub,
        },
      });

      // return basic user details and token
      return res.status(200).json({
        user: user,
        expiresAt: new Date(decoded.exp).toLocaleString(),
      });
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  }
}
