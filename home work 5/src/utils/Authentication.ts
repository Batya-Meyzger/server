import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key"; // מפתח סודי לחתימה על ה־JWT

export class AuthService {
  // יצירת טוקן חדש עבור משתמש
  generateToken(username: string): string {
    // payload הוא האובייקט שיוטמע בתוך הטוקן
    const payload = { username };

    // הפונקציה חותמת על ה־payload עם מפתח סודי ומחזירה טוקן
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  }

  // בדיקת תקינות הטוקן
  verifyToken(token: string): any {
        return jwt.verify(token, SECRET_KEY);
  }
}

