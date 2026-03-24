// Cognitive faculty definitions and subnet-to-faculty mapping
// Mirrors app/src/lib/subnets.ts but simplified for backend use
export const FACULTIES = [
    'Perception', 'Generation', 'Reasoning', 'Memory', 'Learning',
    'Attention', 'Executive Functions', 'Metacognition', 'Problem Solving', 'Social Cognition'
];
// Top subnets per faculty — the ones we actually route to
// (not all 119, just the most useful for each cognitive task)
export const ROUTING_TABLE = {
    'Perception': [{ netuid: 4, name: 'Targon' }, { netuid: 42, name: 'Gopher' }, { netuid: 34, name: 'BitMind' }],
    'Generation': [{ netuid: 17, name: '404-GEN' }, { netuid: 21, name: 'OMEGA' }, { netuid: 59, name: 'Babelbit' }],
    'Reasoning': [{ netuid: 1, name: 'Apex' }, { netuid: 5, name: 'Hone' }, { netuid: 6, name: 'Numinous' }],
    'Memory': [{ netuid: 13, name: 'Data Universe' }, { netuid: 24, name: 'Quasar' }, { netuid: 40, name: 'Chunking' }],
    'Learning': [{ netuid: 3, name: 'Templar' }, { netuid: 9, name: 'IOTA' }, { netuid: 56, name: 'Gradients' }],
    'Attention': [{ netuid: 22, name: 'Desearch' }, { netuid: 47, name: 'EvolAI' }],
    'Executive Functions': [{ netuid: 12, name: 'Compute Horde' }, { netuid: 64, name: 'Chutes' }, { netuid: 0, name: 'Root' }],
    'Metacognition': [{ netuid: 15, name: 'De-Val' }, { netuid: 37, name: 'Aurelius' }, { netuid: 23, name: 'Trishool' }],
    'Problem Solving': [{ netuid: 20, name: 'GroundLayer' }, { netuid: 36, name: 'Web Agents' }, { netuid: 8, name: 'Vanta' }],
    'Social Cognition': [{ netuid: 16, name: 'BitAds' }, { netuid: 122, name: 'Bitrecs' }],
};
