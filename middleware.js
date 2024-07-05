// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    pages: {
      signIn: "/", // Redirect to home page for sign-in
    },
  }
);

export const config = {
  matcher: [
    '/',           // Protect the home page
    '/about',      // Protect the about page
    '/tell',       // Protect the tell page
    '/api/:path*', // Protect API routes
  ],
};
