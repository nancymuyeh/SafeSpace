import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { api } from "../lib/api";

// Define the Story interface based on the schema
export interface Story {
  id: number;
  content: string;
  mood: string;
  createdAt: string;
}

// CreateStory type omits 'id' and 'createdAt' for creation
export type CreateStory = Omit<Story, 'id' | 'createdAt'>;

export function useGetStories(mood?: string, sort?: 'newest' | 'popular') {
  return useQuery<Story[]>({
    queryKey: ['stories', { mood, sort }],
    queryFn: async () => {
      const response = await api.get('/stories');
      let stories: Story[] = response.data;
      if (mood && mood !== 'all') {
        stories = stories.filter(s => s.mood === mood);
      }
      if (sort === 'popular') {
        // Add sorting by reactions when that is implemented
      } else {
        stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return stories;
    },
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Story, unknown, CreateStory>({
    mutationFn: async (data: CreateStory) => {
      const response = await api.post('/stories', data);
      return response.data;
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
    mutationFn: async ({ storyId, type }: { storyId: number; type: string }) => {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      return { id: Math.random(), storyId, type };
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stories'] });
    }
  });
}

export function useReportStory() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ storyId, reason }: { storyId: number; reason: string }) => {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      toast({
        title: "Report received",
        description: "Thank you for helping keep our community safe.",
      });
    },
  });
}
