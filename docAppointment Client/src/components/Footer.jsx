import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black">
            <div>
                <h1 className="w-full text-3xl font-bold text-green-600">
                    Doctors Appointment
                </h1>
                <p className="py-4">
                    Your trusted platform for scheduling doctor appointments
                    
                </p>
                <p className="py-2">Location: Kathmandu, Nepal</p>
                <div className="flex justify-between md:w-[30%] my-6">
                    <FaFacebookSquare size={30} />
                    <FaInstagram size={30} />
                    <FaTwitterSquare size={30} />
                </div>
            </div>
            <div className="lg:col-span-2 flex justify-between mt-6">
                <div>
                    <h6 className="font-medium text-green-600">Solutions</h6>
                    <ul>
                        <li className="py-2 text-sm">Analytics</li>
                        <li className="py-2 text-sm">Marketing</li>
                        <li className="py-2 text-sm">Commerce</li>
                        <li className="py-2 text-sm">Insights</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-medium text-green-600">Support</h6>
                    <ul>
                        <li className="py-2 text-sm">Pricing</li>
                        <li className="py-2 text-sm">Documentation</li>
                        <li className="py-2 text-sm">Guides</li>
                        <li className="py-2 text-sm">API Status</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-medium text-green-600">Company</h6>
                    <ul>
                        <li className="py-2 text-sm">About</li>
                        <li className="py-2 text-sm">Jobs</li>
                        <li className="py-2 text-sm">Press</li>
                        <li className="py-2 text-sm">Careers</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-medium text-green-600">Legal</h6>
                    <ul>
                        <li className="py-2 text-sm">Claim</li>
                        <li className="py-2 text-sm">Policy</li>
                        <li className="py-2 text-sm">Terms</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
