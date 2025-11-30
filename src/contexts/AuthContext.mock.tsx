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

// Mock de FirebaseUser para mantener compatibilidad
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

// Funciones helper para localStorage
const STORAGE_KEYS = {
    USERS: 'mock_auth_users_europa',
    CURRENT_USER: 'mock_auth_current_user_europa'
};

interface StoredUser {
    uid: string;
    email: string;
    password: string; // En producción NUNCA almacenar contraseñas en plain text
    displayName: string;
    department: EuropaDepartment;
    createdAt: string;
    lastLogin: string;
    role: 'user' | 'admin';
}

function getAllUsers(): StoredUser[] {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveAllUsers(users: StoredUser[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUserSession(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function setCurrentUserSession(uid: string) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, uid);
}

function clearCurrentUserSession() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<MockFirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Registro de nuevo usuario (MOCK)
    async function signup(email: string, password: string, displayName: string, department: EuropaDepartment) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getAllUsers();

        // Verificar si el email ya existe
        if (users.find(u => u.email === email)) {
            throw new Error('auth/email-already-in-use');
        }

        // Crear nuevo usuario
        const newUser: StoredUser = {
            uid: `user_${Date.now()}`,
            email,
            password, // SOLO PARA MOCK - NUNCA hacer esto en producción
            displayName,
            department,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: 'user',
        };

        users.push(newUser);
        saveAllUsers(users);

        // Register user in KV database
        try {
            await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: newUser.uid,
                    email: newUser.email,
                    displayName: newUser.displayName,
                    department: newUser.department,
                }),
            });
        } catch (error) {
            console.error('Failed to register user in KV:', error);
        }

        // Establecer sesión
        setCurrentUserSession(newUser.uid);

        // Actualizar estado
        const mockUser: MockFirebaseUser = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            role: newUser.role,
        };

        const profile: UserProfile = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            department: newUser.department,
            createdAt: new Date(newUser.createdAt),
            lastLogin: new Date(newUser.lastLogin),
            role: newUser.role,
        };

        setCurrentUser(mockUser);
        setUserProfile(profile);

        // Log activity
        logActivity(
            newUser.uid,
            newUser.email,
            newUser.displayName,
            'REGISTRO',
            `Usuario registrado en departamento: ${department}`,
            department
        );
    }

    // Login (MOCK)
    async function login(email: string, password: string) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getAllUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            // Special case for admin user
            if (email === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
                const adminUser: MockFirebaseUser = {
                    uid: 'admin',
                    email: import.meta.env.VITE_ADMIN_USERNAME,
                    displayName: 'Admin',
                    role: 'admin',
                };
                const adminProfile: UserProfile = {
                    uid: 'admin',
                    email: import.meta.env.VITE_ADMIN_USERNAME,
                    displayName: 'Admin',
                    department: 'general',
                    createdAt: new Date(),
                    lastLogin: new Date(),
                    role: 'admin',
                };
                setCurrentUser(adminUser);
                setUserProfile(adminProfile);
                setCurrentUserSession('admin');
                return;
            }
            throw new Error('auth/user-not-found');
        }

        if (user.password !== password) {
            throw new Error('auth/wrong-password');
        }

        // Actualizar lastLogin
        user.lastLogin = new Date().toISOString();
        saveAllUsers(users);

        // Establecer sesión
        setCurrentUserSession(user.uid);

        // Actualizar estado
        const mockUser: MockFirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
        };

        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            department: user.department,
            createdAt: new Date(user.createdAt),
            lastLogin: new Date(user.lastLogin),
            role: user.role,
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
            user.department
        );
    }

    // Logout (MOCK)
    async function logout() {
        console.log("🔴 LOGOUT INICIADO - Función logout llamada");
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

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));

        clearCurrentUserSession();
        console.log("🔴 LOGOUT COMPLETADO - Usuario limpiado");
        setCurrentUser(null);
        
        // Forzar recarga para mostrar modal de login
        window.location.reload();
        setUserProfile(null);
    }

    // Verificar acceso a departamento
    function hasDepartmentAccess(department: EuropaDepartment): boolean {
        if (!userProfile) return false;
        if (userProfile.role === 'admin') return true;
        // El usuario puede acceder a su propio departamento o a 'general'
        return userProfile.department === department || department === 'general';
    }

    // Cargar sesión al iniciar
    useEffect(() => {
        const loadSession = () => {
            let currentUid = getCurrentUserSession();

            //             // If no user is logged in, create and log in a default user
            //             if (!currentUid) {
            //                 let users = getAllUsers();
            //                 let defaultUser = users.find(u => u.email === 'test@example.com');
            // 
            //                 if (!defaultUser) {
            //                     defaultUser = {
            //                         uid: `user_${Date.now()}`,
            //                         email: 'test@example.com',
            //                         password: 'password',
            //                         displayName: 'Test User',
            //                         department: 'general',
            //                         createdAt: new Date().toISOString(),
            //                         lastLogin: new Date().toISOString(),
            //                         role: 'user',
            //                     };
            //                     users.push(defaultUser);
            //                     saveAllUsers(users);
            //                 }
            //                 
            //                 currentUid = defaultUser.uid;
            //                 setCurrentUserSession(currentUid);
            //             }

            if (currentUid) {
                if (currentUid === 'admin') {
                    const adminUser: MockFirebaseUser = {
                        uid: 'admin',
                        email: import.meta.env.VITE_ADMIN_USERNAME,
                        displayName: 'Admin',
                        role: 'admin',
                    };
                    const adminProfile: UserProfile = {
                        uid: 'admin',
                        email: import.meta.env.VITE_ADMIN_USERNAME,
                        displayName: 'Admin',
                        department: 'general',
                        createdAt: new Date(),
                        lastLogin: new Date(),
                        role: 'admin',
                    };
                    setCurrentUser(adminUser);
                    setUserProfile(adminProfile);
                    setLoading(false);
                    return;
                }

                const users = getAllUsers();
                const user = users.find(u => u.uid === currentUid);

                if (user) {
                    const mockUser: MockFirebaseUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        role: user.role,
                    };

                    const profile: UserProfile = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        department: user.department,
                        createdAt: new Date(user.createdAt),
                        lastLogin: new Date(user.lastLogin),
                        role: user.role,
                    };

                    setCurrentUser(mockUser);
                    setUserProfile(profile);
                } else {
                    // Usuario no encontrado, limpiar sesión
                    clearCurrentUserSession();
                }
            }

            setLoading(false);
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
