import ClientPage from "../ClientPage";
import enUS from "@/locales/en-US";

export default function Page() {
  return <ClientPage lang="en-US" locale={enUS} rememberLocale={false} />;
}
