import React from 'react';

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-100 text-black py-6 border-t border-gray-300">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Useful Links - First 3 Columns */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ul className="space-y-2">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
                <li>Lead</li>
              </ul>
              <ul className="space-y-2">
                <li>Value</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>FAQs</li>
                <li>Security</li>
              </ul>
              <ul className="space-y-2">
                <li>Mobile</li>
                <li>Contact</li>
                <li>Partner</li>
                <li>Franchise</li>
                <li>Seller</li>
              </ul>
            </div>
          </div>

          {/* Resources - Next 3 Columns */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ul className="space-y-2">
                <li>Categories</li>
                <li>See All</li>
                <li>Vegetables & Fruits</li>
                <li>Dairy & Breakfast</li>
                <li>Munchies</li>
              </ul>
              <ul className="space-y-2">
                <li>Cold Drinks & Juices</li>
                <li>Instant & Frozen Food</li>
                <li>Tea, Coffee & Health Drinks</li>
                <li>Bakery & Biscuits</li>
                <li>Sweet Tooth</li>
              </ul>
              <ul className="space-y-2">
                <li>Atta, Rice & Dal</li>
                <li>Dry Fruits, Masala & Oil</li>
                <li>Sauces & Spreads</li>
                <li>Chicken, Meat & Fish</li>
                <li>Paan Corner</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-sm  mt-6 border-t pt-4">
          <p>© Blink Commerce Private Limited, 2016-2024</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:underline">
              Download App
            </a>
            <a href="#" className="hover:underline">
              App Store
            </a>
            <a href="#" className="hover:underline">
              Play Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
