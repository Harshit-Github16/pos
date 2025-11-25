'use client';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUtensils, FaStore } from 'react-icons/fa';

const steps = [
    {
        id: 1,
        title: 'Create Account',
        description: 'Sign up for Muneem Ji and set up your restaurant profile in minutes.',
        icon: FaUserPlus,
    },
    {
        id: 2,
        title: 'Add Menu & Staff',
        description: 'Upload your menu items, set prices, and add your staff members.',
        icon: FaUtensils,
    },
    {
        id: 3,
        title: 'Start Selling',
        description: 'Open your POS, take orders, and watch your business grow.',
        icon: FaStore,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Simple Process</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How Muneem Ji Works
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Get started with your new POS system in three simple steps. No complex setup required.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none"
                            >
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 text-orange-600 mb-6 border-4 border-white shadow-lg z-10">
                                    <step.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
