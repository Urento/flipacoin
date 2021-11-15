import {
  Container,
  Text,
  Button,
  Link,
  Input,
  Stack,
  Center,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

interface SignUpResponse {
  // when successfully registering
  email: string;
  password: string;
  id: string;
  points: number;

  // if an error occurs
  error: string;
}

const Register: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    setLoading(true);
    setHasError(false);
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      //TODO: Display Alert
      return;
    }

    if (password !== confirmPassword) {
      //TODO: Display Alert
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, username }),
      credentials: "include",
    });
    const fJson: SignUpResponse = await response.json();

    if (fJson.error) {
      setHasError(true);
      setLoading(false);
      //TODO: Display Alert
      return;
    }

    //TODO: Display Success Alert

    setLoading(false);
  };

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(e.target.value);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  return (
    <div>
      <Navbar />
      <Container>
        <Stack spacing={3}>
          <Text fontSize="3xl">
            <Center>Register</Center>
          </Text>

          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Email"
            type="email"
            onChange={handleEmailChange}
          />
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Username"
            type="text"
            onChange={handleUsernameChange}
          />
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Password"
            type="password"
            onChange={handlePasswordChange}
          />
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Confirm Password"
            type="password"
            onChange={handleConfirmPasswordChange}
          />

          <Button
            isLoading={loading}
            loadingText="Registering..."
            colorScheme="green"
            onClick={signUp}
          >
            Register
          </Button>

          <Text>
            <Center>Already have an account?</Center>
            <Center>
              <Link color="blue.300" href="/auth">
                Click here to login
              </Link>
            </Center>
          </Text>
        </Stack>
      </Container>
    </div>
  );
};

export default Register;
