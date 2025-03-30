import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Email:", email);
    console.log("Hasło:", password);
  }


  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100" >
      <Card className="w-2xl p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-6">Logowanie</h2>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2 ">Email</Label>
            <Input id="email" type="email" placeholder="Wprowadź email" className="w-full" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block mb-2">Hasło</Label>
            <Input id="password" type="password" placeholder="Wprowadź hasło" className="w-full" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full text-blue-900" onClick={() => handleLogin()}>Zaloguj się</Button>
        </CardContent>
      </Card>
    </div>
  )
}