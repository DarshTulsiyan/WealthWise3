// "use client"
// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
// import { Input } from '../components/ui/input'
// import { Button } from '../components/ui/button'
// import { Eye, EyeOff } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import Link from 'next/link'

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
//       const token = res.data.token;
//       localStorage.setItem('token', token); // Store JWT token in localStorage
//       setMessage('Login successful!');
//       router.push('/dashboard'); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError(err.response.data.msg || 'Login failed');
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold mb-2">WealthWise</CardTitle>
//           <p className="text-gray-600">Your path to financial freedom starts here!</p>
//         </CardHeader>
//         <CardContent>
//           <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//                 <span className="float-right text-sm text-teal-600 hover:underline cursor-pointer">
//                   Forgot?
//                 </span>
//               </label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>
//             <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
//               Login
//             </Button>
//           </form>
//           <div className="mt-4 text-center">
//             <span className="text-gray-600">Don't have an account?</span>{' '}
//             <Link href="#" className="text-teal-600 hover:underline">
//               Sign up
//             </Link>
//           </div>
//           <div className="mt-4 relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>
//           <Button
//             type="button"
//             variant="outline"
//             className="w-full mt-4 flex items-center justify-center"
//             onClick={() => {
//               // Handle Google Sign In logic here
//               console.log('Sign in with Google clicked')
//             }}
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//               <path fill="none" d="M1 1h22v22H1z" />
//             </svg>
//             Sign in with Google
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



// "use client"
// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
// import { Input } from '../components/ui/input'
// import { Button } from '../components/ui/button'
// import { Eye, EyeOff } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import Link from 'next/link'

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
//       const { token, userId, name } = res.data; // Destructure the response to get token and userId
//       localStorage.setItem('token', token); // Store JWT token in localStorage
//       localStorage.setItem('userId', userId); // Store user ID in localStorage
//       localStorage.setItem('name', name); // Optionally store the user name as well
//       setMessage('Login successful!');
//       router.push('/dashboard'); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError(err.response.data.msg || 'Login failed');
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold mb-2">WealthWise</CardTitle>
//           <p className="text-gray-600">Your path to financial freedom starts here!</p>
//         </CardHeader>
//         <CardContent>
//           <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//                 <span className="float-right text-sm text-teal-600 hover:underline cursor-pointer">
//                   Forgot?
//                 </span>
//               </label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>
//             <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
//               Login
//             </Button>
//           </form>
//           <div className="mt-4 text-center">
//             <span className="text-gray-600">Don't have an account?</span>{' '}
//             <Link href="/signup" className="text-teal-600 hover:underline">
//               Sign up
//             </Link>
//           </div>
//           <div className="mt-4 relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>
//           <Button
//             type="button"
//             variant="outline"
//             className="w-full mt-4 flex items-center justify-center"
//             onClick={() => {
//               // Handle Google Sign In logic here
//               console.log('Sign in with Google clicked')
//             }}
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//               <path fill="none" d="M1 1h22v22H1z" />
//             </svg>
//             Sign in with Google
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  // const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Handle Google redirect with token and userId in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    const email = urlParams.get('email');

    if (token && userId && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', email);
      // setMessage('Login successful!');
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      const { token, userId, name } = res.data; // Destructure the response to get token and userId
      localStorage.setItem('token', token); // Store JWT token in localStorage
      localStorage.setItem('userId', userId); // Store user ID in localStorage
      localStorage.setItem('name', name); // Optionally store the user name as well
      // setMessage('Login successful!');
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err:any) {
      setError(err.response.data.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Welcome Back</CardTitle>
          <p className="text-gray-600">Your path to financial freedom starts here!</p>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Dont have an account?</span>
            <Link href="/signup" className="text-teal-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-4 flex items-center justify-center"
            onClick={() => {
              window.location.href = 'http://localhost:8000/api/auth/google'; // Initiates Google Sign-In process
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
