import express, { Request, Response } from "express";
import connection from "../../db/db";

export const getClubOptions: express.RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // send back club_id, club_name, club_img. From other tables. Total members, total posts for the last 24 hours.
    connection.query(
      //   "SELECT club_id, club_name, club_img FROM club LIMIT 4",
      "SELECT club_id, club_name, club_img FROM club WHERE LENGTH(club_img) > 10 LIMIT 4",
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Failed to fetch clubs from database" });
        } else {
          res.status(200).json({ clubs: result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch clubs from database" });
  }
};
