import { PrismaClient } from ".prisma/client";
import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email or Password not found in body" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: { email },
    select: { email: true, password: true, id: true },
  });
  if (!user) {
    res.status(400).json({ error: "account not found" });
    return;
  }

  try {
    const verifyPassword = await argon2.verify(user.password, password);
    if (!verifyPassword) {
      res.status(500).json({ error: "account not found" });
      return;
    }

    // generate token
  } catch (err) {
    res.status(500).json({ error: "account not found" });
    return;
  }
}
