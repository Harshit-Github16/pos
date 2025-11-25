'use client';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const reasons = [
    {
        title: 'Reliability You Can Trust',
        description: 'Our system is built to handle high volumes of transactions without a hitch. 99.9% uptime guaranteed.',
    },
    {
        title: 'Easy to Use',
        description: 'Designed with simplicity in mind. Train your staff in minutes, not days.',
    },
    {
        title: '24/7 Support',
        description: 'Our dedicated support team is always available to help you with any issues or questions.',
    },
    {
        title: 'Affordable Pricing',
        description: 'Get premium features at a fraction of the cost of other POS systems.',
    },
];

export default function WhyChooseUs() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pr-8 lg:pt-4"
                    >
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-orange-600">Why Muneem Ji?</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Built for Growth</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                We understand the challenges of running a restaurant. That's why we built a solution that works for you, scaling as you grow.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {reasons.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="relative pl-9"
                                    >
                                        <dt className="inline font-semibold text-gray-900">
                                            <FaCheckCircle className="absolute left-1 top-1 h-5 w-5 text-orange-600" aria-hidden="true" />
                                            {item.title}
                                        </dt>{' '}
                                        <dd className="inline">{item.description}</dd>
                                    </motion.div>
                                ))}
                            </dl>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
                            <Image
                                src="/drinks.jpg"
                                alt="Restaurant Interior"
                                width={2432}
                                height={1442}
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            />
                            <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
