import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface GroupInformationFormProps {}

function GroupInformationForm({}: GroupInformationFormProps) {
  return (
    <>
      <Input placeholder="Group name" />
      <Textarea placeholder="Description (optional)" />
    </>
  );
}

export { GroupInformationForm };
