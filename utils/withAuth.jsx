import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withAuth = (Component) => {
  const Auth = (props) => {
    const user = useSelector((state) => state.user.currentUser);
    const router = useRouter();

    // If user is not logged in, return login component
    if (!user) {
      router.push("/explore");
      return;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
