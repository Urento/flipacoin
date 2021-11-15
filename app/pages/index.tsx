import {
  Container,
  Text,
  Button,
  Select,
  Input,
  Stack,
  Center,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar";

type ResultProps = "Head" | "Tail" | "Not Flipped";
type GuessProps = "Head" | "Tail" | "Your Guess";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultProps>("Not Flipped");
  const [guess, setGuess] = useState<GuessProps>("Your Guess");
  const [pointsToBet, setPointsToBet] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [lockedIn, setLockedIn] = useState(false);
  const [loadingLockIn, setLoadingLockIn] = useState(false);

  const flip = async () => {
    setLoading(true);
    const r = randomInt(1, 2);
    if (r == 1) {
      setResult("Head");
    } else {
      setResult("Tail");
    }
    setLoading(false);
  };

  const lockInTheBet = async () => {
    setLoadingLockIn(true);
  };

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePointsToBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setHasError(false);
      setPointsToBet(parseInt(value));
    } else {
      console.log("has error");
      setHasError(true);
    }
  };

  const handleGuessChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setGuess(e.target.value as GuessProps);

  return (
    <div>
      <Navbar />
      <Container>
        <Stack spacing={3}>
          <Text fontSize="3xl">
            <Center>Flip a Coin</Center>
          </Text>
          <Select placeholder="Your Guess" onChange={handleGuessChange}>
            <option value="Head">Head</option>
            <option value="Tail">Tail</option>
          </Select>
          <Input
            isInvalid={hasError}
            errorBorderColor="crimson"
            placeholder="Points to Bet"
            type="number"
            onChange={handlePointsToBetChange}
          />
          <Button
            isLoading={loadingLockIn}
            loadingText="Locking In..."
            colorScheme="green"
            onClick={lockInTheBet}
          >
            Lock In the Bet
          </Button>

          <Text>Result: {result}</Text>
          <Button
            isLoading={loading}
            loadingText="Flipping..."
            colorScheme="blue"
            onClick={flip}
          >
            Flip
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
