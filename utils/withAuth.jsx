"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    const user = useSelector((state) => state.user.currentUser);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/explore");
      }
    }, [user, router]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
