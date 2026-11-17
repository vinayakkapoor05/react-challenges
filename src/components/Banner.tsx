import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'


export const Banner = () => {
  const { user } = useAuthState();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5">
        <span className="min-w-0 break-words text-sm font-medium text-slate-700">
          Welcome, { user ? user.displayName : 'guest' }!
        </span>
        <span className="ml-auto">
          {
            user
              ? <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50" onClick={signOut}>Sign Out</button>
              : <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50" onClick={signInWithGoogle}>Sign In</button>
          }
        </span>
      </div>
      <hr className="my-6 border-slate-200 sm:my-8" />
    </>
  );
};
