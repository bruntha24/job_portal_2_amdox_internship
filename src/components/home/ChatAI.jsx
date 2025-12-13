import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";

const predefinedQA = [
  { q: "How do I find a job?", a: "You can search for jobs using the search bar, filter by category, location, or company, and explore recommended jobs tailored to your profile." },
  { q: "How can I apply for a job?", a: "Click on any job listing and then select 'Apply'. Make sure your profile and resume are updated before applying." },
  { q: "Can I apply to multiple jobs?", a: "Yes! You can apply to as many jobs as you want. Each application is tracked in your 'Applications' section." },
  { q: "How do I post a job?", a: "Employees can post jobs by going to the 'Post Job' section in their dashboard, fill in the details, and submit for posting." },
  { q: "How do I edit my profile?", a: "Go to your profile page, click 'Edit Profile', and update your details, resume, or profile picture." },
  { q: "How do I save jobs for later?", a: "Click the 'Save' icon on a job listing. You can view all saved jobs in your 'Saved Jobs' section." },
  { q: "Does AI suggest jobs for me?", a: "Yes! Our AI recommends jobs based on your profile, skills, and interests to help you find relevant opportunities." },
  { q: "How can I track my applications?", a: "Check your 'Applications' section on your profile to see the status of all jobs you've applied for." },
  { q: "What types of jobs are available?", a: "JobSpark currently supports full-time, part-time, and internship roles across multiple industries." },
  { q: "How do I contact a company?", a: "Open the job listing, and you'll find the company details including email or contact options if provided." },
  { q: "Can I delete my account?", a: "If you wish to delete your account, contact support through the 'Help & Support' section." },
  { q: "How do notifications work?", a: "Enable notifications in your profile settings to get updates about new jobs, application status, and messages." },
  { q: "How do I change my password?", a: "Go to 'Profile' > 'Account Settings' and click 'Change Password'. Use the 'Forgot Password' option if needed." },
  { q: "Can employees edit their posted jobs?", a: "Yes, employees can edit or update jobs they have posted by going to the 'My Jobs' section in their dashboard." },
  { q: "How can I filter jobs by location?", a: "Use the location filter in the search bar to find jobs in a specific city or region." },
  { q: "Is there a mobile version?", a: "Yes! JobSpark is fully responsive and works on mobile devices, tablets, and desktops." },
  { q: "How do I get career advice?", a: "Visit the 'Career Insights' section for tips on resumes, interviews, and career development." },
  { q: "What should I include in my resume?", a: "Highlight your skills, achievements, experience, and relevant education. Keep it concise and clear." },
  { q: "Can I message a company directly?", a: "Currently, direct messaging is available for certain companies through the job listing contact details." },
  { q: "How often are new jobs posted?", a: "New jobs are added daily. Check the platform regularly for the latest opportunities." },
  { q: "How secure is my data?", a: "All data is encrypted and securely stored. We follow best practices to ensure your privacy." },
  { q: "What if a job listing is incorrect?", a: "You can report incorrect job listings using the 'Report' button on the job page." },
  { q: "Can I see top companies?", a: "Yes, check the 'Top Companies' section to explore featured employers on JobSpark." },
  { q: "Can I apply for internships?", a: "Yes! JobSpark supports internships in various domains. Filter by 'Internship' to find them." },
  { q: "Does JobSpark offer freelancer roles?", a: "Currently, we focus on full-time, part-time, and internship roles. Freelance jobs are coming soon!" },

  // --- NEWLY ADDED QUESTIONS ---
  { q: "How do I reset my password?", a: "Use the 'Forgot Password' option on the login page to reset your password via email." },
  { q: "How do I upload my resume?", a: "Go to your profile, click 'Edit Profile', and upload your resume under the 'Resume' section." },
  { q: "Can I update my job application?", a: "Once submitted, you cannot change an application, but you can withdraw and reapply if needed." },
  { q: "How do I view recommended jobs?", a: "Check the 'Recommended Jobs' section on your dashboard, updated daily using AI suggestions." },
  { q: "How do companies contact me?", a: "Companies can reach you via your registered email or through JobSpark notifications." },
  { q: "Can I hide my profile?", a: "Yes. Go to privacy settings in your profile and toggle 'Hide Profile from Employers'." },
  { q: "How do I report a company?", a: "Open the company profile or job listing and click 'Report Company'." },
  { q: "Can I change my email?", a: "Yes. Go to account settings and update your email. Verification is required." },
  { q: "How can I improve my chances of getting hired?", a: "Upload a strong resume, add skills, complete your profile, and apply to matched jobs." },
  { q: "Does JobSpark verify companies?", a: "Yes, we manually verify companies before approving their job postings." }
];

export default function ChatAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [unread, setUnread] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const handleSend = (msgText = input) => {
    if (!msgText.trim()) return;

    const userMsg = { sender: "user", text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setBotTyping(true);

    setTimeout(() => {
      const found = predefinedQA.find((qa) =>
        msgText.toLowerCase().includes(qa.q.toLowerCase())
      );
      const botReply = {
        sender: "bot",
        text: found
          ? found.a
          : "Sorry, I didn't understand that. Try asking about jobs, applications, or profiles.",
      };
      setMessages((prev) => [...prev, botReply]);
      setBotTyping(false);
      if (!open) setUnread(true);
    }, 800);
  };

  const handleQuickQuestion = (q) => {
    handleSend(q);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => { setOpen(true); setUnread(false); }}
          className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 animate-bounce"
          title="Chat with AI Assistant"
        >
          <MessageCircle size={28} />
          {unread && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      )}

      {open && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-300 overflow-hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button onClick={() => setOpen(false)} className="text-white text-lg font-bold">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {botTyping && (
              <div className="p-2 rounded-lg max-w-[60%] bg-gray-200 text-black">
                AI is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t bg-gray-100 flex flex-wrap gap-1">
            {predefinedQA.slice(0, 6).map((qa, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(qa.q)}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs hover:bg-blue-200 transition"
              >
                {qa.q}
              </button>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ask something..."
            />
            <button
              onClick={() => handleSend()}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg hover:scale-105 transform transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
