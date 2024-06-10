"use client"
import Link from 'next/link'
import { useState } from 'react'
 
export default function PricingHeroSection() {
return (
    <>
       
        <section className="min-h-max bg-background">
            <div className="absolute top-0 inset-x-0 h-64 flex items-start">
                <div className="h-24 w-2/3 bg-gradient-to-br from-orange-600 opacity-20 blur-2xl ">
                </div>
                <div className="h-20 w-3/5 bg-gradient-to-r from-orange-600 opacity-40 blur-2xl ">
                </div>
            </div>
           
            <div className="relative mx-auto pt-20 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
                <h1 className="mx-auto max-w-5xl font-bold text-4xl/tight sm:text-4xl/tight lg:text-4xl/tight xl:text-5xl/tight">
                Simple, transparent pricing
                </h1>
                <p className=" mx-auto max-w-2xl ">
                Background check pricing for businesses of all sizes.
                </p>
               
                
            </div>
        </section>
    </>
)
}