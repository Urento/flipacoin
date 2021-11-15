import { PrismaClient } from ".prisma/client";
import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ error: "Email or Password not found in body" });
    return;
  }

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    res.status(400).json({ error: "email is not valid" });
    return;
  }

  const e = await prisma.user.findFirst({ where: { email } });
  if (e) {
    res.status(400).json({ error: "email is already used" });
    return;
  }

  try {
    const encryptedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: encryptedPassword,
        points: 1000,
      },
    });

    res.status(200).json({ user });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error while creating account" });
    return;
  }
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
