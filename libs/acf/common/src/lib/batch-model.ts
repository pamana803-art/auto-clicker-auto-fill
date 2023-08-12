export type Batch = { refresh: true; repeat: never; repeatInterval: never } | { refresh: false; repeat: number; repeatInterval: number };

export const defaultBatch: Batch = { refresh: false, repeat: 0, repeatInterval: 0 };
