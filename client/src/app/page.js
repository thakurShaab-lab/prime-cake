import Services from "@/components/Services"
import Banner from "@/components/Banner"
import Categories from "@/components/Categories"
import NewArrivals from "@/components/NewArrivals"
import Welcome from "@/components/Welcome"
import HotProducts from "@/components/HotProducts"
import FeaturedProducts from "@/components/FeaturedProducts"
import CollectSection from "@/components/CollectSection"
import Testimonials from "@/components/TestimonialsSection"

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Categories />
      <NewArrivals />
      <Welcome />
      <HotProducts />
      <FeaturedProducts />
      <CollectSection />
      <Testimonials />
      <Services />
    </div>
  )
}