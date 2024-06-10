import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck candidate",
};




interface CandidateLayoutLayoutProps {
  children: React.ReactNode;
}

export default function CandidateLayout({ children }: CandidateLayoutLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen w-full  ">
       
          
        <div className=" w-full">{children}</div>
      </div>
    </>
  );
}
