import PageHeader from "@/components/frontend/layout/PageHeader"
import Reservation from "@/components/frontend/Reservation"
import Testimonial from "@/components/frontend/Testimonial"

const ReservationPage = () => {
  return (
    <>
      <PageHeader
        title="Reservation"
        pathName="Reservation"
        pathLink="/reservation"
      />
      <Reservation />
      <Testimonial />
    </>
  )
}

export default ReservationPage
