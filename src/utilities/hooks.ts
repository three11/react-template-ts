import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@store/interfaces';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
