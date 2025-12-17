import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

const TaskInput = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Enter task"
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: { color: "#fff" },
});
