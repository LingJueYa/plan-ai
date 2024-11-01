export interface PlanDetail {
  name?: string;
  strategy: string;
  execution: string;
}

export interface ExecutionPlan {
  short_term: string;
  mid_term: string;
  long_term: string;
}

export interface StrategyDisplayProps {
  plan_one: PlanDetail;
  plan_two: PlanDetail;
  plan_three: PlanDetail;
  execution_plan: ExecutionPlan;
}
