import TextParallaxContentComponent from "../TextParallaxComponent/TextParallaxComponent"
import FAQSection from "./FAQSection/FAQSection"
import NewsletterSignup from "./NewsletterSignup/NewsletterSignup"


const Home = () => {


  return (
    <div className='flex flex-col gap-12 mb-8 mt-4'>
      <TextParallaxContentComponent />
      <FAQSection />
      <NewsletterSignup />
    </div>
  )
}

export default Home
