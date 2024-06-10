"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <>
      <section className="bg-orahnge-50 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-0 top-20 w-40 aspect-video bg-gradient-to-br from-orange-600 to-orange-300 rounded-full blur-3xl"
        ></motion.div>
        <div className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 py-24 lg:py-4 flex flex-col lg:flex-row lg:items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto flex flex-col md-justify-center"
          >
            <h1 className="font-semibold t dark:text-white font-display text-4xl md:text-5xl lg:text-6xl">
            A SURE WAY{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-orange-200">
              TO STREAMLINED 
              </span>{' '}
              BACKGROUND SCREENINGS
            </h1>
            <p className="mt-8 mx-auto lg:mx-0 max-w-xl">
            Automate most of your background check process - plus get expert answers and personalized support - to lighten manual workloads, maintain compliance, and hire the right candidates.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 lg:max-w-none max-w-md mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link
                  href="/signup"
                  className="flex items-center justify-center py-3 px-6 border-2 border-transparent shadow-lg bg-primary transition ease-linear hover:bg-primary active:bg-primary text-white rounded-full transform hover:scale-105"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto hidden md:flex justify-end"
          >
            <div className="relative w-full h-full flex items-center aspect-square overflow-hidden lg:aspect-auto">
              <Image
                src="/images/woman-at-meet-up.webp"
                width={1266}
                height={1224}
                alt="woman at virtual meetup"
                className="w-full relative h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}