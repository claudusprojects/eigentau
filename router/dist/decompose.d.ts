import { type Faculty } from './subnets.js';
export interface SubTask {
    task: string;
    faculty: Faculty;
    reasoning: string;
}
export interface Decomposition {
    subtasks: SubTask[];
    strategy: string;
}
export declare function decompose(query: string): Promise<Decomposition>;
