<div class="card flex flex-col md:flex-row">
  <div class="skeleton image-wrapper"></div>
  <div class="content-wrapper">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-time"></div>
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
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    background-color: white;
  }

  /* Flexbox layout for responsiveness */
  .card {
    display: flex;
    flex-direction: column;
  }

  /* Skeleton Animation */
  .skeleton {
    animation: pulse 1.5s infinite;
    background-color: #e0e0e0;
    border-radius: 0.25rem;
  }

  .skeleton-content,
  .skeleton-time {
    margin: 0.5rem 0;
    height: 1rem;
    width: 100%;
  }

  .skeleton-time {
    margin-top: 1rem;
    width: 25%;
  }

  .skeleton-content:nth-of-type(4) {
    margin-top: 1rem;
  }

  .skeleton-content:nth-of-type(8) {
    width: 75%;
  }

  .skeleton-content:nth-of-type(9) {
    margin-top: 1rem;
    width: 40%;
  }

  /* Image Wrapper */
  .image-wrapper {
    width: 100%;
    min-height: 20rem;
    border-radius: 0.5rem 0 0 0;
  }

  /* Content Wrapper */
  .content-wrapper {
    height: auto;
    overflow-y: auto;
    width: 100%;
    padding: 1rem;
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
    width: 50%;
  }

  /* Responsive adjustments for mobile and large screens */
  @media (min-width: 768px) {
    .card {
      flex-direction: row;
    }
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
