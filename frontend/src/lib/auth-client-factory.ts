import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://mainline.proxy.rlwy.net:14394/"
})

export const { signIn, signUp, useSession, signOut } = authClient;
