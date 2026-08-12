import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import siteConfig from "../config/siteConfig";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course: "",
  mode: "Online",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = [
      `Hello DD ART ACADEMY, I would like to enquire about a course.`,
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.course && `Course interested in: ${form.course}`,
      `Preferred mode: ${form.mode}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSent(true);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 shadow-card p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-brand-ink/80">Full Name *</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-ink/80">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-brand-ink/80">Phone *</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none"
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-ink/80">Course Interested In</label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none"
            placeholder="e.g. Pencil Drawing"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-ink/80">Learning Mode</label>
        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none bg-white"
        >
          <option>Online</option>
          <option>Offline</option>
          <option>Either</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-ink/80">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-brand-purple/20 px-4 py-2.5 focus:border-brand-purple outline-none"
          placeholder="Tell us a little about what you're looking for"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        <Send size={16} /> Send Enquiry
      </button>

      {sent && (
        <p className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <CheckCircle2 size={16} /> Thanks! We've opened WhatsApp with your enquiry — just hit send.
        </p>
      )}
    </form>
  );
}
