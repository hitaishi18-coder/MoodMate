import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f]">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
}
