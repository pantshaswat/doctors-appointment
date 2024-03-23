import { StarIcon } from '@heroicons/react/24/solid';

const reviews = [
  {
    name: 'Emily Johnson',
    rating: 5,
    review: 'I had an amazing experience at this salon! The staff was friendly and professional, and I love my new haircut!',
  },
  {
    name: 'Michael Smith',
    rating: 4,
    review: 'Great service and attention to detail. The hairstylist listened to my preferences and delivered exactly what I wanted.',
  },
  {
    name: 'Sophia Brown',
    rating: 5,
    review: 'The salon has a relaxing atmosphere, and the staff is highly skilled. I highly recommend their services.',
  },
  {
    name: 'Daniel Wilson',
    rating: 5,
    review: 'Fantastic experience from start to finish. The team went above and beyond to make me feel comfortable and satisfied with the results.',
  },
];

export default function ReviewsSection() {
  return (
    <section className='services' id='services'>
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">Customer Reviews</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See What Our Customers Are Saying
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                  <span className="ml-2 text-gray-600">{review.rating}/5</span>
                </div>
                <p className="text-gray-800">{review.review}</p>
                <p className="mt-4 text-gray-700 font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </section>
  );
}
