import React from 'react';
import { X, ChevronDown, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const EnquiryForm = ({ isModal = false, onClose, className = "" }) => {
    return (
        <motion.div
            className={`w-full ${isModal ? 'max-w-[500px]' : 'max-w-full'} bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-8 md:p-10 flex flex-col relative ${className}`}
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

            <div className="text-center mb-10">
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                    Connect With Us
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">
                    Enquire <span className="italic font-light">Now</span>
                </h2>
                <div className="w-12 h-0.5 bg-secondary/30 mx-auto mt-4 rounded-full"></div>
            </div>

            <form className="space-y-5">
                <div className="group relative">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-5 py-4 text-sm md:text-base rounded-xl border border-slate-100 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary/50 focus:bg-white outline-none transition-all duration-300 group-hover:bg-slate-50"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <select className="w-full h-full px-4 py-4 text-sm md:text-base rounded-xl border border-slate-100 bg-slate-50/50 text-primary focus:border-secondary/50 outline-none appearance-none cursor-pointer transition-all">
                            <option value="+91">+91 (IN)</option>
                            <option value="+1">+1 (US)</option>
                            <option value="+44">+44 (UK)</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="tel"
                            placeholder="Mobile Number*"
                            className="w-full px-5 py-4 text-sm md:text-base rounded-xl border border-slate-100 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary/50 focus:bg-white outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-5 py-4 text-sm md:text-base rounded-xl border border-slate-100 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary/50 focus:bg-white outline-none transition-all duration-300"
                    />
                </div>

                <div>
                    <textarea
                        placeholder="Your Message"
                        rows="4"
                        className="w-full px-5 py-4 text-sm md:text-base rounded-xl border border-slate-100 bg-slate-50/50 text-primary placeholder:text-slate-400 focus:border-secondary/50 focus:bg-white outline-none transition-all resize-none duration-300"
                    ></textarea>
                </div>

                <div className="pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-5 bg-primary text-white font-bold tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 uppercase text-xs md:text-sm"
                    >
                        <span>Submit Request</span>
                        <Send size={16} className="opacity-70" />
                    </motion.button>
                </div>
            </form>
            
            <p className="mt-8 text-center text-slate-400 text-[10px] md:text-xs font-light">
                Our team will connect with you within 24 hours.
            </p>
        </motion.div>
    );
};

export default EnquiryForm;