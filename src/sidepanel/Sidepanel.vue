<template>
  <div class="flex flex-col h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 overflow-y-auto"
       ref="componentRef">
    <h1 class="text-3xl font-bold mb-1 text-center">Twitter Badge Wall</h1>


    <div class="flex-grow overflow-hidden">
      <div class="h-full overflow-y-auto pr-4 -mr-4 pt-10">


        <div class="grid grid-cols-3 gap-6 mb-8">
          <div
            v-for="(badge, index) in badges"
            :key="index"
            class="relative flex flex-col items-center p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            :class="[
          badge.followers <= currentFollowers
            ? 'bg-white bg-opacity-20 shadow-lg hover:shadow-xl'
            : 'bg-gray-700 bg-opacity-30 filter grayscale'
        ]"
          >
            <div class="flex-shrink-0">
            <div :class="['icon-circle', badge.bgColorClass]">
<!--              <div :class="[badge.bgColorClass , 'rounded-full' ,'p-2']">-->
              <component
                :is="lucideIcons[badge.icon]"
                :size="32"
                :class="[
            'mb-3 transition-all duration-300',
            badge.followers <= currentFollowers ? badge.iconColorClass : 'text-gray-400'
          ]"
              />
            </div>
            </div>

            <div class="items-center justify-center align-items-center mt-2">
              <div class="text-sm text-center font-semibold two-lines-clamp">{{ badge.followers.toLocaleString() }}</div>
              <div class="text-xs text-center mt-1 three-lines-clamp">{{ badge.reward.en }}</div>
            </div>



            <transition name="bounce">
              <div v-if="badge.followers <= currentFollowers"
                   class="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 animate-bounce">
                <Check :size="16" />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white bg-opacity-10 rounded-lg p-6 mb-8 transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4">Next Badge</h2>
      <div class="flex items-center">
        <component
          :is="lucideIcons[nextBadge.icon]"
          :size="48"
          :class="['mr-4 animate-bounce', nextBadge.iconColorClass]"
        />
        <div>
          <div class="font-semibold text-lg">{{ nextBadge.reward.en }}</div>
          <div class="text-sm">{{ nextBadge.followers.toLocaleString() }} followers</div>
        </div>
      </div>
      <div class="mt-4 bg-blue-600 rounded-full h-3 overflow-hidden">
        <div
          class="bg-yellow-400 h-full rounded-full transition-all duration-1000 ease-out"
          :style="{ width: `${(currentFollowers / nextBadge.followers) * 100}%` }"
        ></div>
      </div>
    </div>

    <button
      @click="captureAndShare"
      class="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-8"
    >
      <Camera class="w-6 h-6 mr-3" />
      Capture and Share
    </button>


    <teleport to="body">
      <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white text-gray-800 rounded-lg p-8 max-w-sm m-4">
          <h3 class="text-2xl font-semibold mb-4">Share Your Badge Wall</h3>
          <p class="mb-6">Your badge wall has been captured and copied to clipboard! Ready to share it on Twitter?</p>
          <div class="flex justify-end">
            <button
              @click="showShareModal = false"
              class="mr-4 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              @click="shareToTwitter"
              class="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Share2 class="w-5 h-5 mr-2" />
              Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import html2canvas from 'html2canvas'
import * as lucideIcons from 'lucide-vue-next'
import { Camera, Share2, Check } from 'lucide-vue-next'
import { extractSteps } from '/src/utils/achievement'

const currentFollowers = ref(0)
const showShareModal = ref(false)
const componentRef = ref(null)

const badges = extractSteps()

const nextBadge = computed(() => {
  return badges.find(badge => badge.followers > currentFollowers.value) || badges[badges.length - 1]
})

onMounted(() => {
  // Simulating follower count increase
  observeData()

  // Don't forget to clear the interval when the component is unmounted
  onUnmounted(() => clearInterval(interval))
})


const observeData = (fetchData) => {
  let interval = setInterval(async () => {

    fetchData()


  }, 500)

  async function fetchData() {

    const result = await chrome.storage.sync.get(['followers'])
    console.log(`await chrome.storage.sync.get(['followers'])`, result)

    currentFollowers.value = result.followers
  }
}


const captureAndShare = async () => {
  if (componentRef.value) {
    const canvas = await html2canvas(componentRef.value)
    canvas.toBlob(blob => {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
    })
    showShareModal.value = true
  }
}

const shareToTwitter = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my Twitter Badge Wall!')}`
  window.open(twitterUrl, '_blank')
  showShareModal.value = false
}
</script>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.icon-circle {
  @apply flex items-center justify-center w-16 h-16 rounded-full shadow-lg;
  background: linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.1) 100%);
}

/* Enhance hover effect */
.icon-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.two-lines-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.three-lines-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
