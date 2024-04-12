import { serve } from "@novu/echo/nuxt";
import { echo } from "../echo";

export default defineEventHandler(serve({ client: echo }));
