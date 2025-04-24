'use client';

import {cn} from "@/lib/utils";
import Link from "next/link";

import Image from 'next/image';


import {ArrowRight, User, Search, Menu, X} from "lucide-react";
import {useRouter, usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {SearchInput} from "./search-input";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {checkMe} from "@/components/admin-components/main-admin-components/action";
import defTestAction from "@/components/actions";
import {isSuccess} from "@/lib/isSuccessGuard";

interface Props {
    className?: string;
    hasSearch: boolean;
}

export const Header: React.FC<Props> = ({className, hasSearch}) => {
   const router = useRouter();

    const[ isAuth,  setAuth] = useState<boolean>(false);
    const pathname = usePathname(); // Получаем текущий путь
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(false);
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

    //TODO: при неавторизованом пользователе ошибка
    const checkAuth = async () => {
        try{
            const data = await checkMe();
            if (data.success && data.user) {
                setAuth(true);
            } else{
                setAuth(false);
            }

        } catch (error) {
            console.error('Ошибка при проверки на вход:', error);
            throw error;
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Функция для проверки, активна ли подкатегория
    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <header className={cn('border-b bg-background w-full', className)}>
            <Container className="flex items-center justify-between py-4 md:py-8 mx-auto px-4">
                {/* Левая часть */}
                <Link href="/" className="flex items-center gap-2 md:gap-4">
                    <Image src="/sleeplogo.png" alt="Logo" width={50} height={50}/>
                    <div className="hidden md:block">
                        <h1 className="text-xl md:text-2xl uppercase font-black">Asleep</h1>
                        <div className="text-xs md:text-sm text-gray-400 leading-3">Здоровый сон возможен</div>
                    </div>
                </Link>

                {/* Десктопная версия */}
                <div className={`hidden md:flex flex-1 mx-4 md:mx-10`}>
                    {search ? (
                        <div className="flex-1 justify-between flex-row mx-4 md:mx-10">
                            <div className="hidden md:block">
                                <SearchInput/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row space-x-4">
                            <Link href="/survey">
                                <div className={cn("cursor-pointer", isActive("/survey") && "text-primary font-bold")}>
                                    Опрос
                                </div>
                            </Link>
                            <Link href="/aboutUS">
                                <div className={cn("cursor-pointer", isActive("/aboutUS") && "text-primary font-bold")}>
                                    О нас
                                </div>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-left">
                                    <div
                                        className={cn(isActive("/online-service") || isActive("/methods") ? "text-primary font-bold" : "")}>
                                        Услуги
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="left-0 w-full">
                                    <DropdownMenuItem>
                                        <Link href="/online-service">
                                            <div
                                                className={cn("cursor-pointer", isActive("/online-service") && "text-primary font-bold")}>
                                                Онлайн Услуги
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                            <div
                                                className={cn("cursor-pointer", isActive("/methods") && "text-primary font-bold")}>
                                                Методы Диагностики
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/doctors">
                                <div className={cn("cursor-pointer", isActive("/doctors") && "text-primary font-bold")}>
                                    Врачи
                                </div>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-left">
                                    <div
                                        className={cn(isActive("/shop") || isActive("/methods") ? "text-primary font-bold" : "")}>
                                        Лечение нарушения сна
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="left-0 w-full">
                                    <DropdownMenuItem>
                                        <Link href="/shop">
                                            <div
                                                className={cn("cursor-pointer", isActive("/shop") && "text-primary font-bold")}>
                                                Сипап терапия
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="/diagnosicsmetods">
                                            <div
                                                className={cn("cursor-pointer", isActive("/methods") && "text-primary font-bold")}>
                                                Методы Диагностики
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="/consultations">
                                            <div
                                                className={cn("cursor-pointer", isActive("/methods") && "text-primary font-bold")}>
                                                Записаться на прием
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/articles">
                                <div
                                    className={cn("cursor-pointer", isActive("/articles") && "text-primary font-bold")}>
                                    Блог
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Правая часть */}
                <div className="flex items-center gap-2 md:gap-3">
                    {hasSearch && (
                        <Button className="rounded-3xl" onClick={() => setSearch((prev) => !prev)}>
                            <Search size={24} className="text-gray-500"/>
                        </Button>
                    )}


                    {!isAuth ? (
                        <Link href='/signin'>
                            <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                                <User size={14}/>
                                <span className="hidden md:inline">Войти</span>
                            </Button>
                        </Link>
                    ) : (
                        <Button className="flex items-center gap-1 text-xs md:text-sm" variant='outline'
                                onClick={() => {
                                    router.push('/profile');
                                }}>
                            <User size={14}/>
                            <span className="hidden md:inline">Кабинет</span>
                        </Button>
                    )}


                    <Link href={deftest || '/'}>
                        <Button type="submit" className="w-full h-8 md:h-10 text-xs md:text-sm">
                                <span className="hidden md:inline">
                                {deftest !== '/' ? "Пройти тест" : "Тест не выбран"}
                                </span>
                            <span className="md:hidden">
                                {deftest !== '/' ? "Тест" : "Нет теста"}
                                </span>
                            <ArrowRight className="w-4 md:w-5 ml-1 md:ml-2"/>
                        </Button>
                    </Link>

                    <div className="md:hidden ml-auto">
                        <Button variant="outline" onClick={toggleMenu}>
                            {isOpen ? <X size={24}/> : <Menu size={24}/>}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Меню для мобильной версии */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg p-4 rounded-b-md">
                    <div className="flex flex-col space-y-2">
                        <Link href="/aboutUS"
                              className={cn("p-2 rounded hover:bg-gray-100", pathname === "/aboutUS" && "bg-gray-200 font-bold")}>
                            О нас
                        </Link>
                        <Link href="/survey"
                              className={cn("p-2 rounded hover:bg-gray-100", pathname === "/survey" && "bg-gray-200 font-bold")}>
                            Опрос
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-left p-2 rounded hover:bg-gray-100 w-full">
                                Услуги
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="left-0 w-full">
                                <Link href="/online-service"
                                      className={cn("p-2 rounded hover:bg-gray-100", pathname === "/online-service" && "bg-gray-200 font-bold")}>
                                    Онлайн курсы
                                </Link>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                        Методы Диагностики
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/doctors"
                              className={cn("p-2 rounded hover:bg-gray-100", pathname === "/doctors" && "bg-gray-200 font-bold")}>
                            Врачи
                        </Link>
                        <Link href="/articles"
                              className={cn("p-2 rounded hover:bg-gray-100", pathname === "/articles" && "bg-gray-200 font-bold")}>
                            Блог
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
