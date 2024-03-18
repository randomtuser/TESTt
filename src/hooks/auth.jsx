import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const group = profile?.group;

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadUs();
    }
  }, [user]);

  async function loadUs() {
    let { data } = await supabase.from('profiles').select().eq('id', user.id);
    setProfile(data[0]);
  }

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      group,
    }),
    [session, user, profile, group],
  );

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
