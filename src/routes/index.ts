import type Elysia from "elysia";
import { setupChatRoutes } from "./chat";
import { setupModelRoutes } from "./model";

export const setupRoutes = (app: Elysia) =>
  app.group("/api/v1", (app) => app.use(setupChatRoutes).use(setupModelRoutes));
