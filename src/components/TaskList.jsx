import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";

const TaskList = ({ tasks, onDelete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.taskItem}>
          <Text>{item}</Text>
          <Pressable onPress={() => onDelete(index)}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        </View>
      )}
    />
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  delete: { color: "red" },
});
