'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

interface HorizontalCarouselProps {
  images: string[];
}

export default function HorizontalCarousel({ images }: HorizontalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollThresholdRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartXRef = useRef<number>(0);

  // Handle wheel events to navigate carousel and prevent page scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isHovering || !carouselRef.current) return;
      
      // Prevent the default scroll behavior
      e.preventDefault();
      
      // Accumulate scroll delta
      scrollThresholdRef.current += e.deltaY;
      
      // Navigate based on scroll direction
      if (scrollThresholdRef.current > 50) {
        nextSlide();
        scrollThresholdRef.current = 0;
      } else if (scrollThresholdRef.current < -50) {
        prevSlide();
        scrollThresholdRef.current = 0;
      }
    };

    // Add wheel event listener to the carousel element
    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovering]);

  // Handle touch events for mobile devices
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!carouselRef.current) return;
      
      const touchEndX = e.touches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      
      // Determine swipe direction and navigate
      if (Math.abs(diff) > 50) { // Threshold for swipe detection
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        touchStartXRef.current = touchEndX; // Reset start position
      }
    };

    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener('touchstart', handleTouchStart);
      currentCarouselRef.addEventListener('touchmove', handleTouchMove);
    }
    
    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener('touchstart', handleTouchStart);
        currentCarouselRef.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full my-8 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Reset scroll threshold when leaving
        scrollThresholdRef.current = 0;
      }}
      ref={carouselRef}
    >
      {/* Hover indicator - only visible when hovering */}
      {isHovering && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20 animate-pulse">
          Scroll to navigate
        </div>
      )}
      
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 h-full"
          style={{ transform: `translateX(-${currentIndex * 100 / images.length}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative h-full flex items-center justify-center" 
              style={{ width: `${100 / images.length}%` }}
            >
              <div className={`h-full transition-all duration-500 ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}`}>
                <img
                  src={image}
                  alt={`Bobabike image ${index + 1}`}
                  className="h-full max-w-none object-contain rounded-xl"
                  style={{ 
                    // For landscape image (Bobabike-2.jpg), make it wider
                    maxHeight: '100%',
                    width: image.includes('Bobabike-2.jpg') ? 'auto' : undefined,
                    borderRadius: '0.75rem' // Ensure rounded corners for all images
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`mx-1 w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
