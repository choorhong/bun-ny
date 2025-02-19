import { Elysia } from "elysia";
import { ApiError } from "../types/error";

export const errorHandler = (app: Elysia) =>
  app.onError(({ error, set }) => {
    if (error instanceof ApiError) {
      set.status = error.statusCode;
      return {
        error: error.message,
        details: error.details,
      };
    }

    set.status = 500;
    return {
      error: "Internal Server Error",
      message: JSON.parse((error as Error).message),
    };
  });
