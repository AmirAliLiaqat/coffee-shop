'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialData } from "@/types/frontend/testimonials"
import { testimonials } from "@/mock/frontend/testimonials"

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => {
  return (
    <div className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4">
      <Card className="hover:shadow-xl transition-shadow h-full">
        <CardContent className="p-8">
          <div className="flex items-center mb-4">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-600 italic">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-600">{testimonial.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}

const Testimonial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="w-full py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="uppercase tracking-widest font-medium text-primary">Our Clients Say</h4>
          <h1 className="text-4xl font-bold mt-2 text-gray-900">Testimonial</h1>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 -ml-4"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10 -mr-4"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
