"use client";

import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { LoginFormValues } from "@/features/auth/model/type";
import { loginSchema } from "@/features/auth/validations/loginSchema";
import { login } from "@/features/auth/hooks/useLogin";
import { fetchAuthUser } from "@/features/auth/api/fetchAuthUser";
import { logout } from "@/features/auth/hooks/useLogout";

const PANEL_PATH = "/panel";

export default function LoginPage() {
    const [serverError, setServerError] = useState("");
    const [status, setStatus] = useState<"loading" | "show-login">("loading");
    const router = useRouter();

    useLayoutEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setStatus("show-login");
                return;
            }
            try {
                const me = await fetchAuthUser();
                if (me.isAdmin) {
                    router.replace(PANEL_PATH);
                    return;
                }
                router.replace("/");
            } catch {
                setStatus("show-login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",

        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setServerError("");
        try {
            await login(data.email, data.password);

            const me = await fetchAuthUser();

            if (!me.isAdmin) {
                await logout();
                setServerError("Доступ только для администраторов");
                router.replace("/");
                return;
            }

            router.push(PANEL_PATH);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setServerError("Неверный логин или пароль");
            console.error(err);
        }
    };

    if (status === "loading") {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
            <Card className="w-full max-w-md">
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {serverError && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        {serverError}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Email</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Password</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "..."
                                    : ""}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
