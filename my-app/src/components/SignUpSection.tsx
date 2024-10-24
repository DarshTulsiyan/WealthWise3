"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', { name, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token); // Store JWT token in localStorage
      setMessage('Registration successful!');
      router.push('/dashboard'); // Redirect to dashboard after successful sign-up
    } catch (err) {
      setError(err.response.data.msg || 'Registration failed');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">WealthWise</CardTitle>
          <p className="text-gray-600">Create your account to get started!</p>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <a href="/" className="text-teal-600 hover:underline">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
