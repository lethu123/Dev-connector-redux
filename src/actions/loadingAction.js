import { LOADING } from './types';
export const isLoading = (status) => {
    return {
        type: LOADING,
        isLoading: status
    }
}