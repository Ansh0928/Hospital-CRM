import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { login, resetPassword, authState } = useAuth();
  const { error } = authState;
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, role);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await resetPassword(resetEmail);
      if (success) {
        setResetSuccess(true);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleResetForm = () => {
    setShowResetForm(!showResetForm);
    setResetSuccess(false);
  };
  
  // Sample login credentials helper
  const sampleCredentials = [
    { role: 'admin', email: 'admin@vitacare.com', password: 'admin123' },
    { role: 'doctor', email: 'doctor@vitacare.com', password: 'doctor123' },
    { role: 'staff', email: 'staff@vitacare.com', password: 'staff123' },
    { role: 'lab', email: 'lab@vitacare.com', password: 'lab123' },
    { role: 'pharmacist', email: 'pharmacist@vitacare.com', password: 'pharma123' },
  ];
  
  const fillCredentials = (roleType: UserRole) => {
    const credential = sampleCredentials.find(cred => cred.role === roleType);
    if (credential) {
      setEmail(credential.email);
      setPassword(credential.password);
      setRole(roleType as UserRole);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-blue p-4">
      <div className="w-full max-w-md">
        {!showResetForm ? (
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">VitaCare Medical System</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={role} 
                      onValueChange={(value) => {
                        setRole(value as UserRole);
                        fillCredentials(value as UserRole);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="lab">Lab Technician</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={toggleResetForm}
                        className="text-sm text-medical-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500 text-center w-full">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resetSuccess ? (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      If an account exists with this email, you will receive password reset instructions.
                    </AlertDescription>
                  </Alert>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={toggleResetForm}
                  >
                    Back to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="name@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={toggleResetForm}
                    >
                      Back to Login
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}
        {/* Demo credentials info removed */}
      </div>
    </div>
  );
};

export default Login;
