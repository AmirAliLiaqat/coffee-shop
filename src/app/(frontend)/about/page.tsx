import PageHeader from "@/components/frontend/layout/PageHeader"
import About from "@/components/frontend/About"

const AboutPage = () => {
  return (
    <>
      <PageHeader
        title="About Us"
        pathName="About"
        pathLink="/about"
      />
      <About />
    </>
  )
}

export default AboutPage
