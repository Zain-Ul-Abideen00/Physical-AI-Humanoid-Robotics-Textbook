import React, { useRef, useState } from 'react';
import styles from '../../css/Auth.module.css';

interface LicenseCardProps {
    name?: string;
    email?: string;
    experience: string;
    devices: string[];
    languages: string[];
}

export const RoboticsLicenseCard: React.FC<LicenseCardProps> = ({
    name = "UNREGISTERED",
    email,
    experience,
    devices,
    languages
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div className={styles.licenseCardWrapper}>
            <div
                ref={cardRef}
                className={styles.licenseCard}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transform: transform }}
            >
                <div className={styles.cardHeader}>
                    <div>
                        <div className={styles.cardSubtitle}>UNITED ROBOTICS ALLIANCE</div>
                        <div className={styles.cardTitle}>ENGINEER LICENSE</div>
                    </div>
                    <div className={styles.cardChip}></div>
                </div>

                <div className={styles.cardBody}>
                    <div className={styles.cardUser}>
                        <div className={styles.cardUserName}>{name.toUpperCase()}</div>
                        <div className={styles.cardUserLevel}>{experience.toUpperCase()}</div>
                    </div>

                    <div className={styles.cardBadges}>
                        {devices.slice(0, 3).map(device => (
                            <span key={device} className={styles.badge} style={{ borderColor: '#cb7d10', color: '#cb7d10' }}>
                                {device.split(' ')[0]} OP
                            </span>
                        ))}
                        {languages.slice(0, 3).map(lang => (
                            <span key={lang} className={styles.badge}>
                                {lang}
                            </span>
                        ))}
                        {devices.length === 0 && languages.length === 0 && (
                            <span className={styles.badge} style={{ opacity: 0.5 }}>PENDING CALIBRATION...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
