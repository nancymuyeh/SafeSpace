import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MOCK_USER = {
  id: "mock-user-123",
  email: "anonymous@safespace.com",
  firstName: "Kind",
  lastName: "Stranger",
  profileImageUrl: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function useAuth() {
  const queryClient = useQueryClient();
  
  // By default, we simulate a guest state for the prototype
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return null; // Return null to simulate logged out state, or MOCK_USER for logged in
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
