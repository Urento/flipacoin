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
import { useState } from "react";
import Navbar from "../../components/Navbar";

type ResultProps = "Head" | "Tail" | "Not Flipped";
type GuessProps = "Head" | "Tail" | "Your Guess";

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      <Navbar />
      <Container>
        <Stack spacing={3}>
          <Text fontSize="3xl">
            <Center>Login</Center>
          </Text>
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Email"
            type="email"
          />
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Password"
            type="email"
          />
          <Button
            isLoading={loading}
            loadingText="Locking In..."
            colorScheme="green"
          >
            Login
          </Button>
          <Text>
            <Center>Dont have an Account yet?</Center>
            <Center>
              <Link color="blue.300" href="/auth/signup">
                Click here to create one
              </Link>
            </Center>
          </Text>
        </Stack>
      </Container>
    </div>
  );
};

export default Login;
