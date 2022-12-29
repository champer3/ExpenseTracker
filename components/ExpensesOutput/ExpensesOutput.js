import { FlatList, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A Pair of Shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A Pair of Trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.29,
        date: new Date('2021-12-05')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A Pair of Trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e7',
        description: 'Some bananas',
        amount: 5.29,
        date: new Date('2021-12-05')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e9',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e10',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e11',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
]

function ExpensesOutput({expenses, expensesPeriod}){
    return <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})