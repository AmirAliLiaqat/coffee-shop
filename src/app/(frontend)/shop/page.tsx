import PageHeader from '@/components/frontend/layout/PageHeader'
import Shop from '@/components/frontend/Shop'

const ShopPage = () => {
  return (
    <>
      <PageHeader
        title="Shop"
        pathName="Shop"
        pathLink="/shop"
      />
      <Shop />
    </>
  )
}

export default ShopPage
