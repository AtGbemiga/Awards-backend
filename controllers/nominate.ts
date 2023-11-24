import express, { Request, Response } from "express";
import connection from "../db/db";

// for sending files as form data
import { upload } from "../multer/multer";
import cloudinary from "../cloudinary/cloudinary";

export const createNomination: express.RequestHandler = async (
  req: Request,
  res: Response
) => {
  // get the relevant data from req.body

  const {
    award_name,
    hero_name,
    award_reason,
    hero_contact,
    your_name,
    your_email,
    phone_number,
    contact_you,
    join_newsletter: rawJoinNewsletter,
  } = req.body;

  let join_newsletter: string;

  if (rawJoinNewsletter === undefined) {
    join_newsletter = "no";
  } else {
    join_newsletter = rawJoinNewsletter;
  }

  // check if the body contains award_name, hero_name, award_reason, hero_contact, your_name, your_email, phone_number, contact_you, join_newsletter
  if (
    !award_name ||
    !hero_name ||
    !award_reason ||
    !hero_contact ||
    !your_name ||
    !your_email ||
    !phone_number ||
    !contact_you ||
    !join_newsletter
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // insert data into database
  connection.query(
    "INSERT INTO nominees SET ?",
    {
      award_name,
      hero_name,
      award_reason,
      hero_contact,
      your_name,
      your_email,
      phone_number,
      contact_you,
      join_newsletter,
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Failed to insert data into database" });
      }
      res.status(200).json({ message: "Data inserted successfully" });
    }
  );
};

// get nominations Submitted via form
export const getNominations: express.RequestHandler = async (
  req: Request,
  res: Response
) => {
  connection.query("SELECT * FROM nominees", (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Failed to fetch nominations from database" });
    } else if (result.length < 1) {
      return res.status(404).json({ error: "No nominations found" });
    } else {
      res.status(200).json({ nominations: result });
    }
  });
};

// showcased nominations on the nomination page
export const createShowcasedNominationsOnTheNominationPage = async (
  //good
  req: Request,
  res: Response
): Promise<void> => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      console.log(err);
    }
    // create uniqueIdentifier for the image
    const uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // create publicId for the image for cloudinary
    const publicId = `image-${uniqueIdentifier}`;

    // handle if no req.file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: publicId,
    });

    // create post object
    const post = {
      awardName: req.body.awardName,
      content: req.body.content,
      picture: result.secure_url,
    };

    // send post to mySQL database
    connection.query(
      "INSERT INTO showcased_nominees SET ?",
      post,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ message: result });
      }
    );
  });
};

export const getShowcasedNominationsOnTheNominationPage: express.RequestHandler =
  async (req: Request, res: Response) => {
    connection.query(
      "SELECT id, awardName, picture, content FROM showcased_nominees",
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Failed to fetch nominations from database" });
        } else if (result.length < 1) {
          return res.status(404).json({ error: "No nominations found" });
        } else {
          res.status(200).json({ nominations: result });
        }
      }
    );
  };