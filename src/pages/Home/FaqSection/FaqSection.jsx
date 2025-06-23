import React from 'react';
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Link } from 'react-router';


const FaqSection = () => {
    return (
        <div className='my-10 bg-base-300 p-10'>
            <div className='text-white text-center'>
                <h1 className='lg:text-3xl text-xl '>Frequently Asked Question (FAQ)</h1>
                <p className='lg:text-sm text-xs mt-3 mb-3'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain,<br /> and strengthen your body with ease!</p>
            </div>

            <div className="collapse collapse-arrow  border border-base-300 bg-gray-800">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How does this posture corrector work?</div>
                <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                <div className="collapse-content text-sm">Yes, most posture correctors are designed to be adjustable and flexible, making them suitable for a wide range of ages and body types. Whether you're a student, working professional, athlete, or senior, it can help improve posture and reduce discomfort from slouching.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
                <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it have smart features like vibration alerts?</div>
                <div className="collapse-content text-sm">That depends on the specific model — but some modern posture correctors do include smart features like:

                    ✅ Vibration alerts when you slouch

                    📱 Bluetooth connectivity to sync with a mobile app

                    📊 Posture tracking and usage statistics

                    🔋 Rechargeable battery for daily use

                    If you're looking for a smart posture corrector, check the product description for keywords like "smart sensor," "vibration feedback," or "app-controlled."</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
                <div className="collapse-content text-sm">If you’ve signed up for notifications or joined the waitlist, you’ll receive a notification via email or SMS as soon as the product is restocked. Here's how it usually works:

                    Email Notification – You’ll get an email letting you know the item is available to order.

                    SMS Alert (if enabled) – A text message may be sent for faster notification.

                    Website Alert – Some sites also show a message when you revisit the product page.</div>
            </div>
           <div className='flex justify-center'>
             <Link>
                  <button className='btn px-10 mt-5 min-w-3xs mx-auto lg:text-lg text-sm rounded-lg p-3'>See more FAQ's <FaSquareArrowUpRight size={25}/></button>
            </Link>
           </div>
        </div>

    );
};

export default FaqSection;