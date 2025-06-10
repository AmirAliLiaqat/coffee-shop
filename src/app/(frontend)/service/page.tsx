import PageHeader from '@/components/frontend/layout/PageHeader'
import Service from '@/components/frontend/Service'

const ServicePage = () => {
  return (
    <>
      <PageHeader
        title="Services"
        pathName="Services"
        pathLink="/service"
      />
      <Service />
    </>
  )
}

export default ServicePage
