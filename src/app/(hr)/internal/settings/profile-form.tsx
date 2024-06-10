"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
export function ProfileForm() {
  return (
    <div className=" w-full lg:w-3/4 p-3">
      <Card>
        <CardTitle className=" text-xl border-b px-6 py-4">Profile</CardTitle>
        <CardContent>
          <form className="space-y-4  py-3 ">
            <div className="grid gap-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Enter your frist name"
                type="text"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lasttname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Enter your last name"
                type="text"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resetpassword">Reset password</Label>
              <Input
                id="resetpassword"
                placeholder="Enter your reset password"
                type="password"
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                // disabled={isLoading}
              />
            </div>
            <Button type="submit">Update profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
