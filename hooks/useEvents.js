import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

export default function useEvents() {
    const ctx = useContext(EventContext);
    if (!ctx) throw new Error('EventProvider eksik');
    return ctx;
}
