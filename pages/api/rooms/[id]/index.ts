import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import prisma from "../../../../lib/prisma";
import { decode } from "@utils/jwt-token";

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return index();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function index() {
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

        if (user) {
          const { id: roomId } = req.query;

          const room = await prisma.room.findFirst({
            where: {
              id: Number(roomId),
            },
            include: {
              users: true,
            },
          });

          return res.json({
            data: room,
          });
        }
      }

      return res.status(401).json({
        message: "Unauthorized",
      });
    } catch (err) {
      return res.send(err);
    }
  }
}
