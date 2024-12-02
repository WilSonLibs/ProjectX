
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f0f0f0", // Optional background color
      }}
    >
      <SignupForm />
    </div>
  );
}
