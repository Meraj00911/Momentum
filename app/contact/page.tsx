"use client";

import { motion } from "motion/react";
import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page">

      {/* NAV */}

      <motion.nav
        className="contact-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <a href="/" className="contact-logo">
          <span>M</span>
          <strong>MOMENTUM</strong>
        </a>

        <a href="/" className="contact-back">
          BACK TO STUDIO
          <span>↗</span>
        </a>
      </motion.nav>


      {/* MAIN */}

      <section className="contact-main">

        <div className="contact-intro">

          <motion.div
            className="contact-kicker"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15, duration: .6 }}
          >
            06 / CONTACT
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .2,
              duration: .9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            LET&apos;S MAKE
            <br />
            <em>SOMETHING MOVE.</em>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .35,
              duration: .7,
            }}
          >
            Tell us where you are, where you want to go,
            and we&apos;ll figure out how to get there.
          </motion.p>

        </div>


        {/* FORM */}

        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: .3,
            duration: .9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

 <form
  className="contact-form"
  onSubmit={async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        service: formData.get("service"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      form.reset();

      alert(
        "Thank you. Your message has been sent."
      );

      return;
    }

    alert(
      result.error ||
      "Something went wrong. Please try again."
    );
  }}
>

            <div className="contact-field">
              <label>01 / YOUR NAME</label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
              />
            </div>


            <div className="contact-field">
              <label>02 / EMAIL</label>

              <input
                type="email"
                name="email"
                placeholder="you@company.com"
              />
            </div>


            <div className="contact-field">
              <label>03 / BRAND / COMPANY</label>

              <input
                type="text"
                name="company"
                placeholder="Your brand"
              />
            </div>


            <div className="contact-field">
              <label>04 / WHAT DO YOU NEED?</label>

              <div className="contact-options">

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="performance"
                  />
                  <span>Performance</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="ecommerce"
                  />
                  <span>E-commerce</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="branding"
                  />
                  <span>Branding</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="everything"
                  />
                  <span>Full Growth</span>
                </label>

              </div>
            </div>


            <div className="contact-field">
              <label>05 / TELL US ABOUT IT</label>

              <textarea
                name="message"
                rows={4}
                placeholder="What are you building?"
              />
            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              <span>START A CONVERSATION</span>
              <i>↗</i>
            </button>

          </form>

        </motion.div>

      </section>


      {/* FOOTER */}

      <motion.footer
        className="contact-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .8, duration: .7 }}
      >
        <span>MUMBAI / INDIA</span>

        <span>
          hello@momentum.agency
        </span>

        <span>
          MOMENTUM / 2026
        </span>
      </motion.footer>

    </main>
  );
}