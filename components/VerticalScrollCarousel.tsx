'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VerticalScrollCarouselProps {
  images: string[];
}

export default function VerticalScrollCarousel({ images }: VerticalScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate the height needed for the scroll container based on the number of images
  // Added extra space (100vh) after the last image
  const containerHeight = images.length * 70 + 100 + 'vh';
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full my-20"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-[15vh] h-[70vh] overflow-hidden rounded-2xl">
        <h3 className="text-2xl font-bold mb-6 text-center lg:text-right">The Bobabike Journey</h3>
        
        {images.map((image, index) => {
          // Calculate progress for each image to create a staggered effect
          const imageProgress = useTransform(
            scrollYProgress,
            [index / images.length, (index + 1) / images.length],
            [0, 1]
          );
          
          // Calculate opacity to fade images in and out
          const opacity = useTransform(
            scrollYProgress,
            [
              Math.max(0, (index - 0.5) / images.length),
              index / images.length,
              (index + 1) / images.length,
              Math.min(1, (index + 1.5) / images.length)
            ],
            [0, 1, 1, 0]
          );
          
          // Calculate scale for a subtle zoom effect
          const scale = useTransform(
            scrollYProgress,
            [index / images.length, (index + 1) / images.length],
            [0.9, 1]
          );
          
          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center lg:justify-end"
              style={{ 
                opacity,
                scale,
                zIndex: index
              }}
            >
              <div className="w-full lg:w-[60%] h-full flex items-center justify-center">
                <img
                  src={image}
                  alt={`Bobabike image ${index + 1}`}
                  className="w-full h-auto max-h-full object-contain rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Caption that appears with the image */}
              <motion.div 
                className="absolute bottom-8 left-0 right-0 lg:right-[20%] lg:left-auto lg:w-[55%] text-center bg-black/50 py-2 px-4 mx-auto max-w-md rounded-lg"
                style={{ opacity }}
              >
                <p className="text-white font-medium">
                  {getImageCaption(index)}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to provide captions for each image
function getImageCaption(index: number): string {
  const captions = [
    "The Bobabike in action, serving customers in Oslo",
    "Custom-built kitchen setup inside the cargo bike",
    "Fresh bubble tea being prepared on the go",
    "The complete Bobabike setup ready for business"
  ];
  
  return captions[index % captions.length];
}
