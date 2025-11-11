import { SignIn } from "@clerk/clerk-react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-violet-400/10 animate-pulse"
          style={{ animationDuration: "7s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-400/10 animate-pulse"
          style={{ animationDuration: "10s" }}
        ></div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>AI-Powered Image Analysis</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue your image analysis journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <SignIn
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-gray-300 hover:border-violet-400",
                formFieldInput:
                  "border-gray-300 focus:border-violet-500 focus:ring-violet-500",
                footerActionLink: "text-violet-600 hover:text-violet-700",
              },
            }}
          />

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account yet?{" "}
              <Link
                to="/sign-up"
                className="text-violet-600 font-medium hover:text-violet-700"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-violet-600 hover:text-violet-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-violet-600 hover:text-violet-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
