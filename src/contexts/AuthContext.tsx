import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "@/services/supabaseClient";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const initSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (!active) return;
      setSession(data.session ?? null);
      setLoading(false);
    };

    initSession();

    const { data: subscription } = supabaseClient.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
