// code for the slideshow in video-container4
  let slideIndex = 0; // Start from the first iframe

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    const iframes = document.querySelectorAll(".slideshow-container iframe");
    
    // Ensure slide index stays within bounds
    if (n >= iframes.length) {
      slideIndex = 0; // Loop back to the first iframe
    }
    if (n < 0) {
      slideIndex = iframes.length - 1; // Go to the last iframe
    }
    
    // Hide all iframes
    iframes.forEach(iframe => {
      iframe.style.display = "none";
    });
    
    // Show the current iframe
    iframes[slideIndex].style.display = "block";
  }
  
  // Function to initialize the slideshow
  function initializeSlideshow() {
    const slideshowContainer = document.querySelector(".slideshow-container");
    const iframes = [
      "https://www.globalforestwatch.org/embed/widget/fireAlertStats/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/burnedAreaCumulative/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/treeLossFiresAnnual/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/burnedAreaRanked/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/firesAlertsSimple/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/treeLossFires/country/PAK"
    ];
    
    // Insert iframes into the slideshow container
    iframes.forEach(src => {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.frameBorder = "0";
      slideshowContainer.appendChild(iframe);
    });
    
    // Show the first iframe initially
    showSlides(slideIndex);
  }
  
  // Initialize the slideshow when the DOM content is loaded
  document.addEventListener("DOMContentLoaded", initializeSlideshow);
  
  
  