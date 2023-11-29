import express, { Request, Response } from "express";
import connection from "../../db/db";

export const getFullInfo: express.RequestHandler = async (
  //good
  req: Request,
  res: Response
) => {
  // get the id from the query
  const video_id = Number(req.query.video_id);
  connection.query(
    "SELECT id, video, detail, creator, likes, views FROM short_videos ORDER BY id = ? DESC, id",
    [video_id],
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
