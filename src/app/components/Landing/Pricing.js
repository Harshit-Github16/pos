'use client';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const tiers = [
    {
        name: 'Basic',
        href: '#',
        priceMonthly: 999,
        description: 'Essential features for small cafes and food trucks.',
        features: [
            'Single Outlet',
            'Basic Billing',
            'Daily Reports',
            'Email Support',
        ],
    },
    {
        name: 'Standard',
        href: '#',
        priceMonthly: 1999,
        description: 'Perfect for growing restaurants and casual dining.',
        features: [
            'Up to 3 Outlets',
            'Inventory Management',
            'Advanced Analytics',
            'Table Management',
            'Priority Support',
        ],
        mostPopular: true,
    },
    {
        name: 'Premium',
        href: '#',
        priceMonthly: 3999,
        description: 'Advanced features for large chains and hotels.',
        features: [
            'Unlimited Outlets',
            'Central Kitchen Management',
            'API Access',
            'Dedicated Account Manager',
            '24/7 Phone Support',
            'Custom Reports',
        ],
    },
];

export default function Pricing() {
    return (
        <div id="pricing" className="bg-gray-50 py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose the perfect plan for your business
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Simple, transparent pricing. No hidden fees. Upgrade or downgrade at any time.
                    </p>
                </div>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`rounded-3xl p-8 ring-1 xl:p-10 transition-all duration-300 hover:shadow-xl ${tier.mostPopular
                                ? 'bg-white ring-orange-600 shadow-lg scale-105 z-10'
                                : 'bg-white/60 ring-gray-200 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center justify-between gap-x-4">
                                <h3
                                    id={tier.name}
                                    className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-orange-600' : 'text-gray-900'
                                        }`}
                                >
                                    {tier.name}
                                </h3>
                                {tier.mostPopular && (
                                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold leading-5 text-orange-600">
                                        Most popular
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">₹{tier.priceMonthly}</span>
                                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                            </p>
                            <a
                                href={tier.href}
                                aria-describedby={tier.name}
                                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors ${tier.mostPopular
                                    ? 'bg-orange-600 text-white hover:bg-orange-500 shadow-sm'
                                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                                    }`}
                            >
                                Get started
                            </a>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <FaCheck className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
