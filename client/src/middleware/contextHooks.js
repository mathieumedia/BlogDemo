import {useContext} from 'react';
import { AuthContext } from '../context/auth_context/AuthState';

export function useAuth() {
    return useContext(AuthContext);
}