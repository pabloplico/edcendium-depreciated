import { generatePasswordResetToken } from "../../../lib/db/users";
import { sendPasswordResetEmail } from "../../../lib/email/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const token = await generatePasswordResetToken(email);
    
    // Send password reset email
    await sendPasswordResetEmail(email, token);
    
    return res.status(200).json({ 
      message: "Password reset email sent successfully"
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    
    // Don't reveal if user exists or not for security
    return res.status(200).json({ 
      message: "If a user with that email exists, a password reset link has been sent"
    });
  }
}
