import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <header className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 lg:px-8 py-3 max-w-7xl mx-auto">
              <Link to="/" className="flex items-center gap-3 ">
                <div className="flex-shrink-0 relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="DeepSnap logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hidden sm:inline-block">
                  DeepSnap
                </span>
              </Link>

              <div className="flex items-center gap-4 ">
                <SignedOut>
                  <div className="flex gap-3">
                    <Link
                      to="/sign-in"
                      className="text-gray-700 hover:text-violet-700 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-sm px-4 py-2 rounded-lg hover:shadow-md transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                </SignedOut>
                <SignedIn className="-mr-64">
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-violet-700 font-medium text-sm mr-2 hidden sm:block"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>

          <footer className="bg-white border-t border-gray-100 py-6 px-4">
            <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} DeepSnap AI. All rights reserved.
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <a href="#" className="hover:text-violet-600 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-violet-600 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-violet-600 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
