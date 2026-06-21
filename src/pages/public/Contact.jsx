import { useState } from "react";
import Container from "../../components/layout/Container";
import { FiCheck } from "react-icons/fi";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Reader Message");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 0,
      question: "Where can I buy the books?",
      answer: "Our books are available across all major online retailers including Amazon, Apple Books, Kobo, Google Play, Barnes & Noble, and Draft2Digital. You can find direct buy links on each individual book's detail page."
    },
    {
      id: 1,
      question: "How do I know the reading order?",
      answer: "You can find reading order recommendations and chronological series lists on the Pen Name detail pages or in the dedicated Bibliography section."
    },
    {
      id: 2,
      question: "How do I get release updates?",
      answer: "The best way to stay updated is by joining our reader list! You will receive email alerts for new releases, exclusive cover reveals, and direct notes from the author's desk."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="pb-0 bg-[#FDFBF7] text-charcoal font-sans text-left">
      
      {/* 1. HERO TITLE SECTION */}
      <section className="pt-20 pb-16 text-center">
        <Container className="max-w-3xl">
          <h1 className="text-[44px] sm:text-[56px] font-serif font-bold text-charcoal leading-tight tracking-tight">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto font-light font-sans mt-3">
            For reader messages, book questions, press, and business inquiries. A quiet space for thoughtful communication.
          </p>
        </Container>
      </section>

      {/* 2. FORM & SIDEBAR GRID */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: The Form Card */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E3DC]/40 shadow-xl">
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#1A3020]/10 text-[#1A3020] flex items-center justify-center">
                    <FiCheck size={28} />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-charcoal pt-2">Message Sent</h3>
                  <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. Your message has been received, and I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="mt-6 px-6 py-2 border border-gold text-charcoal hover:bg-gold/10 rounded-full text-xs font-semibold uppercase tracking-wider transition-luxury cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Two fields row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Your Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm placeholder-charcoal/30 pt-1 transition-colors"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="hello@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm placeholder-charcoal/30 pt-1 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reason for Contact */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                      Reason for Contact
                    </label>
                    <div className="relative">
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm text-charcoal appearance-none pt-1 transition-colors cursor-pointer"
                      >
                        <option value="Reader Message">Reader Message</option>
                        <option value="Book Questions">Book Questions</option>
                        <option value="Press / Media">Press / Media</option>
                        <option value="Business Inquiries">Business Inquiries</option>
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                      Message
                    </label>
                    <textarea
                      required
                      placeholder="Write your thoughts here..."
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm placeholder-charcoal/30 pt-1 h-32 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#0A180E] hover:bg-gold text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-luxury cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Right Column: Contact info stack & peak wireframe */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Channel 1 */}
              <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-[#E5E3DC]/40 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gold">
                  <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-serif font-bold text-base text-charcoal leading-tight">General Questions</h4>
                  <a href="mailto:hello@eliasthorne.com" className="text-xs sm:text-sm text-[#C5A880] hover:text-[#A58860] font-sans font-semibold transition-colors block">
                    hello@eliasthorne.com
                  </a>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-[#E5E3DC]/40 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gold">
                  <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-serif font-bold text-base text-charcoal leading-tight">Press Inquiries</h4>
                  <a href="mailto:media@eliasthorne.com" className="text-xs sm:text-sm text-[#C5A880] hover:text-[#A58860] font-sans font-semibold transition-colors block">
                    media@eliasthorne.com
                  </a>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-[#E5E3DC]/40 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gold">
                  <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-serif font-bold text-base text-charcoal leading-tight">Book Support</h4>
                  <a href="mailto:support@eliasthorne.com" className="text-xs sm:text-sm text-[#C5A880] hover:text-[#A58860] font-sans font-semibold transition-colors block">
                    support@eliasthorne.com
                  </a>
                </div>
              </div>

              {/* Minimal Peak Graphic */}
              <div className="flex justify-center pt-8 opacity-30 select-none">
                <svg className="w-12 h-10 text-charcoal" viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 5 25 L 20 8 L 28 17 L 35 10 L 40 15" />
                  <path d="M 2 25 H 38" />
                </svg>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-24 bg-[#F5F4F0]/40 border-t border-[#E5E3DC]">
        <Container className="max-w-4xl space-y-12">
          
          <h2 className="font-serif font-bold text-3xl sm:text-[38px] text-charcoal text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E5E3DC]/50 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-serif font-bold text-base sm:text-lg text-charcoal hover:text-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-charcoal/40'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 border-t border-[#E5E3DC]/30' : 'max-h-0'}`}>
                    <div className="p-6 text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </Container>
      </section>

      {/* 4. STAY IN THE INNER CIRCLE SECTION */}
      <section className="py-20 bg-[#0A180E] text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 text-left space-y-3">
              <h2 className="font-serif font-bold text-3xl sm:text-[38px] text-white leading-tight">
                Stay in the inner circle.
              </h2>
              <p className="text-xs sm:text-sm text-cream/70 font-sans font-light max-w-md">
                Join our monthly dispatch for exclusive previews and author updates direct to your inbox.
              </p>
            </div>

            {/* Right form input & button */}
            <div className="lg:col-span-5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscription mock triggered!");
                }}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-grow bg-[#15291E] border border-gold/25 rounded-full px-5 py-3.5 text-xs text-white placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#EBD3AC] hover:bg-gold text-forest-dark font-sans font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-luxury cursor-pointer shadow-md shrink-0"
                >
                  Join List
                </button>
              </form>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
