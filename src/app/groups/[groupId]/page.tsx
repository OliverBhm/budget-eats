"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import {
  GroupAddressForm,
  GroupeAddress,
} from "@/packages/features/ui/groups/components/group-address-form/group-address-form";
import { GroupMemberSearch } from "@/packages/features/ui/groups/components/group-member-search";
import { GroupMemberStatusSelect } from "@/packages/features/ui/groups/components/group-member-status-select";
import {
  GroupMemberList,
  GroupMembers,
} from "@/packages/features/ui/groups/components/group-members";
import {
  ArrowRight,
  Check,
  Copy,
  Edit2,
  MapPin,
  Save,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function GroupName({ name }: { name: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState(name);

  if (isEditing) {
    return (
      <div className="flex">
        <Input
          onChange={(e) => setGroupName(e.target.value)}
          className="mb-1"
          value={groupName}
        />
        <ButtonGroup className="flex">
          <Button
            onClick={() => {
              setIsEditing(false);
              toast(`Name changed to ${groupName} successfully!`);
            }}
            size={"sm"}
            variant={"outline"}
          >
            <Check />
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            size={"sm"}
            variant={"outline"}
          >
            <X />
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div className="flex gap-1 items-center">
      <h3>{groupName}</h3>
      <Button onClick={() => setIsEditing(true)} variant={"outline"}>
        <Edit2 />
      </Button>
    </div>
  );
}

function GroupAddress({ address }: { address: GroupeAddress | null }) {
  return (
    <span className="flex gap-1 items-center text-primary/70">
      {address && (
        <>
          <MapPin />
          {address.street} {address.houseNo}, {address.zipCode} {address.city},{" "}
          {address.country}
        </>
      )}
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"}>
            {!address && "Add a group address"} <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Group Address</DialogTitle>
            <DialogDescription>
              Get up to date special offers and discounts from your area.
            </DialogDescription>
          </DialogHeader>
          <GroupAddressForm address={address ?? undefined} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button>
              {address ? "Update" : "Save"} <Save />
              <Spinner />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </span>
  );
}

function GroupDescription({ description }: { description: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [groupDescription, setGroupDescription] = useState(description);

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Textarea
          onChange={({ target: { value } }) => setGroupDescription(value)}
          value={groupDescription}
        />
        <ButtonGroup aria-label="Button group">
          <Button
            variant={"outline"}
            onClick={() => setIsEditing(false)}
            size={"sm"}
          >
            <Check />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setIsEditing(false)}
            size={"sm"}
          >
            <X />
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <span>{description}</span>
      <Button onClick={() => setIsEditing(true)} variant={"outline"}>
        <Edit2 />
      </Button>
    </div>
  );
}

export default function MangeGroup() {
  const params = useParams();
  const group = GROUPS_MOCK.find(({ id }) => id === params.groupId);

  if (!group) {
    return null;
  }

  const { id: groupId, name, members, description, address } = group;
  return (
    <section className="space-y-4">
      <PageHeader>
        <PageHeaderTitle>
          <GroupName name={name} />
        </PageHeaderTitle>
        <PageHeaderDescription className="space-y-1">
          <GroupDescription {...{ description }} />
          <GroupAddress {...{ address }} />
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Group Members</CardTitle>
          <CardDescription>
            Add, remove or change the roles of members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GroupMemberList
            members={members}
            actions={(id) => (
              <>
                <GroupMemberStatusSelect userId={id} />
                <Button size={"sm"} variant={"ghost"}>
                  <Trash2 className="mr-2" />
                </Button>
              </>
            )}
          />
        </CardContent>
        <CardFooter>
          <GroupMemberSearch {...{ members: members, onAdd: () => {} }} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Share invite link</CardTitle>
          <CardDescription>
            With the invite link other people can easily join your group.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 flex gap-2">
          <Input disabled value={"groups/invite/" + groupId} />
          <ButtonGroup>
            <Button
              onClick={() => {
                toast("Copied to clipboard!");
              }}
              size={"sm"}
            >
              <span className="hidden md:block">Copy to clipboard</span>
              <Copy />
            </Button>
            <GroupMemberStatusSelect />
          </ButtonGroup>
        </CardContent>
      </Card>
      <Button variant={"destructive"} className="w-full">
        Leave Group <ArrowRight />
      </Button>
    </section>
  );
}
