import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FAQ from "./FAQ";
import FeatureSection from "./FeatureSection";
import ReviewsSection from "../components/Reviews";
import ContactForm from "../components/Contact";


export default function HomePage(){

    return(
        <>
        <div>
                <Navbar />
                <Hero />
                
                {/* <ReviewsSection/> */}
                <FeatureSection />
                <ContactForm/>
                <Footer/>
        </div>
       
        </>
    );
}

