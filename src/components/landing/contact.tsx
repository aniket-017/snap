import Link from "next/link"
 
const CtaSection = () => {
return (
    <section className="py-24" id="contact">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="bg-gradient-to-br from-orange-600 to-orange-100rounded-lg p-8 md:p-10 py-14 lg:p-14 flex flex-col md:flex-row items-center justify-center text-center md:text-left md:justify-start md:items-start gap-8">
                <div className="md:w-2/5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-display font-bold leading-tight">
                    Contact us
                    </h1>
                </div>
                <div className="flex flex-col md:flex-1 space-y-8">
                    <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas numquam hic odit ducimus pariatur deleniti voluptatibus delectus vero, alias debitis quae cumque eum
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <Link href="#" className="h-12 px-5 rounded-md flex items-center bg-primary text-white">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
export default CtaSection