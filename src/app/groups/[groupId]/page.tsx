"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  Copy,
  Edit2,
  MapPin,
  Plus,
  Save,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { GROUPS_MOCK } from "../page";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

interface GroupeAddress {
  street: string;
  country: string;
  houseNo: string;
  zipCode: string;
  city: string;
}

function GroupAddressForm({ address }: { address?: GroupeAddress }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Field className="col-span-3">
          <FieldLabel>Street</FieldLabel>
          <Input value={address?.street} />
        </Field>
        <Field>
          <FieldLabel htmlFor="houseNo">House no.</FieldLabel>
          <Input value={address?.houseNo} name="houseNo" />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field>
          <FieldLabel>Zip code</FieldLabel>
          <Input value={address?.zipCode} />
        </Field>
        <Field className="col-span-2">
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input value={address?.city} name="city" />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="country">Country</FieldLabel>
        <Input value={address?.country} name="country" />
      </Field>
    </form>
  );
}

function GroupMemberStatusSelect({ userId }: { userId?: string }) {
  const [memberStatus, setMemberStatusType] = useState("member");
  const memberStatusTypes = [
    {
      value: "admin",
      text: "Admin",
    },
    {
      value: "member",
      text: "Member",
    },
    {
      value: "viewer",
      text: "viewer",
    },
  ];
  return (
    <Select value={memberStatus} onValueChange={setMemberStatusType}>
      <SelectTrigger>
        <SelectValue placeholder={memberStatus} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Member status</SelectLabel>
          {memberStatusTypes.map(({ text, value }) => (
            <SelectItem key={value} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

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

function GroupAddress({ address }: { address: GroupeAddress }) {
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
          <GroupAddressForm {...{ address }}></GroupAddressForm>
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
        <Collapsible>
          <CardHeader>
            <div className="flex gap-2 item-baseline">
              <CardTitle>Group Members</CardTitle>
              <CollapsibleTrigger>
                <ChevronsUpDown />
              </CollapsibleTrigger>
            </div>
            <CardDescription>
              Add, remove or change the roles of members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CollapsibleContent className="space-y-2">
              <ItemGroup variant={"muted"}>
                {members.map(({ userId, firstname, lastname, imgUrl }) => (
                  <Item key={userId}>
                    <ItemContent className="gap-2">
                      <Avatar>
                        <AvatarImage src={imgUrl} />
                        <AvatarFallback>
                          {firstname[0]}
                          {lastname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-col">
                        <ItemTitle>
                          {firstname} {lastname}
                        </ItemTitle>
                        <ItemDescription>
                          Since: <strong>20.3.2025</strong>
                        </ItemDescription>
                      </div>
                    </ItemContent>
                    <ItemActions>
                      <GroupMemberStatusSelect {...{ userId }} />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button size={"sm"} variant={"outline"}>
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove {firstname}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              After you've removed {firstname} they can no
                              longer view meal plans, shared recipes and budget
                              overviews.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="mt-1 md:mt-0">
                              Leave in group
                            </AlertDialogCancel>
                            <AlertDialogAction>
                              <Button>
                                I'm sure <Spinner />
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </ItemActions>
                    <ItemSeparator />
                  </Item>
                ))}
              </ItemGroup>
              <Link href={"./search"}>
                <Button>
                  Add new user <Plus />
                </Button>
              </Link>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Share invite link</CardTitle>
          <CardDescription>
            With the invite link other people can easily join your group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 flex gap-2">
            <Input disabled value={"groups/invite/" + groupId} />
            <menu className="w-full flex gap-2">
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
            </menu>
          </div>
          <CardFooter></CardFooter>
        </CardContent>
      </Card>
      <Button variant={"destructive"} className="w-full">
        Leave Group <ArrowRight />
      </Button>
    </section>
  );
}
