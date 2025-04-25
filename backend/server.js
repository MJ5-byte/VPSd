// /var/www/backend/server.js
const express       = require('express');
const fs            = require('fs');
const path          = require('path');
const cors          = require('cors');
const session       = require('express-session');
const sqlite3       = require('sqlite3').verbose();
const multer        = require('multer');

const app  = express();
const PORT = 3000;

// CORS: Allow only frontend
const corsOptions = {
  origin: 'https://getvpsd.top',
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'vpsdSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: true,  // Set to true for HTTPS production
    maxAge: 24 * 60 * 60 * 1000,
  }
}));

// Configure multer for file uploads
const upload = multer({
  dest: path.join(__dirname, 'uploads'), // Directory to save uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

const vpsDb = new sqlite3.Database('/var/www/backend/vps.db');

// =========================
// Routes
// =========================

// Waitlist signup with file upload
app.post('/api/join', upload.single('receiptImage'), (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone || !req.file) {
    return res.status(400).json({ success: false, message: 'All fields, including the receipt image, are required' });
  }

  const newEntry = `${name},${email},${phone},${req.file.filename},${new Date().toISOString()}\n`;
  const csvFilePath = path.join(__dirname, 'emails.csv');

  // Append the new entry to the CSV file
  fs.appendFile(csvFilePath, newEntry, (err) => {
    if (err) {
      console.error('Error writing to CSV file:', err);
      return res.status(500).json({ success: false, message: 'Error saving to CSV file' });
    }

    res.json({ success: true, message: 'Data saved to emails.csv and image uploaded' });
  });
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Session regeneration failed' });
        }
        req.session.user = username;
        req.session.role = 'user';
        req.session.save(() => res.json({ success: true }));
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Assign VPS
app.post('/api/vps/assign', (req, res) => {
  if (!req.session.user) return res.status(401).json({ success: false, message: 'Not logged in' });

  vpsDb.get('SELECT * FROM vps_machines WHERE status="available" LIMIT 1', (err, m) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error' });

    const doAssign = machine => {
      vpsDb.run(
        'UPDATE vps_machines SET status="assigned", assigned_to=? WHERE id=?',
        [req.session.user, machine.id],
        err2 => {
          if (err2) return res.status(500).json({ success: false, message: 'Assign error' });
          res.json({
            success: true,
            machine: {
              id: machine.id,
              ip_address: machine.ip_address,
              username: 'root',
              password: 'kali123'
            }
          });
        }
      );
    };

    if (m) return doAssign(m);

    // Provision new if none available
    vpsDb.get('SELECT COUNT(*) AS cnt FROM vps_machines WHERE status="available"', (e, row) => {
      if (e) return res.status(500).json({ success: false, message: 'DB count error' });

      if (row.cnt < 2) {
        const newIP = `165.22.100.${Math.floor(Math.random() * 100 + 150)}`;
        vpsDb.run(
          'INSERT INTO vps_machines(ip_address, status) VALUES(?, "available")',
          [newIP],
          err => {
            if (err) return res.status(500).json({ success: false, message: 'Provisioning error' });
            vpsDb.get('SELECT * FROM vps_machines WHERE status="available" LIMIT 1', (e2, nm) => doAssign(nm));
          }
        );
      } else {
        res.status(500).json({ success: false, message: 'No machines available' });
      }
    });
  });
});

// Confirm connection
app.post('/api/vps/confirm-connection', (req, res) => {
  const { machineId } = req.body;
  if (!machineId) return res.status(400).json({ success: false, message: 'Missing machineId' });

  vpsDb.run('UPDATE vps_machines SET status="in-use" WHERE id=?', [machineId], err => {
    if (err) return res.status(500).json({ success: false, message: 'Update error' });
    res.json({ success: true });
  });
});

// Background: Keep pool filled
setInterval(() => {
  vpsDb.get('SELECT COUNT(*) AS cnt FROM vps_machines WHERE status="available"', (e, r) => {
    if (e) return;

    if (r.cnt < 2) {
      const newIP = `165.22.100.${Math.floor(Math.random() * 100 + 150)}`;
      vpsDb.run('INSERT INTO vps_machines(ip_address, status) VALUES(?, "available")', [newIP]);
    }
  });
}, 30000);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));