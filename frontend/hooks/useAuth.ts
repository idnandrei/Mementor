"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  getCurrentUserOptions,
  getCurrentUserQueryKey,
  loginMutation,
  logoutMutation,
  registerUserMutation,
} from "@/generated/api/@tanstack/react-query.gen";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentUserQuery = useQuery(getCurrentUserOptions());

  const registration = useMutation({
    ...registerUserMutation(),

    onSuccess: () => {
      router.push("/login");
    },
  });

  const login = useMutation({
    ...loginMutation(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryKey(),
      });

      router.push("/home");
    },
  });

  const logout = useMutation({
    ...logoutMutation(),

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: getCurrentUserQueryKey(),
      });
      router.replace("/login");
    },
  });

  return {
    user: currentUserQuery.data,
    isAuthenticated: Boolean(currentUserQuery.data),
    isLoading: currentUserQuery.isPending,

    register: registration.mutate,
    isRegistering: registration.isPending,

    login: login.mutate,
    isLoggingIn: login.isPending,

    logout: logout.mutate,
    isLoggingOut: logout.isPending,
  };
}
