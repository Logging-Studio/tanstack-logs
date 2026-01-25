import { authClient } from '@/lib/auth-client';
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useState } from 'react'

export const Route = createFileRoute('/signin')({
    component: RouteComponent,
})

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await authClient.signIn.email({ email, password });
        const { data, error } = result;
        console.log({ data, error });

        if (data) {
            console.log("User created successfully");
            return;
        }
        console.error("Failed to create user", error);
        // Handle form submission
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <div className="relative px-4 py-20">
                <div className="mx-auto w-full max-w-lg overflow-hidden rounded-none border-4 border-black bg-white">
                    <div className="bg-accent p-6">
                        <Text as="h3">Create New Account</Text>
                        <Text className="font-medium text-muted-foreground">
                            Join us today! Enter your details to create your account.
                        </Text>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">
                                            {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-2 text-sm text-gray-500">
                                    <span>At least 8 characters</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 space-y-6">
                            <Button className="w-full justify-center">Log In</Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-muted" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center w-full"
                            >
                                <Github className="mr-2 h-5 w-5" />
                                Github
                            </Button>
                        </div>
                        <div className="mt-6 text-center text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-bold underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>
}