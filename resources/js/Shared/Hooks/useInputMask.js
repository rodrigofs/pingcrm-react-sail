import { masks } from '@/Shared/Utils/masks';
import { useCallback } from 'react';

const useInputMask = (mask = undefined) => {
    return useCallback((ev) => {
        if (mask !== undefined) {
            masks[mask](ev);
            return;
        }
    }, []);
};

export default useInputMask;
