export type Batch = { refresh: boolean; repeat: number; repeatInterval: number };

export const defaultBatch: Batch = { refresh: false, repeat: 0, repeatInterval: 0 };
