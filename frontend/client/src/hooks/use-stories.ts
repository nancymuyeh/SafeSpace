import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "../lib/api";

export interface Story {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

export interface NewStory {
  content: string;
  mood: string;
}

export interface ReactionInput {
  storyId: string;
  type: string;
}

export interface ReportInput {
  storyId: string;
  reason: string;
}

export function useGetStories(filter?: string, sort?: 'newest' | 'popular') {
  return useQuery<Story[]>({
    queryKey: ['stories', filter, sort],
    queryFn: async () => {
      const { data } = await api.get('/stories');
      let stories = data;
      // Client-side filtering/sorting for now since backend only does basic list
      // In production move this to backend params
      if (filter && filter !== 'all') {
        stories = stories.filter((s: Story) => s.mood === filter);
      }
      return stories;
    },
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (story: NewStory) => {
      const { data } = await api.post('/stories', story);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast({
        title: "Story shared",
        description: "Your voice has been heard. Thank you for sharing.",
      });
    },
  });
}

export function useAddReaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ storyId, type }: ReactionInput) => {
      const { data } = await api.post(`/stories/${storyId}/reactions`, { type });
      return data;
    },
    onSuccess: () => {
      // In a real app we might update optimistic cache, but invalidate is safer for MVP
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useReportStory() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ storyId, reason }: ReportInput) => {
      const { data } = await api.post(`/stories/${storyId}/report`, { reason });
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Report received",
        description: "Thank you for helping keep our community safe.",
      });
    },
  });
}

// Backward compatibility alias
export const useStories = useGetStories;

