// src/hooks/useAuth.js

import { useEffect, useState, useCallback } from "react";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("692ec9a8000f1287f221");

const account = new Account(client);

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetchUser is stable across renders
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await account.get();
      setUser(res);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
      // ignore errors deleting session but still clear local state
      console.warn("logout error:", err);
    } finally {
      setUser(null);          // update UI immediately
    }
  }, []);

  useEffect(() => {
    fetchUser();
    // Optional: you could set an interval to poll or use Appwrite realtime
    // return () => clearInterval(...);
  }, [fetchUser]);

  // Expose fetchUser so other components can force refresh after signin/signup
  return { user, loading, logout, refreshUser: fetchUser };
}
