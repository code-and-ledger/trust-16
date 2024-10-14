"use client";

import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

export const EvervaultCard = ({
  imageUrl,
  level = 1,
  money = 2000,
  isOpponent = false,
  className,
}: {
  imageUrl: string;
  level: number;
  money: number;
  isOpponent?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="w-40 h-40 mb-4">
        <div className="w-full h-full rotate-45 overflow-hidden">
          <Image
            src={imageUrl}
            alt="Player"
            width={250}
            height={250}
            className={`-rotate-45 scale-[1.5] origin-center ${isOpponent ? '' : 'invert scale-x-[-1.5]'}`}
          />
        </div>
      </div>
      <div className="flex space-x-20">
        <div className="w-20 h-20 rotate-45 flex items-center justify-center border border-white bg-black/30">
          <div className="-rotate-45 text-white font-bold text-lg">
            Lvl {level}
          </div>
        </div>
        <div className="w-20 h-20 rotate-45 flex items-center justify-center border border-white bg-black/30">
          <div className="-rotate-45 text-white font-bold text-lg">
            ${money.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};


export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
