import Database from 'better-sqlite3';
declare const db: InstanceType<typeof Database>;
export declare function saveRoute(data: {
    query: string;
    decomposition: object;
    results: object;
    synthesis: string;
    quality: number;
    totalLatencyMs: number;
    facultiesUsed: string[];
    subnetsUsed: object[];
}): void;
export declare function getRecentRoutes(limit?: number): unknown[];
export declare function getRouteCount(): number;
export declare function getWeights(): unknown[];
export declare function updateWeight(faculty: string, quality: number): void;
export declare function getInsights(limit?: number): unknown[];
export declare function addInsight(cycle: number, type: string, text: string): void;
export declare function getStats(): {
    totalRoutes: number;
    avgQuality: number;
    weights: unknown[];
};
export default db;
