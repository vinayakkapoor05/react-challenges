import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';


export const Banner = () => {
  const { user } = useAuthState();
  const { theme, toggleTheme } = useTheme();


  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-divider bg-panel px-4 py-3 sm:px-5">
        <span className="min-w-0 break-words text-sm font-medium text-ink">
          Welcome, { user ? user.displayName : 'guest' }!
        </span>
        <span className="ml-auto">
          {
            user
              ? <button className="rounded-lg border border-control bg-panel px-4 py-2 text-sm font-semibold text-ink hover:border-muted hover:bg-raised" onClick={signOut}>Sign Out</button>
              : <button className="rounded-lg border border-control bg-panel px-4 py-2 text-sm font-semibold text-ink hover:border-muted hover:bg-raised" onClick={signInWithGoogle}>Sign In</button>
          }
        </span>
        <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } mode`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } mode`}
      className="theme-toggle border-control bg-panel text-ink hover:border-muted hover:bg-raised inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm"
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" size={18} />
      ) : (
        <Moon aria-hidden="true" size={18} />
      )}


      <span>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>

      </div>
      <hr className="my-6 border-divider sm:my-8" />
    </>
  );
};
