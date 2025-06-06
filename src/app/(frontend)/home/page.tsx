import About from '@/components/frontend/About'
import Carousel from '@/components/frontend/Carousel'
import Menu from '@/components/frontend/Menu'
import Offer from '@/components/frontend/Offer'
import Reservation from '@/components/frontend/Reservation'
import Service from '@/components/frontend/Service'
import Testimonial from '@/components/frontend/Testimonial'

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <About />
      <Service />
      <Offer />
      <Menu />
      <Reservation />
      <Testimonial />
    </div>
  )
}

export default HomePage
