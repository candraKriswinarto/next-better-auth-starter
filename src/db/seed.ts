import "dotenv/config";
import { db } from "./index";
import { user } from "./schema";

const dummyUsers = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Carol Martinez", email: "carol@example.com" },
];

async function main() {
  const inserted = await db
    .insert(user)
    .values(dummyUsers.map((u) => ({ id: crypto.randomUUID(), ...u })))
    .returning({ id: user.id, name: user.name, email: user.email });
  console.log(`Seeded ${inserted.length} users:`);
  console.log(inserted);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});