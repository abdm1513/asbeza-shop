// import { useState, useEffect, useRef, useCallback } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { OptimizedImage } from '../../../components/common/OptimizedImage'
// import { useOnlineStatus } from '../../../hooks/useOnlineStatus'
// import { ErrorState } from '../../../components/feedback/ErrorState'

// interface Banner {
//   $id: string
//   image: string
//   title?: string
//   subtitle?: string
//   link?: string
// }

// interface BannerCarouselProps {
//   banners: Banner[]
//   isLoading?: boolean
//   error?: unknown
//   autoPlayInterval?: number
// }

// export function BannerCarousel({
//   banners = [],
//   isLoading = false,
//   error,
//   autoPlayInterval = 5000
// }: BannerCarouselProps) {

//   const isOnline = useOnlineStatus()

//   // ✅ ALL HOOKS MUST BE AT THE TOP
//   const [currentIndex, setCurrentIndex] = useState(1)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const [touchStart, setTouchStart] = useState<number | null>(null)
//   const [touchEnd, setTouchEnd] = useState<number | null>(null)

//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

//   // ✅ Safe slides creation
//   const hasBanners = banners && banners.length > 0
//   const slides = hasBanners
//     ? [banners[banners.length - 1], ...banners, banners[0]]
//     : []

//   const handleTransitionEnd = () => {
//     if (!hasBanners) return

//     setIsTransitioning(false)

//     if (currentIndex === slides.length - 1) {
//       setCurrentIndex(1)
//     }

//     if (currentIndex === 0) {
//       setCurrentIndex(slides.length - 2)
//     }
//   }

//   const goToNext = useCallback(() => {
//     if (isTransitioning || !hasBanners) return
//     setIsTransitioning(true)
//     setCurrentIndex((prev) => prev + 1)
//   }, [isTransitioning, hasBanners])

//   const goToPrevious = () => {
//     if (isTransitioning || !hasBanners) return
//     setIsTransitioning(true)
//     setCurrentIndex((prev) => prev - 1)
//   }

//   const goToSlide = (index: number) => {
//     if (isTransitioning || !hasBanners) return
//     setIsTransitioning(true)
//     setCurrentIndex(index + 1)
//   }

//   useEffect(() => {
//     if (!isOnline || !hasBanners || banners.length <= 1) return

//     intervalRef.current = setInterval(goToNext, autoPlayInterval)

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current)
//     }
//   }, [banners.length, autoPlayInterval, isOnline, goToNext, hasBanners])

//   const onTouchStart = (e: React.TouchEvent) => {
//     setTouchEnd(null)
//     setTouchStart(e.targetTouches[0].clientX)
//   }

//   const onTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX)
//   }

//   const onTouchEndHandler = () => {
//     if (!touchStart || !touchEnd) return

//     const distance = touchStart - touchEnd

//     if (distance > 50) goToNext()
//     if (distance < -50) goToPrevious()

//     setTouchStart(null)
//     setTouchEnd(null)
//   }

//   // ✅ UI STATES (AFTER HOOKS)

//   if (isLoading) {
//     return (
//       <div className="w-full h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] rounded-2xl bg-gray-100 animate-pulse" />
//     )
//   }

//   if (error) {
//     return <ErrorState />
//   }

//   if (!isOnline) {
//     return (
//       <div className="w-full h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 text-sm">
//         ኢንተርኔት የለም
//       </div>
//     )
//   }

//   if (!hasBanners) {
//     return (
//       <div className="w-full h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
//         No banners available
//       </div>
//     )
//   }

//   // ✅ MAIN CAROUSEL

