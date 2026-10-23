import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  OutlinedInput,
  type OutlinedInputProps,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { type ChangeEvent, type FormEvent, type ReactNode, useState } from "react";
import { type CartLine, cartTotals, type Delivery, deliveryOptions, FREE_SHIPPING_FROM } from "../cart";
import { productById } from "../data/products";
import { money, wholeMoney } from "../format";
import { container, muted, tabularNums } from "../layout";
import { typeStyle, ui } from "../tokens";
import { ProductArt } from "./ProductArt";
import { Summary } from "./Summary";

export interface PlacedOrder {
  id: string;
  email: string;
  total: number;
  delivery: Delivery;
}

interface Props {
  lines: CartLine[];
  onBack: () => void;
  onPlaced: (order: PlacedOrder) => void;
}

const countries = ["United States", "Canada", "United Kingdom", "Germany", "Australia"];

const emptyForm = { email: "", name: "", address: "", city: "", postcode: "", country: countries[0], card: "", expiry: "", cvc: "" };
type Form = typeof emptyForm;
type Errors = Partial<Record<keyof Form, string>>;

function validate(f: Form): Errors {
  const e: Errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter an email address, like you@example.com.";
  if (!f.name.trim()) e.name = "Enter the name for delivery.";
  if (!f.address.trim()) e.address = "Enter a street address.";
  if (!f.city.trim()) e.city = "Enter a city.";
  if (!f.postcode.trim()) e.postcode = "Enter a postcode.";
  if (f.card.replace(/\D/g, "").length !== 16) e.card = "Enter the 16-digit card number.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry)) e.expiry = "Use MM/YY, like 08/28.";
  if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "Enter the 3 or 4 digits on the back of the card.";
  return e;
}

