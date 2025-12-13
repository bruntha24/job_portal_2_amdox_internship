import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Award, Cpu, Edit3, FileText, Monitor } from "lucide-react";
import SubscriptionServices from "./SubscriptionServices";
import ContactForm from "./ContactForm";
import HelpForm from "./HelpForm";

// Heading image
const headingImg =
  "https://images.unsplash.com/opengraph/1x1.png?mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https:%2F%2Fimages.unsplash.com%2Fphoto-1641131593571-1f9e0b96f87b%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Djob%252Bportal%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8am9iJTIwcG9ydGFsfGVufDB8fHx8MTcyNDA1NDUxM3ww%26ixlib%3Drb-4.0.3&blend-w=1&auto=format&fit=crop&q=60";

// Services data
const services = [
  { title: "Resume Display", subtitle: "Increase your Profile Visibility to recruiters upto 3 times.", description: "Get a Featured Profile, Stand out and get noticed in recruiter eyes.", price: "₹890 for 1 Month", icon: <User className="w-5 h-5 text-white" />, bgColor: "bg-blue-600" },
  { title: "Priority Applicant", subtitle: "Be a Priority Applicant & increase your chance of getting a call.", description: "Be the first one to apply and catch recruiter attention", price: "₹971 for 3 Months", icon: <Award className="w-5 h-5 text-white" />, bgColor: "bg-yellow-500" },
  { title: "AI Mock Interview", subtitle: "Personalised AI driven mock interviews for your profile", description: "Streamline your interview preparation effortlessly. Try for free now!", price: "₹296 for 3 Months", badge: "Free Trial", icon: <Cpu className="w-5 h-5 text-white" />, bgColor: "bg-purple-600" },
  { title: "Resume Writing", subtitle: "Standout from the crowd with our professionally written Resume by expert", description: "Resume that highlights your strengths and showcases your experience", price: "₹1653 Only", extra: "Text Resume | Visual Resume | Resume Score", icon: <Edit3 className="w-5 h-5 text-white" />, bgColor: "bg-green-600" },
  { title: "Online Resume Maker", subtitle: "Create a job-winning resume with our simple resume maker and get hired faster.", description: "Amazing resume", price: "Free", extra:" 50+ Resume Templates | Resume Score", icon: <FileText className="w-5 h-5 text-white" />, bgColor: "bg-red-500" },
  { title: "Interview Booster", subtitle: "Get tips, prep material, and mock rounds to ace your interview.", description: "Practice with AI-driven mock interviews and expert guidance.", price: "₹499 for 2 Months", extra: "Mock Interviews | Interview Tips", icon: <Monitor className="w-5 h-5 text-white" />, bgColor: "bg-indigo-600" },
];

// ===== Card Component =====
function CareerCard({ service }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden relative bg-blue-100 border border-transparent">
      <CardHeader className="flex items-center gap-2 py-1.5 px-3 relative">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`absolute w-12 h-12 rounded-xl opacity-20 ${service.bgColor}`}
              style={{ top: `${-i}px`, left: `${-i}px`, zIndex: 0, transform: `rotate(${i * 5}deg)` }}
            ></span>
          ))}
          <div className={`relative w-10 h-10 flex items-center justify-center rounded-full ${service.bgColor} z-10`}>
            {service.icon}
          </div>
        </div>
        <CardTitle className="text-base font-semibold flex-1 flex justify-between items-center z-20">
          {service.title}
          {service.badge && <span className="text-xs font-medium text-white bg-green-500 px-2 py-0.5 rounded">{service.badge}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1 px-3">
        <p className="text-gray-700 text-sm mb-0.5">{service.subtitle}</p>
        <p className="text-gray-500 text-xs">{service.description}</p>
        {service.extra && <p className="mt-1 text-gray-600 text-xs">{service.extra}</p>}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 py-1.5 px-3">
        <span className="font-semibold text-sm">{service.price}</span>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full text-xs py-1">Know More</Button>
      </CardFooter>
    </Card>
  );
}

// ===== Header Component =====
function CareerHeader() {
  return (
    <section className="w-full bg-blue-900">
      <div className="text-center py-8 md:py-10 flex flex-col md:flex-row items-center justify-center gap-3">
        <img src={headingImg} alt="Career" className="w-10 h-10 md:w-14 md:h-14" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Move ahead in career, faster</h1>
          <p className="text-base text-blue-200 mt-1">with our paid services</p>
        </div>
      </div>
    </section>
  );
}

// ===== Services Component with Thin Grey Scrollbar =====
function CareerServiceCards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-10 bg-blue-100 relative">
      {/* Left & Right Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-20 hover:bg-blue-700"
      >
        &#8249;
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-20 hover:bg-blue-700"
      >
        &#8250;
      </button>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-12
          scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300
          hover:scrollbar-thumb-gray-600 transition-colors"
        style={{ scrollbarWidth: "thin" }}
      >
        {services.map((service, index) => (
          <div key={index} className="w-[300px] flex-shrink-0">
            <CareerCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Main Component =====
export default function CareerServices() {
  return (
    <>
      <CareerHeader />
      <CareerServiceCards />
      <section className="w-full py-8 bg-blue-50">
        <SubscriptionServices />
      </section>
      <section className="w-full py-10 bg-blue-100">
        <div className="w-full flex flex-col gap-6">
          <ContactForm />
          <HelpForm />
        </div>
      </section>
    </>
  );
}
