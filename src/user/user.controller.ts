import express, { Request, Response } from "express";
import { RequestParams } from "./types";
import { User } from "./user.interface";
import * as userService from "./user.service";

export const userRouter = express.Router();

userRouter.get(
  "/",
  async (req: Request<{}, {}, {}, RequestParams>, res: Response) => {
    try {
      const { fullnameSearch, minAge, maxAge, type, limit } = req.query;
      const params: RequestParams = {
        fullnameSearch,
        minAge,
        maxAge,
        type,
        limit,
      };

      const users: User[] = await userService.findAll(params);

      if (users.length) {
        return res.send(users);
      }
      return res.send(
        "User data is missing or does not match the search and filter criteria"
      );
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
