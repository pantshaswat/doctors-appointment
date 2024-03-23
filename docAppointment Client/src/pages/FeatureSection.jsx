import React from 'react';

const doctorFeatures = [
  {
    name: 'General Checkup',
    description:
      'Schedule regular checkups with experienced doctors to ensure your overall health and well-being.',
  },
  {
    name: 'Specialist Consultation',
    description:
      'Consult with specialist doctors in various fields to address specific health concerns and receive personalized treatment plans.',
  },
  {
    name: 'Diagnostic Tests',
    description:
      'Book appointments for diagnostic tests to aid in the diagnosis and monitoring of medical conditions.',
  },
  {
    name: 'Telemedicine',
    description:
      'Access virtual consultations with healthcare professionals from the comfort of your home through our telemedicine services.',
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-green-600  sm:text-4xl">
            Schedule Your Doctor's Appointment Online
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our range of services designed to provide convenient access to quality healthcare.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {doctorFeatures.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    ✨
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
