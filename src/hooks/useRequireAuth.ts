import { useEffect } from "react";
// import { useAuth } from "./useAuth.js";
import { useRouter } from "./useRouter.js";

const useAuth = () => ({ user: {} });

type RequireAuthProps = {
  redirectUrl: string;
};

export const useRequireAuth = ({
  redirectUrl = "/signup",
}: RequireAuthProps) => {
  const auth = useAuth();
  const router = useRouter();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
};
