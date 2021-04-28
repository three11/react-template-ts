import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@store/index';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
