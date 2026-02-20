import React, { useState } from 'react';
import { X, ChevronDown, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitFormSubmission } from '../services/api';

const EnquiryForm = ({ isModal = false, onClose, className = "" }) => {
    const [formData, setFormData] = useState({
        name: '',
        countryCode: '+91',
        phone: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        const phone = (formData.countryCode || '').trim() + (formData.phone || '').trim();
        try {
            await submitFormSubmission({
                formType: 'contact_us',
                name: formData.name,
                email: formData.email,
                phone,
                message: formData.message,
            });
            setSubmitted(true);
            setFormData({ name: '', countryCode: '+91', phone: '', email: '', message: '' });
        } catch (err) {
            console.error('EnquiryForm submit failed:', err);
            setError(err.message || 'Could not submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            className={`w-full ${isModal ? 'max-w-[500px]' : 'max-w-full'}  rounded-[2rem] overflow-hidden p-8 md:p-10 flex flex-col relative ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {isModal && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-secondary transition-colors duration-300"
                >
                    <X size={24} />
                </button>
            )}

            <div className="text-center mb-5">
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                    Connect With Us
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">
                    Enquire <span className="italic font-light">Now</span>
                </h2>
                <div className="w-12 h-0.5 bg-secondary/30 mx-auto mt-4 rounded-full"></div>
            </div>

            {submitted ? (
                <p className="text-center text-primary font-medium py-6">Thank you. Our team will connect with you within 24 hours.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group relative">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary focus:bg-white outline-none transition-all duration-300 group-hover:bg-slate-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-full h-full px-3 py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-slate-50/50 text-primary focus:border-secondary outline-none appearance-none cursor-pointer transition-all"
                            >
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                        <div className="md:col-span-2">
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="9088456 999"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary focus:bg-white outline-none transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="mbprimeprojects@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary focus:bg-white outline-none transition-all duration-300"
                        />
                    </div>

                    <div>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary focus:bg-white outline-none transition-all resize-none duration-300"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="pt-4">
                        <motion.button
                            whileHover={!submitting ? { scale: 1.02, backgroundColor: '#000' } : {}}
                            whileTap={!submitting ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-primary text-white font-bold tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 uppercase text-xs md:text-sm disabled:opacity-80 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Request</span>
                                    <Send size={16} className="opacity-70" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            )}

            <p className="mt-8 text-center text-slate-400 text-[10px] md:text-xs font-light">
                Our team will connect with you within 24 hours.
            </p>
        </motion.div>
    );
};

export default EnquiryForm;