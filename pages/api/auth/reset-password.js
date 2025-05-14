import { resetPassword } from "../../../lib/db/users";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    await resetPassword(token, password);
    
    return res.status(200).json({ 
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(400).json({ error: error.message || "Error resetting password" });
  }
}
