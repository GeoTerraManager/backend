import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.JWT_KEY || "dev";

export default function authManager(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Usuário não autorizado' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Falha ao autenticar o token' });
    } else {
      (req as any).user = decoded;
      // Refreshing
      jwt.sign(decoded, secretKey)
      if (decoded.funcao != 'gerente') {
        return res.status(401).json({ error: 'Função não autorizada'})
      }
    }    
    next();
  });
}
