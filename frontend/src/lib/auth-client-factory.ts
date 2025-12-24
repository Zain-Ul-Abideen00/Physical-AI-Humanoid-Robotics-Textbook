import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://humanoid-robotics-auth.up.railway.app"
})

export const { signIn, signUp, useSession, signOut } = authClient;
