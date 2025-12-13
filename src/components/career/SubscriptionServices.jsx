import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle } from "lucide-react";

// Sample image URL (replace with your own if needed)
const bannerImg = "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80";

export default function SubscriptionServices() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Subscription Services</h2>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-gray-200 overflow-hidden bg-white">
            
            {/* Banner Image with reduced height */}
            <div className="w-full h-24 overflow-hidden rounded-t-2xl">
              <img
                src={bannerImg}
                alt="Job Search"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <CardHeader className="flex items-center gap-3 mt-3 px-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 shadow">
                <Star className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">Monthly Job Search Plan</CardTitle>
            </CardHeader>

            <CardContent className="mt-3 px-5">
              <p className="text-gray-700 mb-3 font-medium">KEY BENEFITS</p>
              <ul className="list-none text-gray-600 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Rank higher in Recruiter Searches
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Priority Access to Jobs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Send message to Recruiter anytime
                </li>
              </ul>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-3 mt-4 px-5 pb-5">
              <span className="font-bold text-xl text-gray-800">₹890 / month</span>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 text-base rounded-lg shadow hover:shadow-md transition-all duration-200">
                Know More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
