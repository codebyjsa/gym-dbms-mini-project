const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const bcrypt = require("bcryptjs");

// In Prisma 7, the adapter is a factory that manages its own pool.
// We pass the configuration directly to the factory.
const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'fitsphere',
  password: 'fitsphere',
  database: 'fitsphere',
};

const adapter = new PrismaMariaDb(dbConfig);
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Starting FitSphere Database Seeding...");
  
  // 1. Create Membership Plans
  console.log("Creating membership plans...");
  const plans = [
    { name: "Basic", durationMonths: 1, price: 29.99, features: "Gym Access\nLocker Room" },
    { name: "Pro", durationMonths: 6, price: 149.99, features: "Gym Access\nLocker Room\nTrainer Support\nDiet Plan" },
    { name: "Elite", durationMonths: 12, price: 249.99, features: "24/7 Access\nPersonal Trainer\nSauna & Spa\nFree Supplements" },
  ];

  const createdPlans = [];
  try {
    for (const plan of plans) {
      const p = await db.membershipPlan.upsert({
        where: { id: plan.name },
        update: {},
        create: {
          name: plan.name,
          durationMonths: plan.durationMonths,
          price: plan.price,
          features: plan.features,
        },
      });
      createdPlans.push(p);
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    // 2. Create Admin
    console.log("Creating admin user...");
    await db.user.upsert({
      where: { email: "admin@fitsphere.com" },
      update: {},
      create: {
        fullName: "Super Admin",
        email: "admin@fitsphere.com",
        password: hashedPassword,
        role: "ADMIN",
        phone: "1234567890",
      },
    });

    // 3. Create Trainers
    console.log("Creating trainers...");
    const trainerData = [
      { name: "Alex Johnson", spec: "Bodybuilding", exp: 8, email: "alex@fitsphere.com" },
      { name: "Sarah Miller", spec: "Yoga & Flexibility", exp: 5, email: "sarah@fitsphere.com" },
      { name: "Mike Ross", spec: "Crossfit", exp: 6, email: "mike@fitsphere.com" },
    ];

    const createdTrainers = [];
    for (const t of trainerData) {
      const user = await db.user.create({
        data: {
          fullName: t.name,
          email: t.email,
          password: hashedPassword,
          role: "TRAINER",
          phone: "9876543210",
          trainer: {
            create: {
              specialization: t.spec,
              experienceYears: t.exp,
            },
          },
        },
        include: { trainer: true },
      });
      if (user.trainer) createdTrainers.push(user.trainer);
    }

    // 4. Create Workouts
    console.log("Creating workout catalog...");
    const workoutData = [
      { name: "Bench Press", cat: "Chest", cal: 150 },
      { name: "Squats", cat: "Legs", cal: 200 },
      { name: "Deadlift", cat: "Back", cal: 250 },
      { name: "Overhead Press", cat: "Shoulders", cal: 120 },
      { name: "Bicep Curls", cat: "Arms", cal: 80 },
      { name: "Plank", cat: "Core", cal: 50 },
    ];

    const createdWorkouts = [];
    for (const w of workoutData) {
      const workout = await db.workout.create({
        data: {
          name: w.name,
          category: w.cat,
          caloriesBurn: w.cal,
          description: `High intensity ${w.name} workout for ${w.cat}.`,
        },
      });
      createdWorkouts.push(workout);
    }

    // 5. Create Members (20 members)
    console.log("Creating 20 members and tracking data...");
    for (let i = 1; i <= 20; i++) {
      const plan = createdPlans[Math.floor(Math.random() * createdPlans.length)];
      const trainer = createdTrainers[Math.floor(Math.random() * createdTrainers.length)];
      const weight = 60 + Math.random() * 30;
      const height = 160 + Math.random() * 30;
      const bmi = weight / ((height / 100) * (height / 100));

      const memberUser = await db.user.create({
        data: {
          fullName: `Member ${i}`,
          email: `member${i}@example.com`,
          password: hashedPassword,
          role: "MEMBER",
          phone: `555000${i.toString().padStart(4, "0")}`,
          member: {
            create: {
              age: 20 + Math.floor(Math.random() * 30),
              gender: Math.random() > 0.5 ? "Male" : "Female",
              weight: weight,
              height: height,
              bmi: bmi,
              membershipPlanId: plan.id,
              trainerId: trainer.id,
            },
          },
        },
        include: { member: true },
      });

      const member = memberUser.member;

      // 6. Add Progress Records
      await db.progressTracking.create({
        data: {
          memberId: member.id,
          weight: weight - 2,
          bmi: (weight - 2) / ((height / 100) * (height / 100)),
          bodyFat: 15 + Math.random() * 10,
          recordedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      });

      // 7. Add Attendance
      for (let j = 0; j < 5; j++) {
        await db.attendance.create({
          data: {
            memberId: member.id,
            date: new Date(Date.now() - j * 24 * 60 * 60 * 1000),
            checkInTime: new Date(Date.now() - j * 24 * 60 * 60 * 1000 + 3600000),
          },
        });
      }

      // 8. Add Payments
      await db.payment.create({
        data: {
          memberId: member.id,
          amount: plan.price,
          paymentStatus: "PAID",
          paymentDate: new Date(),
        },
      });

      // 9. Add Workout Logs
      const workout = createdWorkouts[Math.floor(Math.random() * createdWorkouts.length)];
      await db.memberWorkout.create({
        data: {
          memberId: member.id,
          workoutId: workout.id,
          sets: 3 + Math.floor(Math.random() * 2),
          reps: 8 + Math.floor(Math.random() * 4),
          durationMinutes: 30 + Math.floor(Math.random() * 30),
          workoutDate: new Date(),
        },
      });
    }

    console.log("✅ Seeding completed successfully.");
  } catch (err) {
    console.error("❌ Seeding failed:", err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main()
  .catch((err) => {
    console.error("❌ Fatal error:", err instanceof Error ? err.message : String(err));
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
