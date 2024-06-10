"use client"

import Link from "next/link";
import { motion } from "framer-motion";

interface FooterItemProps {
  text: string;
  link: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ text, link }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={link} className="duration-200 hover:text-primary">
        {text}
      </Link>
    </motion.li>
  );
};

interface FooterBlockItemProps {
  title: string;
  items: { id: number; text: string; link: string }[];
}

const FooterBlockItem: React.FC<FooterBlockItemProps> = ({ title, items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h1 className="text-lg font-semibold ">{title}</h1>
      <ul className="space-y-3">
        {items.map((item) => (
          <FooterItem key={item.id} text={item.text} link={item.link} />
        ))}
      </ul>
    </motion.div>
  );
};

const footerBlocks = [
  {
    id: 1,
    title: "Services",
    items: [
      { id: 1, text: "Criminal background checks", link: "#" },
      { id: 2, text: " Employment verification ", link: "#" },
      { id: 3, text: "Driving record (MVR) checks", link: "#" },
      { id: 4, text: "Education verification", link: "#" },
      { id: 5, text: "Professional license verification", link: "#" },
    ],
  },
  {
    id: 2,
    title: "Company",
    items: [
      { id: 1, text: "About", link: "#" },
      { id: 2, text: "Career", link: "#" },
      { id: 3, text: "Contact", link: "#" },
      { id: 4, text: "Services", link: "#" },
    ],
  },
  {
    id: 3,
    title: "Social",
    items: [
      { id: 1, text: "Twitter X", link: "#" },
      { id: 2, text: "Instagram", link: "#" },
      { id: 3, text: "Threds", link: "#" },
      { id: 4, text: "Facebook", link: "#" },
      { id: 5, text: "Linkedin", link: "#" },
    ],
  },
  {
    id: 4,
    title: "Ressources",
    items: [
      { id: 1, text: "Blog", link: "#" },
      { id: 2, text: "Privacy", link: "#" },
      { id: 3, text: "Terms", link: "#" },
      { id: 4, text: "FAQ", link: "#" },
    ],
  },
];

const FooterBlock: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="py-16 md:py-20 flex flex-col lg:flex-row gap-14 gap-y-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full lg:w-96 space-y-6"
          >
            <Link href="/" className="flex">
              <span className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-primary" />
                <span className="w-3 h-6 rounded-r-full flex bg-background mt-2" />
              </span>
              <span className="text-lg">Snapcheck</span>
            </Link>
            <p className="max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto est quia a
            </p>
          </motion.div>
          <nav className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-10">
            {footerBlocks.map((footerBlock) => (
              <FooterBlockItem key={footerBlock.id} title={footerBlock.title} items={footerBlock.items} />
            ))}
          </nav>
        </div>
      </div>
      <div className="py-3 bg-accent">
        <div className="max-w-3xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex justify-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            © 2024 <span className="hover:text-primary">Snapcheck</span>. All right reserved
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterBlock;