"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export default function Home() {

  const { data: session } = authClient.useSession() 

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
    }, {
        onSuccess: () => {
            //redirect to the dashboard or sign in page
            window.alert("Success");
        },
        onError: () => {
            // display the error message
            window.alert("Something went wrong")
        },
  });

  const onLogin = () => authClient.signIn.email({
      email, // user email address
      password, // user password -> min 8 characters by default
  }, {
      onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("Success");
      },
      onError: () => {
          // display the error message
          window.alert("Something went wrong")
      },
  });

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <button onClick={() => authClient.signOut()}>
          sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-18">
      <div className="p-4 flex flex-col gap-y-4">
        <input 
          placeholder="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>
          Create user
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <input 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  )
};
