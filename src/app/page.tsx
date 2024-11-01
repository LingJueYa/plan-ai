"use client";
// 主页
import { useState, useEffect, useRef } from "react";
import UserInput from "@/components/UserInput";
import StrategyDisplay from "@/components/StrategyDisplay";
import type { StrategyDisplayProps } from "@/@types/strategyResponse";

const defaultPlanData: StrategyDisplayProps = {
  plan_one: {
    name: "",
    strategy: "等待您的问题...",
    execution: "我们将为您提供详细的执行方案",
  },
  plan_two: {
    name: "",
    strategy: "等待您的问题...",
    execution: "我们将为您提供详细的执行方案",
  },
  plan_three: {
    name: "",
    strategy: "等待您的问题...",
    execution: "我们将为您提供详细的执行方案",
  },
  execution_plan: {
    short_term: "短期行动方案将在这里展示",
    mid_term: "中期行动方案将在这里展示",
    long_term: "长期行动方案将在这里展示",
  },
};

const Home = () => {
  const [planData, setPlanData] =
    useState<StrategyDisplayProps>(defaultPlanData);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleStrategyResponse = (data: StrategyDisplayProps | null) => {
    setPlanData(
      data || {
        plan_one: { name: "", strategy: "", execution: "" },
        plan_two: { name: "", strategy: "", execution: "" },
        plan_three: { name: "", strategy: "", execution: "" },
        execution_plan: {
          short_term: "",
          mid_term: "",
          long_term: "",
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    // 检查是否有任何计划数据
    const hasData = Object.values(planData).some(
      (value) => typeof value === "object" && Object.values(value).some(Boolean)
    );

    if (hasData) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [planData]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <div className="container mx-auto flex flex-col items-center w-full px-6 py-10">
          <div className="relative flex flex-col items-center w-fit">
            <h1 className="text-5xl text-[#FE7600]/90 font-bold mb-6 dark:text-[#FE7600]/75">
              问计 ~
            </h1>
            <p className="mt-4 mb-12 text-2xl text-[#504f4f] text-center dark:text-white/60">
              问计于心，谋定而动
            </p>
            {/* <Image
              src="/svg/go.svg"
              width={100}
              height={100}
              className="hidden md:block absolute top-8 -right-32"
              alt="go"
            /> */}
          </div>
          <div className="w-full max-w-[600px] mb-8 backdrop-blur-lg">
            <UserInput onStrategyResponse={handleStrategyResponse} />
          </div>
          <StrategyDisplay {...planData} />
          <div ref={bottomRef} />
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-white/60">
            内容由 AI
            智能助手生成，不代表平台观点、立场或态度，请理性友善地使用和创作内容
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
