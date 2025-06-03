import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.message,
    });
  }

  if (error.name === 'PrismaClientKnownRequestError') {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A record with this data already exists',
      });
    }
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};