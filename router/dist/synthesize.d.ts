import type { ExecutionResult } from './execute.js';
export interface SynthesisResult {
    answer: string;
    quality: number;
    faculties_used: string[];
    subnets_used: {
        netuid: number;
        name: string;
    }[];
}
export declare function synthesize(originalQuery: string, results: ExecutionResult[]): Promise<SynthesisResult>;
