import React from 'react';
import { motion } from 'framer-motion';
import EnquiryForm from './EnquiryForm';

const Location = () => {
    return (
        <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-bg-light to-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container relative z-10">
                <motion.span
                    className="inline-block text-secondary font-sans font-bold text-xs uppercase tracking-[0.3em] mb-3 text-center w-full"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Connect
                </motion.span>
                
                <motion.div className="text-center mb-10 md:mb-16" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-2xl md:text-4xl lg:text-[2.5rem] text-primary font-sans font-bold leading-tight section-heading">
                        Prime Locations <span className="text-secondary">Connected to Everything</span>
                    </h2>
                    <div className="w-16 md:w-24 h-0.5 bg-secondary mx-auto mt-5 md:mt-6 mb-6" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white">
                    
                    {/* Left Side: Custom Map Image */}
                    <motion.div
                        className="relative flex justify-center items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src="https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771063695/MB_Map_e9a6vx.png" 
                            alt="MB Prime Locations Map" 
                            className="w-full max-w-[600px] h-auto object-contain "
                        />
                    </motion.div>

                    {/* Right Side: Enquiry Form */}
                    <motion.div 
                        className="h-full"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative h-full bg-white rounded-2xl overflow-hidden">
                            <EnquiryForm className="h-full" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Location;