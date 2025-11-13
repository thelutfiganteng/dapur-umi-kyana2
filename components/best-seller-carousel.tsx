"use client"

import { useEffect, useRef, useState } from "react"

interface BestSellerItem {
  id: string
  name: string
  price: number
  image: string
  rating: number
}

interface BestSellerCarouselProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void
}

const bestSellerData: BestSellerItem[] = [
   {
    id: "bs-1",
    name: "Ayam Cabe Hijau",
    price: 25000,
    image: "/AyamSambalHijau.jpeg",
    rating: 4.9,
  },
  {
    id: "bs-2",
    name: "Ayam Crispy",
    price: 25000,
    image: "/ayamCrispy.jpeg",
    rating: 4.8,
  },
  {
    id: "bs-3",
    name: "Snack dengan Susu",
    price: 25000,
    image: "/SnackSusu.jpeg",
    rating: 4.9,
  },
  {
    id: "bs-6",
    name: "Snack dengan Susu Kacang Hijau",
    price: 25000,
    image: "/snackKacangHijau.jpeg",
    rating: 4.9,
  },
  {
    id: "bs-4",
    name: "Ayam Rendang",
    price: 25000,
    image: "/ayamRendang.jpeg",
    rating: 4.7,
  },
  {
    id: "bs-5",
    name: "Nasi Lele Spesial",
    price: 25000,
    image: "/NasiLeleSpesial.jpeg",
    rating: 4.8,
  },
]

export default function BestSellerCarousel({ onAddToCart }: BestSellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout>()

  const pauseAutoScroll = () => {
    setIsAutoScroll(false)
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }
  }

  const resumeAutoScroll = () => {
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScroll(true)
    }, 8000)
  }

  useEffect(() => {
    if (!isAutoScroll || !scrollRef.current) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          scrollRef.current.scrollLeft += 400
        }
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoScroll])

  const handleManualScroll = (direction: "left" | "right") => {
    pauseAutoScroll()
    resumeAutoScroll()

    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-accent/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan animasi */}
        <div className="mb-12 text-center animate-slide-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
              Pilihan Favorit Pelanggan
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Best Seller Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nikmati menu pilihan yang paling dicintai oleh pelanggan kami dengan kualitas terbaik dan cita rasa lezat.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Button */}
          <button
            onClick={() => handleManualScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-6 hover:shadow-primary/30"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            {bestSellerData.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group/card snap-center h-full flex flex-col hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-b from-primary/10 to-accent/10">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Best Seller Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce-soft">
                      Best Seller
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold text-sm text-foreground">{item.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{item.name}</h3>

                    <div className="flex-1" />

                    <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Harga</p>
                        <p className="text-2xl font-bold text-primary">Rp{(item.price / 1000).toFixed(0)}K</p>
                      </div>

                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            onAddToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            })
                          }
                        }}
                        className="bg-gradient-to-r from-primary to-accent text-white p-3 rounded-full hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-110"
                        aria-label={`Order ${item.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => handleManualScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-6 hover:shadow-primary/30"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Auto-scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {bestSellerData.map((_, index) => (
            <div key={index} className="h-2 bg-primary/20 rounded-full animate-pulse-soft" style={{ width: "8px" }} />
          ))}
        </div>
      </div>
    </section>
  )
}
