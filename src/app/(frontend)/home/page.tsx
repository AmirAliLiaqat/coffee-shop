import About from '@/components/frontend/About'
import Carousel from '@/components/frontend/Carousel'
import Shop from '@/components/frontend/Shop'
import Offer from '@/components/frontend/Offer'
import Reservation from '@/components/frontend/Reservation'
import Service from '@/components/frontend/Service'
import Testimonial from '@/components/frontend/Testimonial'

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <About />
      <Service />
      <Offer />
      <Shop />
      <Reservation />
      <Testimonial />
    </div>
  )
}
