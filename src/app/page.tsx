'use client';

import { NextPage } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import categoriesData from './categories.json';
import { subCategories } from './helper/index';
import { BestSellers } from './components/BestSellers';
import { SubCategoryCard } from './components/SubCategoryCard';
import { Carousel } from './components/Carousel';
import { Provider } from 'react-redux';
import {store} from '../app/redux/store'




const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Mobile View: Best Sellers */}
        <main className="block md:hidden">
          <BestSellers />
        </main>

        {/* Desktop View: Other Content */}
        <main className="hidden md:block flex-1">
          {/* Banner Section */}
          <div className="container mx-auto px-4 md:px-28">
            <img
              src="/assets/images/banner_1.webp"
              alt="Banner 1"
              className="w-full rounded-lg mb-6"
            />
            <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <img
                src="/assets/images/banner_2.avif"
                alt="Banner 2"
                className="w-full rounded-lg"
              />
              <img
                src="/assets/images/banner_3.avif"
                alt="Banner 3"
                className="w-full rounded-lg"
              />
              <img
                src="/assets/images/banner_4.avif"
                alt="Banner 4"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Subcategory Cards Section */}
          <div className="container mx-auto px-4 md:px-28 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 mt-4">
            {subCategories.map((subCategory) => (
              <SubCategoryCard
                key={subCategory.id}
                name={subCategory.name}
                image={subCategory.image}
              />
            ))}
          </div>

          {/* Items Section with Carousel */}
          <div className="container mx-auto px-4 md:px-28">
            {categoriesData.categories.map((category) =>
              category.subcategories.map((subCategory) => (
                <div key={subCategory.id} className="mb-4">
                  <div className="flex justify-between items-center mt-4">
                    <h3 className="text-xl font-bold">{subCategory.name}</h3>
                    <button className="text-green-500 hover:underline">See All</button>
                  </div>
                  <Carousel items={subCategory.items} />
                  <div className="border-b-2 border-gray-300 mt-4"></div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    </Provider>
  );
};


export default Home;
