import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const socials = [
        { icon: Facebook, color: 'text-blue-700' },
        { icon: Twitter, color: 'text-sky-600' },
        { icon: Instagram, color: 'text-pink-600' },
        { icon: Linkedin, color: 'text-blue-700' },
    ];

    return (
        <footer className="bg-[#e0e5ec] px-4">

            {/* Main Footer */}
            <div className="container mx-auto py-7 md:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-11 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">LEO</span>
                        </div>
                        <h2 className="text-xl font-semibold">MediCare</h2>
                    </div>
                    <p className="text-sm leading-relaxed mb-5">
                        Trusted healthcare with modern technology and compassionate doctors.
                        Your health is our priority.
                    </p>

                    {/* Social Media */}

                    {/* <div className="flex gap-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-3 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_6px_#babecc,-3px_-3px_6px_#ffffff] hover:shadow-inner transition"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div> */}

                    <div className="flex gap-4">
                        {socials.map(({ icon: Icon, color }, i) => (
                            <a
                                key={i}
                                href="#"
                                className={`p-3 rounded-xl ${color} bg-[#e0e5ec] shadow-[3px_3px_6px_#babecc,-3px_-3px_6px_#ffffff] hover:shadow-inner transition`}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-600">Doctors</Link></li>
                        <li><Link to="/appointments" className="hover:text-blue-600">Appointments</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                            <MapPin size={16} />
                            <span>123 Health Street, City</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={16} />
                            <span>+1 234 567 890</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} />
                            <span>support@medicare.com</span>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/terms" className="hover:text-blue-600">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-blue-600">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/refund" className="hover:text-blue-600">
                                Refund Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto border-t border-gray-300 px-6 py-4 flex flex-col-reverse md:flex-row items-center justify-between gap-1 md:gap-0 text-sm text-gray-600">
                <span>
                    © {new Date().getFullYear()} MediCare. All rights reserved.
                </span>

                <div className="flex items-center gap-2">
                    <HeartPulse size={16} className="text-red-500" />
                    <span>Made with care</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