const formatCard = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export function Checkout({ lines, onBack, onPlaced }: Props) {
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const totals = cartTotals(lines, delivery);
  const freeStandard = cartTotals(lines, "standard").shipping === 0;

  const set = (key: keyof Form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const field = (key: keyof Form) => ({
    id: key,
    value: form[key],
    error: errors[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(key, e.target.value),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    onPlaced({ id: `INK-${Math.floor(10000 + Math.random() * 90000)}`, email: form.email, total: totals.total, delivery });
  };

  return (
    <Box sx={{ ...container, py: ui("space-xl"), display: "flex", flexDirection: "column", gap: ui("space-xl") }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: ui("space-s") }}>
        <Button variant="text" size="small" startIcon={<ArrowLeft />} onClick={onBack} sx={{ ml: `calc(-1 * ${ui("space-s-m")})` }}>
          Back to shop
        </Button>
        <Typography variant="h2" component="h1">
          Checkout
        </Typography>
      </Box>

      {lines.length === 0 ? (
        <Card sx={{ p: ui("space-xl"), display: "flex", flexDirection: "column", alignItems: "flex-start", gap: ui("space-m") }}>
          <Typography>Your cart is empty, so there is nothing to check out yet.</Typography>
          <Button variant="contained" onClick={onBack}>
            Browse the shop
          </Button>
        </Card>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 360px" }, gap: ui("space-xl"), alignItems: "start" }}>
          <Box component="form" noValidate onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: ui("space-xl"), minWidth: 0 }}>
            <Alert severity="info">
              <AlertTitle>Demo store</AlertTitle>
              No payment is taken and nothing ships. Any 16-digit card number works.
            </Alert>

            <Section title="Contact">
              <Field label="Email" type="email" autoComplete="email" hint="We send the receipt and tracking here." {...field("email")} />
            </Section>

            <Section title="Shipping address">
              <Field label="Full name" autoComplete="name" {...field("name")} />
              <Field label="Street address" autoComplete="street-address" {...field("address")} />
              <Pair>
                <Field label="City" autoComplete="address-level2" {...field("city")} />
                <Field label="Postcode" autoComplete="postal-code" {...field("postcode")} />
              </Pair>
              <FormControl fullWidth sx={{ gap: ui("space-s") }}>
                <FormLabel id="country-label">Country</FormLabel>
                <Select labelId="country-label" value={form.country} onChange={(e) => set("country", e.target.value)}>
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Section>

            <Section title="Delivery">
              <RadioGroup value={delivery} onChange={(e) => setDelivery(e.target.value as Delivery)} aria-label="Delivery method" sx={{ gap: ui("space-s") }}>
                {(Object.keys(deliveryOptions) as Delivery[]).map((key) => {
                  const o = deliveryOptions[key];
                  const free = key === "standard" && freeStandard;
                  return (
                    <FormControlLabel
                      key={key}
                      value={key}
                      control={<Radio />}
                      sx={{ mr: 0, "& .MuiFormControlLabel-label": { flex: 1 } }}
                      label={
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: ui("space-m") }}>
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <span>{o.label}</span>
                            <Typography variant="body2" component="span" sx={muted}>
                              {o.detail}
                              {key === "standard" && !free ? ` · free over ${wholeMoney(FREE_SHIPPING_FROM)}` : ""}
                            </Typography>
                          </Box>
                          <Box component="span" sx={tabularNums}>
                            {free ? "Free" : money(o.price)}
                          </Box>
                        </Box>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </Section>

            <Section title="Payment">
              <Field
                label="Card number"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                slotProps={{ input: { inputMode: "numeric" } }}
                {...field("card")}
                onChange={(e) => set("card", formatCard(e.target.value))}
              />
              <Pair>
                <Field
                  label="Expiry"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  slotProps={{ input: { inputMode: "numeric" } }}
                  {...field("expiry")}
                  onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                />
                <Field
                  label="Security code"
                  autoComplete="cc-csc"
                  placeholder="123"
                  slotProps={{ input: { inputMode: "numeric", maxLength: 4 } }}
                  {...field("cvc")}
                  onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))}
                />
              </Pair>
            </Section>

            <Button type="submit" variant="contained" size="large" sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
              Place order · {money(totals.total)}
            </Button>
          </Box>

          <Card component="aside" aria-label="Order summary" sx={{ p: ui("space-l"), display: "flex", flexDirection: "column", gap: ui("space-m-l"), position: { md: "sticky" }, top: 88 }}>
            <Typography variant="h4" component="h2">
              Order summary
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: ui("space-m") }}>
              {lines.map((line) => {
                const p = productById(line.productId);
                if (!p) return null;
                return (
                  <Box component="li" key={line.key} sx={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: ui("space-m"), alignItems: "center" }}>
                    <ProductArt product={p} variant={line.variant} size="sm" />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2">{p.name}</Typography>
                      <Typography variant="caption" sx={muted}>
                        {line.variant} × {line.qty}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={tabularNums}>
                      {money(p.price * line.qty)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Divider />
            <Summary {...totals} />
          </Card>
        </Box>
      )}
    </Box>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card component="section" sx={{ p: ui("space-l"), display: "flex", flexDirection: "column", gap: ui("space-m-l") }}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      {children}
    </Card>
  );
}

function Pair({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: ui("space-m-l") }}>{children}</Box>;
}

type FieldProps = Omit<OutlinedInputProps, "error"> & { id: string; label: string; error?: string; hint?: string };

/** Graphite FormControl: label above, field, then hint or error. */
function Field({ id, label, error, hint, ...input }: FieldProps) {
  const helpId = `${id}-help`;
  const help = error ?? hint;
  return (
    <FormControl error={Boolean(error)} required fullWidth sx={{ gap: ui("space-s") }}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <OutlinedInput id={id} name={id} aria-describedby={help ? helpId : undefined} {...input} />
      {help && (
        <FormHelperText id={helpId} sx={typeStyle("body-sm")}>
          {help}
        </FormHelperText>
      )}
    </FormControl>
  );
}
