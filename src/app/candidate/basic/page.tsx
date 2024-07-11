"use client";
import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { basicformSchema } from "@/schemas/basicformSchema";
import { cn } from "@/lib/utils";

const steps = [{ label: "Step 1" }] satisfies StepItem[];



export default function StepperFooterInside() {
  return (
    <>
      <div className="flex justify-center ">
        <Link href="/" className="font-bold py-4 text-2xl lg:text-4xl">
          Snapcheck
        </Link>
      </div>
      <div className="flex w-full flex-col  p-3 ">
        <Card className="w-full border border-primary p-5 ">
          <Stepper orientation="vertical" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => {
              return (
                <Step key={stepProps.label} {...stepProps}>
                  <FirstStepForm />
                </Step>
              );
            })}
            <FinalStep />
          </Stepper>
        </Card>
      </div>
    </>
  );
}

const StepButtons = () => {
  const { nextStep, prevStep, isLastStep, isOptionalStep, isDisabledStep } =
    useStepper();
  return (
    <div className="w-full flex gap-2 mb-4">
      <Button
        disabled={isDisabledStep}
        onClick={prevStep}
        size="sm"
        variant="secondary"
      >
        Prev
      </Button>
      <Button size="sm" onClick={nextStep}>
        {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
      </Button>
    </div>
  );
};

const FinalStep = () => {
  const { hasCompletedAllSteps, resetSteps } = useStepper();

  if (!hasCompletedAllSteps) {
    return null;
  }

  return (
    <>
      <div className="h-40 mt-2 flex items-center justify-center border bg-secondary text-primary rounded-md">
        <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
      </div>
      <div className="w-full mt-2 flex justify-end gap-2">
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      </div>
    </>
  );
};
function FirstStepForm() {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof basicformSchema>>({
    resolver: zodResolver(basicformSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      nametype: "",
      role: "",
      dob: new Date(),
      passportNumber: "",
      passportType: "",
      passportCountry: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      jobCity: "",
      jobState: "",
      jobZip: "",
      positionTitle: "",
      applicantPhone: "",
      applicantEmail: "",
      race: "",
      gender: "",
      dlCountry: "",
      dlNumber: "",
      dlState: "",
      citizenship: "",
      motherMaidenName: "",
      motherFullName: "",
      fatherName: "",
      cityOfBirth: "",
      countryOfBirth: "",
      fcraPurpose: "",
      statedMonthlyIncome: "",
      proposedMonthlyRent: "",
      knownCriminalRecords: "",
      criminalRecordDescription: "",
    },
  });

  function onSubmit(data: z.infer<typeof basicformSchema>) {
    console.log("Submitting form with data:", data);
    nextStep();
    toast({
      title: "Form submitted Successfully!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your first name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your middle name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your last name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nametype"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Name Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Name type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="previous">Previous</SelectItem>
                  <SelectItem value="maiden">Maiden</SelectItem>
                  <SelectItem value="alias">Alias</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                 
                    initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input placeholder="Passport Number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your passport number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passportType"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Passport Type</FormLabel>
                <FormControl>
                  <Input placeholder="Passport Type" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your passport type.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passportCountry"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Passport Country</FormLabel>
                <FormControl>
                  <Input placeholder="Passport Country" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your passport country.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>SSN</FormLabel>
                <FormControl>
                  <Input placeholder="SSN" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your SSN.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your city.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your state.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>ZIP</FormLabel>
                <FormControl>
                  <Input placeholder="ZIP" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your ZIP code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobCity"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Job City</FormLabel>
                <FormControl>
                  <Input placeholder="Job City" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your job city .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobState"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Job State</FormLabel>
                <FormControl>
                  <Input placeholder="Job State" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your job state.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobZip"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Job ZIP</FormLabel>
                <FormControl>
                  <Input placeholder="Job ZIP" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your job ZIP code .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="positionTitle"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Position Title</FormLabel>
                <FormControl>
                  <Input placeholder="Position Title" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your position title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicantPhone"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel> Phone</FormLabel>
                <FormControl>
                  <Input placeholder=" Phone" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your phone number .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicantEmail"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel> Email</FormLabel>
                <FormControl>
                  <Input placeholder="Applicant Email" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Race</FormLabel>
                <FormControl>
                  <Input placeholder="Race" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your race .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Gender" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your gender .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dlCountry"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>DL Country</FormLabel>
                <FormControl>
                  <Input placeholder="DL Country" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your driver's license country.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dlNumber"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>DL Number</FormLabel>
                <FormControl>
                  <Input placeholder="DL Number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your driver's license number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dlState"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel>DL State</FormLabel>
                <FormControl>
                  <Input placeholder="DL State" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your driver's license state.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem className="p-2"> 
                <FormLabel>Citizenship</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your citizenship status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="noncitizenAuthorized">
                      A noncitizen authorized to work
                      </SelectItem>
                  <SelectItem value="citizen">
                    A citizen of the United States
                  </SelectItem>
                  <SelectItem value="permanentResident">
                    A lawful permanent resident
                  </SelectItem>
                  <SelectItem value="noncitizenAuthorizedToWork">
                    A noncitizen authorized to work
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="motherMaidenName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Mother's Maiden Name</FormLabel>
              <FormControl>
                <Input placeholder="Mother's Maiden Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your mother's maiden name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mothersFullName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Mother's Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Mother's Full Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your mother's full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fathersName"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Father's Name</FormLabel>
              <FormControl>
                <Input placeholder="Father's Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your father's name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cityOfBirth"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>City of Birth</FormLabel>
              <FormControl>
                <Input placeholder="City of Birth" {...field} />
              </FormControl>
              <FormDescription>
                Enter your city of birth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryOfBirth"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Country of Birth</FormLabel>
              <FormControl>
                <Input placeholder="Country of Birth" {...field} />
              </FormControl>
              <FormDescription>
                Enter your country of birth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fcraPurpose"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>FCRA Purpose</FormLabel>
              <FormControl>
                <Input placeholder="FCRA Purpose" {...field} />
              </FormControl>
              <FormDescription>
                Enter your FCRA purpose.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statedMonthlyIncome"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Stated Monthly Income</FormLabel>
              <FormControl>
                <Input placeholder="Stated Monthly Income" {...field} />
              </FormControl>
              <FormDescription>
                Enter your stated monthly income.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proposedMonthlyRent"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Proposed Monthly Rent</FormLabel>
              <FormControl>
                <Input placeholder="Proposed Monthly Rent" {...field} />
              </FormControl>
              <FormDescription>
                Enter your proposed monthly rent.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="knownCriminalRecords"
          render={({ field }) => (
            <FormItem className="p-2">
              <FormLabel>Known Criminal Records</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("knownCriminalRecords") === "yes" && (
               <FormField
               control={form.control}
               name="criminalRecordDescription"

               render={({ field }) => (
                 <FormItem className="p-2">
                   <FormLabel>Enter Criminal Record Description</FormLabel>
                   <FormControl>
                     <Textarea
                       placeholder="Enter description"
                       className="resize-none"
                       {...field}
                     />
                   </FormControl>
                  
                   <FormMessage />
                 </FormItem>
               )}
             />
     
        )}
        <StepperFormActions />
      </form>
    </Form>
  );
}


function StepperFormActions() {
	const {
		prevStep,
		resetSteps,
		isDisabledStep,
		hasCompletedAllSteps,
		isLastStep,
	} = useStepper();

	return (
		<div className="w-full flex justify-end gap-2">
			{hasCompletedAllSteps ? (
				<Button size="sm" type="button" onClick={resetSteps}>
					Reset
				</Button>
			) : (
				<>
					<Button
						disabled={isDisabledStep}
						onClick={prevStep}
						size="sm"
						variant="secondary"
						type="button"
					>
						Prev
					</Button>
					<Button size="sm" type="submit">
						{isLastStep ? "Finish" : "Next"}
					</Button>
				</>
			)}
		</div>
	);

}

  
