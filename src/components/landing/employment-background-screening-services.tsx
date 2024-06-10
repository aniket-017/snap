
import Image from 'next/image';

const EmploymentBackgroundScreeningServices = () => {
  return (
    <div className="bg-primary py-12">
     
      <h1 className="text-4xl text-center font-semibold mb-14">
        Employment Background Screening Services
      </h1>
      <div className="flex justify-center space-x-10">
        <div className="rounded-full  w-72 h-36 flex flex-col items-center justify-center">
          <Image
            src="/images/criminal-checks.png"
            alt="Image 1"
            className="object-cover  transform hover:scale-105  "
            width={180}
            height={180}
            quality={100}
          />
          <h4 className='flex mt-2  hover:text-primary font-semibold '>CRIMINAL BACKGROUND CHECKS
</h4>
        </div>
        <div className="rounded-full  w-72 h-36 flex flex-col items-center justify-center">
          <Image
            src="/images/criminal-checks.png"
            alt="Image 1"
            className="object-cover  "
            width={180}
            height={180}
            quality={100}
          />
          <h4 className='flex mt-2  hover:text-primary font-semibold '>CRIMINAL BACKGROUND CHECKS
</h4>
        </div>
        <div className="rounded-full  w-72 h-36 flex flex-col items-center justify-center">
          <Image
            src="/images/criminal-checks.png"
            alt="Image 1"
            className="object-cover  "
            width={180}
            height={180}
            quality={100}
          />
          <h4 className='flex mt-2  hover:text-primary font-semibold '>CRIMINAL BACKGROUND CHECKS
</h4>
        </div>
        <div className="rounded-full  w-72 h-36 flex flex-col items-center justify-center">
          <Image
            src="/images/criminal-checks.png"
            alt="Image 1"
            className="object-cover  "
            width={180}
            height={180}
            quality={100}
          />
          <h4 className='flex mt-2  hover:text-primary font-semibold '>CRIMINAL BACKGROUND CHECKS
</h4>
        </div>
       

      </div>
     
    </div>
  );
};

export default EmploymentBackgroundScreeningServices;