import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { StrategyDisplayProps } from "@/@types/strategyResponse";

// 定义 URL
const DIDY_API_URL = process.env.DIDY_API_URL || "https://api.dify.ai/v1";
// 定义 API_KEY
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  const { planDescription } = await req.json();

  // 确保请求体中包含 planDescription 字段
  if (!planDescription) {
    return NextResponse.json({ message: "计策描述不存在" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      `${DIDY_API_URL}/workflows/run`,
      {
        inputs: { user_input: planDescription },
        response_mode: "blocking",
        user: "test-user",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIFY_API_KEY}`,
        },
      }
    );

    let strategyPlan = response.data.data.outputs.strategy_plan;

    // 如果返回的是字符串，尝试解析
    if (typeof strategyPlan === "string") {
      try {
        strategyPlan = JSON.parse(strategyPlan);
      } catch (parseError) {
        console.error("解析返回数据失败:", parseError);
        return NextResponse.json({ message: "数据格式错误" }, { status: 400 });
      }
    }

    // 验证返回的数据结构
    if (!strategyPlan || typeof strategyPlan !== "object") {
      return NextResponse.json(
        { message: "返回数据格式无效" },
        { status: 400 }
      );
    }

    // 确保返回数据包含所有必要字段
    const defaultResponse: StrategyDisplayProps = {
      plan_one: {
        name: strategyPlan.plan_one?.name || "计策一",
        strategy: strategyPlan.plan_one?.strategy || "策略生成中...",
        execution: strategyPlan.plan_one?.execution || "执行方案生成中...",
      },
      plan_two: {
        name: strategyPlan.plan_two?.name || "计策二",
        strategy: strategyPlan.plan_two?.strategy || "策略生成中...",
        execution: strategyPlan.plan_two?.execution || "执行方案生成中...",
      },
      plan_three: {
        name: strategyPlan.plan_three?.name || "计策三",
        strategy: strategyPlan.plan_three?.strategy || "策略生成中...",
        execution: strategyPlan.plan_three?.execution || "执行方案生成中...",
      },
      execution_plan: {
        short_term:
          strategyPlan.execution_plan?.short_term || "短期计划生成中...",
        mid_term: strategyPlan.execution_plan?.mid_term || "中期计划生成中...",
        long_term:
          strategyPlan.execution_plan?.long_term || "长期计划生成中...",
      },
    };

    return NextResponse.json(defaultResponse);
  } catch (error) {
    console.error("处理请求错误:", error);
    return NextResponse.json({ message: "服务器处理错误" }, { status: 500 });
  }
}