//   return (
//     <div
//       className="relative overflow-hidden w-full group rounded-2xl"
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEndHandler}
//     >
//       <div
//         className={`flex h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] ${
//           isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'
//         }`}
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {slides.map((banner, index) => (
//           <div key={`${banner.$id}-${index}`} className="min-w-full h-full relative">
//             <OptimizedImage
//               src={banner.image}
//               alt={banner.title || 'Banner'}
//               className="w-full h-full object-cover"
//               width={1200}
//               height={420}
//             />

//             {(banner.title || banner.subtitle) && (
//               <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex items-center">
//                 <div className="px-6 sm:px-10 md:px-16 text-white max-w-[80%]">
//                   <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2">
//                     {banner.title}
//                   </h2>
//                   <p className="text-xs sm:text-base md:text-xl opacity-90">
//                     {banner.subtitle}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={goToPrevious}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition hidden sm:block"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             onClick={goToNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition hidden sm:block"
//           >
//             <ChevronRight size={24} />
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//             {banners.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`h-1.5 rounded-full transition-all duration-300 ${
//                   (currentIndex === index + 1) ||
//                   (currentIndex === 0 && index === banners.length - 1) ||
//                   (currentIndex === slides.length - 1 && index === 0)
//                     ? 'bg-white w-8'
//                     : 'bg-white/40 w-2'
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   )
// }


import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { OptimizedImage } from '../../../components/common/OptimizedImage'
import { useOnlineStatus } from '../../../hooks/useOnlineStatus'
import { ErrorState } from '../../../components/feedback/ErrorState'

interface Banner {
  $id: string
  image: string
  title?: string
  subtitle?: string
  link?: string
}

interface BannerCarouselProps {
  banners: Banner[]
  isLoading?: boolean
  error?: unknown
  autoPlayInterval?: number
}

export function BannerCarousel({
  banners = [],
  isLoading = false,
  error,
  autoPlayInterval = 5000
}: BannerCarouselProps) {

  const isOnline = useOnlineStatus()

  // ✅ ALL HOOKS MUST BE AT THE TOP
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ✅ Safe slides creation
  const hasBanners = banners && banners.length > 0
  const slides = hasBanners
    ? [banners[banners.length - 1], ...banners, banners[0]]
    : []

  const handleTransitionEnd = () => {
    if (!hasBanners) return

    setIsTransitioning(false)

    if (currentIndex === slides.length - 1) {
      setCurrentIndex(1)
    }

    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 2)
    }
  }

  const goToNext = useCallback(() => {
    if (isTransitioning || !hasBanners) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [isTransitioning, hasBanners])

  const goToPrevious = () => {
    if (isTransitioning || !hasBanners) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || !hasBanners) return
    setIsTransitioning(true)
    setCurrentIndex(index + 1)
  }

  // Only auto-play when online AND we have banners
  useEffect(() => {
    if (!isOnline || !hasBanners || banners.length <= 1) return

    intervalRef.current = setInterval(goToNext, autoPlayInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [banners.length, autoPlayInterval, isOnline, goToNext, hasBanners])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd

    if (distance > 50) goToNext()
    if (distance < -50) goToPrevious()

    setTouchStart(null)
    setTouchEnd(null)
  }

  // ✅ UI STATES (AFTER HOOKS)

  if (isLoading) {
    return (
      <div className="w-full h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] rounded-2xl bg-gray-100 animate-pulse" />
    )
  }

  if (error && !isOnline && !hasBanners) {
    // Only show error if we have no cached data AND there's an error
    return <ErrorState />
  }

  // ✅ REMOVED the early return for !isOnline
  // Instead, we'll show cached banners with an optional offline indicator
  
  if (!hasBanners) {
    return (
      <div className="w-full h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        {!isOnline ? 'የኢንተርኔት ግንኙነት ተቋርጧል' : 'No banners available'}
      </div>
    )
  }

  // ✅ MAIN CAROUSEL - Shows cached data even when offline

  return (
    <div className="relative">
      {/* Optional: Show offline indicator when offline */}
      {!isOnline && (
        <div className="absolute top-2 left-2 z-20 bg-amber-500/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
          ⚡ የኢንተርኔት ግንኙነት ተቋርጧል
        </div>
      )}
      
      <div
        className="relative overflow-hidden w-full group rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        <div
          className={`flex h-[140px] sm:h-[200px] md:h-[280px] lg:h-[360px] ${
            isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((banner, index) => (
            <div key={`${banner.$id}-${index}`} className="min-w-full h-full relative">
              <OptimizedImage
                src={banner.image}
                alt={banner.title || 'Banner'}
                className="w-full h-full object-cover"
                width={1200}
                height={420}
              />

              {(banner.title || banner.subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex items-center">
                  <div className="px-6 sm:px-10 md:px-16 text-white max-w-[80%]">
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-xs sm:text-base md:text-xl opacity-90">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition hidden sm:block"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition hidden sm:block"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    (currentIndex === index + 1) ||
                    (currentIndex === 0 && index === banners.length - 1) ||
                    (currentIndex === slides.length - 1 && index === 0)
                      ? 'bg-white w-8'
                      : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}