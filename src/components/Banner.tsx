import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';


export const Banner = () => {
  const { user } = useAuthState();
  const { theme, toggleTheme } = useTheme();


  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 sm:px-5">
        <span className="min-w-0 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
          Welcome, { user ? user.displayName : 'guest' }!
        </span>
        <span className="ml-auto">
          {
            user
              ? <button className="rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={signOut}>Sign Out</button>
              : <button className="rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={signInWithGoogle}>Sign In</button>
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
      className="theme-toggle inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm"
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
      <hr className="my-6 border-slate-200 dark:border-slate-700 sm:my-8" />
    </>
  );
};
