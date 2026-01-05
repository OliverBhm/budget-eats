"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import {
  MOCK_OTHER_GROUP_MEMBERS,
  MOCK_USERS,
} from "@/packages/features/api/groups/mocks/group.mock";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { Allergens } from "@/packages/features/recipe/ui/components/allergens";
import { DietTypes } from "@/packages/features/recipe/ui/components/diet-types";
import { Mealtypes } from "@/packages/features/recipe/ui/components/meal-types";
import {
  UnitOfMeasurement,
  UnitOfMeasurmentToggle,
} from "@/packages/features/recipe/ui/components/system-of-measurment";
import { GroupAddMembers } from "@/packages/features/ui/groups/components/group-add-members";
import { GroupInformationForm } from "@/packages/features/ui/groups/components/group-information-form";
import { GroupMemberStatusSelect } from "@/packages/features/ui/groups/components/group-member-status-select";
import { GroupMemberList } from "@/packages/features/ui/groups/components/group-members";
import { Calendar, Carrot, Trash } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GroupAddressForm } from "@/packages/features/ui/groups/components/group-address-form/group-address-form";

export default function CreateGroupPage() {
  const [systemOfMeasurement, setSystemOfMeasurement] = useState("metric");
  const [members, setMembers] = useState<GroupMember[]>([]);

  const addMember = ({ id }: Pick<GroupMember, "id">) => {
    if (members.find((m) => m.id === id)) return;
    const member =
      [...MOCK_USERS, ...MOCK_OTHER_GROUP_MEMBERS].find((u) => u.id === id) ??
      MOCK_USERS[0];
    setMembers([...members, { ...member, role: "member" }]);
  };

  const removeMember = ({ id }: Pick<GroupMember, "id">) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Create New Group</PageHeaderTitle>
        <PageHeaderDescription>
          Set up a new group to start sharing meal plans, shopping lists and
          recipes with others.
        </PageHeaderDescription>
      </PageHeader>
      <div className="md:grid md:grid-cols-7 gap-4 space-y-4">
        <Card className="col-span-4">
          <CardContent className="space-y-4">
            <GroupInformationForm />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardContent>
            <GroupAddressForm />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Add members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <GroupAddMembers
              members={[...MOCK_USERS]}
              otherMembers={MOCK_OTHER_GROUP_MEMBERS}
              addMember={addMember}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Selected members - {members.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="md:h-60">
              <GroupMemberList
                members={members}
                actions={(id) => (
                  <>
                    <GroupMemberStatusSelect userId={id} />
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      onClick={() => {
                        removeMember({ id: id || "" });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                    </Button>
                  </>
                )}
              />
            </ScrollArea>
          </CardContent>
        </Card>
        <UnitOfMeasurement className="col-span-2">
          <UnitOfMeasurmentToggle
            system={systemOfMeasurement}
            systemChange={setSystemOfMeasurement}
          />
        </UnitOfMeasurement>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <span>Meals to plan</span> <Calendar />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Mealtypes className="flex-wrap" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <span>Dietary resitrictions</span> <Carrot />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle>Diet Types</CardTitle>
            <DietTypes className="flex-wrap" />
            <CardTitle>Commong Allergens</CardTitle>
            <Allergens className="flex-wrap" />
          </CardContent>
        </Card>
        <div className="flex justify-start">
          <Button>Create group</Button>
        </div>
      </div>
    </>
  );
}
