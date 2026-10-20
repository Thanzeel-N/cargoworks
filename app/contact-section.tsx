"use client";

import { useState } from "react";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, whatsappLink } from "./contact-config";

const services = ["Sea Freight", "Air Freight", "Fleet & Transportation", "Warehousing", "Customs Clearance"];

export default function ContactSection() {
  const [draftLink, setDraftLink] = useState<string | null>(null);
  const directChat = whatsappLink("Hello Cargoworks, I would like to discuss a shipment.");
  return (
    <section id="contact" className="contact-studio" aria-labelledby="contact-title">
      <div className="container contact-studio__layout">
        <div className="contact-studio__intro">
          <p className="contact-studio__eyebrow">LET’S TALK LOGISTICS</p>
          <h2 id="contact-title">Your next move.<br /><span>Starts here.</span></h2>
          <p>A single shipment or a whole supply chain. Tell us what you have in mind, and let’s find the right way forward.</p>
          <div className="contact-studio__channels">
            {directChat && <a href={directChat} target="_blank" rel="noopener noreferrer"><small>CHAT WITH OUR TEAM</small><span>WhatsApp <i aria-hidden="true">↗</i></span></a>}
            <a href={`mailto:${CONTACT_EMAIL}`}><small>PREFER EMAIL?</small><span>{CONTACT_EMAIL} <i aria-hidden="true">↗</i></span></a>
          </div>
          <div className="contact-studio__details">
            <div><small>OUR BASE</small><p>Kochi, India</p><span>Connected worldwide.</span></div>
            <div><small>OFFICE HOURS</small><p>Monday – Saturday</p><span>9:00 AM – 6:00 PM IST</span></div>
          </div>
        </div>
        <div className="shipment-form-panel">
          <div className="shipment-form-panel__heading"><span>SHIPMENT ENQUIRY</span><h3>Let’s get you moving.</h3><p>Share a few details to start the conversation.</p></div>
          <form className="shipment-form" onChange={() => setDraftLink(null)} onSubmit={(event) => {
            event.preventDefault();
            const fields = new FormData(event.currentTarget);
            const value = (key: string) => String(fields.get(key) || "").trim();
            const message = ["Hello Cargoworks, I’d like a shipment quote.", "",
              `Service: ${value("service")}`, `Name: ${value("name")}`, `Email: ${value("email")}`,
              `Company: ${value("company") || "Not provided"}`, `Phone: ${value("phone") || "Not provided"}`,
              `Origin: ${value("origin")}`, `Destination: ${value("destination")}`, "", `Cargo details: ${value("message")}`].join("\n");
            const link = whatsappLink(message) || `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Shipment enquiry — ${value("service")}`)}&body=${encodeURIComponent(message)}`;
            setDraftLink(link);
            if (WHATSAPP_NUMBER) window.open(link, "_blank", "noopener,noreferrer");
            else window.location.href = link;
          }}>
            <fieldset className="shipment-form__group">
            <legend><span>01</span> Your details</legend>
            <div className="shipment-form__row">
              <label htmlFor="shipment-name"><span className="shipment-form__label">Full name <span aria-hidden="true">*</span></span><input id="shipment-name" name="name" required autoComplete="name" maxLength={100} placeholder="Your name" /></label>
              <label htmlFor="shipment-email"><span className="shipment-form__label">Email <span aria-hidden="true">*</span></span><input id="shipment-email" name="email" type="email" required autoComplete="email" maxLength={150} placeholder="you@company.com" /></label>
            </div>
            <div className="shipment-form__row">
              <label htmlFor="shipment-company"><span className="shipment-form__label">Company <small>Optional</small></span><input id="shipment-company" name="company" autoComplete="organization" maxLength={100} placeholder="Company name" /></label>
              <label htmlFor="shipment-phone"><span className="shipment-form__label">Phone <small>Optional</small></span><input id="shipment-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" /></label>
            </div>
            </fieldset>
            <fieldset className="shipment-form__group">
            <legend><span>02</span> Your shipment</legend>
            <label htmlFor="shipment-service"><span className="shipment-form__label">Service <span aria-hidden="true">*</span></span><select id="shipment-service" name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
            <div className="shipment-form__row">
              <label htmlFor="shipment-origin"><span className="shipment-form__label">Origin <span aria-hidden="true">*</span></span><input id="shipment-origin" name="origin" required maxLength={120} placeholder="City or port" /></label>
              <label htmlFor="shipment-destination"><span className="shipment-form__label">Destination <span aria-hidden="true">*</span></span><input id="shipment-destination" name="destination" required maxLength={120} placeholder="City or port" /></label>
            </div>
            <label htmlFor="shipment-message"><span className="shipment-form__label">Cargo details <span aria-hidden="true">*</span></span><textarea id="shipment-message" name="message" required rows={3} maxLength={1200} placeholder="Cargo type, quantity and preferred shipping date" /></label>
            </fieldset>
            <div className="shipment-form__action">
            <button type="submit">{WHATSAPP_NUMBER ? "Continue on WhatsApp" : "Prepare email enquiry"}<span aria-hidden="true">↗</span></button>
            <p className="shipment-form__note">* Required fields. {WHATSAPP_NUMBER ? "Review in WhatsApp before sending." : "Review in your email app before sending."}</p>
            </div>
            <div className="shipment-form__status" role="status">{draftLink && <p className="shipment-form__feedback">Your enquiry is prepared. Nothing has been sent yet. <a href={draftLink} target="_blank" rel="noopener noreferrer">Open {WHATSAPP_NUMBER ? "WhatsApp" : "email draft"} again ↗</a></p>}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
