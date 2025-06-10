'use client'

import { useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

// Define the testimonial data type
interface TestimonialData {
  id: number
  name: string
  role: string
  image: string
  content: string
}

// Testimonial card component
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

// Sample testimonial data
const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    content: "The coffee here is absolutely amazing! I love their specialty lattes and the atmosphere is so cozy. It's become my favorite spot to work and relax."
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    content: "I've been coming here every morning for the past year. Their cold brew is the best in town, and the staff always remembers my order!"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Coffee Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    content: "As a coffee blogger, I've tried countless cafes, but this place stands out. Their attention to detail in brewing and presentation is exceptional."
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Coffee Shop Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    content: "The quality of their beans and the skill of their baristas is impressive. I often come here to learn new techniques for my own shop."
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "Food Critic",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    content: "Their pastries are as good as their coffee! The perfect balance of flavors and the attention to detail in every cup is remarkable."
  },
  {
    id: 6,
    name: "James Martinez",
    role: "Remote Worker",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    content: "The perfect spot for remote work. Great WiFi, comfortable seating, and the background music creates the ideal working atmosphere."
  },
  {
    id: 7,
    name: "Sophie Anderson",
    role: "Student",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
    content: "I study here every day. The coffee keeps me going through long study sessions, and the staff is always friendly and supportive."
  }
]

interface TestimonialProps {
  title?: string
  subtitle?: string
  data?: TestimonialData[]
}

const Testimonial = ({
  title = "Our Clients Say",
  subtitle = "Testimonial",
  data = testimonials
}: TestimonialProps) => {
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
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="uppercase tracking-widest font-medium text-primary">{subtitle}</h4>
          <h1 className="text-4xl font-bold mt-2 text-gray-900">{title}</h1>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {data.map((testimonial) => (
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
