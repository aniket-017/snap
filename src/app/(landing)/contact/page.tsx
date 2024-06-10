import React from 'react'
import MainNav from '@/components/main-nav'
import FooterBlock from '@/components/landing/footer'
import ContactSection from '@/components/landing/contact-section'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <MainNav/>

<ContactSection/>

    <FooterBlock />
    </>
  )
}

export default page