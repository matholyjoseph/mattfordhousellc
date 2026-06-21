import { useState } from "react";
import Button from "../../components/common/Button";

export default function AdminSubscribers() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockSubs = [
    { email: "reader1@example.com", date: "2026-06-15" },
    { email: "gothicfan@gmail.com", date: "2026-06-12" },
    { email: "fantasylover@yahoo.com", date: "2026-06-10" }
  ];

  const handleCopyEmails = () => {
    const emails = mockSubs.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("Copied emails list to clipboard!");
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest-dark">Newsletter Subscribers</h1>
          <p className="text-xs text-charcoal-light font-light mt-1">Review list of registered email addresses.</p>
        </div>
        <Button onClick={handleCopyEmails} variant="primary" size="sm">
          Copy Emails
        </Button>
      </div>

      <div className="bg-white border border-gold/15 p-6 rounded-xl space-y-4">
        <input 
          type="text" 
          placeholder="Filter by email address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold"
        />

        <div className="border border-gold/15 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-cream-dark/30 text-forest-dark border-b border-gold/15 font-bold">
                <th className="p-3">Email Address</th>
                <th className="p-3 text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {mockSubs.map((sub) => (
                <tr key={sub.email} className="border-b border-gold/10 hover:bg-cream-dark/10">
                  <td className="p-3 font-semibold text-forest">{sub.email}</td>
                  <td className="p-3 text-right text-charcoal-light">{sub.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
