import { store } from '..';

export * from './branches/auth/interfaces';

export type RootState = ReturnType<typeof store.getState>;
