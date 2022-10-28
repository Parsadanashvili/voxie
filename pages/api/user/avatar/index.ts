import { decode } from "@utils/jwt-token";
import prisma from "lib/prisma";
import storage from "lib/storage";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return avatar();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function avatar() {
    try {
      const token = req.headers.authorization;

      let { name, type } = req.body;

      var decoded = await decode({
        token,
        secret: serverRuntimeConfig.jwtSecret,
      });

      if (decoded) {
        if (!name || !type) {
          return res.status(400).send("Name and type fields are required");
        }

        const user = await prisma.user.findFirst({
          where: {
            id: Number(decoded.sub),
          },
        });

        if (user?.id) {
          const url = await storage.createPresignedPost({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Fields: {
              Key: `${user.id}/${name}`,
              "Content-Type": type,
            },
            Expires: 600,
            Conditions: [["content-length-range", 1, 10485760]],
          });

          await prisma.user.update({
            data: {
              avatar: `${url.url}/${url.fields.Key}`,
            },
            where: {
              id: Number(decoded.sub),
            },
          });

          return res.status(200).json(url);
        }
      }

      return res.status(401).send("Unauthorized");
    } catch (err) {
      return res.status(400).send("");
    }
  }
}
