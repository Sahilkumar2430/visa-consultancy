import { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext(null);
const STORAGE_KEY = 'gp_user_profile';

const initial = {
  answers: {},
  goals: [],
  favouriteCountries: [],
  savedChecklist: null,
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...initial, ...JSON.parse(raw) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  const updateProfile = (patch) =>
    setProfile((prev) => ({ ...prev, ...patch }));

  const setAnswer = (key, value) =>
    setProfile((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));

  const toggleFavourite = (slug) =>
    setProfile((prev) => {
      const has = prev.favouriteCountries.includes(slug);
      return {
        ...prev,
        favouriteCountries: has
          ? prev.favouriteCountries.filter((s) => s !== slug)
          : [...prev.favouriteCountries, slug],
      };
    });

  const resetProfile = () => setProfile(initial);

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, setAnswer, toggleFavourite, resetProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}