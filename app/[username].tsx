import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { Response, User } from "@/constants/type";

async function getFollowers(userName: string): Promise<Response<User[]>> {
  const response = await fetch(`/api/followers?name=${userName}`);
  const data = await response.json();

  return data;
}

export default function ModalScreen() {
  const { username } = useLocalSearchParams();
  const [followers, setFollowers] = useState<User[] | null>(null);

  async function requestFollowers(userName: string) {
    const response = await getFollowers(userName);

    if (response.status === "failure") {
      setFollowers(null);
      return;
    }

    setFollowers(response.res);
  }

  useEffect(() => {
    if (typeof username !== "string") return;

    requestFollowers(username);
  }, [username]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.followersContainer}>
        {followers?.map((follower, index) => (
          <Text key={`${follower.id}_${index}`} style={styles.title}>
            &#x2022; {follower.login}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 12,
  },
  followersContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
});
