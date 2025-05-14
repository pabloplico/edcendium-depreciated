import { resendVerificationEmail } from "../../../lib/db/users";
import { sendVerificationEmail } from "../../../lib/email/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const token = await resendVerificationEmail(email);
    
    // Send verification email
    await sendVerificationEmail(email, token);
    
    return res.status(200).json({ 
      message: "Verification email sent successfully"
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return res.status(400).json({ error: error.message || "Error sending verification email" });
  }
}
