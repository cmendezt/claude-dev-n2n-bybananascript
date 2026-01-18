<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <span class="text-xl font-bold text-primary-600">
              {{PROJECT_NAME}}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
            >
              About
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} {{PROJECT_NAME}}. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
