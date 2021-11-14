import { Container, Text, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

type ResultProps = "Head" | "Tail" | "Not Flipped";
type GuessProps = "Head" | "Tail" | "Not Selected";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultProps>("Not Flipped");
  const [guess, setGuess] = useState<GuessProps>("Not Selected");

  const flip = async () => {
    const r = randomInt(1, 2);

    if (r == 1) {
      setResult("Head");
    } else {
      setResult("Tail");
    }
  };

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Container>
        <Text fontSize="3xl">Flip a Coin</Text>
        <Text>{result}</Text>
        <Button isLoading={loading} onClick={flip}>
          Flip
        </Button>
      </Container>
    </div>
  );
};

export default Home;
