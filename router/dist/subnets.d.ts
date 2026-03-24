export declare const FACULTIES: readonly ["Perception", "Generation", "Reasoning", "Memory", "Learning", "Attention", "Executive Functions", "Metacognition", "Problem Solving", "Social Cognition"];
export type Faculty = typeof FACULTIES[number];
export interface SubnetInfo {
    netuid: number;
    name: string;
    desc: string;
    primary: Faculty;
    secondary: Faculty | null;
}
export declare const ROUTING_TABLE: Record<Faculty, {
    netuid: number;
    name: string;
}[]>;
