import React from 'react';
import { Button } from '../ui/button';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ name, description, price, features }) => {
  return (
    <div className="p-5 sm:p-6 md:p-8 xl:p-10 border md:hauto flex flex-col rounded-xl">
      <span className="font-semibold text-2xl">{name}</span>
      <p className="mt-1 text-lg">{description}</p>
      <div className="mt-4 text-2xl md:text-3xl font-bold">
        <p className="text-sm opacity-70 font-light">Starting from</p>
        <p>${price}/check</p>
      </div>
      <ul className="flex flex-col space-y-3 mt-5 sm:mt-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-x-3">
            <span className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-5 sm:mt-6 w-full">
        <Button variant="hero" className='w-full rounded-full py-5'>
          Get started
          <span className="pl-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      name: 'Basic+',
      description: 'Quickest and most basic',
      price: '25',
      features: ['SSN Trace', 'Sex Offender Registry', 'Global Watchlist Reacords','National Criminal Records'],
    },
    {
        name: 'Most Popular+',
        description: 'Essentail',
        price: '54',
        features: ['SSN Trace', 'Sex Offender Registry', 'Global Watchlist Records' ,'National Criminal Records' , 'Unlimited County Criminal Search'],
      },

      {
        name: 'Professional+',
        description: 'Also verify education and employment',
        price: '25',
        features: ['SSN Trace', 'Sex Offender Registry', 'Global Watchlist Records' ,'National Criminal Records' , 'Unlimited County Criminal Search' ,'Education Verfication(Highest Level)','Employment Verfication (Current)'],
      },
  
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col space-y-12">
          <div className="flex gap-10 flex-col items-center">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <span className="border bg-primary text-white cursor-pointer px-3 py-0.5 rounded-full">Pricing</span>
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold">Simple, transparent pricing</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">Background check pricing for businesses of all sizes.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 items-center lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
