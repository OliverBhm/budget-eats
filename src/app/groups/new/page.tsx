"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    MOCK_OTHER_GROUP_MEMBERS,
    MOCK_USERS,
} from "@/packages/features/api/groups/mocks/group.mock";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { GroupMemberSearch } from "@/packages/features/ui/groups/components/group-member-search";
import { GroupMemberList } from "@/packages/features/ui/groups/components/group-members";
import { Calendar, Carrot, Plus, RulerDimensionLine } from "lucide-react";
import { useState } from "react";
import { GroupAddressForm } from "../[groupId]/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function CreateGroupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<GroupMember[]>([]);

  const addMember = ({ id }: Pick<GroupMember, "id">) => {
    if (members.find((m) => m.id === id)) return;
    const member = [...MOCK_USERS, ...MOCK_OTHER_GROUP_MEMBERS].find((u) => u.id === id) ?? MOCK_USERS[0];
    setMembers([...members, { ...member, role: "member" }]);
  };

  return (
    <div className="md:grid md:grid-cols-7 gap-4 space-y-4">
      {/* Basics */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupAddressForm />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <span>Unit of Measurment</span> <RulerDimensionLine />
          </CardTitle>
          <CardDescription>Select your preferred unit system</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup type="single" variant={"outline"} spacing={2}>
            <ToggleGroupItem value={"metric"}>Metric</ToggleGroupItem>
            <ToggleGroupItem value={"imperial"}>Imperial</ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <span>Meals to plan</span> <Calendar />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>Meals</SelectTrigger>
            <SelectValue />
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Meals</SelectLabel>
                <SelectItem value="breakfest">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snacks</SelectItem>
                <SelectItem value="tea">Afternoon Tea</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <span>Dietary resitrictions</span> <Carrot />
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Add group members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <GroupMemberSearch users={MOCK_USERS} onAdd={addMember} />

          <div className="space-y-2">
            <div className="text-sm font-medium">
              Members from your other groups
            </div>
            <div className="border rounded-lg divide-y">
              {MOCK_OTHER_GROUP_MEMBERS.map(
                ({ id, firstname, lastname, email }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="text-sm">
                      <div className="font-medium">
                        {firstname} {lastname}
                      </div>
                      <div className="text-muted-foreground">{email}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addMember({ id })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Selected members</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupMemberList members={members} />
        </CardContent>
      </Card>
      {/* Actions */}
      <div className="flex justify-start">
        <Button disabled={!name}>Create group {name && `"${name}"`}</Button>
      </div>
    </div>
  );
}
