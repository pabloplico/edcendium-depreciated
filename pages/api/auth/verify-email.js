import { verifyUserEmail } from "../../../lib/db/users";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const user = await verifyUserEmail(token);
    
    return res.status(200).json({ 
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(400).json({ error: error.message || "Error verifying email" });
  }
}
