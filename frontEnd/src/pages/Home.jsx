import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProduct";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import FinalCTA from "../components/home/FinalCTA";
import PromoBanner from "../components/home/PromoBanner";

function Home() {

    return (
    <div className="max-w-7xl p-6 mx-auto px-4 py-10">

        <Hero />
        <PromoBanner />
        <FeaturedProducts />
        <WhyChooseUs />
        <Testimonials />
        <FinalCTA />

    </div>
  )
}

export default Home;