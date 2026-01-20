import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f]">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
