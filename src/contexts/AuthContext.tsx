import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logActivity } from '../utils/activityLogger';

// Departamentos disponibles en Europa
export type EuropaDepartment =
    | 'general'
    | 'contabilidad'
    | 'finanzas'
    | 'marketing'
    | 'legal'
    | 'recursoshumanos';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    department: EuropaDepartment;
    createdAt: Date;
    lastLogin: Date;
    role: 'user' | 'admin';
}

interface MockFirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'user' | 'admin';
}

interface AuthContextType {
    currentUser: MockFirebaseUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signup: (email: string, password: string, displayName: string, department: EuropaDepartment) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    hasDepartmentAccess: (department: EuropaDepartment) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<MockFirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Registro de nuevo usuario (API real)
    async function signup(email: string, password: string, displayName: string, department: EuropaDepartment) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName, department }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al registrarse');
        }

        const data = await response.json();
        const user = data.user;

        const mockUser: MockFirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: user.role || 'user',
        };

        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            department: department,
            createdAt: new Date(user.createdAt),
            lastLogin: new Date(),
            role: user.role || 'user',
        };

        setCurrentUser(mockUser);
        setUserProfile(profile);

        // Log activity
        logActivity(
            user.uid,
            user.email,
            user.displayName,
            'REGISTRO',
            `Usuario registrado en departamento: ${department}`,
            department
        );
    }

    // Login (API real)
    async function login(email: string, password: string) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al iniciar sesión');
        }

        const data = await response.json();
        const user = data.user;

        const mockUser: MockFirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: user.role || 'user',
        };

        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            department: 'general', // Default department
            createdAt: new Date(user.createdAt),
            lastLogin: new Date(),
            role: user.role || 'user',
        };

        setCurrentUser(mockUser);
        setUserProfile(profile);

        // Log activity
        logActivity(
            user.uid,
            user.email,
            user.displayName,
            'LOGIN',
            'Usuario inició sesión',
            'general'
        );
    }

    // Logout (API real)
    async function logout() {
        // Log activity before logout
        if (currentUser && userProfile) {
            logActivity(
                currentUser.uid,
                currentUser.email || '',
                currentUser.displayName || '',
                'LOGOUT',
                'Usuario cerró sesión',
                userProfile.department
            );
        }

        await fetch('/api/auth/logout', {
            method: 'POST',
        });

        setCurrentUser(null);
        setUserProfile(null);
    }

    // Verificar acceso a departamento
    function hasDepartmentAccess(department: EuropaDepartment): boolean {
        if (!userProfile) return false;
        if (userProfile.role === 'admin') return true;
        // El usuario puede acceder a su propio departamento o a 'general'
        return userProfile.department === department || department === 'general';
    }

    // Cargar sesión al iniciar (verificar con API)
    useEffect(() => {
        const loadSession = async () => {
            try {
                const response = await fetch('/api/auth/me');

                if (response.ok) {
                    const data = await response.json();
                    const user = data.user;

                    const mockUser: MockFirebaseUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        role: user.role || 'user',
                    };

                    const profile: UserProfile = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        department: 'general',
                        createdAt: new Date(user.createdAt),
                        lastLogin: new Date(),
                        role: user.role || 'user',
                    };

                    setCurrentUser(mockUser);
                    setUserProfile(profile);
                }
            } catch (error) {
                console.debug('No active session');
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, []);

    const value: AuthContextType = {
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        logout,
        hasDepartmentAccess
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
