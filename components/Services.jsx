'use client';

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Services() {
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.04, ease: "easeInOut" } },
    hover: { scale: 1.05 }
  };

  const servicesData = [
    {
      id: 1,
      name: "Check Resume",
      image: "./resume.png", // Example image path
      href: "/services/v1"
    },
    {
      id: 2,
      name: "Interview",
      image: "./interview.png", // Example image path
      href: "/services/v2"
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900 overflow-y-hidden p-4">
      <div className="flex flex-wrap justify-center w-full gap-16">
        {servicesData.map((service) => (
          <motion.div
            key={service.id}
            variants={boxVariants}
            initial="hidden"
            whileHover="hover"
            animate="show"
            className="text-white w-full sm:w-10/12 md:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 rounded overflow-hidden shadow-md m-2 transition-transform transform"
            style={{ maxWidth: "500px" }} // Increased maxWidth for larger boxes
          >
            {/* Image Container */}
            <div
              className="relative w-full"
              style={{
                height: "350px", // Increased height for larger images
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-blue-600 opacity-10"></div> {/* Overlay */}
            </div>
            
            {/* Text Container */}
            <div className="flex items-center justify-center bg-blue-200 p-3"> {/* Increased padding */}
              <Link href={service.href} className="text-blue-900 font-bold text-xl">
                {service.name}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}