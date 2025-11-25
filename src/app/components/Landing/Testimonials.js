'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        content: "Muneem Ji has completely transformed how we manage our restaurant. The billing is super fast, and the inventory tracking is a lifesaver.",
        author: "Rajesh Kumar",
        role: "Owner, Spicy Bites",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=random"
    },
    {
        id: 2,
        content: "The best POS system I've used. It's so easy to train new staff, and the reports help me understand my business better.",
        author: "Priya Singh",
        role: "Manager, Cafe Delight",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Priya+Singh&background=random"
    },
    {
        id: 3,
        content: "Customer support is amazing, and the software just works. No glitches, no downtime. Highly recommended!",
        author: "Amit Patel",
        role: "Owner, Burger House",
        rating: 4,
        image: "https://ui-avatars.com/api/?name=Amit+Patel&background=random"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Testimonials</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Trusted by Restaurant Owners
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
                        <button onClick={prev} className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-orange-600 transition-colors">
                            <FaChevronLeft className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
                        <button onClick={next} className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-orange-600 transition-colors">
                            <FaChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="overflow-hidden px-4">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-orange-50 rounded-3xl p-8 md:p-12 text-center"
                            >
                                <FaQuoteLeft className="w-12 h-12 text-orange-200 mx-auto mb-6" />
                                <p className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                <div className="flex flex-col items-center">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].author}
                                        className="w-16 h-16 rounded-full mb-4 border-2 border-orange-200"
                                    />
                                    <div className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].author}</div>
                                    <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                                    <div className="flex gap-1 text-yellow-400 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < testimonials[currentIndex].rating ? "fill-current" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
