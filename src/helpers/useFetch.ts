import { useEffect, useState } from "react";
import {IJsonAddCart} from "../typings.ts";

interface FetchResult<T> {
    data: T | null;
    error: Error | null;
}

type HttpMethod = "GET" | "POST" | "DELETE";

export function useFetch<T>(
    url: string,
    method: HttpMethod = "GET",
    body?: IJsonAddCart | undefined
): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const requestBody: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        fetch(url, requestBody)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Status ${res.status}`);
                }
                return res.json();
            })
            .then((responseData) => {
                setData(responseData);
            })
            .catch((err) => {
                setError(err);
            });
    }, [url, method, body]);

    return { data, error };
}
