import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 匹配除 api / _next / static / dotfiles 之外的所有路径
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
