import { useEffect, useRef, useState } from 'react';

const useAsyncFunction = (
    asyncFunction: () => Promise<any>,
    dependencies: any = [],
    cleanup: () => void = () => {},
) => {
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isMountedRef = useRef<boolean>(false);
    const performAction = async () => {
        try {
            setData(null);
            setError(null);

            const response = await asyncFunction();

            if (isMountedRef.current) {
                setData(response);
                setLoading(false);
            }
        } catch (err: any) {
            if (isMountedRef.current) {
                setError(err);
                setLoading(false);
            }
        }
    };

    const refresh = () => {
        setLoading(true);
        setData(null);
        setError(null);

        performAction();
    };

    useEffect(() => {
        isMountedRef.current = true;
        setLoading(true);
        setData(null);
        setError(null);

        performAction();

        return () => {
            isMountedRef.current = false;

            if (cleanup) {
                cleanup();
            }
        };
    }, dependencies);

    return { loading, data, error, refresh };
};

export default useAsyncFunction;
