// /var/www/backend/init_vps_db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./vps.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vps_machines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      status TEXT CHECK(status IN ('available', 'assigned', 'in-use')) NOT NULL DEFAULT 'available',
      assigned_to TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error("Error creating vps_machines table:", err);
    else console.log("✅ vps_machines table created");
  });

  // Insert initial machines (simulate provisioned machines)
  const initialMachines = [
    '165.22.100.101',
    '165.22.100.102'
  ];
  initialMachines.forEach(ip => {
    db.run(`INSERT INTO vps_machines (ip_address, status) VALUES (?, 'available')`, [ip]);
  });
  console.log("✅ Initial VPS machines added");
});

db.close();