import type { SubTask } from './decompose.js';
export interface ExecutionResult {
    subtask: SubTask;
    subnet: {
        netuid: number;
        name: string;
    };
    result: string;
    source: 'tensorgate' | 'claude-fallback';
    latencyMs: number;
}
export declare function executeSubTask(subtask: SubTask): Promise<ExecutionResult>;
export declare function executeAll(subtasks: SubTask[]): Promise<ExecutionResult[]>;
