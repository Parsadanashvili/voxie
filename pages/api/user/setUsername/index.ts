import { decode } from "@utils/jwt-token";
import prisma from "lib/prisma";
import storage from "lib/storage";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return setUsername();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function setUsername() {
    try {
      const token = req.headers.authorization;

      let { username } = req.body;

      var decoded = await decode({
        token,
        secret: serverRuntimeConfig.jwtSecret,
      });

      if (decoded) {
        if (!username) {
          return res.status(400).send("Username field is required");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: Number(decoded.sub),
          },
        });

        if (user?.id) {
          const checkUsername = await prisma.user.findFirst({
            where: {
              username,
            },
          });

          if (!checkUsername) {
            await prisma.user.update({
              where: {
                id: Number(decoded.sub),
              },
              data: {
                username,
              },
            });

            return res.status(200).send("");
          }

          return res.status(400).json({
            message: "Username already taken",
          });
        }
      }

      return res.status(401).send("Unauthorized");
    } catch (err) {
      return res.status(400).send("");
    }
  }
}
