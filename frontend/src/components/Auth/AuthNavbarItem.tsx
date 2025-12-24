import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import { useSession, signOut } from '../../lib/auth-client';

export default function AuthNavbarItem(props: any): JSX.Element {
    const { data: session, isPending } = useSession();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('chatkit_thread_id');
            localStorage.removeItem('chatkit_thread_anonymous');
            await signOut();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            window.location.href = '/';
        }
    };

    if (isPending) {
         // Show a loading state or the default login link to avoid layout shift?
         // Or nothing. Let's show Login by default or spinner.
         return <div className="navbar__item">Loading...</div>;
    }

    if (session) {
        return (
            <div className="navbar__item">
                 <button
                    className="clean-btn button button--primary button--sm"
                    onClick={handleLogout}
                    style={{ marginLeft: '10px' }}
                >
                    Logout ({session.user.name})
                </button>
            </div>
        );
    }

    return (
        <Link
            to="/auth"
            className="navbar__item navbar__link"
            {...props}>
            Login / Sign Up
        </Link>
    );
}
