import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";

const dummyUsers = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Carol Martinez", email: "carol@example.com" },
];

async function main() {
  const inserted = await db.insert(users).values(dummyUsers).returning();
  console.log(`Seeded ${inserted.length} users:`);
  console.log(inserted);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});