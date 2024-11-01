// [schemas] 用户输入内容验证

import { z } from "zod";

export const userInputSchema = z.object({
  planDescription: z.string().min(1, "请输入您的困境描述"),
});

export type UserInputType = z.infer<typeof userInputSchema>;