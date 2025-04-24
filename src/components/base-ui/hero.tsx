import React, {useEffect, useState} from "react";
import Image from 'next/image';
import Link from "next/link";
import {isSuccess} from "@/lib/isSuccessGuard";
import defTestAction from "@/components/actions";


export const Hero: React.FC = () => {
    const [deftest, setDeftest] = useState('')
    useEffect(() => {
        const fetchDeftest = async () => {
            try {
                const res = await defTestAction();
                if (isSuccess(res)) {
                    setDeftest(res.deftest);
                } else {
                    alert(res.message);
                }
            } catch (error) {
                console.error("Ошибка при загрузке дефолтного теста:", error);
                setDeftest('/');
            }
        };

        fetchDeftest();
    }, []);

    return (
        <section className='flex justify-center items-top' style={{height: '85vh', position: 'relative'}}>
            <div className='absolute right-0 bottom-0 -rotate-90 -z-50'>
                <Image src="/hero1.svg" alt="Icon" width={300} height={300} style={{height: '100%'}}/>
            </div>
            <div className='flex flex-col space-y-6 items-center justify-center mx-6 md:mx-20 gap-1.5 my-6'>
                <div className='text-center text-5xl md:text-8xl leading-tight font-semibold popover-foreground'>
                    Пройдите тест и мы поможем решить ваши проблемы со сном
                </div>
                <Link href={deftest || '/'}>
                    <button className="p-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary rounded-[64px]"/>
                        <div
                            className="px-10 py-4 md:px-20 md:py-6 bg-white rounded-[64px] text-2xl md:text-4xl relative group transition duration-200 text-black hover:bg-transparent"
                        >
                            Пройти тест
                        </div>
                    </button>
                </Link>
            </div>
        </section>
    )
}
