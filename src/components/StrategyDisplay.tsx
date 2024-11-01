"use client";

import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type {
  PlanDetail,
  StrategyDisplayProps,
} from "@/@types/strategyResponse";

const StrategyDisplay = ({
  plan_one,
  plan_two,
  plan_three,
  execution_plan,
}: StrategyDisplayProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `复制成功！`,
    });
  };

  const renderPlanBlock = (plan: PlanDetail, defaultName: string) => {
    console.log("Plan:", plan);
    console.log("DefaultName:", defaultName);
    const displayName = plan.name ? plan.name : defaultName;
    console.log("DisplayName:", displayName);

    return (
      <div
        className="relative p-7 min-h-[220px] bg-white/90 backdrop-blur-md rounded-2xl 
        border border-gray-100/30 flex flex-col gap-4
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
        dark:bg-[#1a1a1a]/85 dark:border-gray-800/40 
        transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
      >
        <div className="flex justify-between items-center border-b border-gray-100/60 dark:border-gray-800/40 pb-3">
          <h3 className="text-[19px] font-medium text-gray-800 dark:text-white/90">
            {displayName}
          </h3>
          <button
            onClick={() =>
              copyToClipboard(
                `${displayName}\n计策：${plan.strategy}\n实施：${plan.execution}`
              )
            }
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 
              transition-colors duration-200 p-1.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
            aria-label="复制内容"
          >
            <Copy size={18} />
          </button>
        </div>
        <div className="space-y-5 flex-grow">
          <div>
            <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              计策
            </p>
            <p className="text-gray-600 dark:text-white/75 leading-[1.8] text-[14.5px]">
              {plan.strategy}
            </p>
          </div>
          <div>
            <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              实施
            </p>
            <p className="text-gray-600 dark:text-white/75 leading-[1.8] text-[14.5px]">
              {plan.execution}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTimelineBlock = (title: string, content: string) => (
    <div
      className="flex items-start gap-5 py-3.5 first:pt-0 last:pb-0 
      border-b last:border-0 border-gray-100/60 dark:border-gray-800/40"
    >
      <div className="w-24 flex-shrink-0">
        <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
      </div>
      <p className="flex-grow text-gray-600 dark:text-white/75 leading-[1.8] text-[14.5px]">
        {content}
      </p>
    </div>
  );

  return (
    <div className="space-y-7 w-full max-w-[880px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {renderPlanBlock(plan_one, "计策一")}
        {renderPlanBlock(plan_two, "计策二")}
        {renderPlanBlock(plan_three, "计策三")}
      </div>

      <div
        className="bg-white/90 backdrop-blur-md rounded-2xl 
        border border-gray-100/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
        p-7 space-y-4 dark:bg-[#1a1a1a]/85 dark:border-gray-800/40 
        transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
      >
        <div className="flex justify-between items-center border-b border-gray-100/60 dark:border-gray-800/40 pb-3">
          <h3 className="text-[19px] font-medium text-gray-800 dark:text-white/90">
            执行计划
          </h3>
          <button
            onClick={() =>
              copyToClipboard(
                `短期：${execution_plan.short_term}\n中期：${execution_plan.mid_term}\n长期：${execution_plan.long_term}`
              )
            }
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 
              transition-colors duration-200 p-1.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
            aria-label="复制执行计划"
          >
            <Copy size={18} />
          </button>
        </div>
        <div className="space-y-2 pt-1">
          {renderTimelineBlock("短期", execution_plan.short_term)}
          {renderTimelineBlock("中期", execution_plan.mid_term)}
          {renderTimelineBlock("长期", execution_plan.long_term)}
        </div>
      </div>
    </div>
  );
};

export default StrategyDisplay;
