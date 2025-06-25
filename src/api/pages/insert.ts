import { Container } from "@/domain/builder";
import { supabase } from "@/shared/database";

export const insert = async ({
  userId,
  name,
  serialized,
}: {
  userId: string;
  name: string;
  serialized: ReturnType<Container["serialize"]>;
}) => {
  return supabase
    .from("pages")
    .insert({
      userId,
      name,
      block: serialized,
    })
    .select();
};
