import { Meta } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";
import ClientUnifiedProfile from "./ClientUnifiedProfile";
import { SmoothScroll } from "@/components/SmoothScroll";

export async function generateMetadata() {
  return Meta.generate({
    title: "Profile — Ali Hanafiah",
    description: about.description,
    baseURL: baseURL,
    path: about.path,
  });
}

export default function About() {
  return (
    <SmoothScroll>
      <ClientUnifiedProfile />
    </SmoothScroll>
  );
}
