<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
        Welcome to {{PROJECT_NAME}}
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        {{PROJECT_DESCRIPTION}}
      </p>
    </section>

    <HelloWorld msg="Hello Vue 3 + TypeScript" />

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Vue 3 Composition API
        </h3>
        <p class="text-gray-600 text-sm">
          Build reactive applications with the powerful Composition API and script setup syntax.
        </p>
      </div>

      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          TypeScript Support
        </h3>
        <p class="text-gray-600 text-sm">
          Full TypeScript support with strict mode enabled for type-safe development.
        </p>
      </div>

      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          State Management
        </h3>
        <p class="text-gray-600 text-sm">
          Pinia for lightweight, type-safe state management with Vue DevTools integration.
        </p>
      </div>

      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Data Fetching
        </h3>
        <p class="text-gray-600 text-sm">
          TanStack Query (Vue Query) for powerful async state management and caching.
        </p>
      </div>

      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Styling
        </h3>
        <p class="text-gray-600 text-sm">
          Tailwind CSS for rapid UI development with utility-first approach.
        </p>
      </div>

      <div class="card hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Testing
        </h3>
        <p class="text-gray-600 text-sm">
          Vitest for unit testing and Playwright for end-to-end testing coverage.
        </p>
      </div>
    </section>
  </div>
</template>
