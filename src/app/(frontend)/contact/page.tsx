import PageHeader from "@/components/frontend/layout/PageHeader"
import Contact from "@/components/frontend/Contact"

const ContactPage = () => {
  return (
    <>
      <PageHeader
        title="Contact Us"
        pathName="Contact"
        pathLink="/contact"
      />
      <Contact />
    </>
  )
}

export default ContactPage
