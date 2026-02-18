import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react';

const EnquiryPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [intendedBrochure, setIntendedBrochure] = useState(null);
    const [autoDownload, setAutoDownload] = useState(false);
    const [downloadFileName, setDownloadFileName] = useState('Brochure.pdf');

    // Listen for the custom event from any project. Event may include detail: { brochure: '/path.pdf', autoDownloadAfterSubmit: true, downloadFileName: 'Project_Brochure.pdf' }
    useEffect(() => {
        const handleOpenPopup = (e) => {
            const detail = e && e.detail ? e.detail : {};
            setIntendedBrochure(detail.brochure || null);
            setAutoDownload(Boolean(detail.autoDownloadAfterSubmit));
            setDownloadFileName(detail.downloadFileName || 'Brochure.pdf');
            setIsVisible(true);
        };

        window.addEventListener('open-enquiry-popup', handleOpenPopup);

        return () => {
            window.removeEventListener('open-enquiry-popup', handleOpenPopup);
        };
    }, []);

    // Existing Auto-show Logic
    useEffect(() => {
        const hasSubmitted = localStorage.getItem('mbPrimeEnquirySubmitted');
        const hasSeen = localStorage.getItem('mbPrimeEnquiryPopupSeen');

        if (!hasSubmitted && !hasSeen && !isVisible) {
            const timer = setTimeout(() => setIsVisible(true), 30000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const resetAndClose = () => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsVisible(false);
        setIsSubmitted(false);
        setIntendedBrochure(null);
        setAutoDownload(false);
        setDownloadFileName('Brochure.pdf');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('mbPrimeEnquirySubmitted', 'true');

        const doBrochureDownload = async () => {
            if (intendedBrochure) {
                try {
                    const response = await fetch(intendedBrochure);
                    if (!response.ok) throw new Error('File not found');
                    const blob = await response.blob();
                    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(pdfBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', downloadFileName);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    window.URL.revokeObjectURL(url);
                } catch (err) {
                    console.error("Download failed:", err);
                    window.open(intendedBrochure, '_blank');
                }
            }
            resetAndClose();
        };

        doBrochureDownload();
    };

    const handleClose = () => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsVisible(false);
        localStorage.setItem('mbPrimeEnquiryPopupSeen', 'true');
    };

    return (
        <>
            {/* Professional Sidebar Trigger */}
            <button
                onClick={() => setIsVisible(true)}
                className="fixed right-0 top-1/2 z-[9990] -translate-y-1/2 bg-primary text-white font-bold text-[10px] md:text-xs py-3 px-3 rounded-r-2xl shadow-2xl hover:bg-secondary hover:text-primary transition-all duration-500 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 flex items-center gap-2 border-l border-white/10"
            >
                <span className="mb-2">Enquire Now</span>
            </button>

            <AnimatePresence>
                {isVisible && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden relative border border-slate-100"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />
                            
                            <button
                                onClick={handleClose}
                                className="absolute top-5 right-5 text-slate-300 hover:text-primary transition-colors duration-300 p-2 z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6 md:p-8 pt-14 md:pt-14">
                                <div className="mb-4 text-center">
                                    <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[9px] block mb-2">Connect With Us</span>
                                    <h2 className="text-2xl md:text-3xl font-serif text-primary leading-tight py-1">
                                        Embark on Your <br />
                                        <span className="italic font-light opacity-70">Luxury Journey</span>
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    {[
                                        { name: 'name', type: 'text', placeholder: 'Full Name', icon: User },
                                        { name: 'email', type: 'email', placeholder: 'Email Address', icon: Mail },
                                        { name: 'phone', type: 'tel', placeholder: 'Mobile Number', icon: Phone },
                                    ].map((field) => (
                                        <div key={field.name} className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-secondary transition-colors">
                                                <field.icon size={16} />
                                            </div>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:border-secondary/50 outline-none transition-all text-primary placeholder:text-slate-400 font-light text-sm"
                                            />
                                        </div>
                                    ))}

                                    <div className="relative group">
                                        <div className="absolute top-3.5 left-4 text-slate-300 group-focus-within:text-secondary transition-colors">
                                            <MessageSquare size={16} />
                                        </div>
                                        <textarea
                                            name="message"
                                            rows="2"
                                            placeholder="Preferred Project or Location (Optional)"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl focus:bg-white focus:border-secondary/50 outline-none transition-all text-primary placeholder:text-slate-400 font-light resize-none text-sm"
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01, backgroundColor: '#000' }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        className="w-full mt-2 py-4 bg-primary text-white font-bold tracking-[0.2em] rounded-xl shadow-lg flex items-center justify-center gap-3 uppercase text-[10px] transition-all duration-500"
                                    >
                                        <span>Request Exclusive Access</span>
                                        <ArrowRight size={14} />
                                    </motion.button>
                                </form>

                                <div className="mt-2 pt-6 border-t border-slate-50 flex flex-col items-center gap-3">
                                    <p className="text-slate-400 font-light text-[10px] italic">Careful site selection, disciplined planning, and transparent execution.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EnquiryPopup;