import { type Elysia, t } from "elysia";
import { ApiError } from "../types/error";

const parameterSchema = t.Array(
  t.Object({
    key: t.String({
      minLength: 1,
      error: "Key cannot be empty",
    }),
    value: t.Any(),
  }),
  {
    minItems: 1,
    error: "Parameters array cannot be empty when provided",
  }
);

const bodySchema = t.Object({
  parameters: t.Optional(t.Union([parameterSchema, t.Null()])),
});

export const setupModelRoutes = (app: Elysia) =>
  app.group("/models", (app) =>
    app.post(
      "/",
      async ({ body }) => {
        try {
          return { message: body.parameters };
        } catch (error) {
          throw new ApiError("Failed to fetch models", 500);
        }
      },
      {
        body: bodySchema,
        detail: {
          tags: ["models"],
          summary: "List all models",
          description: "Retrieve a list of available models",
        },
      }
    )
  );
