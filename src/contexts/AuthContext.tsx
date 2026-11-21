
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// 1. Menentukan data yang akan disimpan dalam AuthContext
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

// 2. Membuat AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Membuat AuthProvider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 4. Memantau perubahan status autentikasi Supabase
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Membersihkan subscription ketika komponen dilepas
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 5. Membagikan data autentikasi ke seluruh aplikasi
  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Hook untuk menggunakan AuthContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
