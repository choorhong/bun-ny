import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { errorHandler } from "./src/middleware/error-handler";
import { setupRoutes } from "./src/routes";

const app = new Elysia()
  .use(errorHandler)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Bun OpenAI API",
          version: "1.0.0",
        },
        tags: [
          { name: "chat", description: "Chat completion endpoints" },
          { name: "models", description: "Model management endpoints" },
        ],
      },
    })
  )
  .use(setupRoutes)
  .listen(3000);

console.log(
  `🦊 Swagger API documentation available at http://localhost:${app.server?.port}/swagger`
);
