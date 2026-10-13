"use client";

import { useState } from "react";

const services = ["Ocean freight", "Air freight", "Road transport", "Warehousing", "Customs", "Something else"];

export default function ContactSection() {
  const [draftReady, setDraftReady] = useState(false);

  return (
    <section id="contact" className="contact contact-modern" data-scroll-surface="dark" aria-labelledby="contact-title">
      <div className="container contact-modern__layout">
        <div className="contact-modern__intro reveal">
          <p className="contact-modern__eyebrow"><span aria-hidden="true" /> LET’S CONNECT</p>
          <h2 id="contact-title">Your next move.<br /><span>Our expertise.</span></h2>
          <p className="contact-modern__description">A single shipment or a whole supply chain. Tell us what you have in mind, and let’s find the right way forward.</p>
          <a className="contact-modern__email" href="mailto:info@cargoworkslogistics.com">
            <span><small>Prefer a direct conversation?</small>info@cargoworkslogistics.com</span>
            <span className="contact-modern__arrow" aria-hidden="true">&#8599;</span>
          </a>
          <div className="contact-modern__details">
            <div><p>BASED IN</p><strong>Kochi, India</strong><span>Connected worldwide.</span></div>
            <div><p>OFFICE HOURS</p><strong>Monday – Saturday</strong><span>9:00 AM – 6:00 PM IST</span></div>
          </div>
          <div className="contact-modern__route" aria-hidden="true"><span>YOUR ORIGIN</span><i /><span>YOUR DESTINATION</span></div>
        </div>

        <div className="inquiry-panel reveal reveal-delay-2">
          <div className="inquiry-panel__heading"><div><p>LET’S GET STARTED</p><h3>Tell us about your shipment.</h3></div><span aria-hidden="true">&#8599;</span></div>
          <form className="inquiry-form" onChange={() => setDraftReady(false)} onSubmit={(event) => {
            event.preventDefault();
            const fields = new FormData(event.currentTarget);
            const service = String(fields.get("service") || "General inquiry");
            const body = [
              `Name: ${fields.get("name")}`,
              `Email: ${fields.get("email")}`,
              `Company: ${fields.get("company") || "Not provided"}`,
              `Phone: ${fields.get("phone") || "Not provided"}`,
              `Service: ${service}`,
              "", String(fields.get("message")),
            ].join("\n");
            window.location.href = `mailto:info@cargoworkslogistics.com?subject=${encodeURIComponent(`Shipment inquiry · ${service}`)}&body=${encodeURIComponent(body)}`;
            setDraftReady(true);
          }}>
            <fieldset className="inquiry-services">
              <legend>What can we help you with?</legend>
              <div>{services.map((service, index) => (
                <label key={service}><input type="radio" name="service" value={service} defaultChecked={index === 0} /><span>{service}</span></label>
              ))}</div>
            </fieldset>
            <div className="inquiry-form__row">
              <label htmlFor="f-name">Full name <span>*</span><input id="f-name" name="name" required autoComplete="name" placeholder="Your name" maxLength={100} /></label>
              <label htmlFor="f-email">Email address <span>*</span><input id="f-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" maxLength={150} /></label>
            </div>
            <div className="inquiry-form__row">
              <label htmlFor="f-company">Company <small>(optional)</small><input id="f-company" name="company" autoComplete="organization" placeholder="Company name" maxLength={100} /></label>
              <label htmlFor="f-phone">Phone <small>(optional)</small><input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" maxLength={40} /></label>
            </div>
            <label htmlFor="f-message">What are you moving? <span>*</span><textarea id="f-message" name="message" required rows={3} maxLength={1200} placeholder="Origin, destination, cargo type, and any timelines we should know about." /></label>
            <div className="inquiry-form__submit"><p>We’ll prepare an email with your details.<br />You can review it before sending.</p><button type="submit">Prepare inquiry <span aria-hidden="true">&#8599;</span></button></div>
            <p className="inquiry-form__status" role="status">{draftReady ? "Your email draft is ready to open in your email app. If it didn’t open, email info@cargoworkslogistics.com directly. Nothing has been sent yet." : "* Required fields"}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
