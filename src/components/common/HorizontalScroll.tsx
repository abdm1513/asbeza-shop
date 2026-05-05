import { useRef, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HorizontalScrollProps {
  children: ReactNode
  title?: string
  seeAllLink?: string
  className?: string          
  innerClassName?: string     
}

export function HorizontalScroll({ 
  children, 
  title, 
  seeAllLink, 
  className = "", 
  innerClassName = "gap-4 px-4" 
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {(title || seeAllLink) && (
        <div className="flex justify-between items-end mb-4 px-4">
          {title && <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-none">{title}</h2>}
          {seeAllLink && (
            <a href={seeAllLink} className="text-primary hover:text-primary-dark text-sm font-semibold whitespace-nowrap">
              ሁሉንም ይመልከቱ →
            </a>
          )}
        </div>
      )}
      
      {/* 🟢 The 'group' is here so buttons respond to hover on the scroll area */}
      <div className="relative group/scroll">
        
        {/* Left Button - Forced Visible on Hover */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-[42%] -translate-y-1/2 z-20 bg-white shadow-xl border border-gray-100 rounded-full p-2 opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hidden md:block hover:bg-gray-50 active:scale-90"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto scrollbar-hide pb-8 pt-2 ${innerClassName}`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {children}
        </div>
        
        {/* Right Button - Forced Visible on Hover */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 top-[42%] -translate-y-1/2 z-20 bg-white shadow-xl border border-gray-100 rounded-full p-2 opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hidden md:block hover:bg-gray-50 active:scale-90"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-gray-700" />
        </button>
      </div>
    </div>
  )
}
