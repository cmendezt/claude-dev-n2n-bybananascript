import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const history = ref<number[]>([])

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  const isNegative = computed(() => count.value < 0)

  // Actions
  function increment() {
    count.value++
    history.value.push(count.value)
  }

  function decrement() {
    count.value--
    history.value.push(count.value)
  }

  function incrementBy(amount: number) {
    count.value += amount
    history.value.push(count.value)
  }

  function reset() {
    count.value = 0
    history.value = []
  }

  function setCount(value: number) {
    count.value = value
    history.value.push(value)
  }

  return {
    // State
    count,
    history,
    // Getters
    doubleCount,
    isPositive,
    isNegative,
    // Actions
    increment,
    decrement,
    incrementBy,
    reset,
    setCount,
  }
})
