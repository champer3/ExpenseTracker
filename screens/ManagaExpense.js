import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

// ManageExpense will have a route and navigation prop because it is a screen navigation component
function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  // We use useLayoutEfffect just like useEfffect to be SAFE!
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try{
        await deleteExpense(editedExpenseId)
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    } catch(error){
        setError('Could not delete expense - please try again later')
        setIsSubmitting(false) 
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)
    try{
        if (isEditing) {
          expensesCtx.updateExpense(editedExpenseId, expenseData);
          await updateExpense(editedExpenseId, expenseData)
        } else {
            const id = await storeExpense(expenseData)
          expensesCtx.addExpense({...expenseData, id});
        }
        navigation.goBack();
    } catch (error){
        setError('Could not save data - please try again later!')
        setIsSubmitting(false)
    }
  }

  function errorHandler(){
    setError(null)
  }

  if(error && !isSubmitting){
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    bottomTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});