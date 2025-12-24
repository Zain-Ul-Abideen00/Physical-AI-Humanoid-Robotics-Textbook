import React, { useState } from 'react';
import { signIn } from '../../lib/auth-client';

import styles from '../../css/Auth.module.css';

interface SignInFormProps {
    onSuccess: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || 'Failed to sign in');
            } else {
                onSuccess();
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                />
            </div>

            {error && (
                <div className={styles.errorMessage}>
                    <span>⚠️</span> {error}
                </div>
            )}

            <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? 'Authenticating...' : 'Initialize Session'}
            </button>
        </form>
    );
};
