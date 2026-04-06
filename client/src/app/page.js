import Services from "@/components/Services"
import Banner from "@/components/Banner"
import Categories from "@/components/Categories"
import Welcome from "@/components/Welcome"
import CollectSection from "@/components/CollectSection"
import Testimonials from "@/components/TestimonialsSection"
import SectionProducts from "@/components/SectionProduct"

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Categories />
      <SectionProducts title='NEW ARRIVALS' section='featured' />
      <Welcome />
      <SectionProducts title='HOT PRODUCTS' section='hot'/>
      <SectionProducts title='FEATURED PRODUCTS' section='hot' bg="/featured_bg.jpg" />
      <CollectSection />
      <Testimonials />
      <Services />
    </div>
  )
}