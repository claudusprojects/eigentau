export interface AgentConfig {
    id: string;
    name: string;
    system_prompt: string;
    model: string;
    autonomous: number;
    goal: string | null;
}
export interface ChatResponse {
    reply: string;
    routed: boolean;
    steps?: {
        task: string;
        faculty: string;
        subnet: string;
    }[];
    quality?: number;
    latencyMs: number;
}
export declare function chat(agent: AgentConfig, userMessage: string): Promise<ChatResponse>;
