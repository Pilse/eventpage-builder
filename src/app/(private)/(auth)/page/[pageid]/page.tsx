import { BuilderPanel } from "@/components/builder/panel";
import { auth } from "@/shared/auth";

export default async function Builder() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  return <BuilderPanel />;
}
