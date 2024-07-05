"use client";

import { SessionProvider, useSession } from "next-auth/react";

export const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
};

const AuthWrapper = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

