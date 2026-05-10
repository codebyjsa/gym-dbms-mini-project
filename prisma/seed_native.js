const mariadb = require("mariadb");
const bcrypt = require("bcryptjs");

async function seed() {
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'fitsphere',
    password: 'fitsphere',
    database: 'fitsphere'
  });

  console.log("🚀 Starting Native SQL Seeding...");

  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 1. Membership Plans
    console.log("Seeding Membership Plans...");
    await conn.query("INSERT IGNORE INTO MembershipPlan (id, name, durationMonths, price, features) VALUES (?, ?, ?, ?, ?)", ["Basic", "Basic", 1, 29.99, "Gym Access\nLocker Room"]);
    await conn.query("INSERT IGNORE INTO MembershipPlan (id, name, durationMonths, price, features) VALUES (?, ?, ?, ?, ?)", ["Pro", "Pro", 6, 149.99, "Gym Access\nLocker Room\nTrainer Support\nDiet Plan"]);
    await conn.query("INSERT IGNORE INTO MembershipPlan (id, name, durationMonths, price, features) VALUES (?, ?, ?, ?, ?)", ["Elite", "Elite", 12, 249.99, "24/7 Access\nPersonal Trainer\nSauna & Spa\nFree Supplements"]);

    // 2. Admin User
    console.log("Seeding Admin...");
    await conn.query("INSERT IGNORE INTO User (id, fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)", ["admin-id", "Super Admin", "admin@fitsphere.com", hashedPassword, "ADMIN", "1234567890"]);

    // 3. Trainers
    console.log("Seeding Trainers...");
    const trainers = [
      { id: "t1", name: "Alex Johnson", email: "alex@fitsphere.com", spec: "Bodybuilding", exp: 8 },
      { id: "t2", name: "Sarah Miller", email: "sarah@fitsphere.com", spec: "Yoga & Flexibility", exp: 5 },
      { id: "t3", name: "Mike Ross", email: "mike@fitsphere.com", spec: "Crossfit", exp: 6 },
    ];

    for (const t of trainers) {
      await conn.query("INSERT IGNORE INTO User (id, fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)", [t.id, t.name, t.email, hashedPassword, "TRAINER", "9876543210"]);
      await conn.query("INSERT IGNORE INTO Trainer (id, userId, specialization, experienceYears) VALUES (?, ?, ?, ?)", [t.id + "-trainer", t.id, t.spec, t.exp]);
    }

    // 4. Workouts
    console.log("Seeding Workouts...");
    const workouts = [
      { id: "w1", name: "Bench Press", cat: "Chest", cal: 150 },
      { id: "w2", name: "Squats", cat: "Legs", cal: 200 },
      { id: "w3", name: "Deadlift", cat: "Back", cal: 250 },
    ];

    for (const w of workouts) {
      await conn.query("INSERT IGNORE INTO Workout (id, name, category, caloriesBurn, description) VALUES (?, ?, ?, ?, ?)", [w.id, w.name, w.cat, w.cal, `Workout for ${w.cat}`]);
    }

    // 5. Members (Simplified 5 members for speed)
    console.log("Seeding 5 Members...");
    for (let i = 1; i <= 5; i++) {
      const mid = `m${i}`;
      await conn.query("INSERT IGNORE INTO User (id, fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)", [mid, `Member ${i}`, `member${i}@example.com`, hashedPassword, "MEMBER", `555000${i}`]);
      await conn.query("INSERT IGNORE INTO Member (id, userId, age, gender, weight, height, bmi, membershipPlanId, trainerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [mid + "-mem", mid, 25, "Male", 75, 175, 24.5, "Basic", "t1-trainer"]);
      
      // Attendance
      await conn.query("INSERT INTO Attendance (id, memberId, date, checkInTime) VALUES (?, ?, ?, ?)", [mid + "-att", mid + "-mem", new Date(), new Date()]);
      
      // Payment
      await conn.query("INSERT INTO Payment (id, memberId, amount, paymentStatus, paymentDate) VALUES (?, ?, ?, ?, ?)", [mid + "-pay", mid + "-mem", 29.99, "PAID", new Date()]);
    }

    console.log("✅ Native Seeding Completed!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await conn.end();
  }
}

seed();
