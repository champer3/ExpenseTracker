import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

// ManageExpense will have a route and navigation prop because it is a screen navigation component
function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {}

  // We use useLayoutEfffect just like useEfffect to be SAFE!
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          color={GlobalStyles.colors.error500}
          size={24}
          onPress={deleteExpenseHandler}
        />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        bottomTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})