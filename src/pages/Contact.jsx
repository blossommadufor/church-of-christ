import React from "react";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";
import Header from "../components/Header";
import Contact from "../components/Contact";
import CTA from "../components/CTA";

const ContactPage = () => {
  return (
    <div>
      <Header isFixed />
      {/* <ContactHero /> */}
      <div className="pt-20 mt-2">
        <Contact />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
