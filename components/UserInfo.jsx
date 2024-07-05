"use client";

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";

const showSession = (session) => {
  // console.log(session);
};

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
        />
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <div>
          UserId: <span className="font-bold">{session?.user?.id}</span>
        </div>
        <div>
          <button onClick={() => showSession(session)}>Print</button>
        </div>
      </div>
    );
  } else {
    return <SignInBtn />;
  }
}