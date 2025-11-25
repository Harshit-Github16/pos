'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
    {
        name: 'Fast Billing',
        description: 'Generate bills in seconds with our intuitive touch interface designed for speed. Handle peak hours effortlessly.',
        image: '/sandwich.jpeg',
    },
    {
        name: 'Inventory Management',
        description: 'Track ingredients, stock levels, and get low stock alerts automatically. Never run out of essentials.',
        image: '/sandwich.jpeg',
    },
    {
        name: 'Detailed Reports',
        description: 'Get insights into your sales, best-selling items, and staff performance with comprehensive analytics.',
        image: '/sandwich.jpeg',
    },
    {
        name: 'Mobile Ready',
        description: 'Access your dashboard from anywhere, on any device. Fully responsive design for owners on the go.',
        image: '/sandwich.jpeg',
    },
    {
        name: 'Cloud Security',
        description: 'Your data is safe and secure on the cloud. Real-time syncing ensures you never lose business records.',
        image: '/sandwich.jpeg',
    },
    {
        name: 'Staff Management',
        description: 'Manage staff roles, permissions, and track attendance effortlessly. Simplify HR tasks.',
        image: '/sandwich.jpeg',
    },
];

export default function Features() {
    return (
        <div id="features" className="py-24 bg-white sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Everything you need</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Powerful Features for Modern Restaurants
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Muneem Ji provides a comprehensive suite of tools to help you manage every aspect of your food business.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col overflow-hidden rounded-3xl bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={feature.image}
                                        alt={feature.name}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                                    <p className="text-base leading-7 text-gray-600">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
