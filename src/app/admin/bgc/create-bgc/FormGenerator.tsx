"use client";
import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Trash, BookCopy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { newBooleanField, newDateField, newEnumField, newNumberField, newStringField } from "@/utils/newField";
import { mockFields } from "@/utils/mockFields";
// Define your schema
const formBuilderSchema = z.object({
  name: z.string().nonempty("Form name is required"),
  fields: z.array(z.object({
    id: z.string(),
    label: z.string().nonempty("Label is required"),
    key: z.string().nonempty("Key is required"),
    type: z.enum(["string", "number", "boolean", "date", "enum"]),
    required: z.boolean(),
    showMore: z.boolean().optional(),
  })),
});

type FormSchema = z.infer<typeof formBuilderSchema>;

const fieldTypes = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "enum", label: "Enum" },
  { value: "date", label: "Date" },
];

const FormBuilder = () => {
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      name: "",
      fields: mockFields,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  useEffect(() => {
    form.setValue("fields", mockFields);
  }, []);

  const handleAddField = (type: string) => {
    switch (type) {
      case "string":
        append(newStringField());
        break;
      case "number":
        append(newNumberField());
        break;
      case "boolean":
        append(newBooleanField());
        break;
      case "enum":
        append(newEnumField());
        break;
      case "date":
        append(newDateField());
        break;
      default:
        break;
    }
  };

  const handleMoreClick = (id: string) => {
    const updatedFields = form.getValues("fields").map(field => field.id === id ? { ...field, showMore: !field.showMore } : field);
    form.setValue("fields", updatedFields);
  };

  const onSubmit = (values: FormSchema) => {
    console.log("Form Values:", values);
  };

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-5 ">
            <FormControl>
              <Input {...form.register("name")} placeholder="Enter the form name" />
            </FormControl>
            <Button size="sm" className="gap-1 mt-1" onClick={form.handleSubmit(onSubmit)}>
              Save
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Move</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Delete</TableHead>
                    <TableHead>More</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, idx) => (
                    <React.Fragment key={field.id}>
                      <TableRow>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => move(idx, idx - 1)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => move(idx, idx + 1)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <Input {...form.register(`fields.${idx}.label`)} placeholder="Enter label" />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <Input {...form.register(`fields.${idx}.key`)} placeholder="Enter key" />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name={`fields.${idx}.type`}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select key type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {fieldTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name={`fields.${idx}.required`}
                              render={({ field }) => (
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              )}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => remove(idx)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleMoreClick(field.id)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      {field.showMore && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`description-${field.id}`}>Description</Label>
                                <FormControl>
                                  <Input id={`description-${field.id}`} placeholder="Enter description" />
                                </FormControl>
                              </div>
                              <div>
                                <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                                <FormControl>
                                  <Input id={`placeholder-${field.id}`} placeholder="Enter placeholder" />
                                </FormControl>
                              </div>
                              <div>
                                <Label htmlFor={`min-${field.id}`}>Min</Label>
                                <FormControl>
                                  <Input id={`min-${field.id}`} type="number" placeholder="Enter min value" />
                                </FormControl>
                              </div>
                              <div>
                                <Label htmlFor={`max-${field.id}`}>Max</Label>
                                <FormControl>
                                  <Input id={`max-${field.id}`} type="number" placeholder="Enter max value" defaultValue={255} />
                                </FormControl>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              <Button type="submit" className="mt-4">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button size="sm" variant="ghost" className="gap-1" onClick={() => handleAddField("string")}>
            <PlusCircle className="h-3.5 w-3.5" />
            Add Field
          </Button>
        </CardFooter>
        <CardFooter className="justify-center border-t p-4">
          <Button size="sm" className="gap-1" onClick={() => console.log(form.getValues())}>
            <BookCopy className="h-3.5 w-3.5" />
            Print Form Values
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default FormBuilder;
