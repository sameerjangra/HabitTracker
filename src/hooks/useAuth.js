import { useEffect, useState } from "react";
import { account } from "../appwrite";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  return { user };
}
