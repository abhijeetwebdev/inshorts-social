<div class="card mt-4 pointer">
  <div class="preloader">
    <div class="skeleton skeleton-image"></div>
    <div class="skeleton skeleton-title"></div>
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
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    background-color: white;
  }

  .pointer {
    cursor: pointer;
  }

  .preloader {
    display: flex;
    flex-direction: column;
  }

  .skeleton {
    animation: pulse 1.5s infinite;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 8px 0;
  }

  .skeleton-image {
    height: 160px;
    width: 100%;
  }

  .skeleton-title {
    height: 25px;
    width: 80%;
  }

  .skeleton-content {
    height: 15px;
    width: 100%;
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
