import React from "react";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";
import Header from "../components/Header";
import Contact from "../components/Contact";
import CTA from "../components/CTA";

const ContactPage = () => {
  return (
    <div>
      <Header />
      <ContactHero />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
