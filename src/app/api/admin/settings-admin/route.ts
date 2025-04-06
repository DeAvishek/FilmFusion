import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/db";
import SettingModel from "@/app/Model/adminsetting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      let settings = await SettingModel.findOne();
      if (!settings) {
        settings = await SettingModel.create({});
      }
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch settings", error });
    }
  }

  if (req.method === "PUT") {
    try {
      const update = req.body;
      const updatedSettings = await SettingModel.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
      });
      return res.status(200).json(updatedSettings);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update settings", error });
    }
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
