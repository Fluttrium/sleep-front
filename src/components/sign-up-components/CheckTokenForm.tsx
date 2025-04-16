"use client";

import * as React from "react";
import {useRouter} from "next/navigation";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";

export function CheckTokenForm() {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setError(null); // Сбрасываем ошибку перед запросом

            const res = await fetch("/api/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token: value}), // Отправляем введенный токен и email
            });


            const data = await res.json();
            setSuccess(data.message); // Выводим сообщение об успешной верификации
            router.push('/signin')
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="space-y-24 flex flex-col w-screen h-screen justify-center items-center">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0}/>
                    <InputOTPSlot index={1}/>
                    <InputOTPSlot index={2}/>
                    <InputOTPSlot index={3}/>
                    <InputOTPSlot index={4}/>
                    <InputOTPSlot index={5}/>
                </InputOTPGroup>
            </InputOTP>


            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <Button
                className="btn-primary"
                disabled={value.length !== 6}
                onClick={handleSubmit}
            >
                Проверить код
            </Button>
        </div>
    );
}
