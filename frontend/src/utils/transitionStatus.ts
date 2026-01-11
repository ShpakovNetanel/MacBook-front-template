import { useEffect, useRef, useState } from 'react';

export type TransitionStatus = 'starting' | 'ending' | 'idle' | undefined;

export const useTransitionStatus = (trigger: unknown) => {
    const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(undefined);
    const prevTrigger = useRef(trigger);

    useEffect(() => {
        if (prevTrigger.current === trigger) {
            return;
        }

        prevTrigger.current = trigger;
        setTransitionStatus('starting');

        const frame = requestAnimationFrame(() => {
            setTransitionStatus(undefined);
        });

        return () => cancelAnimationFrame(frame);
    }, [trigger]);

    return { transitionStatus };
};

export const getTransitionAttributes = (transitionStatus: TransitionStatus): Record<string, string> => {
    if (transitionStatus === 'starting') {
        return { 'data-starting-style': '' };
    }

    if (transitionStatus === 'ending') {
        return { 'data-ending-style': '' };
    }

    return {};
};
