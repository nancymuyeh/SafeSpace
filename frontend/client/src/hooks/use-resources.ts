import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
}

export function useGetResources() {
    return useQuery<Resource[]>({
        queryKey: ['resources'],
        queryFn: async () => {
            const { data } = await api.get('/resources');
            return data;
        },
    });
}
