import { RedirectToHome } from "./RedirectToHome";

export function generateStaticParams() {
  return [
    { slug: "gep-crm-system" },
    { slug: "hermes-agent" },
    { slug: "hr-payroll-system" },
    { slug: "khar-hostel-portal" },
    { slug: "local-llama-ai" },
    { slug: "uniperks-design" },
    { slug: "uniperks" }
  ];
}

export default function WorkDetailRedirect() {
  return <RedirectToHome />;
}
