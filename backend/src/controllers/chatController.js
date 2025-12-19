import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    
    const token = chatClient.createToken(req.auth.userId);//Use Clerk's user ID as Stream user ID 
    // (not mongoDB ID)=> It should match the id we have in the straem dashboard

    res.status(200).json({ token, 
        userId: req.user.clerkId,
        userName: req.user.name,
        userImage: req.user.image,
    });
} catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
