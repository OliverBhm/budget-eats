"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { AnimateFadeIn } from "@/packages/features/ui/animation/fade-in";
import { GroupAddMembers } from "@/packages/features/ui/groups/components/group-add-members";
import { GroupAddressForm } from "@/packages/features/ui/groups/components/group-address-form/group-address-form";
import { GroupMemberList } from "@/packages/features/ui/groups/components/group-members/group-members";
import { removedUserMessage } from "@/packages/features/ui/groups/util/group-member-actions";
import { Allergens } from "@/packages/features/ui/recipe/components/allergens";
import { DietTypes } from "@/packages/features/ui/recipe/components/diet-types";
import { Mealtypes } from "@/packages/features/ui/recipe/components/meal-types";
import {
  UnitOfMeasurement,
  UnitOfMeasurmentToggle,
} from "@/packages/features/ui/recipe/components/system-of-measurment";
import { Calendar, Carrot, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateGroupPage() {
  const [systemOfMeasurement, setSystemOfMeasurement] = useState("metric");
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [otherMembers, setOtherMembers] = useState<Omit<GroupMember, "role">[]>(
    MOCK_OTHER_GROUP_MEMBERS
  );

  const addMember = ({ id }: Pick<GroupMember, "id">) => {
    if (members.find((m) => m.id === id)) return;
    const member =
      [...MOCK_USERS, ...MOCK_OTHER_GROUP_MEMBERS].find((u) => u.id === id) ??
      MOCK_USERS[0];
    setMembers([...members, { ...member, role: "member" }]);
  };

  useEffect(() => {
    setOtherMembers(
      MOCK_OTHER_GROUP_MEMBERS.filter(
        (m) => !members.find((mem) => mem.id === m.id)
      )
    );
  }, [members]);

  const removeMember = ({ id }: Pick<GroupMember, "id">) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const removeMessage = removedUserMessage(members);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Create New Group</PageHeaderTitle>
        <PageHeaderDescription>
          Set up a new group to start sharing meal plans, shopping lists and
          recipes with others.
        </PageHeaderDescription>
      </PageHeader>
      <section className="md:grid grid-cols-8 gap-4 flex flex-col">
        <AnimateFadeIn side="left" className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <GroupMemberList
                members={members}
                emptyMessage="No members added yet, use the search above to add members to the group."
                actions={(id) => (
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => {
                      removeMember({ id: id || "" });
                      toast(removeMessage(id || ""));
                    }}
                  >
                    <Trash2 className="mr-2" />
                  </Button>
                )}
              />
              <GroupAddMembers
                members={MOCK_USERS}
                otherMembers={otherMembers}
                addMember={addMember}
              />
            </CardContent>
          </Card>
        </AnimateFadeIn>
        <span className="col-span-4 gap-4 flex flex-col">
          <AnimateFadeIn className="col-span-4" side="right">
            <Card>
              <CardHeader>
                <CardTitle>Group Address</CardTitle>
                <CardDescription>
                  Specify the address details for the group to get special
                  offers for your area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GroupAddressForm />
              </CardContent>
            </Card>
          </AnimateFadeIn>
          <AnimateFadeIn className="md:h-full" side="left">
            <UnitOfMeasurement className="md:h-full">
              <UnitOfMeasurmentToggle
                system={systemOfMeasurement}
                systemChange={setSystemOfMeasurement}
                className="flex-wrap"
              />
            </UnitOfMeasurement>
          </AnimateFadeIn>
        </span>
        <span className="col-span-4 gap-4 flex flex-col">
          <AnimateFadeIn side="left">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <span>Meals to plan</span> <Calendar />
                </CardTitle>
                <CardDescription>
                  Tells the meal planner which meals to include
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Mealtypes className="flex-wrap" />
              </CardContent>
            </Card>
          </AnimateFadeIn>
          <AnimateFadeIn side="right">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <span>Dietary Types</span> <Carrot />
                </CardTitle>
                <CardDescription>
                  Specify dietary preferences for the group to get recipes that
                  fit everyone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DietTypes className="flex-wrap" />
              </CardContent>
            </Card>
          </AnimateFadeIn>
        </span>
        <AnimateFadeIn className="col-span-4" side="left">
          <Card className="md:h-full">
            <CardHeader>
              <CardTitle>Commong Allergens</CardTitle>
              <CardDescription>
                Specifiy additional allergens that should be avoided
                additionally to the ones each member specified in their profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Allergens className="flex-wrap" />
            </CardContent>
          </Card>
        </AnimateFadeIn>
      </section>
    </>
  );
}
