import { type Elysia, t } from "elysia";
import { ApiError } from "../types/error";

const messageSchema = t.Object({
  message: t.String({
    minLength: 1,
    errorMessage: "Message is required",
  }),
});

export const setupChatRoutes = (app: Elysia) =>
  app.group("/chat", (app) =>
    app.post(
      "/",
      async ({ body }) => {
        try {
          return {
            message: body.message,
          };
        } catch (error) {
          if (error instanceof ApiError) throw error;
          throw new ApiError("Chat completion failed", 500);
        }
      },
      {
        body: messageSchema,
        detail: {
          tags: ["chat"],
          summary: "Send a chat message",
          description: "Send a message and receive a response",
        },
      }
    )
  );
