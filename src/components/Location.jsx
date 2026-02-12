import React from 'react';
import { motion } from 'framer-motion';
import { Map, Plane, Store, Hospital } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

const Location = () => {
    const nearby = [
        { icon: <Store />, name: 'Shopping Malls', time: '10 Mins' },
        { icon: <Hospital />, name: 'Hospitals', time: '5 Mins' },
        { icon: <Plane />, name: 'Airport', time: '25 Mins' },
        { icon: <Map />, name: 'ORR Exit', time: '2 Mins' },
    ];

    return (
        <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-bg-light to-white relative overflow-hidden">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
                    <div className="space-y-6 md:space-y-10 flex flex-col h-full">
                        <motion.div
                            className="h-[220px] md:h-[420px] bg-white overflow-hidden rounded-2xl relative group flex-shrink-0"
                            style={{ boxShadow: 'var(--shadow-luxury)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <iframe
                                src="https://maps.google.com/maps?q=Srikakulam&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 w-full h-full"
                            ></iframe>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-grow">
                            {nearby.map((n, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-4 p-4 md:p-5 bg-white border border-black/5 rounded-xl transition-all duration-300 group h-full font-sans"
                                    style={{ boxShadow: 'var(--shadow-luxury)' }}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <div className="text-secondary p-2.5 md:p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                                        {React.cloneElement(n.icon, { size: 20, className: "md:w-5 md:h-5" })}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-primary text-sm md:text-base leading-none mb-1 group-hover:text-secondary transition-colors">{n.name}</h4>
                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-medium">{n.time} drive</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Themed Enquiry Form */}
                    <div className="pt-0 xl:pt-0 h-full">
                        <div className="relative h-full">
                            {/* decorative elements */}
                            <EnquiryForm className="h-full" />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Location;
