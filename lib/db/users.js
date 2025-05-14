import bcrypt from "bcryptjs";
import dbConnect from "./mongoose";
import User from "./models/User";

export async function findUserByEmail(email) {
  await dbConnect();
  return User.findOne({ email }).lean();
}

export async function createUser({ username, email, password }) {
  await dbConnect();
  
  // Check if a user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  
  // Create a new user
  const user = await User.create({
    username,
    email,
    passwordHash,
    role: "user"
  });
  
  // Return user without a password
  const userObject = user.toObject();
  delete userObject.passwordHash;
  return userObject;
}

export async function findUserById(id) {
  await dbConnect();
  return User.findById(id).lean();
}

export async function getAllUsers() {
  await dbConnect();
  return User.find({}, { passwordHash: 0 }).lean();
}