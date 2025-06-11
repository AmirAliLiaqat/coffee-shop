'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/bg.jpg",
      title: "Hi Welcome",
      subtitle: "COFFEE",
      year: "SINCE 2025"
    },
    {
      image: "https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/bg.jpg",
      title: "We Have Been Serving",
      subtitle: "COFFEE",
      year: "SINCE 2025"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="w-full mb-4 sm:mb-6 md:mb-10">
      <div className="relative overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.image}
                alt="Coffee shop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75" />
              <Card className="absolute inset-0 bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center text-center h-full">
                  <h2 className="text-amber-500 font-medium text-2xl mb-2">{slide.title}</h2>
                  <h1 className="text-white text-6xl font-bold mb-2">{slide.subtitle}</h1>
                  <h2 className="text-white text-2xl">* {slide.year} *</h2>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <Button
          onClick={prevSlide}
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={nextSlide}
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      {/* Bottom Overlay */}
      <div className="overlay-bottom relative">
        <img
          src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-bottom.png"
          alt="overlay bottom"
          className="absolute bottom-[-1px] left-0 w-full h-[15px] z-10"
        />
      </div>
    </div>
  )
}

export default Carousel
