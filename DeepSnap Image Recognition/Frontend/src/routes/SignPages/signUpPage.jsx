import { SignUp } from "@clerk/clerk-react";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-violet-400/10 animate-pulse"
          style={{ animationDuration: "7s" }}
        ></div>
        <div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-400/10 animate-pulse"
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
            Join DeepSnap
          </h1>
          <p className="text-gray-600 mt-2">
            Create an account to start analyzing images with AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <SignUp
            path="/sign-up"
            signInUrl="/sign-in"
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

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Why join DeepSnap?
            </h3>
            <div className="space-y-2">
              {[
                "Analyze any image with advanced AI",
                "Extract text, identify objects, and understand context",
                "Save and organize your analysis history",
                "Access from any device, anywhere",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    <Check size={12} />
                  </div>
                  <span className="text-sm text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-violet-600 font-medium hover:text-violet-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
