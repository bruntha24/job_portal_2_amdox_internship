import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Images
const jobsImg = "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=400&q=80";
const recruiterImg = "https://plus.unsplash.com/premium_photo-1757950261458-7bdbb1c08d85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const resumeImg = "https://media.istockphoto.com/id/1227223328/photo/resume.jpg?s=2048x2048&w=is&k=20&c=pTQON-nZgNAMcE6nJB2s3fm37K-4w1wn5wnVOTRyDGQ=";

const services = [
  {
    title: "JOBS FOR YOU",
    subtitle: "Stand out as an Early Applicant with instant access to jobs & set alerts.",
    price: "₹1566 / 3 Months",
    img: jobsImg,
  },
  {
    title: "RECRUITER CONNECTION",
    subtitle: "Send personalized messages to recruiters & share your Naukri profile.",
    price: "₹839 / 5 Credits",
    img: recruiterImg,
  },
  {
    title: "RESUME CRITIQUE",
    subtitle: "Get your resume reviewed and improve your job application.",
    price: "₹1017 Only",
    img: resumeImg,
  },
];

export default function ContactForm() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800"
        >
          Our Services & Contact
        </motion.h2>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-2 mb-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-transform duration-200 transform hover:-translate-y-0.5 rounded-lg overflow-hidden border border-gray-200">
                <div className="w-full h-20 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-2">
                  <CardTitle className="text-sm md:text-base font-semibold mb-1 text-gray-800">{service.title}</CardTitle>
                  <p className="text-gray-600 text-xs md:text-sm mb-1">{service.subtitle}</p>
                  <span className="font-semibold text-blue-700 text-xs md:text-sm">{service.price}</span>
                </CardContent>
                <CardFooter className="px-2 pb-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-1 text-xs md:text-sm rounded">
                    Know More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4"
        >
          <h3 className="text-lg md:text-xl font-bold mb-2 text-center text-gray-800">Talk to Us</h3>
          <p className="text-gray-700 mb-2 text-center text-sm">
            Call Toll Free: <span className="font-medium">1800-102-5557</span> <br />
            Intl: <span className="font-medium">+91-120-4021100</span> <br />
            Bulk Queries: <span className="font-medium">18001034477</span>
          </p>
          <form className="space-y-2">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Email ID</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Mobile</label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Your Query</label>
              <textarea
                placeholder="Write your query here"
                className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                rows={2}
              ></textarea>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-1.5 text-sm rounded">
              Call Me Back
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
