import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export interface GroupeAddress {
  country: string;
  zipCode: string;
  city: string;
  street?: string;
  houseNo?: string;
}

function GroupAddressForm({ address }: { address?: GroupeAddress }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Field>
          <Input placeholder="Zip Code*" value={address?.zipCode} />
        </Field>
        <Field className="col-span-2">
          <Input placeholder="City*" value={address?.city} name="city" />
        </Field>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Field className="col-span-3">
          <Input placeholder="Street" value={address?.street} />
        </Field>
        <Field>
          <Input
            placeholder="House no."
            value={address?.houseNo}
            name="houseNo"
          />
        </Field>
      </div>
      <Field>
        <Input placeholder="Country" value={address?.country} name="country" />
      </Field>
    </form>
  );
}

export { GroupAddressForm };
