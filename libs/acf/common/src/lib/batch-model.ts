export type IBatch = { refresh: boolean; repeat: number; repeatInterval: number };

export const defaultBatch: IBatch = { refresh: false, repeat: 0, repeatInterval: 0 };
