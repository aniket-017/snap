"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
export function PlanForm() {
  return (
    <div className=" w-full lg:w-3/4 p-3">
      <Card>
        <CardTitle className=" text-xl border-b px-6 py-4">Plans</CardTitle>

        <CardContent>
          <form className="space-y-4  py-3">
            <div className="grid gap-2">
              <Label htmlFor="requestplan">Request for plan</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select of service" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="plan1">Plan 1</SelectItem>
                  <SelectItem value="plan2">Plan 2</SelectItem>
                  <SelectItem value="plan3">Plan 3</SelectItem>
                  <SelectItem value="plan4">Plan 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Request for plan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
