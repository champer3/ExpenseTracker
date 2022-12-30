import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManagaExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpenseOverview = () => {
  return (
    <>
      <StatusBar style="light" />
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarInactiveTintColor: "white",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent Expenses",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white'
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpenseOverview}
            // headerShown: to remove the double header so we have only either RecentExpenses or AllExpenes
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
            presentation: 'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
