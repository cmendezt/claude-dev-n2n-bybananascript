import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import type { ApiResponse, ApiError } from '@/types'

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})) as Record<string, unknown>
    const error: ApiError = {
      message: (errorData['message'] as string | undefined) ?? 'An error occurred',
      status: response.status,
      code: errorData['code'] as string | undefined,
    }
    throw error
  }

  return response.json() as Promise<T>
}

// GET request composable
export function useApiGet<T>(
  endpoint: MaybeRef<string>,
  options?: {
    enabled?: MaybeRef<boolean>
    staleTime?: number
    gcTime?: number
  }
) {
  return useQuery<T, ApiError>({
    queryKey: ['api', endpoint],
    queryFn: () => fetchApi<T>(unref(endpoint)),
    enabled: options?.enabled !== undefined ? unref(options.enabled) : true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
  })
}

// POST request composable
export function useApiPost<TData, TVariables>(endpoint: string) {
  const queryClient = useQueryClient()

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: (variables) =>
      fetchApi<TData>(endpoint, {
        method: 'POST',
        body: JSON.stringify(variables),
      }),
    onSuccess: () => {
      // Invalidate related queries on success
      void queryClient.invalidateQueries({ queryKey: ['api'] })
    },
  })
}

// PUT request composable
export function useApiPut<TData, TVariables>(
  endpoint: MaybeRef<string>
) {
  const queryClient = useQueryClient()

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: (variables) =>
      fetchApi<TData>(unref(endpoint), {
        method: 'PUT',
        body: JSON.stringify(variables),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['api'] })
    },
  })
}

// DELETE request composable
export function useApiDelete<TData>(endpoint: MaybeRef<string>) {
  const queryClient = useQueryClient()

  return useMutation<TData, ApiError, void>({
    mutationFn: () =>
      fetchApi<TData>(unref(endpoint), {
        method: 'DELETE',
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['api'] })
    },
  })
}

// Example: Typed API hooks for specific resources
export function useUsers() {
  return useApiGet<ApiResponse<{ id: string; name: string; email: string }[]>>(
    '/users'
  )
}

export function useUser(id: MaybeRef<string>) {
  return useApiGet<ApiResponse<{ id: string; name: string; email: string }>>(
    `/users/${unref(id)}`,
    {
      enabled: Boolean(unref(id)),
    }
  )
}

export function useCreateUser() {
  return useApiPost<
    ApiResponse<{ id: string }>,
    { name: string; email: string }
  >('/users')
}
