<script lang="ts">
  import type { IImageModal } from '../interfaces/appInterfaces'
  import appStore, { closeImageModal } from '../store/appStore'

  let imageModal: IImageModal
  let imageUrl: string
  let isOpen: boolean = false

  // reactive vars
  $: {
    // reading the app state updates
    appStore.subscribe((value) => {
      imageModal = value.imageModal

      if (imageModal.isOpen) {
        imageUrl = imageModal.url
        isOpen = true
      } else {
        isOpen = false
      }
    })
  }

  // Function to close the modal on background click
  const handleBackgroundClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-background')) {
      closeImageModal()
    }
  }
</script>

<div
  class={`modal-background fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
  on:click={handleBackgroundClick}
  role="dialog"
  aria-labelledby="modal-title"
  aria-hidden={!isOpen ? 'true' : 'false'}
  tabindex="-1"
>
  <div
    class="modal-content relative bg-white rounded-lg max-w-full max-h-full"
    role="document"
  >
    <img
      src={imageUrl}
      alt="Modal Image"
      class="max-w-full max-h-[80vh] object-contain"
    />
  </div>
</div>

<style>
  .modal-background {
    z-index: 2;
    height: 100vh;
    width: 100vw;
  }

  .modal-background img {
    max-width: 90vw;
  }
</style>
