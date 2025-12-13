import React from "react";

const helpData = {
  samples: [
    { name: "Text Resume", link: "#" },
    { name: "Visual Resume", link: "#" },
    { name: "Cover Letter", link: "#" },
  ],
  careerAdvice: [
    {
      category: "Most Viewed Articles",
      articles: [
        { title: 'How to Answer “Tell me about yourself” Question!', link: "#" },
        { title: "Tips to Make an Impressive CV", link: "#" },
        { title: "Does Your Resume Have The Magic Keywords?", link: "#" },
      ],
    },
    {
      category: "Cover Letter Writing",
      articles: [
        { title: "7 Ways to Make your Cover Letter Recruiter Friendly", link: "#" },
        { title: "Common Cover letter mistakes to avoid!", link: "#" },
      ],
    },
    {
      category: "Appraisals and Promotions",
      articles: [
        { title: "Looking for a Promotion?", link: "#" },
        { title: "Dealing With A Bad Appraisal", link: "#" },
      ],
    },
    {
      category: "Certification",
      articles: [
        { title: "Aptitude Tests! Know your strengths & weaknesses", link: "#" },
        { title: "Background Verification – What Employers Will Discover", link: "#" },
      ],
    },
    {
      category: "Interview Prep",
      articles: [
        { title: "Top 10 Interview Questions to Practice", link: "#" },
        { title: "Body Language Tips for Interviews", link: "#" },
      ],
    },
    {
      category: "Career Growth",
      articles: [
        { title: "Networking Strategies for Professionals", link: "#" },
        { title: "How to Upskill for Your Next Promotion", link: "#" },
      ],
    },
    {
      category: "Job Search Tips",
      articles: [
        { title: "How to Find Jobs That Match Your Skills", link: "#" },
        { title: "Optimizing Your LinkedIn Profile", link: "#" },
      ],
    },
    {
      category: "Soft Skills",
      articles: [
        { title: "Improving Communication Skills", link: "#" },
        { title: "Time Management Techniques", link: "#" },
      ],
    },
  ],
};

export default function HelpForm() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4 space-y-6">

        {/* See Samples Section */}
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2 border-b pb-1">See Samples</h2>
          <p className="text-gray-700 text-sm mb-3">
            View select text resume, visual resume, and cover letter samples across industries
          </p>
          <div className="flex flex-wrap gap-2">
            {helpData.samples.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-2 py-0.5 rounded bg-blue-50 text-sm transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Career Advice Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">Career Advice</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {helpData.careerAdvice.map((section, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-medium text-gray-800 text-sm mb-1">{section.category}</h3>
                <ul className="space-y-1 text-xs">
                  {section.articles.map((article, i) => (
                    <li key={i}>
                      <a
                        href={article.link}
                        className="text-blue-600 hover:underline hover:text-blue-800"
                      >
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-right mt-4">
            <a
              href="#"
              className="inline-block px-3 py-1.5 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-sm transition-colors duration-200"
            >
              VIEW ALL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
