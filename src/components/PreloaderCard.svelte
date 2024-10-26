<div class="card flex mt-8">
  <div class="skeleton image-wrapper"></div>
  <div class="content-wrapper">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-content"></div>
    <div class="skeleton skeleton-content"></div>
    <div class="skeleton skeleton-content"></div>
    <div class="skeleton skeleton-content"></div>
    <div class="skeleton skeleton-content"></div>
    <div class="skeleton skeleton-content"></div>
  </div>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    background-color: white;
  }

  .skeleton {
    animation: pulse 1.5s infinite;
    background-color: #e0e0e0;
    border-radius: 0.25rem;
  }

  .skeleton-content {
    margin: 0.5rem 0;
    height: 1rem;
    width: 100%;
  }

  .skeleton-content:nth-of-type(3) {
    margin-top: 1.5rem;
  }

  .skeleton-content:nth-of-type(8) {
    width: 45%;
  }

  .image-wrapper {
    border-radius: 0.5rem 0 0 0;
    height: 18rem;
    width: 40%;
  }

  .content-wrapper {
    margin: 1rem;
    width: 60%;
  }

  .skeleton-title {
    height: 1.5rem;
    width: 100%;
  }

  .skeleton-title:nth-of-type(1) {
    margin-top: 0.5rem;
  }

  .skeleton-title:nth-of-type(2) {
    margin-top: 0.5rem;
    width: 80%;
  }

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
</style>
