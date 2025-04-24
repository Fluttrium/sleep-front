import React from 'react';
import BentoGridDemo from "@/components/ui/shared/bento-gridDemo";


export const SleepStats: React.FC = () => {
    return (
        <div className="text-center my-4">
            <h4 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-center text-black dark:text-white leading-tight mb-6">
                <span className="text-blue-500">Нарушение</span> сна
            </h4>
            <BentoGridDemo/>
        </div>
    );
};
