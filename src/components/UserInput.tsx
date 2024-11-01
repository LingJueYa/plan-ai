"use client";
// 用户输入组件
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { userInputSchema, UserInputType } from "@/schemas/userInput";
import axios from "axios";
import type { StrategyDisplayProps } from "@/@types/strategyResponse";

interface UserInputProps {
  onStrategyResponse: (data: StrategyDisplayProps | null) => void;
}

const UserInput = ({ onStrategyResponse }: UserInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>({
    resolver: zodResolver(userInputSchema),
  });

  const onSubmit = async (data: UserInputType) => {
    setIsLoading(true);
    try {
      const response = await axios.post<StrategyDisplayProps>("/api/dify-ai", {
        planDescription: data.planDescription,
      });
      onStrategyResponse(response.data);
    } catch (error) {
      console.error("API 请求错误:", error);
      onStrategyResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 w-full h-[64px] mb-8 relative"
    >
      <Input
        type="text"
        placeholder="请描述您当前遇到的职场困境，我们将为您提供应对策略..."
        {...register("planDescription")}
        className="flex-grow h-full bg-white/90 backdrop-blur-md rounded-2xl px-6 
          text-[15px] border border-gray-100/30 
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          focus:outline-none focus:ring-1 focus:ring-gray-100/50 focus:border-gray-200/50
          focus:bg-white/95
          placeholder:text-gray-400/90 
          dark:bg-[#1a1a1a]/85 dark:border-gray-800/40 
          dark:focus:ring-gray-700/30 dark:focus:border-gray-700/50
          dark:placeholder:text-gray-500 dark:text-white/90
          transition-all duration-300"
      />
      {errors.planDescription && (
        <span className="text-red-500/90 text-[13px] absolute -bottom-6 left-2">
          {errors.planDescription.message}
        </span>
      )}
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={isLoading}
        className={`w-[64px] h-full rounded-2xl bg-white/90 backdrop-blur-md 
          border border-gray-100/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          dark:bg-[#1a1a1a]/85 dark:border-gray-800/40 
          transition-all duration-300
          ${isLoading ? '' : 'hover:bg-orange-50/50 dark:hover:bg-gray-800/40'}`}
      >
        {isLoading ? (
          <span className="animate-spin text-xl">⏳</span>
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500 dark:text-white/70" />
        )}
      </Button>
    </form>
  );
};

export default UserInput;
