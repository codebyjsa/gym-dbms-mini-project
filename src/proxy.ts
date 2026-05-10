import { withAuth } from "next-auth/middleware";

export function proxy(req: any, event: any) {
  return withAuth({
    pages: {
      signIn: "/login",
    },
  })(req, event);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
