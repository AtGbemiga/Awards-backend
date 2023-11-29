import express, { Request, Response } from "express";
import connection from "../../db/db";

export const getLimitedInfo: express.RequestHandler = async (
  req: Request,
  res: Response
) => {
  connection.query(
    "SELECT id, video, likes, views FROM short_videos ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Error fetching data. Try again later." });
      } else if (result.length < 1) {
        res.status(404).json({ error: "No Reel found" });
      } else {
        res.status(200).json({ reels: result });
      }
    }
  );
};
