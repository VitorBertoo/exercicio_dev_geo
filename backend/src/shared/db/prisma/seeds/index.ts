import { prisma } from "../prismaClient";

async function main() {
  const testUser = await prisma.user.create({
    data: {
      name: "Usuário Teste",
      email: "usuario.teste@gmail.com",
      password: "$2a$08$U4YqYwb.aboT0fFaEv4ose/rwRraTuk3atTqXfMecYgWvyXRykGNm"
    }
  });

  console.log(`User ${testUser.name} criado!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
