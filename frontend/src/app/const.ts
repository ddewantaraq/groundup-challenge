const SUSPECTED_REASONS = [
    { id: 'unknown anomaly', value: 'Unknown Anomaly' },
    { id: 'spindle error', value: 'Spindle Error' },
    { id: 'axis problem', value: 'Axis Problem' },
    { id: 'normal', value: 'Normal' },
    { id: 'machine crash', value: 'Machine Crash' },
    { id: 'router fault', value: 'Router Fault' },
];

const ACTIONS = [
    { id: 'immediate', value: 'Immediate' },
    { id: 'later', value: 'Later' },
    { id: 'no action', value: 'No Action' },
];

export {
    SUSPECTED_REASONS,
    ACTIONS,
}