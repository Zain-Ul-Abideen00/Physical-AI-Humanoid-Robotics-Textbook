import React, { useState, useEffect } from 'react';
import styles from '../../css/Auth.module.css';
import { RoboticsLicenseCard } from './RoboticsLicenseCard';
import { authClient } from '../../lib/auth-client-factory';

// Options based on Robotics/AI domain
const LANGUAGES = ['Python', 'C++', 'Rust', 'MATLAB', 'JavaScript/TypeScript'];
const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const TOOLS = ['ROS/ROS2', 'Gazebo', 'Docker', 'PyTorch', 'TensorFlow', 'OpenCV'];
const DEVICES = ['Raspberry Pi', 'NVIDIA Jetson', 'Arduino', 'Laptop (GPU)', 'Laptop (CPU Only)'];

interface ProfileData {
    software_context: {
        languages: string[];
        experience_level: string;
        preferred_tools: string[];
    };
    hardware_context: {
        devices: string[];
        specifications: Record<string, any>;
        constraints: string[];
    };
}

interface BackgroundQuestionnaireProps {
    onSubmit: (data: ProfileData) => Promise<void>;
}

export const BackgroundQuestionnaire: React.FC<BackgroundQuestionnaireProps> = ({ onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [languages, setLanguages] = useState<string[]>([]);
    const [experience, setExperience] = useState('Beginner');
    const [tools, setTools] = useState<string[]>([]);
    const [devices, setDevices] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('Robotics Cadet');

    useEffect(() => {
        // Fetch user name for the card
        async function fetchUser() {
            try {
                const { data } = await authClient.getSession();
                if (data?.user?.name) {
                    setUserName(data.user.name);
                }
            } catch (err) {
                console.log("No session user found for card");
            }
        }
        fetchUser();
    }, []);

    const handleMultiSelect = (
        current: string[],
        setter: (val: string[]) => void,
        item: string
    ) => {
        if (current.includes(item)) {
            setter(current.filter(i => i !== item));
        } else {
            setter([...current, item]);
        }
    };

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    // Changed from React.FormEvent to generic MouseEvent or void
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit({
                software_context: {
                    languages,
                    experience_level: experience,
                    preferred_tools: tools
                },
                hardware_context: {
                    devices,
                    specifications: {},
                    constraints: []
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div className={styles.splitLayout}>
            {/* Left Side: Wizard Content */}
            <div style={{ width: '100%', minWidth: 0 }}> {/* minWidth fix for grid text overflow */}

                {/* Progress Bar */}
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Header */}
                <div className={styles.wizardHeader}>
                    <span className={styles.stepTitle}>
                        {currentStep === 1 ? 'Neural Calibration' :
                         currentStep === 2 ? 'Hardware Interface' :
                         'Software Protocols'}
                    </span>
                    <span>Step {currentStep} of 3</span>
                </div>

                {/* Changed <form> to <div> to prevent browser auto-submit behavior */}
                <div className={styles.wizardStep}>

                    {/* Step 1: Experience */}
                    {currentStep === 1 && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select your implementation expertise:</label>
                            <select
                                className={styles.input}
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                style={{ appearance: 'none', cursor: 'pointer' }}
                            >
                                {EXPERIENCE_LEVELS.map(level => (
                                    <option key={level} value={level} style={{ background: '#333' }}>{level}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Step 2: Hardware */}
                    {currentStep === 2 && (
                        <div className={styles.selectionGroup}>
                            <label className={styles.label}>Active hardware modules:</label>
                            <div className={styles.selectionGrid}>
                                {DEVICES.map(device => (
                                    <div
                                        key={device}
                                        className={`${styles.selectionCard} ${devices.includes(device) ? styles.selectionCardSelected : ''}`}
                                        onClick={() => handleMultiSelect(devices, setDevices, device)}
                                    >
                                        <span className={styles.cardLabel}>{device}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Software & Tools */}
                    {currentStep === 3 && (
                        <>
                            <div className={styles.selectionGroup}>
                                <label className={styles.label}>Supported languages:</label>
                                <div className={styles.selectionGrid}>
                                    {LANGUAGES.map(lang => (
                                        <div
                                            key={lang}
                                            className={`${styles.selectionCard} ${languages.includes(lang) ? styles.selectionCardSelected : ''}`}
                                            onClick={() => handleMultiSelect(languages, setLanguages, lang)}
                                        >
                                            <span className={styles.cardLabel}>{lang}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.selectionGroup}>
                                <label className={styles.label}>Preferred toolchain:</label>
                                <div className={styles.selectionGrid}>
                                    {TOOLS.map(tool => (
                                        <div
                                            key={tool}
                                            className={`${styles.selectionCard} ${tools.includes(tool) ? styles.selectionCardSelected : ''}`}
                                            onClick={() => handleMultiSelect(tools, setTools, tool)}
                                        >
                                            <span className={styles.cardLabel}>{tool}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <div className={styles.buttonGroup}>
                        {currentStep > 1 && (
                            <button type="button" onClick={handleBack} className={styles.secondaryButton}>
                                Back
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button type="button" onClick={handleNext} className={styles.submitButton}>
                                Next Phase
                            </button>
                        ) : (
                            // Changed type="submit" to type="button" and added explicit onClick
                            <button type="button" onClick={handleSubmit} disabled={loading} className={styles.submitButton}>
                                {loading ? 'Finalizing System...' : 'Complete Calibration'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side: License Card */}
            <div className={styles.licenseCardContainer}>
                <RoboticsLicenseCard
                    name={userName}
                    experience={experience}
                    devices={devices}
                    languages={languages}
                />
            </div>
        </div>
    );
};
