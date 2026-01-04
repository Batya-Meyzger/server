import jwt from "jsonwebtoken";
import 'dotenv/config'; 

export class AuthService {
  
  private getSecretKey(): string {
    const key = process.env.JWT_SECRET;
    if (!key) {
    
      console.warn("Warning: JWT_SECRET is not defined in .env, using default 'BSP'");
      return "BSP";
    }
    return key;
  }

  generateToken(userId: string, role: string): string {
    const secret = this.getSecretKey();
    const payload = { userId, role };
        
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  }

  verifyToken(token: string): any {
    const secret = this.getSecretKey();
    
    try {
      
      const cleanToken = token.replace("Bearer ", "");
      
      const decoded = jwt.verify(cleanToken, secret);
      return decoded;
    } 
    catch (error: any) {
      throw error;
    }
  }
}
 
    
    
    
  
    
    