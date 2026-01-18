<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
import Button from '@/components/ui/Button.vue'

interface Props {
  msg: string
}

const props = defineProps<Props>()

const counterStore = useCounterStore()

const greeting = computed(() => {
  return `${props.msg} - Count: ${counterStore.count}`
})
</script>

<template>
  <div class="card text-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      {{ greeting }}
    </h1>

    <p class="text-gray-600 mb-6">
      This is a demo component showcasing Vue 3 Composition API with TypeScript.
    </p>

    <div class="flex items-center justify-center gap-4 mb-6">
      <Button
        variant="outline"
        size="md"
        @click="counterStore.decrement"
      >
        -
      </Button>

      <span class="text-2xl font-semibold text-gray-900 min-w-[4rem]">
        {{ counterStore.count }}
      </span>

      <Button
        variant="primary"
        size="md"
        @click="counterStore.increment"
      >
        +
      </Button>
    </div>

    <div class="flex items-center justify-center gap-4">
      <Button
        variant="secondary"
        size="sm"
        @click="counterStore.reset"
      >
        Reset
      </Button>

      <Button
        variant="outline"
        size="sm"
        @click="counterStore.incrementBy(10)"
      >
        +10
      </Button>
    </div>

    <p
      v-if="counterStore.history.length > 0"
      class="mt-6 text-sm text-gray-500"
    >
      History: {{ counterStore.history.slice(-5).join(', ') }}
      <span v-if="counterStore.history.length > 5">...</span>
    </p>
  </div>
</template>
