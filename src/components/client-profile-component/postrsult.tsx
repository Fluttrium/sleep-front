import {useEffect, useState} from "react";
import {marked} from "marked";
import {Badge} from "@/components/ui/badge";

interface PostCardProps {
    author: string;
    title: string;
    description: string; // Markdown текст
    categories: string[];
    image?: string; // Опциональный параметр для изображения
}

export function PostsResult({title, description, categories, image}: PostCardProps) {
    const [descriptionHtml, setDescriptionHtml] = useState<string>("");

    useEffect(() => {
        async function parseMarkdown() {
            try {
                const html = await marked.parse(description); // Асинхронный парсинг
                setDescriptionHtml(html);
            } catch (error) {
                console.error("Ошибка парсинга Markdown:", error);
            }
        }

        parseMarkdown();
    }, [description]);

    return (
        <div className="max-full aspect-square w-[50%] group/card flex">
            <div
                className="cursor-pointer overflow-hidden relative card rounded-md shadow-xl flex flex-col justify-between p-4">
                {image && (
                    <img
                        src={encodeURI(image)}
                        alt={title}
                        className="w-full h-full object-cover rounded-md absolute top-0 left-0 z-0"
                    />
                )}
                <div
                    className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60 z-10"></div>
                <div className="flex flex-row items-center space-x-4 z-20">
                    <div className="flex flex-col">
                        <div className="font-normal text-base text-gray-50 relative z-10">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <Badge key={index} className="text-gray-200 mr-2">
                                        {category.trim()}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-400">Нет категорий</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text content z-20 relative">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50">{title}</h1>
                    <div className="text-balance font-normal text-sm text-gray-50 my-4 line-clamp-3">
                        <div dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
