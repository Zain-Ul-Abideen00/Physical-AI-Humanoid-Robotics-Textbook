import React, { JSX, useState } from 'react';
import Layout from '@theme/Layout';
import { SignUpForm } from '../components/Auth/SignUpForm';
import { SignInForm } from '../components/Auth/SignInForm';
import { BackgroundQuestionnaire } from '../components/Auth/BackgroundQuestionnaire';
import { authClient, useSession } from '../lib/auth-client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../css/Auth.module.css';

export default function AuthPage(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const [step, setStep] = useState<'signin' | 'signup' | 'profile'>('signin');
    const { data: session, isPending } = useSession();

    // Effect to check if user is logged in but missing profile, or just logged in
    React.useEffect(() => {
        if (!isPending && session) {
            // Need a way to check if profile exists.
            // For now, let's assume if they are here manually (/auth), let them edit profile or see status.
            //Ideally we fetch profile first.
            setStep('profile');
        }
    }, [session, isPending]);

    const handleProfileSubmit = async (profileData: any) => {
        try {
            const chatKitUrl = siteConfig?.customFields?.chatKitUrl as string || 'http://localhost:8000/chatkit';
            const apiBase = chatKitUrl.replace('/chatkit', '');
            const token = session?.session?.token;

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${apiBase}/api/user/profile`, {
                method: 'POST',
                headers,
                body: JSON.stringify(profileData),
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error("Failed to save profile");
                alert("Failed to save profile. Please try again.");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving profile.");
        }
    };


    return (
        <Layout
            title={`Authentication`}
            description="Sign up for the Robotics Textbook"
            noFooter>
            <div className={styles.authPageContainer}>
                <div className={styles.auroraBackground} />

                <div className={`${styles.cyberGlassContainer} ${step === 'profile' ? styles.cyberGlassContainerWide : ''}`}>
                    <h1 className={styles.title}>
                        {step === 'signin' ? 'Welcome Back' : step === 'signup' ? 'Join the Future' : 'Setup Profile'}
                    </h1>
                    <p className={styles.subtitle}>
                        {step === 'signin' ? 'Access your neural link' : step === 'signup' ? 'Initialize your robotic journey' : 'Calibrate your learning matrix'}
                    </p>

                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        {step !== 'profile' && !session && (
                            <div className={styles.toggleContainer}>
                                <button
                                    onClick={() => setStep('signin')}
                                    className={`${styles.toggleButton} ${step === 'signin' ? styles.toggleButtonActive : ''}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setStep('signup')}
                                    className={`${styles.toggleButton} ${step === 'signup' ? styles.toggleButtonActive : ''}`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {step === 'signin' && (
                        <SignInForm onSuccess={async () => {
                            // Attempt to merge anonymous chat
                            try {
                                // Check primarily for the anonymous thread key
                                const threadId = localStorage.getItem('chatkit_thread_anonymous') || localStorage.getItem('chatkit_thread_id');

                                if (threadId) {
                                    const sessionData = await authClient.getSession();
                                    const token = sessionData?.data?.session?.token;
                                    const userId = sessionData?.data?.user?.id;

                                    console.log(`[AuthPage] Preparing merge. Found Thread: ${threadId}. Current User: ${userId}`);

                                    // Use siteConfig if available, or fallback safely
                                    const chatKitUrl = siteConfig?.customFields?.chatKitUrl as string || 'http://localhost:8000/chatkit';
                                    // Derive API base from ChatKit URL or default
                                    const apiBase = chatKitUrl.replace('/chatkit', '');

                                        await fetch(`${apiBase}/api/chatkit/merge`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token ? `Bearer ${token}` : ''
                                        },
                                        body: JSON.stringify({ thread_id: threadId }),
                                        credentials: 'include'
                                    });
                                    console.log("Merge request sent for thread:", threadId);
                                    // Clear anonymous thread after merging so it doesn't leak or re-merge
                                    localStorage.removeItem('chatkit_thread_anonymous');
                                    localStorage.removeItem('chatkit_thread_id'); // cleanup legacy key
                                }
                            } catch (err) {
                                console.warn("Failed to merge chat session:", err);
                            }
                            window.location.href = '/';
                        }} />
                    )}
                    {step === 'signup' && (
                        <SignUpForm onSuccess={() => setStep('profile')} />
                    )}
                    {step === 'profile' && (
                        <BackgroundQuestionnaire onSubmit={handleProfileSubmit} />
                    )}
                </div>
            </div>
        </Layout>
    );
}
