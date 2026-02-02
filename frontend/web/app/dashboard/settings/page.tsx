"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@notemind/ui";
import { User, Mail, Lock, Check, AlertCircle } from "lucide-react";

interface UserProfile {
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
}

export default function SettingsPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        setIsChangingPassword(true);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/auth/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();
            if (!res.ok) {
                setPasswordError(data.error || "Failed to change password");
                return;
            }

            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError("Network error. Please try again.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
            </div>

            <div className="grid gap-6 mt-6 max-w-2xl">
                {/* Profile Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{user?.name || "Not set"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Password</p>
                                <p className="font-medium">••••••••</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Change Password Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {passwordError && (
                                <div className="flex items-center gap-2 text-sm text-red-600">
                                    <AlertCircle className="h-4 w-4" />
                                    {passwordError}
                                </div>
                            )}

                            {passwordSuccess && (
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Check className="h-4 w-4" />
                                    {passwordSuccess}
                                </div>
                            )}

                            <Button type="submit" disabled={isChangingPassword}>
                                {isChangingPassword ? "Changing..." : "Change Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
