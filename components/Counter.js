import { useState } from 'react';
import { Pressable, Text } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(10);
  /* let count = 0; */

  function arttir() {
    setCount(count + 1);
  }

  function azalt() {
    setCount(count - 1);
  }
  return (
    <>
      <Text>{count}</Text>
      <Pressable onPress={arttir}>
        <Text>Arttır</Text>
      </Pressable>
      <Pressable onPress={azalt}>
        <Text>Azalt</Text>
      </Pressable>
    </>
  );
}
