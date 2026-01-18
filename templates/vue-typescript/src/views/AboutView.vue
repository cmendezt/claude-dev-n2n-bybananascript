<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'

const features = ref([
  {
    title: 'Vue 3',
    description: 'Progressive JavaScript framework for building user interfaces',
    icon: 'V',
  },
  {
    title: 'TypeScript',
    description: 'Typed superset of JavaScript for enhanced developer experience',
    icon: 'TS',
  },
  {
    title: 'Vite',
    description: 'Next generation frontend tooling for blazing fast development',
    icon: 'V',
  },
  {
    title: 'Pinia',
    description: 'Intuitive, type safe store for Vue with DevTools support',
    icon: 'P',
  },
  {
    title: 'Vue Router',
    description: 'Official router for Vue.js with dynamic routing support',
    icon: 'R',
  },
  {
    title: 'TanStack Query',
    description: 'Powerful asynchronous state management for data fetching',
    icon: 'Q',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    icon: 'TW',
  },
  {
    title: 'Vitest',
    description: 'Blazing fast unit test framework powered by Vite',
    icon: 'VT',
  },
  {
    title: 'Playwright',
    description: 'Reliable end-to-end testing for modern web apps',
    icon: 'PW',
  },
])
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="text-4xl font-bold text-gray-900">
        About This Template
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        A modern Vue 3 + TypeScript template with best practices and essential tooling
        for building production-ready applications.
      </p>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Tech Stack
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card flex items-start gap-4 hover:shadow-md transition-shadow"
        >
          <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <span class="text-sm font-bold text-primary-700">
              {{ feature.icon }}
            </span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-12 card bg-gradient-to-r from-primary-50 to-secondary-50">
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Get Started
        </h2>
        <p class="text-gray-600 mb-6">
          Start building your next Vue application with this template.
        </p>
        <div class="flex items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            @click="() => {}"
          >
            View Documentation
          </Button>
          <Button
            variant="outline"
            size="lg"
            @click="() => {}"
          >
            GitHub Repository
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
